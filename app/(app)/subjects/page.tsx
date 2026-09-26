import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { BAR_SUBJECTS } from '@/lib/subjects'

export const dynamic = 'force-dynamic'

export default async function SubjectsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch question counts per subject
  const { data: questions } = await supabase
    .from('questions')
    .select('id, subject, difficulty, level')

  const bySubject: Record<
    string,
    { total: number; easy: number; medium: number; hard: number; bar_level: number }
  > = {}

  for (const q of questions ?? []) {
    if (!q.subject) continue
    if (!bySubject[q.subject]) {
      bySubject[q.subject] = { total: 0, easy: 0, medium: 0, hard: 0, bar_level: 0 }
    }
    bySubject[q.subject].total++
    if (q.difficulty in bySubject[q.subject]) {
      bySubject[q.subject][q.difficulty as 'easy' | 'medium' | 'hard' | 'bar_level']++
    }
  }

  // Fetch user progress per subject
  const { data: progress } = user
    ? await supabase
        .from('user_question_progress')
        .select('question_id, status')
        .eq('user_id', user.id)
    : { data: [] }

  // Map question_id -> subject
  const questionSubjectMap: Record<string, string> = {}
  for (const q of questions ?? []) {
    if (q.subject) questionSubjectMap[q.id] = q.subject
  }

  const masteredBySubject: Record<string, number> = {}
  for (const p of progress ?? []) {
    if (p.status === 'known') {
      const sub = questionSubjectMap[p.question_id]
      if (sub) {
        masteredBySubject[sub] = (masteredBySubject[sub] ?? 0) + 1
      }
    }
  }

  return (
    <div className="px-6 py-8 pb-24 md:pb-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#4a5470' }}>
          Bar Exam
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ color: '#f0f4ff', fontFamily: 'Georgia, serif' }}
        >
          Subjects
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BAR_SUBJECTS.map((subject) => {
          const stats = bySubject[subject] ?? {
            total: 0,
            easy: 0,
            medium: 0,
            hard: 0,
            bar_level: 0,
          }
          const mastered = masteredBySubject[subject] ?? 0
          const masteryPct =
            stats.total > 0 ? Math.round((mastered / stats.total) * 100) : 0

          return (
            <Link
              key={subject}
              href={`/review?subject=${encodeURIComponent(subject)}`}
              className="group rounded-2xl p-5 border transition-all card-hover"
              style={{
                background: '#0f1629',
                borderColor: 'rgba(212,175,55,0.1)',
              }}
            >
              {/* Subject name */}
              <div className="flex items-start justify-between mb-3">
                <h2
                  className="font-semibold text-base"
                  style={{ color: '#d4af37', fontFamily: 'Georgia, serif' }}
                >
                  {subject}
                </h2>
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ color: '#4a5470', flexShrink: 0 }}
                  className="group-hover:translate-x-0.5 transition-transform mt-0.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold" style={{ color: '#f0f4ff' }}>
                  {stats.total}
                </span>
                <span className="text-xs" style={{ color: '#4a5470' }}>
                  questions
                </span>
                {mastered > 0 && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full border ml-auto"
                    style={{
                      color: '#10b981',
                      background: 'rgba(16,185,129,0.1)',
                      borderColor: 'rgba(16,185,129,0.2)',
                    }}
                  >
                    {mastered} mastered
                  </span>
                )}
              </div>

              {/* Mastery progress bar */}
              {stats.total > 0 && (
                <div>
                  <div
                    className="h-1.5 rounded-full mb-2 overflow-hidden"
                    style={{ background: '#1e2a4a' }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${masteryPct}%`,
                        background: masteryPct > 66
                          ? '#10b981'
                          : masteryPct > 33
                          ? '#f0c040'
                          : '#d4af37',
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs" style={{ color: '#4a5470' }}>
                    <span>Mastery</span>
                    <span>{masteryPct}%</span>
                  </div>
                </div>
              )}

              {/* Difficulty breakdown */}
              {stats.total > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {stats.easy > 0 && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        color: '#34d399',
                        borderColor: 'rgba(52,211,153,0.2)',
                        background: 'rgba(52,211,153,0.08)',
                      }}
                    >
                      {stats.easy} easy
                    </span>
                  )}
                  {stats.medium > 0 && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        color: '#fbbf24',
                        borderColor: 'rgba(251,191,36,0.2)',
                        background: 'rgba(251,191,36,0.08)',
                      }}
                    >
                      {stats.medium} med
                    </span>
                  )}
                  {stats.hard > 0 && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        color: '#fb923c',
                        borderColor: 'rgba(251,146,60,0.2)',
                        background: 'rgba(251,146,60,0.08)',
                      }}
                    >
                      {stats.hard} hard
                    </span>
                  )}
                  {stats.bar_level > 0 && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        color: '#f87171',
                        borderColor: 'rgba(248,113,113,0.2)',
                        background: 'rgba(248,113,113,0.08)',
                      }}
                    >
                      {stats.bar_level} bar
                    </span>
                  )}
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
