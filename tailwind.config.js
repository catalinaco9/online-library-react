/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Georgia", "sans-serif"],
    },
    colors: {
      transparent: "tramsparent",
      current: "currentColor",
      green: {
        light: "#226744",
        DEFAULT: "#1B5336",
        dark: "#0C4C2B",
      },
      purple: {
        dark: "#4b475d",
        DEFAULT: "#6B6280",
        light: "#a399bc",
      },
      purpleBackground:"#E3E2E5"
    },
  },
  plugins: [],
};
