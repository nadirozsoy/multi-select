/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        sm: '1.6rem',
        base: '1.8rem',
        lg: '2rem',
        xl: '2.4rem'
      },
      colors: {
        primary: '#94a3b8'
      }
    }
  },
  plugins: []
}
