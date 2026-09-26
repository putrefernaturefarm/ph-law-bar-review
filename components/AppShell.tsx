'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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

export default function AppShell({ children, userEmail }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

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
    <div className="min-h-screen flex" style={{ background: '#080d1a' }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-full w-60 z-30"
        style={{
          background: '#0f1629',
          borderRight: '1px solid rgba(212,175,55,0.1)',
        }}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b" style={{ borderColor: 'rgba(212,175,55,0.08)' }}>
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="text-2xl">⚖️</span>
            <div>
              <div
                className="text-sm font-bold tracking-widest leading-tight"
                style={{ color: '#d4af37', fontFamily: 'Georgia, serif' }}
              >
                LEXIS
              </div>
              <div className="text-xs" style={{ color: '#4a5470' }}>
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
                  active ? 'text-gold-active' : 'opacity-60 hover:opacity-100'
                )}
                style={{
                  color: active ? '#d4af37' : '#8896b3',
                  background: active ? 'rgba(212,175,55,0.08)' : 'transparent',
                  borderLeft: active ? '2px solid #d4af37' : '2px solid transparent',
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User / Signout */}
        <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(212,175,55,0.08)' }}>
          <div className="mb-3">
            <div className="text-xs font-medium mb-0.5" style={{ color: '#8896b3' }}>
              Signed in as
            </div>
            <div className="text-xs font-mono" style={{ color: '#d4af37' }}>
              {shortEmail}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full py-2 rounded-lg text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-40"
            style={{ borderColor: '#1e2a4a', color: '#8896b3' }}
          >
            {signingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        style={{ background: '#0f1629', borderBottom: '1px solid rgba(212,175,55,0.08)' }}
      >
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl">⚖️</span>
          <span
            className="text-sm font-bold tracking-widest"
            style={{ color: '#d4af37', fontFamily: 'Georgia, serif' }}
          >
            LEXIS
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg"
          style={{ color: '#8896b3' }}
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

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          onClick={() => setSidebarOpen(false)}
          style={{ background: 'rgba(8,13,26,0.8)' }}
        >
          <div
            className="absolute top-0 left-0 h-full w-64 pt-16"
            style={{ background: '#0f1629' }}
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
                      color: active ? '#d4af37' : '#8896b3',
                      background: active ? 'rgba(212,175,55,0.08)' : 'transparent',
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="px-4 border-t mt-2 pt-4" style={{ borderColor: '#1e2a4a' }}>
              <div className="text-xs mb-3 font-mono" style={{ color: '#4a5470' }}>
                {shortEmail}
              </div>
              <button
                onClick={handleSignOut}
                className="w-full py-2 rounded-lg text-xs font-medium border"
                style={{ borderColor: '#1e2a4a', color: '#8896b3' }}
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
          background: '#0f1629',
          borderTop: '1px solid rgba(212,175,55,0.08)',
        }}
      >
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1"
              style={{ color: active ? '#d4af37' : '#4a5470' }}
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
