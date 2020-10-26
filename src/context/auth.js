import React, { useReducer, createContext, useContext } from 'react'
import jwtDecode from 'jwt-decode'

export const initialState ={
    user: null
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

    if(decodedToken.exp * 10000 < Date.now()){
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext ({
    user: null,
    login: (userData) => {},
    logout: ()=>{}
})

export function authReducer(state = initialState, action){
    switch (action.type){
        case "LOGIN":
            return {
                ...state,
                user: action.payload
            }
        case "LOGOUT": 
            return{
                ...state,
                user:null
            }
            default:
                return state;
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData){
        localStorage.setItem("jwtToken", userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout(){
        localStorage.removeItem("jwtToken")
        dispatch ({type: 'LOGOUT'});
    }

    return(
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            {...props} />
    )
}

export {AuthContext, AuthProvider}
export const useStore = () => useContext(AuthContext);