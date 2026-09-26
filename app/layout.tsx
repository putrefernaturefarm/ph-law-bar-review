import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'LEXIS — PH Law Bar Review',
    template: '%s | LEXIS Bar Review',
  },
  description:
    'Philippine Law Bar Exam Flashcard and Spaced Repetition Review System. Master Constitutional Law, Civil Law, Criminal Law, Remedial Law, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
