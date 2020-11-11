import { css } from 'styled-components';

 export default {
    screen: {
      xs: `${375 / 16}em`,
      sm: `${540 / 16}em`,
      md: `${720 / 16}em`,
      lg: `${1024 / 16}em`,
      xl: `${1280 / 16}em`,
      xxl: `${1920 / 16}em`,

    },
    breakpoints: {
      xs: `${375 / 16}em`,
      sm: `${540 / 16}em`,
      md: `${720 / 16}em`,
      lg: `${1024 / 16}em`,
      xl: `${1280 / 16}em`,
      xxl: `${1920 / 16}em`,

    },
    fontSizes: [
      12, 14, 16, 20, 24, 32, 48, 64
    ],
    colors: {
      blue: '#07c',
      lightgray: '#f6f6ff'
    },
    space: [
      0, 4, 8, 16, 32, 64, 128, 256
    ],
    fonts: {
      body: 'Nunito, sans-serif',
      heading: 'inherit',
      monospace: 'Menlo, monospace',
    },
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700,
    },
    lineHeights: {
      body: 1.5,
      heading: 1.25,
    },
    shadows: {
      small: '0 0 4px rgba(0, 0, 0, .125)',
      large: '0 0 24px rgba(0, 0, 0, .125)'
    },
    variants: {
    },
    text: {
    },
    buttons: {
      primary: {
        color: 'white',
        bg: 'primary',
      }
    },
    textStyles:{
      h1: css`
      color:red;
      `
    }
  }
  
