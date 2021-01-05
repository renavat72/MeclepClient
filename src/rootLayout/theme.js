import { css } from 'styled-components';
// get from https://github.com/styled-components/styled-components/blob/master/packages/styled-components/docs/tips-and-tricks.md

const sizes ={
  xs: `${375 / 16}em`, // 23em
  sm: `${540 / 16}em`, //  34em
  md: `${720 / 16}em`, // 45em
  lg: `${1024 / 16}em`, // 64em
  xl: `${1280 / 16}em`, // 80em
  xxl: `${1920 / 16}em`, // 120em

};
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})
 export default {
  
    breakpoints: [{
      xs: `${375 / 16}em`,
      sm: `${540 / 16}em`,
      md: `${720 / 16}em`,
      lg: `${1024 / 16}em`,
      xl: `${1280 / 16}em`,
      xxl: `${1920 / 16}em`,
    }],
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
      body: 600,
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
  
