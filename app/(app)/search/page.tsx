'use client'

import { useState, useCallback, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Question } from '@/lib/types'
import { BAR_SUBJECTS, DIFFICULTIES, LEVELS, QUESTION_TYPE_LABELS, DIFFICULTY_LABELS, LEVEL_LABELS } from '@/lib/subjects'

function SearchContent() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('')
  const [results, setResults] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleSearch = useCallback(async () => {
    setLoading(true)
    setSearched(true)
    setExpandedId(null)

    const supabase = createClient()
    let q = supabase.from('questions').select('*').order('created_at', { ascending: false })

    if (query.trim()) {
      q = q.ilike('content', `%${query.trim()}%`)
    }
    if (filterSubject) {
      q = q.eq('subject', filterSubject)
    }
    if (filterLevel) {
      q = q.eq('level', filterLevel)
    }
    if (filterDifficulty) {
      q = q.eq('difficulty', filterDifficulty)
    }

    q = q.limit(50)

    const { data } = await q
    setResults((data as Question[]) ?? [])
    setLoading(false)
  }, [query, filterSubject, filterLevel, filterDifficulty])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSearch()
  }

  async function startSingleQuestion(questionId: string) {
    try {
      const res = await fetch('/api/review/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'random',
          session_limit: 1,
        }),
      })

      if (!res.ok) return

      // We'll create a session with just this question
      // Actually, we create a session with specific question
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: sessionData } = await supabase
        .from('review_sessions')
        .insert({
          user_id: user.id,
          mode: 'random',
          total_questions: 1,
          status: 'active',
        })
        .select('id')
        .single()

      if (!sessionData) return

      await supabase.from('session_questions').insert({
        session_id: sessionData.id,
        question_id: questionId,
        position: 0,
        answered: false,
      })

      router.push(`/review/session?id=${sessionData.id}`)
    } catch {
      // Fail silently
    }
  }

  const selectStyle: React.CSSProperties = {
    background: 'var(--surface)',
    borderColor: 'var(--border)',
    color: 'var(--text-muted)',
  }

  return (
    <div className="px-6 py-8 pb-24 md:pb-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-dim)' }}>
          Find Questions
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}
        >
          Search
        </h1>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ color: 'var(--text-dim)' }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by keyword, article, doctrine..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none text-sm transition-all"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--gold)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="rounded-xl px-3 py-2.5 text-sm border outline-none"
          style={selectStyle}
        >
          <option value="">All Subjects</option>
          {BAR_SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="rounded-xl px-3 py-2.5 text-sm border outline-none"
          style={selectStyle}
        >
          <option value="">All Levels</option>
          {LEVELS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>

        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="rounded-xl px-3 py-2.5 text-sm border outline-none"
          style={selectStyle}
        >
          <option value="">Any Difficulty</option>
          {DIFFICULTIES.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className="w-full py-3 rounded-xl font-semibold text-sm tracking-wide transition-all active:scale-[0.98] disabled:opacity-60 mb-8"
        style={{ background: 'var(--gold)', color: 'var(--bg)' }}
      >
        {loading ? 'Searching...' : 'Search Questions'}
      </button>

      {/* Results */}
      {loading && (
        <div className="text-center py-8">
          <div className="text-sm" style={{ color: 'var(--text-dim)' }}>
            Searching...
          </div>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div
          className="rounded-xl border p-8 text-center"
          style={{ background: 'var(--surface)', borderColor: 'var(--gold-subtle)' }}
        >
          <div className="text-2xl mb-3">🔍</div>
          <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
            No questions found. Try different keywords or filters.
          </p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--text-dim)' }}
          >
            {results.length} result{results.length !== 1 ? 's' : ''}
          </div>
          <div className="space-y-2">
            {results.map((q) => {
              const isExpanded = expandedId === q.id
              const diffColor =
                q.difficulty === 'easy'
                  ? '#34d399'
                  : q.difficulty === 'medium'
                  ? '#fbbf24'
                  : q.difficulty === 'hard'
                  ? '#fb923c'
                  : '#f87171'

              return (
                <div
                  key={q.id}
                  className="rounded-xl border overflow-hidden"
                  style={{
                    background: 'var(--surface)',
                    borderColor: isExpanded
                      ? 'var(--gold-subtle)'
                      : 'var(--gold-subtle)',
                  }}
                >
                  {/* Question header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="w-full text-left p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full border font-medium"
                            style={{
                              color: diffColor,
                              borderColor: `${diffColor}33`,
                              background: `${diffColor}14`,
                            }}
                          >
                            {DIFFICULTY_LABELS[q.difficulty] ?? q.difficulty}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full border font-medium"
                            style={{
                              color: 'var(--text-muted)',
                              borderColor: 'var(--border)',
                              background: 'var(--surface2)',
                            }}
                          >
                            {QUESTION_TYPE_LABELS[q.question_type] ?? q.question_type}
                          </span>
                          {q.subject && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full border font-medium"
                              style={{
                                color: 'var(--gold)',
                                borderColor: 'var(--gold-subtle)',
                                background: 'var(--gold-subtle)',
                              }}
                            >
                              {q.subject}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}
                          style={{ color: 'var(--text)' }}
                        >
                          {q.content}
                        </p>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className={`transition-transform flex-shrink-0 mt-1 ${isExpanded ? 'rotate-180' : ''}`}
                        style={{ color: 'var(--text-dim)' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded answer */}
                  {isExpanded && (
                    <div
                      className="px-4 pb-4 border-t"
                      style={{ borderColor: 'var(--gold-subtle)' }}
                    >
                      <div className="pt-4">
                        <div
                          className="text-xs font-semibold tracking-widest uppercase mb-2"
                          style={{ color: 'var(--gold)' }}
                        >
                          Answer
                        </div>
                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{ color: '#e8edf8', fontFamily: 'Georgia, serif' }}
                        >
                          {q.answer}
                        </p>
                        {q.source_citation && (
                          <div
                            className="text-xs px-3 py-2 rounded-lg mb-4 font-mono"
                            style={{ background: 'var(--surface2)', color: 'var(--text-dim)' }}
                          >
                            {q.source_citation}
                          </div>
                        )}
                        <button
                          onClick={() => startSingleQuestion(q.id)}
                          className="text-xs px-4 py-2 rounded-lg font-semibold transition-all"
                          style={{ background: 'var(--gold-subtle)', color: 'var(--gold)', border: '1px solid var(--gold-subtle)' }}
                        >
                          Practice This Question →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-sm" style={{ color: 'var(--text-dim)' }}>
            Loading...
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
