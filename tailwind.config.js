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
        btnblue: '#0a66c2',
        btnbluedark: '#004182',
        btnbluelight: 'rgba(112,181,249,0.2)',
        lstone: '#f3f2ef',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
