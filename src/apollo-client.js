
import {InMemoryCache} from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from '@apollo/client/link/ws';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities'
import { split } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';

export default function createApolloClient(urlServer, websocketApiUrl){

  let uploadLink = createUploadLink({ uri: urlServer }); 
  const token =  localStorage.getItem('jwtToken')

  const authLink = setContext((_, { headers }) => {
    const token =  localStorage.getItem('jwtToken')
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  });

  const wsLink = new WebSocketLink({
    uri:websocketApiUrl,
      options: {
        timeout: 60000,
        reconnect: true,
        connectionParams: {
          Authorization: token ? `Bearer ${token}` : ''
        },
      },
    });
  
  const splitLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    uploadLink = authLink.concat(uploadLink),
  )
  return new ApolloClient({
    link:splitLink,
    cache: new InMemoryCache()
  });
} 
