'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div>
      {/* Logo & Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">⚖️</div>
        <h1
          className="text-2xl font-bold tracking-widest mb-2"
          style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif' }}
        >
          LEXIS REVIEW
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Philippine Law Bar Exam System
        </p>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl p-8 border"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--gold-subtle)',
        }}
      >
        <h2
          className="text-xl font-semibold mb-1"
          style={{ color: 'var(--text)' }}
        >
          Sign In
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Continue your bar review session
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5 tracking-wide uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all"
              style={{
                background: 'var(--surface2)',
                borderColor: 'var(--gold-subtle)',
                color: 'var(--text)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-subtle)'
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5 tracking-wide uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all"
              style={{
                background: 'var(--surface2)',
                borderColor: 'var(--gold-subtle)',
                color: 'var(--text)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-subtle)'
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="rounded-xl px-4 py-3 text-sm border"
              style={{
                background: 'rgba(239,68,68,0.08)',
                borderColor: 'rgba(239,68,68,0.25)',
                color: '#f87171',
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm tracking-wide transition-all active:scale-[0.98] disabled:opacity-60"
            style={{
              background: loading ? 'var(--gold-subtle)' : 'var(--gold)',
              color: 'var(--bg)',
            }}
          >
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
            New here?
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* Signup link */}
        <Link
          href="/signup"
          className="block text-center w-full py-3 rounded-xl text-sm font-medium border transition-all hover:border-opacity-60"
          style={{
            borderColor: 'var(--gold-subtle)',
            color: 'var(--gold)',
          }}
        >
          Create an Account
        </Link>
      </div>

      <p className="text-center mt-6 text-xs" style={{ color: 'var(--text-dim)' }}>
        LEXIS BAR REVIEW · Philippines
      </p>
    </div>
  )
}
