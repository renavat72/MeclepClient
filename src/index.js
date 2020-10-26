import React from 'react'
import {render} from 'react-dom';
import theme from './theme';
import App from './App'
import ApolloClient from 'apollo-client'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'
import { StoreProvider } from './context/store';


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
        <ApolloHooksProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <StoreProvider>
                    <App/>
                </StoreProvider>
            </ThemeProvider>
        </ApolloHooksProvider>
    </ApolloProvider>,
    document.getElementById('root')
)