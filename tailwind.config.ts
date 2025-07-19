export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#666",
        secondary: "#14171A",
        accent: "#657786",
        brandGreen: "#00FF7F",
        backdrop: "rgba(0, 0, 0, 0.5)",
      },

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
    },
  },
  plugins: [],
};
