/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f1a',
        card: '#1a1a2e',
        primary: '#ff4081',
        secondary: '#8b8b9f',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}