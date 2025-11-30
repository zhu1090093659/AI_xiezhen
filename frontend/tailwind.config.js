/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: {
          50: '#fafafa',
          100: '#f5f5f7',
          200: '#e8e8ed',
          300: '#d2d2d7',
          400: '#a1a1a6',
          500: '#86868b',
          600: '#6e6e73',
          700: '#424245',
          800: '#1d1d1f',
          900: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 12px 40px rgba(0, 0, 0, 0.12)',
        'apple-hover': '0 8px 30px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

