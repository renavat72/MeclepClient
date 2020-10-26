import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import { createGlobalStyle } from 'styled-components';

import Dashboard from '../components/Dashboard'
// import Profile from '../components/Profile'
import {AuthProvider} from '../context/auth'
import AuthRoute from '../util/authRoute'

const GlobalStyle = createGlobalStyle`
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
    font-family: open sans;
   
  }

  #root {
    position: relative;
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
`;

export default function MainPage(){

    return(
        <div>
           
            <AuthProvider>
            <BrowserRouter>
            <GlobalStyle />

                <AuthRoute />
                <Route exact path="/" component={Dashboard}/>
                {/* <Route exact path="/:id" component={Profile} /> */}

            </BrowserRouter>
            </AuthProvider>
        </div>
    )
}