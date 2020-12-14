import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../src/components/Dashboard'
// import Profile from '../components/Profile'
import {AuthProvider} from '../src/context/auth'
import AuthRoute from '../src/util/authRoute'
import * as Routes from '../src/routes';
import DialogWindow from '../src/components/Dialog'

import styled from 'styled-components';
// import theme from './theme'

const Root = styled.div`
  margin: 0 auto;
  width: 100%;
  /* position: relative; */
  padding: 0 auto;


`
export default function App() {
  return (
    <Root>
      <AuthProvider>
                <BrowserRouter>
                    <AuthRoute />
                    <Switch  >
                    <Route exact path="/dialog" ><DialogWindow/></Route>
                    {/* <Route exact path="/:id" component={Profile} /> */}
                    </Switch>
                    <Route exact path={Routes.HOME} component={Dashboard}/>
                </BrowserRouter>
            </AuthProvider>
    </Root>
  );
}


