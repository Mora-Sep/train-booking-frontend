module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      mytheme: {
        "primary": "#4f46e5",

        "secondary": "#c4b5fd",

        "accent": "#43ffff",

        "neutral": "#f6ffff",

        "base-100": "#f8ffff",

        "info": "#41ffff",

        "success": "#9affdc",

        "warning": "#fff129",

        "error": "#f43f5e",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
  ],
}
