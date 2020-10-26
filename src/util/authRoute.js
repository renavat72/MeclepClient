import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'

import {AuthContext} from '../context/auth'
import Authorization from '../components/Authorization'

function AuthRoute ({component: Component, ...rest}){
    const {user} = useContext(AuthContext)

    return(
        <Route
            {...rest}
            render={props =>
                user ? <Redirect to="/"/> : <Route exact path="/authorization" component={Authorization}/>
            }
        />
    )
}

export default AuthRoute;