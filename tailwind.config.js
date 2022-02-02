module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    boxShadow: {
      btn: '0px 4px 0px 0px rgb(188, 148, 45)',
      'secondary-btn': '0 4px 0 rgb(0 0 0 / 20%)',
      radio: '0 0 1px 0 #000000, inset 0 0 1px 0 #ffffff',
      'modal-input': '0 0 3px #c4e6f5',
      image: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
    },
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
    },
    extend: {
      colors: {
        seagreen: {
          50: '#eff5f3',
          100: '#d2f0ed',
          200: '#9de7d6',
          300: '#57bd91',
          400: '#25af7e',
          500: '#199655',
          600: '#178040',
          700: '#166234',
          800: '#114428',
          900: '#0c2a1f',
        },
      },
    },
    screens: {
      desktop: { max: '1535px' },
      laptop: { max: '1279px' },
      tablet: { max: '1023px' },
      mobile: { max: '767px' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
