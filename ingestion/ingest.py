#!/usr/bin/env python3
"""
PH Law Bar Review — Document Ingestion Pipeline v1.0
Processes 2,812+ Philippine law documents from the DDC Library.

Source : D:\\300 SOCIAL SCIENCES\\340 Law School - DDC Library\\
Target : Supabase `questions` + `source_documents` tables

Usage  : uv run python ingest.py
Resume : Re-run at any time — already-processed files are skipped via SHA-256 hash.
"""

import os
import json
import hashlib
import time
import re
import sys
from pathlib import Path

import anthropic
from supabase import create_client
from dotenv import load_dotenv


# ──────────────────────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────────────────────

LIBRARY_ROOT = Path(r"D:\300 SOCIAL SCIENCES\340 Law School - DDC Library")
SUPPORTED_EXT = {".pdf", ".docx", ".doc", ".pptx", ".txt"}

CHUNK_WORDS = 800          # target words per chunk
QUESTIONS_PER_CHUNK = 5    # Q&A pairs generated per chunk
MAX_CHUNKS_PER_FILE = 60   # cap processing per file (max 300 questions/file)
DELAY_BETWEEN_API_CALLS = 0.3  # seconds — respects Haiku rate limits


# ──────────────────────────────────────────────────────────────
# SUBJECT DETECTION
# Maps folder path + filename keywords → Philippine bar subjects
# ──────────────────────────────────────────────────────────────

SUBJECT_PATTERNS: list[tuple[str, str, str]] = [
    (
        r"political|constitution|pol\.?\s*law|342\b|Political Law|polilaw"
        r"|Blue Notes.*Polit|Golden.*Polit|Red Book.*Polit"
        r"|2022.*Polit|2023.*Polit|2024.*Polit"
        r"|UP.*Polit|Ateneo.*Polit|UST.*Polit"
        r"|Pre-Week.*Polit|LMT.*Polit|QUAMTO.*POLIT"
        r"|Purple.*Polit|Omnibus.*Polit|BOC.*Political|SBCA.*Political",
        "Constitutional Law",
        "bar_exam",
    ),
    (
        r"criminal|penal|RPC|boado|revised penal|345\b|Criminal Law|crim\."
        r"|BOADO|Blue Notes.*Crim|Golden.*Crim|Red Book.*Crim"
        r"|2022.*Crim|2023.*Crim|2024.*Crim"
        r"|UP.*Crim|Ateneo.*Crim|QUAMTO.*CRIM"
        r"|Purple.*Crim|Omnibus.*Crim|SBCA.*Crim",
        "Criminal Law",
        "bar_exam",
    ),
    (
        r"civil law|civil code|paras|346\b|Civil Law|obligations|contracts"
        r"|succession|family code|persons"
        r"|Blue Notes.*Civil|Golden.*Civil|Red Book.*Civil"
        r"|2022.*Civil|2023.*Civil|2024.*Civil"
        r"|UP.*Civil|Ateneo.*Civil|QUAMTO.*CIVIL"
        r"|Purple.*Civil|Omnibus.*Civil|SBCA.*Civil",
        "Civil Law",
        "bar_exam",
    ),
    (
        r"commercial|corporation|negotiable|insurance|346\.07|securities"
        r"|batas pambansa|COMMERCIAL LAW|346\.(07|09|04)|Commercial Law",
        "Commercial Law",
        "bar_exam",
    ),
    (
        r"labor|344\b|chan.*labor|labor code|LABOR|workers|employment|nlrc"
        r"|Labor Law|Blue Notes.*Labor|Golden.*Labor|Red Book.*Labor"
        r"|2022.*Labor|2023.*Labor|2024.*Labor"
        r"|UP.*Labor|Ateneo.*Labor|QUAMTO.*Labor"
        r"|Purple.*Labor|Omnibus.*Labor|SBCA.*Labor|BQA.*Labor|Ungos",
        "Labor Law",
        "bar_exam",
    ),
    (
        r"tax|343\b|ingles|tabag|NIRC|internal revenue|VAT|Taxation|income tax"
        r"|TAXATION|Tax Made|Tax Code"
        r"|Blue Notes.*Tax|Golden.*Tax|Red Book.*Tax"
        r"|2022.*Tax|2023.*Tax|2024.*Tax"
        r"|UP.*Tax|Ateneo.*Tax|QUAMTO.*Tax"
        r"|Purple.*Tax|Omnibus.*Tax|SBCA.*Tax|BQA.*Tax",
        "Taxation",
        "bar_exam",
    ),
    (
        r"remedial|procedure|347\b|riano|rules of court"
        r"|civil procedure|criminal procedure|evidence"
        r"|REMEDIAL|Remedial Law|347\.(0[0-9])",
        "Remedial Law",
        "bar_exam",
    ),
    (
        r"legal ethics|340\.023|canons|IBP|attorney|disbarment"
        r"|Legal Ethics|legal profession|bar matter",
        "Legal Ethics",
        "bar_exam",
    ),
    (
        r"international|341\b|public international|PIL|treaty"
        r"|public int|International Law",
        "Public International Law",
        "bar_exam",
    ),
    (
        r"land|agrarian|property|346\.043|torren|Land Titles"
        r"|Land Laws|Natural Resources|agrarian",
        "Land Law",
        "bar_exam",
    ),
    (
        r"intellectual property|copyright|patent|trademark|346\.048|IP Law",
        "Intellectual Property",
        "bar_exam",
    ),
    (
        r"local government|LGU|lgc|local government code|Local Gov",
        "Local Government Law",
        "bar_exam",
    ),
    (
        r"election|comelec|omnibus election|electoral|HRET",
        "Election Law",
        "bar_exam",
    ),
    (
        r"criminology|364\b",
        "Criminology",
        "law_school",
    ),
    (
        r"legal philosophy|jurisprudence|introduction to law|340\.00",
        "Legal Philosophy",
        "pre_law",
    ),
    (
        r"political science|governance|public administration|350\b|320\b",
        "Political Science",
        "pre_law",
    ),
    (
        r"shariah|islamic|Muslim",
        "Shariah Law",
        "bar_exam",
    ),
]


