interface BadgeProps {
  label: string
  variant?: 'gold' | 'muted' | 'easy' | 'medium' | 'hard' | 'bar'
}

const styles: Record<string, React.CSSProperties> = {
  gold: {
    color: '#d4af37',
    borderColor: 'rgba(212,175,55,0.3)',
    background: 'rgba(212,175,55,0.1)',
  },
  muted: {
    color: '#4a5470',
    borderColor: '#1e2a4a',
    background: '#161d35',
  },
  easy: {
    color: '#34d399',
    borderColor: 'rgba(52,211,153,0.2)',
    background: 'rgba(52,211,153,0.1)',
  },
  medium: {
    color: '#fbbf24',
    borderColor: 'rgba(251,191,36,0.2)',
    background: 'rgba(251,191,36,0.1)',
  },
  hard: {
    color: '#fb923c',
    borderColor: 'rgba(251,146,60,0.2)',
    background: 'rgba(251,146,60,0.1)',
  },
  bar: {
    color: '#f87171',
    borderColor: 'rgba(248,113,113,0.2)',
    background: 'rgba(248,113,113,0.1)',
  },
}

export function Badge({ label, variant = 'muted' }: BadgeProps) {
  return (
    <span
      className="px-2 py-0.5 text-xs font-medium rounded-full border"
      style={styles[variant]}
    >
      {label}
    </span>
  )
}
