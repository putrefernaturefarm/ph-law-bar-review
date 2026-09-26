-- ============================================================
-- PH LAW BAR REVIEW — INGESTION MIGRATION
-- Run this against your Supabase project before running ingest.py
-- ============================================================

-- 1. Make user_id nullable so system-ingested documents don't require an auth user
ALTER TABLE public.source_documents ALTER COLUMN user_id DROP NOT NULL;

-- 2. Track per-chunk ingestion progress
CREATE TABLE IF NOT EXISTS public.ingestion_log (
  id                uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id       uuid        REFERENCES public.source_documents(id) ON DELETE CASCADE,
  chunk_index       integer     NOT NULL,
  questions_generated integer   NOT NULL DEFAULT 0,
  status            text        NOT NULL DEFAULT 'completed',
  error_message     text,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS il_document_idx ON public.ingestion_log (document_id);

-- 3. Allow service-role inserts on source_documents for system ingestion
--    (existing RLS policy "docs_insert_own" requires auth.uid() = user_id,
--     which fails when user_id IS NULL; the service role bypasses RLS so
--     this is only needed if you run ingestion via the anon key — don't.)

-- 4. Allow service-role inserts on ingestion_log (no RLS by default)
--    No extra policy needed; service role bypasses RLS.

-- 5. Confirm source_documents RLS policy handles nullable user_id gracefully
--    The existing "docs_select_own" policy (auth.uid() = user_id) already
--    excludes NULL rows for authenticated users, which is correct — system
--    docs are admin-only and accessed only via service role.