def detect_subject(file_path: Path) -> tuple[str, str]:
    """Return (subject, level) for a document based on its full path."""
    search_text = str(file_path)
    for pattern, subject, level in SUBJECT_PATTERNS:
        if re.search(pattern, search_text, re.IGNORECASE):
            return subject, level
    return "General Law", "bar_exam"


# ──────────────────────────────────────────────────────────────
# TEXT EXTRACTION
# ──────────────────────────────────────────────────────────────

def extract_pdf(path: Path) -> tuple[str, int]:
    """
    Extract text from a PDF using PyMuPDF (fitz).
    Returns (text, page_count).
    Returns ('', page_count) when the PDF is scanned / image-only.
    """
    try:
        import fitz  # pymupdf

        doc = fitz.open(str(path))
        page_count = len(doc)
        pages: list[str] = []

        for page in doc:
            text = page.get_text()
            if text.strip():
                pages.append(text)

        doc.close()
        full_text = "\n\n".join(pages)

        # Heuristic: avg chars per page < 80 → likely scanned
        if page_count > 0 and len(full_text) / page_count < 80:
            return "", page_count

        return full_text, page_count
    except Exception:
        return "", 0


def extract_docx(path: Path) -> tuple[str, int]:
    """Extract text from DOCX/DOC, including table content."""
    try:
        from docx import Document

        doc = Document(str(path))
        paragraphs: list[str] = [
            p.text.strip() for p in doc.paragraphs if p.text.strip()
        ]

        # Also pull table cell text
        for table in doc.tables:
            for row in table.rows:
                for cell in row.cells:
                    if cell.text.strip():
                        paragraphs.append(cell.text.strip())

        return "\n\n".join(paragraphs), len(doc.paragraphs)
    except Exception:
        return "", 0


