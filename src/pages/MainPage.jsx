import React,{useRef} from 'react'
import {BrowserRouter} from 'react-router-dom'

import Dashboard from '../components/Dashboard'
// import Profile from '../components/Profile'
import {AuthProvider} from '../context/auth'
import AuthRoute from '../util/authRoute'

export default function MainPage(){


    return(
        <div>
            <AuthProvider>
                <BrowserRouter history={history}>
                    <AuthRoute />
                    <Switch  location={background || location}>
                    {/* <Route exact path="/dialog" ><DialogWindow/></Route> */}
                    {/* <Route exact path="/:id" component={Profile} /> */}
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}