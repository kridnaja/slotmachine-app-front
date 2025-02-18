/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dePixelBreit: ['DePixelBreit', 'sans-serif'],
        dePixelHalbfett: ['DePixelHalbfett', 'sans-serif'],
        dePixelKlein: ['DePixelKlein', 'sans-serif'],
        dePixelSchmal: ['DePixelSchmal', 'sans-serif'],
      },
      animationDelay: {
        '1000': '1s',
        '2000': '2s',
        '3000': '3s',
        '4000': '4s',
        '5000': '5s',
        '6000': '6s',  
      },
      animation: {
        animSpin: 'animSpin 600ms steps(5) infinite',
        spinCustom: 'animSpin 400ms steps(5) infinite',
        rotate1: "rotate1 6s linear infinite",
        rotate2: "rotate2 6s linear infinite",
        // openBox: ""
      },
      keyframes: {
        animSpin: {
          '0%': { transform: 'translatey(0)' },
          '100%': { transform: 'translatey(100%)' },
        },
        rotate1: {
          "0%": { transform: "translate(-50%, -50%) rotate(180deg)"},
          "100%": { transform: "translate(-50%, -50%) rotate(540deg)"},
        },
        rotate2: {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)"},
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
      },
      colors: {
        white: 'rgba(255,255,255,1)',
      },
      backgroundImage: {
        'slots-bg': 'linear-gradient(0deg, rgba(111,72,72,1) 0%, rgba(135,95,95,1) 50%, rgba(111,72,72,1) 100%)',
        'slot-edge': 'linear-gradient(180deg, rgba(100,80,80,1) 0%, rgba(224,107,120,1) 50%, rgba(211,65,168,1) 100%)',
        'slots-side': 'linear-gradient(0deg, rgba(135,95,95,1) 0%, rgba(111,72,72,1) 50%, rgba(135,95,95,1) 100%)',
        'button-spin': 'linear-gradient(54deg, rgba(246,151,162,1) 0%, rgba(228,156,167,1) 100%)',
        'overlay-glass': 'linear-gradient(to right, rgba(229,168,158,0) 0%, rgba(229,168,158,.89) 50%, rgba(229,168,158,0.21) 100%)',
        'screen-bg': 'linear-gradient(54deg, rgba(76,76,80,1) 0%, rgba(61,65,168,1) 100%)',

        'gold-aura': 'conic-gradient(from 0deg, rgba(0,0,0,0), #FDD017, rgba(0,0,0,0) 25%)',
        'blue-aura': 'conic-gradient(from 0deg, rgba(0,0,0,0), #87CEFA, rgba(0,0,0,0) 25%)',
        'green-aura': 'conic-gradient(from 0deg, rgba(0,0,0,0), #ADFF2F, rgba(0,0,0,0) 25%)',
        'white-aura': 'conic-gradient(from 0deg, rgba(0,0,0,0), #DCDCDC, rgba(0,0,0,0) 25%)',
        'purple-aura': 'conic-gradient(from 0deg, rgba(0,0,0,0), #9370DB, rgba(0,0,0,0) 25%)',
      },
      blur: {
        glow: "20px",
      },
      boxShadow: {
        'inset-dark': 'inset 13px 13px 13px rgba(0,0,0,0.33)',
      },
      spacing: {
        'machine-width': '320px',
        'slot-dimension': 'calc(320px / 3)',
      },
      margin: {
        '-700': '-700px',
      },
      borderRadius: {
        xs: '3%',
        s: '8px',
        xl: '50%',
        irregular: '5px 5px 13px 5px',
      },
      maxWidth: {
        640: '640px',
      },
      maxHeight: {
        480: '480px',
      },
      minHeight: {
        380: '380px',
      },
      transform: {
        perspective: 'rotateX(21deg)', // `--perspective`
      },
    },
  },
  plugins: [
    require('tailwindcss-motion'),
    function ({ addUtilities, e, theme, variants }) {
      const animationDelay = theme('animationDelay');
      const utilities = Object.keys(animationDelay).map((key) => ({
        [`.${e(`animation-delay-${key}`)}`]: {
          'animation-delay': animationDelay[key],
        },
      }));

      addUtilities(utilities, variants('animationDelay'));
    },

    
  ],
};
