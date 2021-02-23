import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  height: -webkit-fill-available;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin:0 auto;
  font-family: open sans;
}
:link{
  text-decoration:none;
  /* color: inherit; */
  color: #000;

  /* color: #000 ; */
}
a:visited { color: inherit; }

#root {
  position: relative;
  min-height: 100vh;
  min-height: -webkit-fill-available;
}
`;