def extract_pptx(path: Path) -> tuple[str, int]:
    """Extract all slide text from a PPTX file."""
    try:
        from pptx import Presentation

        prs = Presentation(str(path))
        slides: list[str] = []

        for slide in prs.slides:
            slide_texts: list[str] = []
            for shape in slide.shapes:
                if hasattr(shape, "text") and shape.text.strip():
                    slide_texts.append(shape.text.strip())
            if slide_texts:
                slides.append("\n".join(slide_texts))

        return "\n\n".join(slides), len(prs.slides)
    except Exception:
        return "", 0


def extract_text(path: Path) -> tuple[str, int]:
    """Dispatch to the correct extractor based on file extension."""
    ext = path.suffix.lower()

    if ext == ".pdf":
        return extract_pdf(path)
    elif ext in (".docx", ".doc"):
        return extract_docx(path)
    elif ext == ".pptx":
        return extract_pptx(path)
    elif ext == ".txt":
        text = path.read_text(encoding="utf-8", errors="ignore")
        return text, text.count("\n")

    return "", 0


# ──────────────────────────────────────────────────────────────
# SMART CHUNKING
# ──────────────────────────────────────────────────────────────

def chunk_text(text: str, chunk_words: int = CHUNK_WORDS) -> list[str]:
    """
    Split text into chunks respecting paragraph boundaries.
    Paragraphs shorter than 5 words are discarded (headers, page numbers, etc.).
    """
    # Normalize whitespace
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)

    raw_paragraphs = re.split(r"\n{2,}", text)
    paragraphs: list[str] = [
        p.strip()
        for p in raw_paragraphs
        if p.strip() and len(p.strip()) > 20
    ]

    chunks: list[str] = []
    current: list[str] = []
    current_words = 0

    for para in paragraphs:
        words = len(para.split())
        if words < 5:
            continue

        if current_words + words > chunk_words and current:
            chunks.append("\n\n".join(current))
            current = [para]
            current_words = words
        else:
            current.append(para)
            current_words += words

    if current:
        chunks.append("\n\n".join(current))

    return chunks


# ──────────────────────────────────────────────────────────────
# AI QUESTION GENERATION
# ──────────────────────────────────────────────────────────────

GENERATION_PROMPT = """\
You are a Philippine Bar Exam question generator creating flashcard Q&A pairs.

SOURCE: {filename}
SUBJECT: {subject}

TEXT:
{chunk}

Generate exactly {n} distinct Q&A flashcard pairs from the above text.

RULES:
- Base questions ONLY on the text above — never invent legal content
- Philippine law context — Revised Penal Code, Civil Code, 1987 Constitution, etc.
- Cover different aspects: definitions, elements, enumerations, distinctions, applications, exceptions, procedures
- Make answers complete enough to stand alone (no "see above" references)
- For enumerations, list ALL items from the text
- question_type must be exactly one of: definition, enumeration, identification, distinction, true_false, application, elements, requisites, procedure, jurisdiction, period, bar_style, case_doctrine
- difficulty must be exactly one of: easy, medium, hard, bar_level

Return ONLY a JSON array, no other text:
[
  {{
    "content": "question text here?",
    "answer": "complete answer here. Use numbered lists for enumerations: 1. ... 2. ... 3. ...",
    "explanation": "brief context or note (can be empty string)",
    "question_type": "one of the types above",
    "difficulty": "one of the difficulties above",
    "topic": "specific subtopic (e.g., Self-Defense, Novation, Certiorari)",
    "source_citation": "Article/Section reference if mentioned in text, otherwise empty string"
  }}
]\
"""

VALID_QUESTION_TYPES = {
    "definition", "enumeration", "identification", "distinction",
    "true_false", "application", "elements", "requisites",
    "procedure", "jurisdiction", "period", "bar_style", "case_doctrine",
}
VALID_DIFFICULTIES = {"easy", "medium", "hard", "bar_level"}


