/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

// 1. use arrow functions instead of function expression
// 2. use single quotes
const cardClasses = plugin(({ addUtilities }) => {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
    '.preserve-3d': {
      transformStyle: 'preserve-3d',
    },
    '.perspective': {
      perspective: '1000px',
    },
    '.backface-hidden': {
      backfaceVisibility: 'hidden',
    },
  });
});

// semicolon, quotes
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [cardClasses],
};

