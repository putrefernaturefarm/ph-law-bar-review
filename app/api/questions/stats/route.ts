import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { QuestionBankStats } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: questions, error } = await supabase
      .from('questions')
      .select('id, level, subject')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const all = questions ?? []
    const total = all.length

    const byLevel = {
      pre_law: all.filter((q) => q.level === 'pre_law').length,
      law_school: all.filter((q) => q.level === 'law_school').length,
      bar_exam: all.filter((q) => q.level === 'bar_exam').length,
    }

    const bySubject: Record<string, number> = {}
    for (const q of all) {
      if (q.subject) {
        bySubject[q.subject] = (bySubject[q.subject] ?? 0) + 1
      }
    }

    const stats: QuestionBankStats = { total, by_level: byLevel, by_subject: bySubject }
    return NextResponse.json(stats)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
