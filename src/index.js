import React from 'react'
import {render} from 'react-dom';
import { ThemeProvider } from 'styled-components';
import {ApolloProvider} from '@apollo/react-hooks'

import { StoreProvider } from './context/store';
import createApolloClient from './apollo-client'
import theme from './rootLayout/theme';
import App from './App'
import {GlobalStyle} from './rootLayout/GlobalStyle'
import './rootLayout/fonts.css';

const API_URL = 'https://augmented-path-304210.ey.r.appspot.com/graphql'||'http://localhost:8081/graphql'
const WEBSOCKET_API_URL ='ws://localhost:8081/graphql'


const websocketApiUrl = WEBSOCKET_API_URL
? WEBSOCKET_API_URL
: API_URL.replace('https://', 'ws://').replace('http://', 'ws://');


const apolloClient = createApolloClient(API_URL, websocketApiUrl);

render(
    <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
            <GlobalStyle />
                <StoreProvider>
                    <App/>
                </StoreProvider>
            </ThemeProvider>
    </ApolloProvider>,
    document.getElementById('root')
)