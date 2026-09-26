'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Question, ReviewSession, SessionQuestion } from '@/lib/types'
import { QUESTION_TYPE_LABELS, DIFFICULTY_LABELS } from '@/lib/subjects'

interface QueueItem {
  sessionQuestionId: string
  questionId: string
  position: number
  question: Question
}

function ReviewSessionContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('id')

  const [session, setSession] = useState<ReviewSession | null>(null)
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startTime] = useState(new Date())
  const [submitting, setSubmitting] = useState(false)

  const currentItem = queue[currentIndex] ?? null
  const totalQuestions = queue.length
  const progress = totalQuestions > 0 ? ((currentIndex) / totalQuestions) * 100 : 0

  // Load session and questions
  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided.')
      setLoading(false)
      return
    }

    async function loadSession() {
      const supabase = createClient()

      const { data: sessionData, error: sessionErr } = await supabase
        .from('review_sessions')
        .select('*')
        .eq('id', sessionId)
        .single()

      if (sessionErr || !sessionData) {
        setError('Session not found.')
        setLoading(false)
        return
      }

      setSession(sessionData as ReviewSession)

      const { data: sqData, error: sqErr } = await supabase
        .from('session_questions')
        .select('id, question_id, position, answered')
        .eq('session_id', sessionId)
        .eq('answered', false)
        .order('position', { ascending: true })

      if (sqErr) {
        setError('Failed to load questions.')
        setLoading(false)
        return
      }

      if (!sqData || sqData.length === 0) {
        setSessionComplete(true)
        setLoading(false)
        return
      }

      // Fetch all question details
      const questionIds = sqData.map((sq: { question_id: string }) => sq.question_id)
      const { data: questionsData } = await supabase
        .from('questions')
        .select('*')
        .in('id', questionIds)

      const questionsMap: Record<string, Question> = {}
      for (const q of questionsData ?? []) {
        questionsMap[q.id] = q as Question
      }

      const items: QueueItem[] = sqData
        .map((sq: { id: string; question_id: string; position: number; answered: boolean }) => ({
          sessionQuestionId: sq.id,
          questionId: sq.question_id,
          position: sq.position,
          question: questionsMap[sq.question_id],
        }))
        .filter((item: QueueItem) => item.question != null)

      setQueue(items)
      setLoading(false)
    }

    loadSession()
  }, [sessionId])

  const handleReveal = useCallback(() => {
    if (!isRevealed && !submitting) {
      setIsRevealed(true)
    }
  }, [isRevealed, submitting])

  const handleAnswer = useCallback(
    async (wasCorrect: boolean) => {
      if (!currentItem || !sessionId || submitting) return
      setSubmitting(true)

      if (wasCorrect) {
        setCorrect((c) => c + 1)
      } else {
        setIncorrect((i) => i + 1)
      }

      try {
        await fetch('/api/review/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            questionId: currentItem.questionId,
            sessionQuestionId: currentItem.sessionQuestionId,
            wasCorrect,
          }),
        })
      } catch {
        // Non-fatal: continue even if the API call fails
      }

      const nextIndex = currentIndex + 1
      if (nextIndex >= queue.length) {
        // Session complete — update session
        const durationSeconds = Math.round((new Date().getTime() - startTime.getTime()) / 1000)
        await fetch('/api/review/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            questionId: currentItem.questionId,
            sessionQuestionId: currentItem.sessionQuestionId,
            wasCorrect,
            isLast: true,
            durationSeconds,
            totalCorrect: correct + (wasCorrect ? 1 : 0),
            totalIncorrect: incorrect + (wasCorrect ? 0 : 1),
          }),
        })
        setSessionComplete(true)
      } else {
        setCurrentIndex(nextIndex)
        setIsRevealed(false)
      }

      setSubmitting(false)
    },
    [currentItem, sessionId, submitting, currentIndex, queue.length, startTime, correct, incorrect]
  )

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        if (!isRevealed) {
          handleReveal()
        }
      }
      if (isRevealed) {
        if (e.key === 'y' || e.key === 'Y') {
          handleAnswer(true)
        }
        if (e.key === 'n' || e.key === 'N') {
          handleAnswer(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRevealed, handleReveal, handleAnswer])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-2xl mb-3">⚖️</div>
          <div className="text-sm" style={{ color: 'var(--text-dim)' }}>
            Loading questions...
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-6">
          <div className="text-2xl mb-3">⚠️</div>
          <p className="text-sm mb-4" style={{ color: '#f87171' }}>
            {error}
          </p>
          <button
            onClick={() => router.push('/review')}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--gold)', color: 'var(--bg)' }}
          >
            Back to Setup
          </button>
        </div>
      </div>
    )
  }

  if (sessionComplete) {
    const totalAnswered = correct + incorrect
    const accuracy = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 0
    const duration = Math.round((new Date().getTime() - startTime.getTime()) / 1000)
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60

    return (
      <div className="flex items-center justify-center min-h-[80vh] px-6">
        <div
          className="w-full max-w-md rounded-2xl p-8 border text-center"
          style={{ background: 'var(--surface)', borderColor: 'var(--gold-subtle)' }}
        >
          <div className="text-4xl mb-4">🎓</div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif' }}
          >
            Session Complete
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            {session?.filter_subject ?? 'All Subjects'}
          </p>

          {/* Score */}
          <div
            className="text-5xl font-bold mb-1"
            style={{ color: 'var(--gold-bright)', fontFamily: 'Georgia, serif' }}
          >
            {accuracy}%
          </div>
          <div className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            Accuracy
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div
              className="rounded-xl p-3 border"
              style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}
            >
              <div className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                {totalAnswered}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
                Answered
              </div>
            </div>
            <div
              className="rounded-xl p-3 border"
              style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.2)' }}
            >
              <div className="text-lg font-bold" style={{ color: '#10b981' }}>
                {correct}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
                Known
              </div>
            </div>
            <div
              className="rounded-xl p-3 border"
              style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)' }}
            >
              <div className="text-lg font-bold" style={{ color: '#ef4444' }}>
                {incorrect}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
                Review
              </div>
            </div>
          </div>

          <div className="text-xs mb-8" style={{ color: 'var(--text-dim)' }}>
            Time: {minutes}m {seconds}s
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push('/review')}
              className="flex-1 py-3 rounded-xl text-sm font-semibold border transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            >
              New Session
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'var(--gold)', color: 'var(--bg)' }}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentItem) {
    return null
  }

  const q = currentItem.question
  const diffVariant =
    q.difficulty === 'easy'
      ? { label: 'Easy', color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' }
      : q.difficulty === 'medium'
      ? { label: 'Medium', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' }
      : q.difficulty === 'hard'
      ? { label: 'Hard', color: '#fb923c', bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.2)' }
      : { label: 'Bar Level', color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 pb-24 md:pb-6 max-w-2xl mx-auto w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-medium" style={{ color: 'var(--text-dim)' }}>
          {q.subject ?? 'General'}
          {q.topic ? ` · ${q.topic}` : ''}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
            {currentIndex + 1}{' '}
            <span style={{ color: 'var(--text-dim)' }}>/ {totalQuestions}</span>
          </span>
          <button
            onClick={() => router.push('/review')}
            className="text-xs px-3 py-1.5 rounded-lg border transition-all"
            style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}
          >
            Exit
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="h-1 rounded-full mb-6 overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <div
          className="h-full rounded-full progress-bar"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-bright))',
          }}
        />
      </div>

      {/* Question Card */}
      <div
        className="flex-1 flex flex-col rounded-2xl border p-6 md:p-8"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--gold-subtle)',
        }}
      >
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span
            className="px-2 py-0.5 text-xs font-medium rounded-full border"
            style={{
              color: diffVariant.color,
              background: diffVariant.bg,
              borderColor: diffVariant.border,
            }}
          >
            {diffVariant.label}
          </span>
          <span
            className="px-2 py-0.5 text-xs font-medium rounded-full border"
            style={{
              color: 'var(--text-muted)',
              background: 'var(--surface2)',
              borderColor: 'var(--border)',
            }}
          >
            {QUESTION_TYPE_LABELS[q.question_type] ?? q.question_type}
          </span>
          {q.is_verified && (
            <span
              className="px-2 py-0.5 text-xs font-medium rounded-full border"
              style={{
                color: 'var(--gold)',
                background: 'var(--gold-subtle)',
                borderColor: 'var(--gold-subtle)',
              }}
            >
              ✓ Verified
            </span>
          )}
        </div>

        {/* Question */}
        <div className="flex-1">
          <p
            className="text-lg md:text-xl leading-relaxed mb-6"
            style={{ color: 'var(--text)', fontFamily: 'Georgia, serif' }}
          >
            {q.content}
          </p>

          {/* Show Answer Button */}
          {!isRevealed && (
            <button
              onClick={handleReveal}
              className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all active:scale-[0.98] border"
              style={{
                background: 'var(--gold-subtle)',
                borderColor: 'var(--gold-subtle)',
                color: 'var(--gold)',
              }}
            >
              Show Answer{' '}
              <span className="opacity-50 text-xs ml-2">(Space)</span>
            </button>
          )}
        </div>

        {/* Answer Section */}
        {isRevealed && (
          <div className="answer-reveal">
            <div
              className="h-px my-5"
              style={{ background: 'var(--gold-subtle)' }}
            />

            {/* Answer */}
            <div className="mb-4">
              <div
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: 'var(--gold)' }}
              >
                Answer
              </div>
              <p
                className="text-base leading-relaxed"
                style={{ color: '#e8edf8', fontFamily: 'Georgia, serif' }}
              >
                {q.answer}
              </p>
            </div>

            {/* Explanation */}
            {q.explanation && (
              <div className="mb-4">
                <div
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: 'var(--text-dim)' }}
                >
                  Explanation
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {q.explanation}
                </p>
              </div>
            )}

            {/* Source */}
            {q.source_citation && (
              <div
                className="px-3 py-2 rounded-lg text-xs mb-5"
                style={{
                  background: 'var(--surface2)',
                  color: 'var(--text-dim)',
                  fontFamily: 'monospace',
                }}
              >
                {q.source_citation}
              </div>
            )}

            {/* Know / Don't Know buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAnswer(false)}
                disabled={submitting}
                className="py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.97] disabled:opacity-50"
                style={{ background: '#dc2626', color: '#fff' }}
              >
                ✕ Don&apos;t Know
                <span className="block text-xs font-normal opacity-60 mt-0.5">
                  Press N
                </span>
              </button>
              <button
                onClick={() => handleAnswer(true)}
                disabled={submitting}
                className="py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.97] disabled:opacity-50"
                style={{ background: '#059669', color: '#fff' }}
              >
                ✓ I Know
                <span className="block text-xs font-normal opacity-60 mt-0.5">
                  Press Y
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard hint */}
      {!isRevealed && (
        <p className="text-center text-xs mt-3" style={{ color: 'var(--text-dim)' }}>
          Press{' '}
          <kbd
            className="px-1.5 py-0.5 rounded text-xs"
            style={{ background: 'var(--surface2)', color: 'var(--text-muted)' }}
          >
            Space
          </kbd>{' '}
          to reveal answer
        </p>
      )}
    </div>
  )
}

export default function ReviewSessionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-2xl mb-3">⚖️</div>
            <div className="text-sm" style={{ color: 'var(--text-dim)' }}>
              Loading...
            </div>
          </div>
        </div>
      }
    >
      <ReviewSessionContent />
    </Suspense>
  )
}
