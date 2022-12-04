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
        },
        customGray: {
          100: "#808080",
        },
        customGreen: {
          100: "#007464",
        },
      },
    },
  },
  plugins: [],
};
