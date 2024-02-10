import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "1rem", // Default font size
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        normal: 1.5,
        tight: 1.25,
        loose: 1.75,
      },
    },
  },
  daisyui: {
    themes: [
      {
        checkIntoClass: {
          primary: "#28a745",
          "primary-focus": "#218838",
          "primary-content": "#ffffff",
          "navbar-text": "#7c7c7d",
          "navbar-background": "#f8f9fa",
          secondary: "#17a2b8",
          "secondary-focus": "#138496",
          "secondary-content": "#ffffff",
          accent: "#F8F9FA"
        },
      },
    ],
  },
  plugins: [daisyui, typography],
};

export default config;
