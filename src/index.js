import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import './i18n';
import CircularProgress from '@material-ui/core/CircularProgress';

import { StoreProvider } from './context/store';
import createApolloClient from './apollo-client';
import theme from './rootLayout/theme';
import App from './App';
import './rootLayout/fonts.css';
import './index.css'
// 'http://localhost:8081/graphql'||'ws://localhost:8081/graphql'||
const API_URL = 'http://localhost:8081/graphql'||'ws://localhost:8081/graphql';
  // 'http://80.78.255.7:8081/graphql'||'ws://80.78.255.7:8081/graphql';
const WEBSOCKET_API_URL = 'ws://localhost:8081/graphql'; 
// 'ws://80.78.255.7:8081/graphql';

const websocketApiUrl = WEBSOCKET_API_URL
  ? WEBSOCKET_API_URL
  : API_URL.replace('https://', 'wss://').replace('http://', 'wss://');

const apolloClient = createApolloClient(API_URL, websocketApiUrl);

render(
  <ApolloProvider client={apolloClient}>
      <Suspense fallback={<div className="Suspense"><CircularProgress /></div>}>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ThemeProvider>
      </Suspense>
  </ApolloProvider>,
  document.getElementById('root'),
);
