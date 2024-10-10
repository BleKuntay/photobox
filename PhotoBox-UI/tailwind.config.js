import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      colors: {
        primary: "#222831",
        secondary: "#393E46",
        button: "#FFD369"
      }
    },
  },
  plugins: [
    daisyui,
  ],
}

