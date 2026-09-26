# PH Law Bar Review — Document Ingestion Pipeline

This pipeline reads 2,812+ Philippine law documents from your DDC Library, extracts their text, splits the text into manageable chunks, and uses Claude Haiku to generate Q&A flashcard pairs that land in your Supabase `questions` table.

---

## What it does

1. Scans `D:\300 SOCIAL SCIENCES\340 Law School - DDC Library\` recursively for PDF, DOCX, DOC, PPTX, and TXT files.
2. Skips any file whose SHA-256 hash already exists in `source_documents` — so re-running is always safe.
3. Extracts readable text. Scanned (image-only) PDFs are marked as failed and skipped automatically.
4. Detects the Philippine bar subject (Constitutional Law, Criminal Law, Civil Law, etc.) from the folder path and filename.
5. Splits each document into ~800-word chunks that respect paragraph boundaries.
6. Sends each chunk to `claude-haiku-4-5-20251001` and receives 5 Q&A flashcard pairs per chunk.
7. Inserts all questions into Supabase and updates the `source_documents` row with the final status.

---

## Prerequisites

- **Python 3.11 or newer**
- **uv** (fast Python package manager) — install once:
  ```
  pip install uv
  ```
- A Supabase project with the schema already applied (`supabase/schema.sql`) and the ingestion migration applied (`supabase/migration_ingestion.sql`).
- An Anthropic API key with access to Claude Haiku.

---

## Setup

### 1. Run the ingestion migration in Supabase

Open the Supabase SQL editor and run the contents of:

```
ph-law-bar-review/supabase/migration_ingestion.sql
```

This makes `source_documents.user_id` nullable (required for system ingestion) and creates the `ingestion_log` table.

### 2. Add your keys to `.env.local`

Open `ph-law-bar-review/.env.local` (create it from `.env.local.example` if it does not exist) and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=sk-ant-your_key_here
```

The ingestion script reads `.env.local` from the project root automatically. It must use `SUPABASE_SERVICE_ROLE_KEY` (not the anon key) to bypass Row Level Security for system writes.

---

## Running

From the `ingestion/` folder:

```powershell
cd "C:\Users\RUEBENSON ACABAL\Desktop\VS CODE PRODUCTS AND OUTPUT\All Project\ph-law-bar-review\ingestion"
uv run python ingest.py
```

`uv` installs all dependencies from `pyproject.toml` into an isolated environment automatically — no `pip install` step needed.

---

## What to expect

The terminal shows live progress:

```
=================================================================
  PH LAW BAR REVIEW — DOCUMENT INGESTION PIPELINE
=================================================================

Library  : D:\300 SOCIAL SCIENCES\340 Law School - DDC Library
Total files found  : 2,812
Already processed  : 0
Pending ingestion  : 2,812

Starting ingestion...

[1/2812] UST Golden Notes 2024 - Criminal Law.pdf
  Subject : Criminal Law | Level : bar_exam | 45.2 MB
  1,847,302 chars | 60 chunks
  Chunk 1/60: +5 questions (5 total)
  Chunk 2/60: +5 questions (10 total)
  ...
  DONE: 300 questions generated

[2/2812] Ateneo Blue Notes - Civil Law.pdf
  ...
```

### Time estimate

| Metric | Estimate |
|--------|----------|
| Files | 2,812 |
| Avg chunks per file | ~40 |
| Questions per chunk | 5 |
| Delay per API call | 0.3 seconds |
| Estimated questions | ~560,000–840,000 |
| Estimated total time | 35–60 hours |

Running overnight on successive sessions is fine — the pipeline resumes exactly where it left off.

---

## Resuming

Just re-run the same command. The script reads all `file_hash` values from `source_documents` and skips any file it has already processed. There is no manual state file to manage.

---

## Files marked as failed

Documents are marked `status = 'failed'` when:
- The PDF is scanned (image-only, no extractable text)
- The extracted text is shorter than 300 characters
- Claude returns no valid Q&A pairs after 3 retries

Failed files are shown in the Ingestion Status page at `/ingestion` in the app.

---

## Checking progress

Open the app and navigate to **Ingestion** in the sidebar, or go directly to `/ingestion`. The page shows:
- Total documents registered
- Counts by status (completed / processing / failed)
- Total questions generated
- A progress bar
- The 20 most recently processed documents

---

## Cost estimate

Claude Haiku pricing (as of late 2024): ~$0.25 / 1M input tokens, ~$1.25 / 1M output tokens.

For 2,812 files at 40 chunks average, each chunk ~500 input tokens and ~400 output tokens:

- Input: 2,812 × 40 × 500 = ~56M tokens ≈ **$14**
- Output: 2,812 × 40 × 400 = ~45M tokens ≈ **$56**
- **Total estimate: ~$70 for the full library**

This is a rough estimate. Large files (capped at 60 chunks) and skipped scanned PDFs will reduce the actual cost.
