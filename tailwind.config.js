/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Theme: The Enchanted Library
        library: {
          bg: '#F4E9C8',
          bgSecondary: '#E8D9AE',
          text: '#302B22',
          textMuted: '#75664B',
          burgundy: '#702C38',
          burgundyHover: '#8A3645',
          forest: '#526746',
          gold: '#B49A62',
          border: '#D8C697',
        },
        // Dark Theme: The Midnight Library
        midnight: {
          bg: '#080F19',
          surface: '#111D2B',
          surfaceLight: '#19293D',
          text: '#F0E8D5',
          textMuted: '#B7C1CC',
          blue: '#8CCBFF',
          gold: '#C5A66A',
          border: '#34475A',
        },
        // Common Wax Seal & Accent colors
        wax: {
          burgundy: '#702C38',
          gold: '#B49A62',
          shadow: 'rgba(112, 44, 56, 0.4)',
        }
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        decorative: ['"IM Fell English"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'flicker': 'flicker 2.5s infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'seal-pop': 'sealPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        },
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(6px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        sealPop: {
          '0%': { transform: 'scale(0.8) rotate(-10deg)', opacity: 0 },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
