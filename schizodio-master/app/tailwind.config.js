/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        win95: {
          gray: '#c0c0c0',
          dark: '#808080',
          darker: '#404040',
          light: '#ffffff',
          blue: '#000080',
          text: '#000000',
          teal: '#008080'
        }
      },
      spacing: {
        '128': '32rem',
        '192': '48rem',
        '256': '64rem',
        '512': '128rem',
      },
      fontFamily: {
        'ms-sans': ['"MS Sans Serif"', 'sans-serif'],
        'windows': ['"Pixelated MS"', 'sans-serif']
      },
      fontSize: {
        'xxs': '0.675rem',
        
    },
    }
  },
  plugins: []
}