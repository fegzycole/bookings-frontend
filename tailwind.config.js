module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Museo: ["Museo", "sans-serif"],
      },
      colors: {
        customBlack: {
          100: "#010101",
          200: "#2B2B2B",
          300: "#424242",
          400: "#555555",
          500: "#35383F",
          600: "#1F1F1F",
          700: "#424242",
        },
        customGray: {
          100: "#808080",
          200: "#CBD5E1",
        },
        customGreen: {
          100: "#007464",
        },
        customYellow: {
          100: "#FFFAE9",
        },
        customSlate: {
          100: "#D4D4D4",
        },
      },
    },
  },
  plugins: [],
};
