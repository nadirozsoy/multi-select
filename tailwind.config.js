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
        primary: '#2c62e4',
        'primary-10': '#f0f6fe',
        secondary: '#c1dafc',
        tertiary: '#65a4f5'
      },
      boxShadow: {
        primary:
          'rgba(44, 98, 228, 0.25) 0px 54px 55px, rgba(44, 98, 228, 0.12) 0px -12px 30px, rgba(44, 98, 228, 0.12) 0px 4px 6px, rgba(44, 98, 228, 0.17) 0px 12px 13px, rgba(44, 98, 228, 0.09) 0px -3px 5px',
        secondary: 'rgba(44, 98, 228, 0.3) 0px 1px 2px 0px, rgba(44, 98, 228, 0.15) 0px 2px 6px 2px;'
      }
    }
  },
  plugins: []
}
