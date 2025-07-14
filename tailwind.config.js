// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], // Make sure this path is correct for your HTML file
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'dark-bg': '#000000',
        'dark-card': '#111111',
        'dark-border': '#333333',
        'primary-indigo': '#6366f1', // Matches your --primary-color
        'secondary-indigo': '#4f46e5', // Matches your --secondary-color
        'accent-emerald': '#10b981', // Matches your --accent-color
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #6366f1, #ec4899)', // For gradient text/buttons
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '70%': { transform: 'scale(2)', opacity: '0' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'pulse-backdrop': {
          '0%': { opacity: '0.4', transform: 'scale(0.98)' },
          '100%': { opacity: '0.7', transform: 'scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(30px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-backdrop': 'pulse-backdrop 4s infinite alternate',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.8s ease-out forwards',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [],
};