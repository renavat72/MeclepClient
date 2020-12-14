import React,{useRef} from 'react'
import {BrowserRouter, Route, Switch,  useHistory,
    useLocation,
    useParams} from 'react-router-dom'
    import { createMemoryHistory } from 'history'

import Dashboard from '../components/Dashboard'
// import Profile from '../components/Profile'
import {AuthProvider} from '../context/auth'
import AuthRoute from '../util/authRoute'
import * as Routes from '../routes';
import DialogWindow from '../components/Dialog'

export default function MainPage(){
    let location = useLocation();
    let background = location.state && location.state.background;
    const history = createMemoryHistory()

    return(
        <div>
            <AuthProvider>
                <BrowserRouter history={history}>
                    <AuthRoute />
                    <Switch  location={background || location}>
                    {/* <Route exact path="/dialog" ><DialogWindow/></Route> */}
                    {/* <Route exact path="/:id" component={Profile} /> */}
                    <Route exact path={Routes.HOME} component={Dashboard}/>
                    </Switch>
                    {background && <Route path="/dialog" children={<DialogWindow />} />}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}