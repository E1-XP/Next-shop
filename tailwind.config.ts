import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      display: "var(--display-font)",
      body: "var(--body-font)",
    },
    extend: {
      colors: {
        white: "#ffffff",
        medGray: "#000000a6",
        darkGray: "#212529",
      },
    },
  },
  plugins: [],
};
export default config;
