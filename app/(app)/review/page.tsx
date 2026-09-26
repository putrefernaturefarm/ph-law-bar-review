'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BAR_SUBJECTS } from '@/lib/subjects'
import type { Difficulty, Level, ReviewMode } from '@/lib/types'

const SESSION_SIZES = [10, 25, 50, 100, 500] as const

type FocusMode = 'random' | 'new' | 'weak' | 'due'
type LevelMode = 'all' | 'bar' | 'law_school' | 'pre_law'

function ReviewSetupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [levelMode, setLevelMode] = useState<LevelMode>('all')
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [allSubjects, setAllSubjects] = useState(true)
  const [difficulty, setDifficulty] = useState<Difficulty | 'any'>('any')
  const [sessionSize, setSessionSize] = useState<number | null>(25)
  const [focus, setFocus] = useState<FocusMode>('random')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Pre-fill from query params (e.g., from dashboard subject click)
  useEffect(() => {
    const subject = searchParams.get('subject')
    if (subject) {
      setSelectedSubjects([subject])
      setAllSubjects(false)
    }
  }, [searchParams])

  function toggleSubject(subject: string) {
    if (allSubjects) {
      setAllSubjects(false)
      setSelectedSubjects([subject])
      return
    }
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    )
  }

  function selectAllSubjects() {
    setAllSubjects(true)
    setSelectedSubjects([])
  }

  async function handleStart() {
    setError(null)
    setLoading(true)

    const modeMap: Record<FocusMode, ReviewMode> = {
      random: 'random',
      new: 'new',
      weak: 'weak',
      due: 'due',
    }

    const levelMap: Record<LevelMode, Level | undefined> = {
      all: undefined,
      bar: 'bar_exam',
      law_school: 'law_school',
      pre_law: 'pre_law',
    }

    const body = {
      mode: modeMap[focus],
      filter_level: levelMap[levelMode],
      filter_subject: !allSubjects && selectedSubjects.length > 0 ? selectedSubjects[0] : undefined,
      filter_difficulty: difficulty !== 'any' ? difficulty : undefined,
      session_limit: sessionSize,
    }

    try {
      const res = await fetch('/api/review/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to start session')
      }

      const { sessionId } = await res.json()
      router.push(`/review/session?id=${sessionId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  const PillBtn = ({
    label,
    active,
    onClick,
  }: {
    label: string
    active: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-xl text-sm font-medium transition-all border"
      style={{
        background: active ? 'rgba(212,175,55,0.12)' : '#0f1629',
        borderColor: active ? '#d4af37' : '#1e2a4a',
        color: active ? '#d4af37' : '#8896b3',
      }}
    >
      {label}
    </button>
  )

  return (
    <div className="px-6 py-8 pb-28 md:pb-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#4a5470' }}>
          Configure
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ color: '#f0f4ff', fontFamily: 'Georgia, serif' }}
        >
          Start a Review Session
        </h1>
      </div>

      {/* Section 1: Level / Mode */}
      <section className="mb-8">
        <SectionLabel number={1} title="Level" />
        <div className="flex flex-wrap gap-2">
          {(['all', 'bar', 'law_school', 'pre_law'] as LevelMode[]).map((m) => {
            const labels: Record<LevelMode, string> = {
              all: 'All Levels',
              bar: 'Bar Exam',
              law_school: 'Law School',
              pre_law: 'Pre-Law',
            }
            return (
              <PillBtn
                key={m}
                label={labels[m]}
                active={levelMode === m}
                onClick={() => setLevelMode(m)}
              />
            )
          })}
        </div>
      </section>

      {/* Section 2: Subject */}
      <section className="mb-8">
        <SectionLabel number={2} title="Subject (optional)" />
        <div className="flex flex-wrap gap-2">
          <PillBtn label="All Subjects" active={allSubjects} onClick={selectAllSubjects} />
          {BAR_SUBJECTS.map((sub) => (
            <PillBtn
              key={sub}
              label={sub}
              active={!allSubjects && selectedSubjects.includes(sub)}
              onClick={() => toggleSubject(sub)}
            />
          ))}
        </div>
      </section>

      {/* Section 3: Difficulty */}
      <section className="mb-8">
        <SectionLabel number={3} title="Difficulty" />
        <div className="flex flex-wrap gap-2">
          {(
            [
              { v: 'any', l: 'Any' },
              { v: 'easy', l: 'Easy' },
              { v: 'medium', l: 'Medium' },
              { v: 'hard', l: 'Hard' },
              { v: 'bar_level', l: 'Bar Level' },
            ] as { v: Difficulty | 'any'; l: string }[]
          ).map(({ v, l }) => (
            <PillBtn
              key={v}
              label={l}
              active={difficulty === v}
              onClick={() => setDifficulty(v)}
            />
          ))}
        </div>
      </section>

      {/* Section 4: Session Size */}
      <section className="mb-8">
        <SectionLabel number={4} title="Session Size" />
        <div className="flex flex-wrap gap-2">
          {SESSION_SIZES.map((s) => (
            <PillBtn
              key={s}
              label={String(s)}
              active={sessionSize === s}
              onClick={() => setSessionSize(s)}
            />
          ))}
          <PillBtn
            label="All"
            active={sessionSize === null}
            onClick={() => setSessionSize(null)}
          />
        </div>
      </section>

      {/* Section 5: Focus */}
      <section className="mb-10">
        <SectionLabel number={5} title="Focus" />
        <div className="flex flex-wrap gap-2">
          {(
            [
              { v: 'random', l: 'Random Mix' },
              { v: 'new', l: 'New Questions' },
              { v: 'weak', l: 'Weak Questions' },
              { v: 'due', l: 'Due for Review' },
            ] as { v: FocusMode; l: string }[]
          ).map(({ v, l }) => (
            <PillBtn
              key={v}
              label={l}
              active={focus === v}
              onClick={() => setFocus(v)}
            />
          ))}
        </div>
      </section>

      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-xl border text-sm"
          style={{
            background: 'rgba(239,68,68,0.08)',
            borderColor: 'rgba(239,68,68,0.25)',
            color: '#f87171',
          }}
        >
          {error}
        </div>
      )}

      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full py-4 rounded-2xl font-bold text-lg tracking-wide transition-all active:scale-[0.98] disabled:opacity-60"
        style={{ background: '#d4af37', color: '#080d1a' }}
      >
        {loading ? 'Starting...' : 'START REVIEW →'}
      </button>
    </div>
  )
}

function SectionLabel({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37' }}
      >
        {number}
      </span>
      <span className="text-sm font-semibold" style={{ color: '#8896b3' }}>
        {title}
      </span>
    </div>
  )
}

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div style={{ color: '#4a5470' }}>Loading...</div>
      </div>
    }>
      <ReviewSetupContent />
    </Suspense>
  )
}
