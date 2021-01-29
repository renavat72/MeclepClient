import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { ModalContainer } from 'react-router-modal';

import {AuthProvider} from '../src/context/auth'
import AuthRoute from '../src/util/authRoute'
import styled from 'styled-components';
import ProfileWindow from './components/Profile';

const Root = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 0 auto;
  font-family: "Nunito", sans-serif;

`

export default function App() {

  return (
    <Root>
      <AuthProvider>
                <BrowserRouter>
                    <AuthRoute />
                    <Switch>
                    <Route path={`/id:id`} component={ProfileWindow} />
                    </Switch>
                      <ModalContainer/>
                </BrowserRouter>
            </AuthProvider>
    </Root>
  );
}


