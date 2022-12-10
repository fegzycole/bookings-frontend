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
        },
        customGray: {
          100: "#808080",
          200: "#CBD5E1",
        },
        customGreen: {
          100: "#007464",
        },
      },
    },
  },
  plugins: [],
};
