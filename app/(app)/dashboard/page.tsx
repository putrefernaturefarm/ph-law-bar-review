import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { BAR_SUBJECTS } from '@/lib/subjects'

export const dynamic = 'force-dynamic'

type QuestionRow = { id: string; level: string; subject: string | null }
type ProgressRow = { status: string; times_correct: number; times_incorrect: number }

async function getStats(userId: string) {
  const supabase = await createClient()

  // Total questions and breakdown by level
  const { data: questionsRaw } = await supabase
    .from('questions')
    .select('id, level, subject')

  const questions = questionsRaw as QuestionRow[] | null

  const total = questions?.length ?? 0
  const byLevel = {
    bar_exam: questions?.filter((q) => q.level === 'bar_exam').length ?? 0,
    law_school: questions?.filter((q) => q.level === 'law_school').length ?? 0,
    pre_law: questions?.filter((q) => q.level === 'pre_law').length ?? 0,
  }

  const bySubject: Record<string, number> = {}
  for (const q of questions ?? []) {
    if (q.subject) {
      bySubject[q.subject] = (bySubject[q.subject] ?? 0) + 1
    }
  }

  // User progress
  const { data: progressRaw } = await supabase
    .from('user_question_progress')
    .select('status, times_correct, times_incorrect')
    .eq('user_id', userId)

  const progress = progressRaw as ProgressRow[] | null

  const reviewed = progress?.length ?? 0
  const mastered = progress?.filter((p: ProgressRow) => p.status === 'known').length ?? 0
  const weak = progress?.filter((p: ProgressRow) => p.status === 'unknown').length ?? 0
  const totalCorrect = progress?.reduce((s: number, p: ProgressRow) => s + (p.times_correct ?? 0), 0) ?? 0
  const totalAnswers =
    (progress?.reduce(
      (s: number, p: ProgressRow) => s + (p.times_correct ?? 0) + (p.times_incorrect ?? 0),
      0
    ) ?? 0)
  const accuracy = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0

  return { total, byLevel, bySubject, reviewed, mastered, weak, accuracy }
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const stats = await getStats(user.id)

  return (
    <div className="px-6 py-8 pb-24 md:pb-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#4a5470' }}>
            Philippine Law
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ color: '#f0f4ff', fontFamily: 'Georgia, serif' }}
          >
            Bar Review System
          </h1>
        </div>
        <Link
          href="/review"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] hover:opacity-90"
          style={{ background: '#d4af37', color: '#080d1a' }}
        >
          Start Review
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Divider */}
      <div className="h-px mb-8" style={{ background: 'rgba(212,175,55,0.08)' }} />

      {/* Question Bank Stats */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#4a5470' }}>
          Question Bank
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard label="Total Questions" value={stats.total} accent />
          <StatCard label="Bar Exam" value={stats.byLevel.bar_exam} />
          <StatCard label="Law School" value={stats.byLevel.law_school} />
        </div>
      </section>

      {/* Progress Stats */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#4a5470' }}>
          Your Progress
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Reviewed" value={stats.reviewed} />
          <StatCard label="Mastered" value={stats.mastered} color="#10b981" />
          <StatCard label="Weak" value={stats.weak} color="#ef4444" />
          <StatCard label="Accuracy" value={`${stats.accuracy}%`} />
        </div>
      </section>

      {/* Subjects Grid */}
      <section>
        <h2 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#4a5470' }}>
          Subjects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BAR_SUBJECTS.map((subject) => {
            const count = stats.bySubject[subject] ?? 0
            return (
              <Link
                key={subject}
                href={`/review?subject=${encodeURIComponent(subject)}`}
                className="group rounded-xl p-4 border transition-all card-hover"
                style={{
                  background: '#0f1629',
                  borderColor: 'rgba(212,175,55,0.1)',
                }}
              >
                <div
                  className="font-semibold text-sm mb-2"
                  style={{ color: '#d4af37', fontFamily: 'Georgia, serif' }}
                >
                  {subject}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#4a5470' }}>
                    {count} question{count !== 1 ? 's' : ''}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: '#4a5470' }}
                    className="group-hover:translate-x-0.5 transition-transform"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function StatCard({
  label,
  value,
  accent = false,
  color,
}: {
  label: string
  value: string | number
  accent?: boolean
  color?: string
}) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{
        background: '#0f1629',
        borderColor: accent ? 'rgba(212,175,55,0.25)' : 'rgba(212,175,55,0.08)',
      }}
    >
      <div
        className="text-2xl font-bold mb-1"
        style={{
          color: color ?? (accent ? '#d4af37' : '#f0f4ff'),
          fontFamily: 'Georgia, serif',
        }}
      >
        {value}
      </div>
      <div className="text-xs" style={{ color: '#4a5470' }}>
        {label}
      </div>
    </div>
  )
}
