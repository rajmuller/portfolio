module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#edf2f8',
        secondary: '#313bac',
        black: '#030303',
        lightGray: '#e4e4e4',
        gray: '#6b7688',
        brown: '#46364a',
        white: '#ffffff',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
