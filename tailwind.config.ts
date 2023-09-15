import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        up: {
          "0%": {
            opacity: "1",
            transform: "translateY(0%)",
          },
          "50%": {
            opacity: "0.5",
            transform: "trans;ateY(-50%)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-100%)",
          },
        },
      },
      animation: {
        up: "up .6s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
