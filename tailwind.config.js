module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dblue: '#1d2226',
        lstone: '#f3f2ef',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
