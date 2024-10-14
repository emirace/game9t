/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jua: ["Jua", "sans-serif"],
        roboto: ["Roboto"],
      },
      colors: {
        light_blue: "#03346E",
        dark_blue: "#021526",
        medium_blue: "#022650",
        cream: "#E2E2B6",
        dark: "#191919",
        green: "#13AA3D",
        red: "#BF0317",
      },
    },
  },
  plugins: [],
};
