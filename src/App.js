import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModalContainer } from 'react-router-modal';

import { AuthProvider } from '../src/context/auth';
import AuthRoute from '../src/util/authRoute';
import ProfileWindow from './components/Profile';

export default function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <AuthRoute />
          <Switch>
            <Route path={`/id:id`} component={ProfileWindow} />
          </Switch>
          <ModalContainer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
