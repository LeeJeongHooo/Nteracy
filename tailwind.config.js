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
      spacing: {
        0.5: "0.2rem",
        1: "0.4rem",
        1.5: "0.6rem",
        2: "0.8rem",
        2.5: "1rem",
        3: "1.2rem",
        3.5: "1.4rem",
        4: "1.6rem",
        5: "2rem",
        6: "2.4rem",
        7: "2.8rem",
        8: "3.2rem",
        9: "3.6rem",
        10: "4.0rem",
      },
    },
  },
  plugins: [],
};
