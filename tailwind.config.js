/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/app.html",
    "./src/routes/.*svelte",
    "./src/routes/**/*.svelte",
    "./src/components/**/*.svelte"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
