import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'ghost' | 'know' | 'dont-know' | 'surface'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'gold',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    gold: 'font-semibold transition-all',
    ghost: 'border font-medium transition-all',
    know: 'font-semibold transition-all',
    'dont-know': 'font-semibold transition-all',
    surface: 'border font-medium transition-all',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl w-full',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    gold: { background: 'var(--gold)', color: 'var(--bg)' },
    ghost: { borderColor: 'var(--border)', color: 'var(--text-muted)' },
    know: { background: '#059669', color: '#fff' },
    'dont-know': { background: '#dc2626', color: '#fff' },
    surface: { background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text-muted)' },
  }

  return (
    <button
      className={cn(
        'active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      style={variantStyles[variant]}
      {...props}
    >
      {children}
    </button>
  )
}
