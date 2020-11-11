import React from 'react';
import MainPage from './pages/MainPage';
import styled from 'styled-components';
// import theme from './theme'

const Root = styled.div`
  margin: 0 auto;
  width: 100%;
  /* position: relative; */
  padding: 0 auto;


`


function App() {
  return (
    <Root>
      <MainPage/>
    </Root>
  );
}

export default App;
