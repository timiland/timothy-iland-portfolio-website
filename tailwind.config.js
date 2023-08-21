/** @type {import('tailwindcss').Config} */
import screens from './config';

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      screens: { ...screens },
      padding: {
        DEFAULT: '20px',
        sm: '20px',
        md: '60px',
        lg: '100px',
        xl: '0px',
        '2xl': '0px',
      },
      borderRadius: {
        none: '0',
        sm: '6px',
        DEFAULT: '10px',
        lg: '20px',
        xl: '50px',
      },
    },
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
      },
      colors: {
        black: {
          DEFAULT: '#06050D',
          100: '#1f1e26',
          // 100: '#1a1921',
          200: '#38373d',
          300: '#515056',
        },
        red: {
          fire: '#E5403C',
        },
        yellow: {
          DEFAULT: '#FED100',
          50: '#FFF2B7',
          100: '#FFEFA2',
          200: '#FFE779',
          300: '#FFE051',
          400: '#FFD928',
          500: '#FED100',
          550: '#FDC628', // Barbados
          600: '#C6A300',
          700: '#8E7500',
          800: '#564700',
          900: '#1E1800',
          950: '#020100',
        },
        green: {
          DEFAULT: '#008B45',
          300: '#00A351',
          400: '#007A3D',
          500: '#003D1E',
          550: '#005329',
          600: '#001B0D',
        },
      },
      boxShadow: {
        bold: '3px 10px 35px 1px rgba(0,0,0,0.4)',
        // bold: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      dropShadow: {
        black_sm: '3px 3px 0px #06050D',
        black_lg: '6px 6px 0px #06050D',
        black_extr: '0px 10px 0px #06050D',
        yellow_sm: '3px 3px 0px #FED100',
        yellow_lg: '6px 6px 0px #FED100',
        yellow_extr: '0px 5px 0px #FED100',
        white_sm: '3px 3px 0px #FFFFFF',
        white_lg: '6px 6px 0px #FFFFFF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
    plugins: [
      require('tailwind-scrollbar-hide')
    ]
  },
};
