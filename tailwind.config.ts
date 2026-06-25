import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saju: {
          deep: "#08080f",
          ink: "#0a0a12",
          navy: "#12121c",
          gold: "#c9a227",
          "gold-light": "#e2c878",
          "gold-dim": "#8a7020",
          cream: "#f0ebe3",
          "cream-dim": "#b8b0a4",
          wood: "#5cb888",
          fire: "#e8705a",
          earth: "#c9a227",
          metal: "#a8b8c8",
          water: "#5a9fd4",
        },
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "serif"],
        sans: ["var(--font-noto-sans)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 2px 20px rgba(201, 162, 39, 0.18)",
        "gold-soft": "0 0 40px rgba(201, 162, 39, 0.08)",
        lux: "0 12px 48px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(201, 162, 39, 0.06)",
      },
      maxWidth: {
        "app-mobile": "430px",
        "app-tablet": "600px",
        "app-desktop": "960px",
      },
      transitionDuration: {
        lux: "800ms",
      },
    },
  },
  plugins: [],
};

export default config;
