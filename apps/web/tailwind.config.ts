import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neutral grayscale palette
        background: '#0f0f10',
        foreground: '#f5f5f5',
        muted: '#1a1a1b',
        primary: {
          DEFAULT: '#e5e7eb', // gray-200
          foreground: '#111827', // gray-900
        },
        secondary: {
          DEFAULT: '#9ca3af', // gray-400
          foreground: '#111827',
        },
        accent: {
          DEFAULT: '#d1d5db', // gray-300
          foreground: '#111827',
        },
        border: '#2d2d2f',
        input: '#2d2d2f',
        ring: '#9ca3af',
        // Legacy "gaming" tokens now mapped to grayscale
        gaming: {
          dark: '#0f0f10',
          darker: '#0a0a0a',
          light: '#242426',
          neon: {
            green: '#d1d5db',
            orange: '#9ca3af',
            yellow: '#e5e7eb',
            blue: '#cbd5e1',
            pink: '#e5e7eb',
          },
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        gaming: ['Orbitron', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 10px #9ca3af, 0 0 20px #9ca3af, 0 0 30px #9ca3af',
        'neon-orange': '0 0 10px #6b7280, 0 0 20px #6b7280, 0 0 30px #6b7280',
        'neon-yellow': '0 0 10px #d1d5db, 0 0 20px #d1d5db, 0 0 30px #d1d5db',
        glow: '0 0 15px rgba(156, 163, 175, 0.5)',
      },
      backgroundImage: {
        'gradient-gaming': 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
        'gradient-gaming-orange': 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0f0f10 0%, #1a1a1b 100%)',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
