module.exports = {
  content: [
    './src/**/*.{js,ejs,pug,jsx,ts,tsx,vue,html}',
    "./node_modules/flowbite/**/*.js"
  ],
  plugins: [
    require('flowbite/plugin')
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: 'minmax(20rem, 18vw) 64vw minmax(25rem, 18vw)',
      },
      height: {
        header: '4rem',
        titlebar: '1rem',
        content: 'calc(100vh - theme("height.header"))',
      },
      spacing: {
        0.5: '0.32rem',
        1: '0.4rem',
        1.5: '0.6rem',
        2: '0.8rem',
        2.5: '1.0rem',
        3: '1.2rem',
        3.5: '1.4rem',
        4: '1.6rem',
        5: '2.0rem',
        6: '2.4rem',
        7: '2.8rem',
        8: '3.2rem',
        9: '3.6rem',
        10: '4.0rem',
        11: '4.4rem',
        12: '4.8rem',
        14: '5.6rem',
        16: '6.4rem',
        20: '8.0rem',
        24: '9.6rem',
        28: '11.2rem',
        32: '12.8rem',
        36: '14.4rem',
        40: '16.0rem',
        44: '17.6rem',
        48: '19.2rem',
        52: '20.8rem',
        56: '22.4rem',
        60: '24.0rem',
        64: '25.6rem',
        72: '28.8rem',
        80: '32.0rem',
        96: '38.4rem',
      },
      fontSize: {
        xs: ['1.3rem', { lineHeight: '1.6rem' }],
        sm: ['1.4rem', { lineHeight: '2rem' }],
        base: ['1.6rem', { lineHeight: '2.4rem' }],
        lg: ['1.8rem', { lineHeight: '2.8rem' }],
        xl: ['2rem', { lineHeight: '2.8rem' }],
        '2xl': ['2.4rem', { lineHeight: '3.2rem' }],
        '3xl': ['3rem', { lineHeight: '3.6rem' }],
        '4xl': ['3.6rem', { lineHeight: '4rem' }],
        '5xl': ['4.8rem', { lineHeight: '1' }],
        '6xl': ['6rem', { lineHeight: '1' }],
        '7xl': ['7.2rem', { lineHeight: '1' }],
        '8xl': ['9.6rem', { lineHeight: '1' }],
        '9xl': ['12.8rem', { lineHeight: '1' }],
      },
      borderRadius: {
        sm: '0.2rem',
        DEFAULT: '0.4rem',
        md: '0.6rem',
        lg: '1.2rem',
        xl: '1.4rem',
        '2xl': '1.8rem',
        '3xl': '2.4rem',
      },
    },
  },
}
