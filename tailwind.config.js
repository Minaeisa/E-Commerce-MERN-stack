/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#111827',
          surface: '#1f2937',
          text: '#f9fafb',
          border: '#374151',
        }
      }
    },
  },
  plugins: [],
}
