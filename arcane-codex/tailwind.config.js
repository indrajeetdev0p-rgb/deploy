/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09080e',
        surface: 'rgba(23, 20, 33, 0.7)',
        primary: '#a855f7', // Arcane Purple
        secondary: '#38bdf8', // Mystic Blue
        accent: '#f59e0b', // Gold
        rune: {
          blue: '#38bdf8',
          red: '#ef4444',
          green: '#22c55e',
          gold: '#eab308',
          purple: '#a855f7',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'rune-blue': '0 0 20px rgba(56, 189, 248, 0.6), inset 0 0 10px rgba(56, 189, 248, 0.4)',
        'rune-red': '0 0 20px rgba(239, 68, 68, 0.6), inset 0 0 10px rgba(239, 68, 68, 0.4)',
        'rune-purple': '0 0 20px rgba(168, 85, 247, 0.6), inset 0 0 10px rgba(168, 85, 247, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.9', filter: 'drop-shadow(0 0 15px currentColor)' },
          '50%': { opacity: '0.4', filter: 'drop-shadow(0 0 5px currentColor)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
