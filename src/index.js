import React from 'react'
import {render} from 'react-dom';
import ApolloClient from 'apollo-client'
import { ThemeProvider } from 'styled-components';
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'

import { StoreProvider } from './context/store';
import theme from './rootLayout/theme';
import App from './App'
import {GlobalStyle} from './rootLayout/GlobalStyle'
import './rootLayout/fonts.css';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const authLink = setContext (() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


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