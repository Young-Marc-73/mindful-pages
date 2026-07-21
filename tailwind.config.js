/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ── Palette sampled from the Mindful Pages Canva covers ──
        // Deep navy ink (dominant on the business-series covers)
        ink: {
          DEFAULT: "#14182a",
          soft: "#232a42",
          muted: "#3a4058",
        },
        // Golden yellow (the signature cover accent)
        gold: {
          DEFAULT: "#c79a3c", // antique gold — text/borders
          bright: "#f0ce5b", // highlight gold — from the covers
          soft: "#f3de8b",
          deep: "#a97f28",
        },
        // Warm cream / paper (page backgrounds)
        cream: {
          DEFAULT: "#faf5ec",
          soft: "#fffdf8",
          sand: "#f2e8d6",
        },
        // Calm, mindful accents (from the interiors + brand notes)
        sage: {
          DEFAULT: "#a9cdc9",
          deep: "#2f6f6a", // teal
          moss: "#7c8a58", // leaf olive
        },
        terracotta: "#b4553f",
        plum: {
          DEFAULT: "#6a4fb0",
          soft: "#d5cbef",
        },
        lavender: "#e7eaee", // soft grey from the brand title page
        // Text
        charcoal: {
          DEFAULT: "#3a362e",
          muted: "#736d61",
        },
      },
      fontFamily: {
        // Clean modern sans for body/UI + elegant serif display for headings
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        script: ['"Dancing Script"', "cursive"],
      },
      letterSpacing: {
        brand: "0.02em",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(20,24,42,0.08), 0 8px 30px -12px rgba(20,24,42,0.12)",
        lift: "0 10px 40px -12px rgba(20,24,42,0.28)",
        gold: "0 8px 30px -8px rgba(199,154,60,0.45)",
        cover: "0 18px 50px -18px rgba(20,24,42,0.45)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(110deg, transparent 30%, rgba(240,206,91,0.55) 50%, transparent 70%)",
        "cream-radial":
          "radial-gradient(1200px 600px at 50% -10%, rgba(169,205,201,0.35), transparent 60%)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - var(--gap, 1rem)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-50% - var(--gap, 1rem)))" },
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(2deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
        // ── App section: BorderBeam travels the card edge ──
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        // ── App section: aurora / gradient background pan ──
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // ── ShimmerButton: slow rotating conic shine ──
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee var(--duration, 40s) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration, 40s) linear infinite",
        shine: "shine 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
        "pulse-soft": "pulse-soft 5s ease-in-out infinite",
        "border-beam": "border-beam calc(var(--duration,8s)) infinite linear",
        "gradient-pan": "gradient-pan 14s ease infinite",
        "spin-slow": "spin-slow 5s linear infinite",
      },
    },
  },
  plugins: [],
};
