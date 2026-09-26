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
          style={{ color: '#d4af37', fontFamily: 'Georgia, serif' }}
        >
          LEXIS REVIEW
        </h1>
        <p className="text-sm" style={{ color: '#8896b3' }}>
          Philippine Law Bar Exam System
        </p>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl p-8 border"
        style={{
          background: '#0f1629',
          borderColor: 'rgba(212,175,55,0.15)',
        }}
      >
        <h2
          className="text-xl font-semibold mb-1"
          style={{ color: '#f0f4ff' }}
        >
          Sign In
        </h2>
        <p className="text-sm mb-6" style={{ color: '#8896b3' }}>
          Continue your bar review session
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5 tracking-wide uppercase"
              style={{ color: '#8896b3' }}
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
                background: '#161d35',
                borderColor: 'rgba(212,175,55,0.15)',
                color: '#f0f4ff',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#d4af37'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5 tracking-wide uppercase"
              style={{ color: '#8896b3' }}
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
                background: '#161d35',
                borderColor: 'rgba(212,175,55,0.15)',
                color: '#f0f4ff',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#d4af37'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'
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
              background: loading ? 'rgba(212,175,55,0.6)' : '#d4af37',
              color: '#080d1a',
            }}
          >
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: '#1e2a4a' }} />
          <span className="text-xs" style={{ color: '#4a5470' }}>
            New here?
          </span>
          <div className="flex-1 h-px" style={{ background: '#1e2a4a' }} />
        </div>

        {/* Signup link */}
        <Link
          href="/signup"
          className="block text-center w-full py-3 rounded-xl text-sm font-medium border transition-all hover:border-opacity-60"
          style={{
            borderColor: 'rgba(212,175,55,0.2)',
            color: '#d4af37',
          }}
        >
          Create an Account
        </Link>
      </div>

      <p className="text-center mt-6 text-xs" style={{ color: '#4a5470' }}>
        LEXIS BAR REVIEW · Philippines
      </p>
    </div>
  )
}
