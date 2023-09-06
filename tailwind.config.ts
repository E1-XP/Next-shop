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
        whiteGray: "#fafafb",
        whiteGray2: "#f5f5f5",
        whiteGray3: "#CBCBCB",
        grayWhite: "#605F5F",
        medGray: "#000000a6",
        darkGray: "#212529",
        darkGray2: "#121212",
        orange: "#ffa726",
      },
    },
  },
  plugins: [],
};
export default config;
