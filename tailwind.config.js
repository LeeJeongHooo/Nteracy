/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#3B28CC",
        lightBlue: "#D7DBFF",
        darkBlue: "#322E9C",
        lightWhite: "#F4EEC7",
        gray: "#D7D7D7",
        dark: "#1E1E1E",
      },
    },
  },
  plugins: [],
};
