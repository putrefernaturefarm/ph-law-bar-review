'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  userEmail: string
}

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: '/library',
    label: 'Library',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    href: '/review',
    label: 'Review',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: '/subjects',
    label: 'Subjects',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    href: '/progress',
    label: 'Progress',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/search',
    label: 'Search',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/ingestion',
    label: 'Ingestion',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v4M9 17l3 2 3-2" />
      </svg>
    ),
  },
]

function SunIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" strokeLinecap="round" />
      <line x1="12" y1="21" x2="12" y2="23" strokeLinecap="round" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeLinecap="round" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeLinecap="round" />
      <line x1="1" y1="12" x2="3" y2="12" strokeLinecap="round" />
      <line x1="21" y1="12" x2="23" y2="12" strokeLinecap="round" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeLinecap="round" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-all hover:opacity-80"
      style={{
        color: 'var(--text-muted)',
        border: '1px solid var(--border)',
        background: 'transparent',
      }}
      aria-label="Toggle theme"
    >
      <span style={{ color: 'var(--gold)' }}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export default function AppShell({ children, userEmail }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const { theme, setTheme } = useTheme()

  async function handleSignOut() {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const shortEmail =
    userEmail.length > 22 ? userEmail.slice(0, 20) + '...' : userEmail

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-full w-60 z-30"
        style={{
          background: 'var(--surface)',
          borderRight: '1px solid var(--gold-subtle)',
        }}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b" style={{ borderColor: 'var(--gold-subtle)' }}>
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="text-2xl">⚖️</span>
            <div>
              <div
                className="text-sm font-bold tracking-widest leading-tight"
                style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif' }}
              >
                LEXIS
              </div>
              <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
                BAR REVIEW
              </div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  active ? '' : 'opacity-60 hover:opacity-100'
                )}
                style={{
                  color: active ? 'var(--gold)' : 'var(--text-muted)',
                  background: active ? 'var(--gold-subtle)' : 'transparent',
                  borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent',
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User / Theme / Signout */}
        <div className="px-4 py-4 border-t space-y-2" style={{ borderColor: 'var(--gold-subtle)' }}>
          <div className="mb-3">
            <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>
              Signed in as
            </div>
            <div className="text-xs font-mono" style={{ color: 'var(--gold)' }}>
              {shortEmail}
            </div>
          </div>
          <ThemeToggle />
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full py-2 rounded-lg text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-40"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            {signingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--gold-subtle)',
        }}
      >
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl">⚖️</span>
          <span
            className="text-sm font-bold tracking-widest"
            style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif' }}
          >
            LEXIS
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {/* Mobile theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg transition-all hover:opacity-80"
            style={{ color: 'var(--gold)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          onClick={() => setSidebarOpen(false)}
          style={{ background: 'var(--overlay)' }}
        >
          <div
            className="absolute top-0 left-0 h-full w-64 pt-16"
            style={{ background: 'var(--surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="px-3 py-4 space-y-0.5">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      color: active ? 'var(--gold)' : 'var(--text-muted)',
                      background: active ? 'var(--gold-subtle)' : 'transparent',
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="px-4 border-t mt-2 pt-4 space-y-2" style={{ borderColor: 'var(--border)' }}>
              <div className="text-xs mb-1 font-mono" style={{ color: 'var(--text-dim)' }}>
                {shortEmail}
              </div>
              <ThemeToggle />
              <button
                onClick={handleSignOut}
                className="w-full py-2 rounded-lg text-xs font-medium border"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-60 min-h-screen overflow-y-auto pt-14 md:pt-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around py-2"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--gold-subtle)',
        }}
      >
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1"
              style={{ color: active ? 'var(--gold)' : 'var(--text-dim)' }}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
