'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BAR_SUBJECTS } from '@/lib/subjects'
import type { Question } from '@/lib/types'

const DIFF: Record<string, { color: string; bg: string; border: string; label: string }> = {
  easy:      { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.2)',  label: 'Easy' },
  medium:    { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.2)',  label: 'Medium' },
  hard:      { color: '#fb923c', bg: 'rgba(251,146,60,0.1)',  border: 'rgba(251,146,60,0.2)',  label: 'Hard' },
  bar_level: { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)', label: 'Bar Level' },
}

function QuestionCard({ q }: { q: Question }) {
  const [open, setOpen] = useState(false)
  const d = DIFF[q.difficulty] ?? DIFF.medium

  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all"
      style={{
        background: 'var(--surface)',
        borderColor: open ? 'var(--gold-subtle)' : 'var(--border)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start gap-3"
      >
        <span
          className="shrink-0 w-2 h-2 rounded-full mt-2"
          style={{ background: d.color }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}>
            {q.content}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {q.topic && (
              <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{q.topic}</span>
            )}
            <span
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{ color: d.color, background: d.bg, borderColor: d.border }}
            >
              {d.label}
            </span>
          </div>
        </div>
        <svg
          width="16" height="16" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2}
          className="shrink-0 mt-1.5 transition-transform"
          style={{
            color: 'var(--text-dim)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="h-px mb-4" style={{ background: 'var(--gold-subtle)' }} />

          <div className="mb-4">
            <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
              Answer
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}>
              {q.answer}
            </p>
          </div>

          {q.explanation && (
            <div className="mb-4">
              <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--text-dim)' }}>
                Explanation
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {q.explanation}
              </p>
            </div>
          )}

          {q.source_citation && (
            <div
              className="px-3 py-2 rounded-lg text-xs font-mono"
              style={{ background: 'var(--surface2)', color: 'var(--text-dim)' }}
            >
              {q.source_citation}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function LibraryPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSubject, setActiveSubject] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('questions')
        .select('*')
        .order('subject', { ascending: true })
        .order('topic', { ascending: true })
      setQuestions((data as Question[]) ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const subjects = ['All', ...BAR_SUBJECTS]

  const filtered = questions.filter((q) => {
    const matchSubject = activeSubject === 'All' || q.subject === activeSubject
    const matchSearch =
      !search ||
      q.content.toLowerCase().includes(search.toLowerCase()) ||
      q.answer.toLowerCase().includes(search.toLowerCase()) ||
      (q.topic ?? '').toLowerCase().includes(search.toLowerCase())
    return matchSubject && matchSearch
  })

  const grouped: Record<string, Question[]> = {}
  for (const q of filtered) {
    const key = q.subject ?? 'General'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(q)
  }

  const subjectCount = (s: string) =>
    s === 'All' ? questions.length : questions.filter((q) => q.subject === s).length

  return (
    <div className="px-4 py-8 pb-28 md:pb-10 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-dim)' }}>
          Reading Mode
        </div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}
        >
          Law Library
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Browse all questions and answers by subject. Click any question to read the answer.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          width="15" height="15" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2}
          style={{ color: 'var(--text-dim)' }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search questions, answers, topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none focus:ring-0"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-dim)' }}
          >
            ×
          </button>
        )}
      </div>

      {/* Subject Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth: 'none' }}>
        {subjects.map((s) => {
          const count = subjectCount(s)
          const active = activeSubject === s
          return (
            <button
              key={s}
              onClick={() => setActiveSubject(s)}
              className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
              style={{
                background: active ? 'var(--gold-subtle)' : 'var(--surface)',
                borderColor: active ? 'var(--gold)' : 'var(--border)',
                color: active ? 'var(--gold)' : 'var(--text-muted)',
              }}
            >
              {s}{' '}
              <span style={{ opacity: 0.55 }}>({count})</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20" style={{ color: 'var(--text-dim)' }}>
          Loading library...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-3xl mb-3">📚</div>
          <p style={{ color: 'var(--text-dim)' }}>No questions found.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([subject, qs]) => (
            <section key={subject}>
              <div className="flex items-center gap-3 mb-3">
                <h2
                  className="text-base font-bold"
                  style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif' }}
                >
                  {subject}
                </h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--gold-subtle)', color: 'var(--gold)' }}
                >
                  {qs.length}
                </span>
              </div>
              <div className="space-y-2">
                {qs.map((q) => (
                  <QuestionCard key={q.id} q={q} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
