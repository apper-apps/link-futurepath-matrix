/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f4f3ff",
          100: "#ebe9fe",
          200: "#d9d6fe",
          300: "#bfb8fc",
          400: "#a192f8",
          500: "#836bf3",
          600: "#6c4aec",
          700: "#5B4FCF",
          800: "#4a3db8",
          900: "#3e3396",
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#F97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        }
      }
    },
  },
  plugins: [],
}