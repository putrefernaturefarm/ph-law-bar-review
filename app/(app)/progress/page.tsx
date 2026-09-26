import { createClient } from '@/lib/supabase/server'
import { BAR_SUBJECTS } from '@/lib/subjects'
import { formatDistanceToNow } from 'date-fns'

export const dynamic = 'force-dynamic'

export default async function ProgressPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  // Progress data
  const { data: progress } = await supabase
    .from('user_question_progress')
    .select('question_id, status, times_correct, times_incorrect, last_reviewed_at')
    .eq('user_id', user.id)

  const totalReviewed = progress?.length ?? 0
  const mastered = progress?.filter((p) => p.status === 'known').length ?? 0
  const weak = progress?.filter((p) => p.status === 'unknown').length ?? 0
  const reviewing = progress?.filter((p) => p.status === 'reviewing').length ?? 0
  const totalCorrect = progress?.reduce((s, p) => s + (p.times_correct ?? 0), 0) ?? 0
  const totalAttempts =
    progress?.reduce(
      (s, p) => s + (p.times_correct ?? 0) + (p.times_incorrect ?? 0),
      0
    ) ?? 0
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  // Questions for subject mapping
  const { data: questions } = await supabase
    .from('questions')
    .select('id, subject')

  const questionSubjectMap: Record<string, string> = {}
  const subjectTotal: Record<string, number> = {}
  for (const q of questions ?? []) {
    if (q.subject) {
      questionSubjectMap[q.id] = q.subject
      subjectTotal[q.subject] = (subjectTotal[q.subject] ?? 0) + 1
    }
  }

  // Subject breakdown for user progress
  const subjectMastered: Record<string, number> = {}
  const subjectWeak: Record<string, number> = {}
  for (const p of progress ?? []) {
    const sub = questionSubjectMap[p.question_id]
    if (!sub) continue
    if (p.status === 'known') {
      subjectMastered[sub] = (subjectMastered[sub] ?? 0) + 1
    } else if (p.status === 'unknown') {
      subjectWeak[sub] = (subjectWeak[sub] ?? 0) + 1
    }
  }

  // Recent sessions
  const { data: sessions } = await supabase
    .from('review_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  // Streak calculation: count consecutive days with a session
  const sessionDays = new Set(
    (sessions ?? []).map((s: { created_at: string }) =>
      new Date(s.created_at).toISOString().split('T')[0]
    )
  )

  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dayStr = d.toISOString().split('T')[0]
    if (sessionDays.has(dayStr)) {
      streak++
    } else {
      break
    }
  }

  return (
    <div className="px-6 py-8 pb-24 md:pb-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-dim)' }}>
          Your Journey
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}
        >
          Progress
        </h1>
      </div>

      {/* Overview Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard value={`${accuracy}%`} label="Accuracy" accent />
          <StatCard value={totalReviewed} label="Reviewed" />
          <StatCard value={mastered} label="Mastered" color="#10b981" />
          <StatCard value={streak} label="Day Streak" color="var(--gold)" />
        </div>
      </section>

      {/* Status breakdown */}
      <section className="mb-8">
        <h2
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: 'var(--text-dim)' }}
        >
          Question Status
        </h2>
        <div
          className="rounded-xl border p-5"
          style={{ background: 'var(--surface)', borderColor: 'var(--gold-subtle)' }}
        >
          <StatusRow label="Mastered" value={mastered} total={totalReviewed} color="#10b981" />
          <StatusRow label="Needs Review" value={weak} total={totalReviewed} color="#ef4444" />
          <StatusRow label="In Progress" value={reviewing} total={totalReviewed} color="#fbbf24" />
        </div>
      </section>

      {/* Subject Breakdown */}
      <section className="mb-8">
        <h2
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: 'var(--text-dim)' }}
        >
          By Subject
        </h2>
        <div className="space-y-2">
          {BAR_SUBJECTS.map((subject) => {
            const total = subjectTotal[subject] ?? 0
            const mastered_ = subjectMastered[subject] ?? 0
            const weak_ = subjectWeak[subject] ?? 0
            if (total === 0) return null
            const pct = Math.round((mastered_ / total) * 100)

            return (
              <div
                key={subject}
                className="rounded-xl p-4 border"
                style={{ background: 'var(--surface)', borderColor: 'var(--gold-subtle)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                    {subject}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
                    {mastered_} / {total}
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: 'var(--border)' }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background:
                        pct > 66
                          ? '#10b981'
                          : pct > 33
                          ? 'var(--gold-bright)'
                          : 'var(--gold)',
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
                  <span>{pct}% mastered</span>
                  {weak_ > 0 && (
                    <span style={{ color: '#ef4444' }}>{weak_} weak</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Recent Sessions */}
      <section>
        <h2
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: 'var(--text-dim)' }}
        >
          Recent Sessions
        </h2>
        {sessions && sessions.length > 0 ? (
          <div className="space-y-2">
            {sessions.map((s: {
              id: string
              mode: string
              filter_subject?: string
              total_questions: number
              correct: number
              incorrect: number
              status: string
              created_at: string
              duration_seconds?: number
            }) => {
              const answered = s.correct + s.incorrect
              const acc = answered > 0 ? Math.round((s.correct / answered) * 100) : 0
              return (
                <div
                  key={s.id}
                  className="rounded-xl p-4 border flex items-center justify-between"
                  style={{ background: 'var(--surface)', borderColor: 'var(--gold-subtle)' }}
                >
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                      {s.filter_subject ?? 'All Subjects'}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>
                      {formatDistanceToNow(new Date(s.created_at), { addSuffix: true })} ·{' '}
                      {s.total_questions} questions
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-lg font-bold"
                      style={{
                        color:
                          acc >= 80 ? '#10b981' : acc >= 60 ? '#fbbf24' : '#ef4444',
                        fontFamily: 'Georgia, serif',
                      }}
                    >
                      {acc}%
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
                      {s.correct} / {answered}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div
            className="rounded-xl border p-8 text-center"
            style={{ background: 'var(--surface)', borderColor: 'var(--gold-subtle)' }}
          >
            <div className="text-2xl mb-3">📚</div>
            <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
              No sessions yet. Start your first review to track progress.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

function StatCard({
  value,
  label,
  accent = false,
  color,
}: {
  value: string | number
  label: string
  accent?: boolean
  color?: string
}) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{
        background: 'var(--surface)',
        borderColor: accent ? 'var(--gold-subtle)' : 'var(--gold-subtle)',
      }}
    >
      <div
        className="text-2xl font-bold mb-1"
        style={{
          color: color ?? (accent ? 'var(--gold)' : 'var(--text)'),
          fontFamily: 'Georgia, serif',
        }}
      >
        {value}
      </div>
      <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
        {label}
      </div>
    </div>
  )
}

function StatusRow({
  label,
  value,
  total,
  color,
}: {
  label: string
  value: number
  total: number
  color: string
}) {
  const pct = total > 0 ? (value / total) * 100 : 0
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-sm mb-1.5">
        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ color }}>
          {value}
          <span style={{ color: 'var(--text-dim)' }}> / {total}</span>
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}
