/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const color = require('./src/constants/color');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: color.base.lightGray,
      },
    },
    fontFamily: {
      paragraph: ['Inter', 'sans-serif'],
      heading: ['IBM Plex Sans', 'sans-serif'],
    },
    colors: color,
    boxShadow: {
      button: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      card: '0px 0px 1px 0px rgba(0, 0, 0, 0.25), 0px 2px 1px 0px rgba(0, 0, 0, 0.05)',
      sidebar: '1px 0px 10px 0px rgba(0, 0, 0, 0.04)',
      navbar: '0px 2px 2px 0px rgba(0, 0, 0, 0.05)',
      footer: '0px -1px 10px 0px rgba(0, 0, 0, 0.04)',
      popover:
        '0px 2px 10px 0px rgba(0, 0, 0, 0.10), 0px 0px 2px 0px rgba(0, 0, 0, 0.20)',
      modal:
        '0px 26px 80px 0px rgba(0, 0, 0, 0.20), 0px 0px 1px 0px rgba(0, 0, 0, 0.20)',
    },
  },
  plugins: [],
};

// export default config;
