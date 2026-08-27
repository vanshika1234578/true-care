import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2F6FE4",
          50: "#EEF4FE",
          100: "#DCE9FD",
          200: "#B4CFFA",
          300: "#8BB4F7",
          400: "#5C92F0",
          500: "#2F6FE4",
          600: "#2559BB",
          700: "#1C4392",
          800: "#132D69",
          900: "#0A1740",
        },
        teal: {
          DEFAULT: "#63D7C4",
          50: "#EEFBF8",
          100: "#D3F5EE",
          200: "#A7EBDD",
          300: "#7BE1CC",
          400: "#63D7C4",
          500: "#3FBFA9",
          600: "#309886",
          700: "#237263",
          800: "#164B40",
          900: "#0A251F",
        },
        // Warm gold accent — reserved for the single primary conversion
        // action (e.g. the WhatsApp CTA), not used as a general color.
        // Inspired by TMTC's premium/concierge positioning ("5-star hotel"
        // aftercare, chef-designed meals) rather than a literal color match —
        // Claude could not visually sample their live site's exact values.
        accent: {
          DEFAULT: "#C8963E",
          50: "#FBF4E7",
          100: "#F5E6C9",
          200: "#EACD97",
          300: "#DEB465",
          400: "#D4A34E",
          500: "#C8963E",
          600: "#A97B2E",
          700: "#886023",
          800: "#5F4319",
          900: "#3B2A0F",
        },
        navy: {
          DEFAULT: "#0B1E3F",
          50: "#EAEDF3",
          100: "#C8D0E1",
          200: "#96A6C4",
          300: "#647CA6",
          400: "#3D5989",
          500: "#0B1E3F",
          600: "#091A36",
          700: "#07152B",
          800: "#050F1F",
          900: "#020813",
        },
        surface: {
          light: "#FFFFFF",
          soft: "#F6F8FB",
          mist: "#EEF2F7",
          dark: "#0B1220",
          darkSoft: "#111A2C",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        // Used only via the "font-bengali" utility class on pages with Bengali content.
        bengali: ["var(--font-noto-bengali)", "var(--font-inter)", "sans-serif"],
        // Used only via the "font-arabic" utility class on pages with Arabic content.
        arabic: ["var(--font-noto-arabic)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(11, 30, 63, 0.12)",
        card: "0 4px 24px -4px rgba(11, 30, 63, 0.08)",
        glow: "0 0 0 1px rgba(47, 111, 228, 0.08), 0 12px 40px -12px rgba(47, 111, 228, 0.25)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.7s ease-out both",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(120% 120% at 50% 0%, rgba(47,111,228,0.10) 0%, rgba(99,215,196,0.08) 45%, rgba(255,255,255,0) 75%)",
        "hero-gradient-dark":
          "radial-gradient(120% 120% at 50% 0%, rgba(47,111,228,0.20) 0%, rgba(99,215,196,0.12) 45%, rgba(11,18,32,0) 75%)",
      },
    },
  },
  plugins: [],
};

export default config;
