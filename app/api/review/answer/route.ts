import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { calculateNextReview } from '@/lib/progress'

interface AnswerRequestBody {
  sessionId: string
  questionId: string
  sessionQuestionId: string
  wasCorrect: boolean
  isLast?: boolean
  durationSeconds?: number
  totalCorrect?: number
  totalIncorrect?: number
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: AnswerRequestBody = await request.json()
    const {
      sessionId,
      questionId,
      sessionQuestionId,
      wasCorrect,
      isLast,
      durationSeconds,
      totalCorrect,
      totalIncorrect,
    } = body

    // Verify the session belongs to this user
    const { data: session, error: sessionErr } = await supabase
      .from('review_sessions')
      .select('id, user_id')
      .eq('id', sessionId)
      .single()

    if (sessionErr || !session || session.user_id !== user.id) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Update session_questions record
    await supabase
      .from('session_questions')
      .update({
        answered: true,
        was_correct: wasCorrect,
        answered_at: new Date().toISOString(),
      })
      .eq('id', sessionQuestionId)

    // Get existing progress for this question
    const { data: existingProgress } = await supabase
      .from('user_question_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('question_id', questionId)
      .single()

    const currentEase = existingProgress?.ease_factor ?? 2.5
    const currentInterval = existingProgress?.interval_days ?? 1

    const { newEaseFactor, newIntervalDays, nextReviewAt } = calculateNextReview(
      wasCorrect,
      currentEase,
      currentInterval
    )

    const newStatus = wasCorrect ? 'known' : 'unknown'
    const timesSeen = (existingProgress?.times_seen ?? 0) + 1
    const timesCorrect = (existingProgress?.times_correct ?? 0) + (wasCorrect ? 1 : 0)
    const timesIncorrect = (existingProgress?.times_incorrect ?? 0) + (wasCorrect ? 0 : 1)

    // Upsert progress
    const { error: progressErr } = await supabase
      .from('user_question_progress')
      .upsert(
        {
          user_id: user.id,
          question_id: questionId,
          status: newStatus,
          times_seen: timesSeen,
          times_correct: timesCorrect,
          times_incorrect: timesIncorrect,
          last_reviewed_at: new Date().toISOString(),
          next_review_at: nextReviewAt.toISOString(),
          ease_factor: newEaseFactor,
          interval_days: newIntervalDays,
        },
        {
          onConflict: 'user_id,question_id',
        }
      )

    if (progressErr) {
      return NextResponse.json({ error: progressErr.message }, { status: 500 })
    }

    // Update session counters
    const updateData: Record<string, unknown> = {
      answered: supabase.rpc('increment', { count: 1 }),
    }

    if (isLast) {
      // Mark session complete
      await supabase
        .from('review_sessions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          duration_seconds: durationSeconds ?? null,
          correct: totalCorrect ?? 0,
          incorrect: totalIncorrect ?? 0,
          answered: (totalCorrect ?? 0) + (totalIncorrect ?? 0),
        })
        .eq('id', sessionId)
    } else {
      // Just update counters
      const { data: currentSession } = await supabase
        .from('review_sessions')
        .select('answered, correct, incorrect')
        .eq('id', sessionId)
        .single()

      if (currentSession) {
        await supabase
          .from('review_sessions')
          .update({
            answered: (currentSession.answered ?? 0) + 1,
            correct: (currentSession.correct ?? 0) + (wasCorrect ? 1 : 0),
            incorrect: (currentSession.incorrect ?? 0) + (wasCorrect ? 0 : 1),
          })
          .eq('id', sessionId)
      }
    }

    return NextResponse.json({
      newStatus,
      nextReviewAt: nextReviewAt.toISOString(),
      newEaseFactor,
      newIntervalDays,
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
