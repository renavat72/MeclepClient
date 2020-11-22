import React, {useContext, useState} from 'react'
import {Text, Box, Flex} from 'rebass'
import {Button, TextField } from '@material-ui/core';
import { Form } from 'react-final-form'
import { useMutation } from '@apollo/react-hooks'

import {LOGIN_USER} from '../../apis/UserAPI'
import { useForm } from "../../util/hooks"
import {AuthContext} from '../../context/auth'


export default function Login(props){
    const context = useContext(AuthContext)
    const {setIsLogin} = props;
    const {onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: '',
    })
    const [error, setError] = useState('');
    const [loginUser, {loading}] = useMutation (LOGIN_USER, {
        update(_, {data:{login: userData}}){
            context.login(userData)
            // props.history.push('/login')
        },
        onError(error){
            setError(error.graphQLErrors[0].message);
            if (!values.email || !values.password) {
                setError('All fields are required');
                return;
              }
        },
        variables: values
    });

    function loginUserCallback(){
        loginUser();

    }

    return(
        <Box>
        <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""} render={({form, handleSubmit}) => (
            <form onSubmit={handleSubmit}>
            <Box  mx="auto">
            <Flex pt={6}>
            <TextField name="email"
              placeholder="Email"
              type="email"
              value={values.email}
              onChange={onChange}
                    />
            </Flex>
            <Flex pt={3}>
            <TextField name="password"
               placeholder="Password"
              type="password"
              value={values.password}
              onChange={onChange}
              />
            </Flex>
            </Box>
            <Flex pt={5} >
                <Box mx="auto">
                  <Button type="submit"  variant="contained" color="primary" >Sign In</Button>
                </Box>
            </Flex>
        </form>
        )}/>
        <Flex pt={4}>
            {error && (
                <Box mt={4}mx="auto">
                    <Text>
                        {error}
                    </Text>
                </Box>
            )}
            <Box mx="auto">
                <Button color="primary" onClick={()=>setIsLogin(false)} >
                Create account
                </Button>  
            </Box>
        </Flex>
        </Box>
    )
}

