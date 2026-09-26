'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    setTimeout(() => router.push('/login'), 3000)
  }

  const inputStyle = {
    background: 'var(--surface2)',
    borderColor: 'var(--gold-subtle)',
    color: 'var(--text)',
  }

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'var(--gold)'
  }
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'var(--gold-subtle)'
  }

  return (
    <div>
      {/* Logo */}
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
        style={{ background: 'var(--surface)', borderColor: 'var(--gold-subtle)' }}
      >
        {success ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">✉️</div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Check your email
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              We sent a confirmation link to{' '}
              <span style={{ color: 'var(--gold)' }}>{email}</span>. Redirecting to
              login...
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-1" style={{ color: 'var(--text)' }}>
              Create Account
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Start your bar review journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

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
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all"
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

              <div>
                <label
                  className="block text-xs font-medium mb-1.5 tracking-wide uppercase"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Repeat password"
                  className="w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all"
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-sm tracking-wide transition-all active:scale-[0.98] disabled:opacity-60"
                style={{
                  background: loading ? 'var(--gold-subtle)' : 'var(--gold)',
                  color: 'var(--bg)',
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account →'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
                Already registered?
              </span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>

            <Link
              href="/login"
              className="block text-center w-full py-3 rounded-xl text-sm font-medium border transition-all"
              style={{ borderColor: 'var(--gold-subtle)', color: 'var(--gold)' }}
            >
              Sign In Instead
            </Link>
          </>
        )}
      </div>

      <p className="text-center mt-6 text-xs" style={{ color: 'var(--text-dim)' }}>
        LEXIS BAR REVIEW · Philippines
      </p>
    </div>
  )
}
