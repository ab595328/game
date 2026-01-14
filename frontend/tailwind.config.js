/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",   // Govt dark blue
        accent: "#2563eb",    // Action color
        muted: "#f1f5f9"      // Background
      }
    }
  },
  plugins: [],
}
