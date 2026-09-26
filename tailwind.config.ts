import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#080d1a',
          surface: '#0f1629',
          elevated: '#161d35',
          border: '#1e2a4a',
        },
        gold: {
          DEFAULT: '#d4af37',
          bright: '#f0c040',
          muted: 'rgba(212,175,55,0.15)',
        },
        ink: {
          primary: '#f0f4ff',
          secondary: '#8896b3',
          muted: '#4a5470',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
