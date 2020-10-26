import React from 'react'
import {render} from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App'
import ApolloClient from 'apollo-client'
import ApolloLink from 'apollo-client'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'
import { StoreProvider } from './context/store';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from '@apollo/client/link/ws';




export default function createApolloClient(httpLink, websocketApiUrl){
    const authLink = setContext (() => {
        const token = localStorage.getItem('jwtToken');
        return {
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        }
    })
    const wsLink = new WebSocketLink({
        uri: websocketApiUrl,
        options: {
          timeout: 60000,
          reconnect: true,
          connectionParams: {
            authorization: authLink,
          },
        },
      });
    
    const uploadLink = createUploadLink({ uri: httpLink }); 
    return new ApolloClient({
        link:  ApolloLink.from([authLink,uploadLink, wsLink]),
        cache: new InMemoryCache()
      });
}
