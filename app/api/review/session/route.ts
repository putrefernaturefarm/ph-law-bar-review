import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Difficulty, Level, ReviewMode } from '@/lib/types'

interface SessionRequestBody {
  mode: ReviewMode
  filter_level?: Level
  filter_subject?: string
  filter_difficulty?: Difficulty
  session_limit?: number | null
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

    const body: SessionRequestBody = await request.json()
    const { mode, filter_level, filter_subject, filter_difficulty, session_limit } = body

    // Build query based on mode and filters
    let query = supabase.from('questions').select('id')

    // Level filter
    if (filter_level) {
      query = query.eq('level', filter_level)
    } else if (mode === 'bar') {
      query = query.eq('level', 'bar_exam')
    } else if (mode === 'law_school') {
      query = query.eq('level', 'law_school')
    } else if (mode === 'pre_law') {
      query = query.eq('level', 'pre_law')
    }

    // Subject filter
    if (filter_subject) {
      query = query.eq('subject', filter_subject)
    }

    // Difficulty filter
    if (filter_difficulty) {
      query = query.eq('difficulty', filter_difficulty)
    }

    // Special modes: new, weak, due
    if (mode === 'new') {
      // Questions with no progress record for this user
      const { data: seenIds } = await supabase
        .from('user_question_progress')
        .select('question_id')
        .eq('user_id', user.id)

      const seenSet = new Set((seenIds ?? []).map((r: { question_id: string }) => r.question_id))

      let { data: allIds } = await query
      allIds = (allIds ?? []).filter((r: { id: string }) => !seenSet.has(r.id))

      return buildSession(supabase, user.id, allIds ?? [], mode, body, session_limit)
    }

    if (mode === 'weak') {
      const { data: weakProgress } = await supabase
        .from('user_question_progress')
        .select('question_id')
        .eq('user_id', user.id)
        .eq('status', 'unknown')

      const weakIds = new Set((weakProgress ?? []).map((r: { question_id: string }) => r.question_id))

      let { data: allIds } = await query
      allIds = (allIds ?? []).filter((r: { id: string }) => weakIds.has(r.id))

      return buildSession(supabase, user.id, allIds ?? [], mode, body, session_limit)
    }

    if (mode === 'due') {
      const { data: dueProgress } = await supabase
        .from('user_question_progress')
        .select('question_id')
        .eq('user_id', user.id)
        .lte('next_review_at', new Date().toISOString())

      const dueIds = new Set((dueProgress ?? []).map((r: { question_id: string }) => r.question_id))

      let { data: allIds } = await query
      allIds = (allIds ?? []).filter((r: { id: string }) => dueIds.has(r.id))

      return buildSession(supabase, user.id, allIds ?? [], mode, body, session_limit)
    }

    // Default: all / random
    const { data: allIds, error: queryError } = await query

    if (queryError) {
      return NextResponse.json({ error: queryError.message }, { status: 500 })
    }

    return buildSession(supabase, user.id, allIds ?? [], mode, body, session_limit)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function buildSession(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  userId: string,
  questionRows: { id: string }[],
  mode: ReviewMode,
  body: SessionRequestBody,
  sessionLimit: number | null | undefined
) {
  if (questionRows.length === 0) {
    return NextResponse.json(
      { error: 'No questions found matching your filters. Try different settings.' },
      { status: 400 }
    )
  }

  // Shuffle
  const shuffled = [...questionRows].sort(() => Math.random() - 0.5)

  // Apply limit
  const limited =
    sessionLimit != null ? shuffled.slice(0, sessionLimit) : shuffled

  // Create session
  const { data: sessionData, error: sessionErr } = await supabase
    .from('review_sessions')
    .insert({
      user_id: userId,
      mode,
      filter_subject: body.filter_subject ?? null,
      filter_level: body.filter_level ?? null,
      filter_difficulty: body.filter_difficulty ?? null,
      session_limit: sessionLimit ?? null,
      total_questions: limited.length,
      status: 'active',
    })
    .select('id')
    .single()

  if (sessionErr) {
    return NextResponse.json({ error: sessionErr.message }, { status: 500 })
  }

  const sessionId = sessionData.id

  // Insert session questions
  const sessionQuestions = limited.map((q: { id: string }, index: number) => ({
    session_id: sessionId,
    question_id: q.id,
    position: index,
    answered: false,
  }))

  const { error: sqErr } = await supabase
    .from('session_questions')
    .insert(sessionQuestions)

  if (sqErr) {
    return NextResponse.json({ error: sqErr.message }, { status: 500 })
  }

  return NextResponse.json({ sessionId, totalQuestions: limited.length })
}