def generate_questions_from_chunk(
    client: anthropic.Anthropic,
    chunk: str,
    filename: str,
    subject: str,
    n: int = QUESTIONS_PER_CHUNK,
) -> list[dict]:
    """
    Call Claude Haiku to generate Q&A pairs from a single text chunk.
    Retries up to 3 times on JSON parse errors or API hiccups.
    Returns a list of validated question dicts (may be empty on failure).
    """
    truncated = chunk[:3500] if len(chunk) > 3500 else chunk

    prompt = GENERATION_PROMPT.format(
        filename=filename,
        subject=subject,
        chunk=truncated,
        n=n,
    )

    for attempt in range(3):
        try:
            message = client.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=2048,
                messages=[{"role": "user", "content": prompt}],
            )
            raw = message.content[0].text.strip()

            # Extract the JSON array even if the model adds surrounding prose
            match = re.search(r"\[[\s\S]*\]", raw)
            if not match:
                if attempt < 2:
                    time.sleep(1)
                continue

            questions: list[dict] = json.loads(match.group())

            valid: list[dict] = []
            for q in questions:
                if not isinstance(q, dict):
                    continue
                content = q.get("content", "")
                answer = q.get("answer", "")
                if not content or len(content) < 10:
                    continue
                if not answer or len(answer) < 10:
                    continue

                # Normalise enum fields
                qt = q.get("question_type", "definition")
                if qt not in VALID_QUESTION_TYPES:
                    q["question_type"] = "definition"

                diff = q.get("difficulty", "medium")
                if diff not in VALID_DIFFICULTIES:
                    q["difficulty"] = "medium"

                valid.append(q)

            return valid

        except (json.JSONDecodeError, Exception):
            if attempt < 2:
                time.sleep(1)
            continue

    return []


# ──────────────────────────────────────────────────────────────
# HELPERS
# ──────────────────────────────────────────────────────────────

def file_hash(path: Path) -> str:
    """SHA-256 hash of file contents. Falls back to path hash on read error."""
    h = hashlib.sha256()
    try:
        with open(path, "rb") as f:
            for block in iter(lambda: f.read(65536), b""):
                h.update(block)
    except Exception:
        return hashlib.sha256(str(path).encode()).hexdigest()
    return h.hexdigest()


# ──────────────────────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────────────────────

