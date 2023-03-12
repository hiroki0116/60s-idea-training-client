const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  purge: {
    enabled: process.env.NEXT_PUBLIC_STAGE !== "dev",
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./features/**/*.{js,ts,jsx,tsx}",
    ],
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      ringColor: ["hover"],
      opacity: ["disabled"],
      zIndex: ["hover"],
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    extend: {
      fontFamily: {
        Fredoka: ["Fredoka", ...defaultTheme.fontFamily.sans],
      },
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("#0a2339", "currentColor"),
      primary: "#d9d9d9",
      secondary: "#f15927",
      danger: "#e3342f",
    }),
    extend: {
      fontSize: {
        xs: "10px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "60px",
      },
      fontWeight: {
        hairline: 100,
        "extra-light": 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 900,
      },
      backgroundColor: ["group-hover"],
      animation: {
        bounceLeft: "bounceLeft 1s infinite",
      },
      keyframes: {
        bounceLeft: {
          "0%, 100%": {
            transform: "translateX(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
};
