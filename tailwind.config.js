/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
            //   'dark-blue': '#1c3649',
            //   'light-white': 'rgba(255,255,255,0.18)',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };
  