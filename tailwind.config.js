/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "ox-shadow-dark": "#0000001a",
        "ox-white": "#FCFCFC",
        "ox-input-white": "#eaeff2",
        "ox-dark": "#2a3548",
        "ox-border-grey": "#2a3548",
        "ox-toggle-grey": "#d8d8d8",
        "ox-yellow": "#e7b522",
        "ox-yellow-faded": "#e7b522",
        "ox-yellow-faded-text": "#e3b221",
        "ox-orange": "#ed7818",
        "ox-red": "#bd062d",
        "ox-danger": "#FCF2F4",
        "ox-dark-border": "#181f2b",
        "ox-border-color": "#EAEFF2A1",
        "ox-border-dash": "#A2B3D1",
        "ox-blue": "#4AC3FC",
        "ox-green": "#CDDF00"
      }
    }
  },
  plugins: []
};
