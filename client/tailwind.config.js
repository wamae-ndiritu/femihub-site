/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-pink": "#E4258F",
        "faded-pink": "#fbcfe8",
      },
    },
  },
  plugins: [],
};
