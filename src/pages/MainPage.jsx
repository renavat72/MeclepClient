import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Dashboard from '../components/Dashboard'
import Map from '../components/Map'

import {AuthProvider} from '../context/auth'
import AuthRoute from '../util/authRoute'
import { Box, Flex } from 'rebass'

export default function MainPage(){

    return(
        <Box width={1}>
            <Flex >
            <AuthProvider>
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <AuthRoute  path="/login" component={Login} />
                <AuthRoute  path="/registration" component={SignUp} />
            </Switch>
            </BrowserRouter>
            </AuthProvider>
            </Flex>
        </Box>
    )
}