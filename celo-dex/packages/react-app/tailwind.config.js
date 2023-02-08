const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      
      screens: {
        xxs:"320px",
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "960px",
        lg: "1200px",
        xl: "1700px",
      },
      fontFamily: {
        sans: ['var(--font-outfit)', ...fontFamily.sans],
      },
      backgroundImage: {
        'hero-desktop-bg': "url(https://res.cloudinary.com/dqab6gg7d/image/upload/v1675700399/bg/BG_1_mpcgp6.svg)",
        'hero-mobile-bg': "url(https://res.cloudinary.com/dqab6gg7d/image/upload/v1675700363/bg/BG_jii0cp.svg)",
        
      },

    },
  },
  plugins: [],
}
