export const BAR_SUBJECTS = [
  'Constitutional Law',
  'Civil Law',
  'Criminal Law',
  'Commercial Law',
  'Labor Law',
  'Taxation',
  'Remedial Law',
  'Legal Ethics',
  'Political Law',
  'Special Laws',
] as const

export type BarSubject = (typeof BAR_SUBJECTS)[number]

export const LEVELS = [
  { value: 'pre_law', label: 'Pre-Law' },
  { value: 'law_school', label: 'Law School' },
  { value: 'bar_exam', label: 'Bar Exam' },
] as const

export const DIFFICULTIES = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'bar_level', label: 'Bar Level' },
] as const

export const QUESTION_TYPE_LABELS: Record<string, string> = {
  definition: 'Definition',
  enumeration: 'Enumeration',
  identification: 'Identification',
  distinction: 'Distinction',
  true_false: 'True or False',
  fill_blank: 'Fill in the Blank',
  multiple_choice: 'Multiple Choice',
  application: 'Application',
  issue_spotting: 'Issue Spotting',
  case_doctrine: 'Case Doctrine',
  elements: 'Elements',
  requisites: 'Requisites',
  procedure: 'Procedure',
  jurisdiction: 'Jurisdiction',
  period: 'Prescriptive Period',
  bar_style: 'Bar-Style',
}

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  bar_level: 'Bar Level',
}

export const LEVEL_LABELS: Record<string, string> = {
  pre_law: 'Pre-Law',
  law_school: 'Law School',
  bar_exam: 'Bar Exam',
}
