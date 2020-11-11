import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Dashboard from '../components/Dashboard'
// import Profile from '../components/Profile'
import {AuthProvider} from '../context/auth'
import AuthRoute from '../util/authRoute'
import * as Routes from '../routes';


export default function MainPage(){

    return(
        <div>
            <AuthProvider>
            <BrowserRouter>

                <AuthRoute />
                <Route exact path={Routes.HOME} component={Dashboard}/>
                {/* <Route exact path="/:id" component={Profile} /> */}

            </BrowserRouter>
            </AuthProvider>
        </div>
    )
}