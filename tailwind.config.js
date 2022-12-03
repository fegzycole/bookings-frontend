module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          body: ["Museo"],
        },
        colors: {
          customGreen: {
            100: "#5DBE7E",
            200: "#40B439",
          },
          customPurple: {
            100: "#6368DF",
            200: "#1B31A8",
          },
          customGray: {
            100: "#EFF0F6",
            200: "#EEEEEE",
            300: "#E0E0E0",
            400: "#F2F2F2",
          },
          customBlack: {
            100: "#565656",
          },
        },
      },
    },
    plugins: [],
  };
  