def main() -> None:
    # Load environment from ph-law-bar-review/.env.local
    env_path = Path(__file__).parent.parent / ".env.local"
    if env_path.exists():
        load_dotenv(env_path)
    else:
        load_dotenv()  # fall back to shell environment

    supabase_url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")

    missing: list[str] = []
    if not supabase_url:
        missing.append("NEXT_PUBLIC_SUPABASE_URL")
    if not supabase_key:
        missing.append("SUPABASE_SERVICE_ROLE_KEY")
    if not anthropic_key:
        missing.append("ANTHROPIC_API_KEY")

    if missing:
        print(f"\nERROR: Missing environment variables: {', '.join(missing)}")
        print(f"Add them to: {env_path}")
        sys.exit(1)

    supabase = create_client(supabase_url, supabase_key)  # type: ignore[arg-type]
    ai = anthropic.Anthropic(api_key=anthropic_key)

    print("\n" + "=" * 65)
    print("  PH LAW BAR REVIEW — DOCUMENT INGESTION PIPELINE")
    print("=" * 65)

    # ── Fetch already-processed hashes ──────────────────────────
    processed_result = (
        supabase.table("source_documents")
        .select("file_hash,filename,status")
        .execute()
    )
    processed_hashes: set[str] = {
        r["file_hash"]
        for r in (processed_result.data or [])
        if r.get("file_hash")
    }

    # ── Discover files ───────────────────────────────────────────
    if not LIBRARY_ROOT.exists():
        print(f"\nERROR: Library not found at {LIBRARY_ROOT}")
        print("Check that the D: drive is connected and the path is correct.")
        sys.exit(1)

    all_files = sorted([
        f
        for f in LIBRARY_ROOT.rglob("*")
        if f.is_file() and f.suffix.lower() in SUPPORTED_EXT
    ])

    pending = [f for f in all_files if file_hash(f) not in processed_hashes]

    print(f"\nLibrary  : {LIBRARY_ROOT}")
    print(f"Total files found  : {len(all_files):,}")
    print(f"Already processed  : {len(all_files) - len(pending):,}")
    print(f"Pending ingestion  : {len(pending):,}")

    if not pending:
        print("\nAll files already processed. Nothing to do.")
        return

    print(f"\nStarting ingestion...\n")

    total_questions = 0
    files_done = 0
    files_failed = 0

    for file_num, file_path in enumerate(pending, 1):
        rel_path = str(file_path.relative_to(LIBRARY_ROOT))
        subject, level = detect_subject(file_path)
        fhash = file_hash(file_path)
        size_mb = file_path.stat().st_size / (1024 * 1024)

        print(f"[{file_num}/{len(pending)}] {file_path.name[:55]}")
        print(f"  Subject : {subject} | Level : {level} | {size_mb:.1f} MB")

        # ── Register document ────────────────────────────────────
        try:
            doc_result = (
                supabase.table("source_documents")
                .insert({
                    "filename": rel_path,
                    "file_type": file_path.suffix.lower(),
                    "file_size": file_path.stat().st_size,
                    "file_hash": fhash,
                    "status": "processing",
                })
                .execute()
            )
            doc_id: str = doc_result.data[0]["id"]
        except Exception as e:
            print(f"  WARNING: Failed to register in DB — {e}")
            continue

        # ── Extract text ─────────────────────────────────────────
        text, pages = extract_text(file_path)

        if not text or len(text.strip()) < 300:
            supabase.table("source_documents").update({
                "status": "failed",
                "error_message": "Scanned PDF or insufficient text (<300 chars)",
            }).eq("id", doc_id).execute()
            print("  SKIP: no readable text (scanned PDF or empty file)")
            files_failed += 1
            continue

        char_count = len(text)
        chunks = chunk_text(text)[:MAX_CHUNKS_PER_FILE]
        print(f"  {char_count:,} chars | {len(chunks)} chunks")

        file_questions = 0

        for ci, chunk in enumerate(chunks):
            questions = generate_questions_from_chunk(
                ai, chunk, file_path.name, subject
            )

            if questions:
                rows = []
                for q in questions:
                    rows.append({
                        "content": q["content"][:2000],
                        "answer": q["answer"][:4000],
                        "explanation": (q.get("explanation") or "")[:1000],
                        "question_type": q.get("question_type", "definition"),
                        "difficulty": q.get("difficulty", "medium"),
                        "level": level,
                        "subject": subject,
                        "topic": (q.get("topic") or "")[:200],
                        "source_document": rel_path[:500],
                        "source_citation": (q.get("source_citation") or "")[:300],
                        "is_verified": False,
                        "is_flagged": False,
                    })

                try:
                    supabase.table("questions").insert(rows).execute()
                    file_questions += len(questions)
                    total_questions += len(questions)
                    print(
                        f"  Chunk {ci + 1}/{len(chunks)}: "
                        f"+{len(questions)} questions "
                        f"({file_questions} total)"
                    )
                except Exception as e:
                    print(f"  WARNING: Insert error on chunk {ci + 1}: {e}")

            time.sleep(DELAY_BETWEEN_API_CALLS)

        # ── Mark document complete ───────────────────────────────
        supabase.table("source_documents").update({
            "status": "completed" if file_questions > 0 else "failed",
            "questions_generated": file_questions,
            "error_message": (
                None if file_questions > 0
                else "No questions generated from any chunk"
            ),
        }).eq("id", doc_id).execute()

        processed_hashes.add(fhash)
        files_done += 1

        if file_questions > 0:
            print(f"  DONE: {file_questions} questions generated\n")
        else:
            files_failed += 1
            print("  WARNING: No questions generated\n")

    # ── Session summary ──────────────────────────────────────────
    print("=" * 65)
    print("INGESTION SESSION COMPLETE")
    print(f"  Files processed     : {files_done:,}")
    print(f"  Files failed        : {files_failed:,}")
    print(f"  Questions generated : {total_questions:,}")
    print("=" * 65 + "\n")


if __name__ == "__main__":
    main()
