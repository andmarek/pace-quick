/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        cream: {
          200: '#F5F5DC', // Creme color
        },
      },
      fontFamily: {
        'source-sans': ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
