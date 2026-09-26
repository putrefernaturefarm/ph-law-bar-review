-- ============================================================
-- PH LAW BAR REVIEW — SUPABASE SCHEMA
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: questions
-- ============================================================
CREATE TABLE IF NOT EXISTS public.questions (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  content           text NOT NULL,
  answer            text NOT NULL,
  explanation       text,
  question_type     text NOT NULL CHECK (question_type IN (
                      'definition','enumeration','identification','distinction',
                      'true_false','fill_blank','multiple_choice','application',
                      'issue_spotting','case_doctrine','elements','requisites',
                      'procedure','jurisdiction','period','bar_style'
                    )),
  difficulty        text NOT NULL CHECK (difficulty IN ('easy','medium','hard','bar_level')),
  level             text NOT NULL CHECK (level IN ('pre_law','law_school','bar_exam')),
  subject           text,
  topic             text,
  area              text,
  source_document   text,
  source_section    text,
  source_article    text,
  source_case       text,
  source_gr_number  text,
  source_citation   text,
  is_verified       boolean NOT NULL DEFAULT false,
  is_flagged        boolean NOT NULL DEFAULT false,
  flag_reason       text,
  mcq_options       jsonb,
  correct_option    text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- GIN full-text index for fast search
CREATE INDEX IF NOT EXISTS idx_questions_content_fts
  ON public.questions USING GIN (to_tsvector('english', content));

-- Standard indexes for filters
CREATE INDEX IF NOT EXISTS idx_questions_subject    ON public.questions (subject);
CREATE INDEX IF NOT EXISTS idx_questions_level      ON public.questions (level);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON public.questions (difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_type       ON public.questions (question_type);
CREATE INDEX IF NOT EXISTS idx_questions_topic      ON public.questions (topic);

-- ============================================================
-- TABLE: user_question_progress
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_question_progress (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  question_id       uuid NOT NULL REFERENCES public.questions (id) ON DELETE CASCADE,
  status            text NOT NULL DEFAULT 'new' CHECK (status IN ('new','known','unknown','reviewing')),
  times_seen        int NOT NULL DEFAULT 0,
  times_correct     int NOT NULL DEFAULT 0,
  times_incorrect   int NOT NULL DEFAULT 0,
  last_reviewed_at  timestamptz,
  next_review_at    timestamptz NOT NULL DEFAULT now(),
  ease_factor       numeric NOT NULL DEFAULT 2.5,
  interval_days     int NOT NULL DEFAULT 1,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_uqp_user_id        ON public.user_question_progress (user_id);
CREATE INDEX IF NOT EXISTS idx_uqp_question_id    ON public.user_question_progress (question_id);
CREATE INDEX IF NOT EXISTS idx_uqp_next_review    ON public.user_question_progress (user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_uqp_status         ON public.user_question_progress (user_id, status);

-- ============================================================
-- TABLE: review_sessions
-- ============================================================
CREATE TABLE IF NOT EXISTS public.review_sessions (
  id                  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  mode                text NOT NULL,
  filter_subject      text,
  filter_topic        text,
  filter_difficulty   text,
  filter_level        text,
  session_limit       int,
  total_questions     int NOT NULL DEFAULT 0,
  answered            int NOT NULL DEFAULT 0,
  correct             int NOT NULL DEFAULT 0,
  incorrect           int NOT NULL DEFAULT 0,
  duration_seconds    int,
  status              text NOT NULL DEFAULT 'active' CHECK (status IN ('active','completed','abandoned')),
  completed_at        timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.review_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status  ON public.review_sessions (user_id, status);
CREATE INDEX IF NOT EXISTS idx_sessions_created ON public.review_sessions (user_id, created_at DESC);

-- ============================================================
-- TABLE: session_questions
-- ============================================================
CREATE TABLE IF NOT EXISTS public.session_questions (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id    uuid NOT NULL REFERENCES public.review_sessions (id) ON DELETE CASCADE,
  question_id   uuid NOT NULL REFERENCES public.questions (id) ON DELETE CASCADE,
  position      int NOT NULL,
  answered      boolean NOT NULL DEFAULT false,
  was_correct   boolean,
  answered_at   timestamptz
);

CREATE INDEX IF NOT EXISTS idx_sq_session_id  ON public.session_questions (session_id);
CREATE INDEX IF NOT EXISTS idx_sq_position    ON public.session_questions (session_id, position);

-- ============================================================
-- TABLE: source_documents
-- ============================================================
CREATE TABLE IF NOT EXISTS public.source_documents (
  id                    uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  filename              text NOT NULL,
  file_type             text,
  file_size             bigint,
  file_hash             text UNIQUE,
  status                text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','failed')),
  questions_generated   int NOT NULL DEFAULT 0,
  error_message         text,
  processed_at          timestamptz,
  created_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_docs_user_id ON public.source_documents (user_id);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_questions_updated_at
  BEFORE UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_uqp_updated_at
  BEFORE UPDATE ON public.user_question_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- questions: readable by all authenticated users, writable only via service role
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "questions_select_auth"
  ON public.questions FOR SELECT
  TO authenticated
  USING (true);

-- user_question_progress: users can only see/modify their own rows
ALTER TABLE public.user_question_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "uqp_select_own"
  ON public.user_question_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "uqp_insert_own"
  ON public.user_question_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "uqp_update_own"
  ON public.user_question_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- review_sessions: users can only see/modify their own
ALTER TABLE public.review_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sessions_select_own"
  ON public.review_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "sessions_insert_own"
  ON public.review_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "sessions_update_own"
  ON public.review_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- session_questions: accessible via session ownership
ALTER TABLE public.session_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sq_select_own"
  ON public.session_questions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.review_sessions rs
      WHERE rs.id = session_id AND rs.user_id = auth.uid()
    )
  );

CREATE POLICY "sq_insert_own"
  ON public.session_questions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.review_sessions rs
      WHERE rs.id = session_id AND rs.user_id = auth.uid()
    )
  );

CREATE POLICY "sq_update_own"
  ON public.session_questions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.review_sessions rs
      WHERE rs.id = session_id AND rs.user_id = auth.uid()
    )
  );

-- source_documents: users see only their own
ALTER TABLE public.source_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "docs_select_own"
  ON public.source_documents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "docs_insert_own"
  ON public.source_documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
