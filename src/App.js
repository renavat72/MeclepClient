import React,{useState} from 'react'
import {BrowserRouter, Route, Switch, useHistory,useRouteMatch } from 'react-router-dom'
import { ModalContainer, ModalRoute } from 'react-router-modal';

import Dashboard from '../src/components/Dashboard'
// import Profile from '../components/Profile'
import {AuthProvider} from '../src/context/auth'
import AuthRoute from '../src/util/authRoute'
import * as Routes from '../src/routes';
import DialogWindow from '../src/components/Dialog'
import Profile from '../src/components/Profile'

import styled from 'styled-components';
import FriendsWindow from './components/FriendsWindow';
// import theme from './theme'

const Root = styled.div`
  margin: 0 auto;
  width: 100%;
  /* position: relative; */
  padding: 0 auto;
  font-family: "Nunito", sans-serif;

`

export default function App() {
  const history = useHistory();
  // const {url} =useRouteMatch()


  return (
    <Root>
      <AuthProvider>
                <BrowserRouter>
                    <AuthRoute />
                    <Switch>
                    </Switch>
                      {/* <Route exact  path="/home" component={Dashboard}/> */}
                        {/* <Route path={`/friends`} children={<FriendsWindow />} /> */}
                  {/* <ModalRoute component={DialogWindow} path='/dialog'/> */}
                        {/* <ModalRoute  path="/:id" component={Profile} /> */}
                      <ModalContainer/>
                </BrowserRouter>
            </AuthProvider>
    </Root>
  );
}


