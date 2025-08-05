import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        geistSans: ["var(--font-geist-sans)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        glow: "0 0 10px #1DA1F2",
      },
      zIndex: {
        max: "9999",
      },
      animation: {
        shake: "shake 0.3s ease-in-out",
        explode: "explode 0.4s ease-in-out forwards",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" },
        },

        explode: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "50%": { transform: "scale(1.6)", opacity: 0.8 },
          "100%": { transform: "scale(0)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};

export default config;
