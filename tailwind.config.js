/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/*.html","./client/app/*.js","./client/features/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        'darker': '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
      },
      textColor: {
        'placeholder-white': ['placeholder-white'],
      },
    },
  },
  variants: {
    extend: {
      textColor: ['responsive', 'hover', 'focus', 'placeholder'],
    },
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
};
