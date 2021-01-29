import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import {AuthProvider} from '../context/auth'
import AuthRoute from '../util/authRoute'

export default function MainPage(){


    return(
        <div>
            <AuthProvider>
                <BrowserRouter history={history}>
                    <AuthRoute />
                    <Switch  location={background || location}>
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}