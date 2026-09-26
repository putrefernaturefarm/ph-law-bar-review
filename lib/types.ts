export type QuestionType =
  | 'definition'
  | 'enumeration'
  | 'identification'
  | 'distinction'
  | 'true_false'
  | 'fill_blank'
  | 'multiple_choice'
  | 'application'
  | 'issue_spotting'
  | 'case_doctrine'
  | 'elements'
  | 'requisites'
  | 'procedure'
  | 'jurisdiction'
  | 'period'
  | 'bar_style'

export type Difficulty = 'easy' | 'medium' | 'hard' | 'bar_level'
export type Level = 'pre_law' | 'law_school' | 'bar_exam'
export type QuestionStatus = 'new' | 'known' | 'unknown' | 'reviewing'
export type ReviewMode =
  | 'all'
  | 'bar'
  | 'pre_law'
  | 'law_school'
  | 'subject'
  | 'topic'
  | 'weak'
  | 'new'
  | 'due'
  | 'random'

export interface Question {
  id: string
  content: string
  answer: string
  explanation?: string
  question_type: QuestionType
  difficulty: Difficulty
  level: Level
  subject?: string
  topic?: string
  area?: string
  source_document?: string
  source_section?: string
  source_article?: string
  source_case?: string
  source_gr_number?: string
  source_citation?: string
  is_verified: boolean
  is_flagged: boolean
  flag_reason?: string
  mcq_options?: string[]
  correct_option?: string
  created_at: string
  updated_at: string
}

export interface UserQuestionProgress {
  id: string
  user_id: string
  question_id: string
  status: QuestionStatus
  times_seen: number
  times_correct: number
  times_incorrect: number
  last_reviewed_at?: string
  next_review_at: string
  ease_factor: number
  interval_days: number
}

export interface ReviewSession {
  id: string
  user_id: string
  mode: ReviewMode
  filter_subject?: string
  filter_topic?: string
  filter_difficulty?: string
  filter_level?: string
  session_limit?: number
  total_questions: number
  answered: number
  correct: number
  incorrect: number
  duration_seconds?: number
  status: 'active' | 'completed' | 'abandoned'
  completed_at?: string
  created_at: string
}

export interface SessionQuestion {
  id: string
  session_id: string
  question_id: string
  position: number
  answered: boolean
  was_correct?: boolean
  answered_at?: string
  question?: Question
}

export interface QuestionBankStats {
  total: number
  by_level: {
    pre_law: number
    law_school: number
    bar_exam: number
  }
  by_subject: Record<string, number>
}

export interface SessionSetupOptions {
  mode: ReviewMode
  filter_level?: Level
  filter_subject?: string
  filter_topic?: string
  filter_difficulty?: Difficulty
  session_limit?: number
}
