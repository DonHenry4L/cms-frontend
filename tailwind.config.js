/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        secondary: "#272727",
        // box shadows
        background: "#161538",
        "dark-subtle": "rgba(255, 255, 255, 0.5)",
        "dark-purple": "#081A51",
        "light-subtle": "rgba(39, 39, 39, 0.5)",
        "light-white": "rgba(255, 255, 255, 0.17)",
        "highlight-dark": "#ffc200",
        "single-color": "#111",
        "single-rgb": "rgba(37, 37, 37, 0.61)",
        highlight: "#058bfb",
        borderColor: "#808080",
      },
      backgroundImage: {
        "hero-pattern": "url('../public/contact.png')",
        "footer-texture": "url('/img/footer-texture.png')",
        "single-background": "url('../public/single-bg.jpg')",
        // "background-image": linear-gradient(
        //   180deg)
        // transparent,
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
  variants: {
    display: ["responsive", "group-hover", "group-focus"],
  },
  plugins: [],
};
