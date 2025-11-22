/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        staffGreen: '#38A747'
      }, gridTemplateColumns: {
          // custom 19 columns
          '16': 'repeat(16, minmax(0, 1fr))',
        },
    }
  },
  plugins: [],
}
