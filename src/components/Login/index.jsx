import React, {useContext, useState} from 'react'
import {Text, Box, Flex} from 'rebass'
import {Button, TextField, FormHelperText } from '@material-ui/core';
import { Form } from 'react-final-form'
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks'

import {LOGIN_USER} from '../../apis/UserAPI'
import { useForm } from "../../util/hooks"
import {AuthContext} from '../../context/auth'
import InfoSide from '../InfoSide'


export default function Login(props){
    const context = useContext(AuthContext)
    const {setIsLogin} = props;
    const {onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: '',
    })
    const [error, setError] = useState('');
    console.log(error)
    const [loginUser, {loading}] = useMutation (LOGIN_USER, {
        
        update(_, {data:{login: userData}}){
            context.login(userData)
            props.history.push('/login')
        },
        // onError(err){
        //     setErrors(err.graphQLErrors[0].extensions.extension.errors)
        // },
        variables: values
    });
       
    function loginUserCallback(){
        loginUser();

    if (!email || !password) {
        setError('All fields are required');
        return;
      }
  
    }
    const { email, password } = values;

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
        <Flex>
        {error && (
            <Text>
                {error}
            </Text>
          )}
        </Flex>
        <Flex pt={4}  >
            <Text  mx="auto"  onClick={()=>setIsLogin(false)} color="blue">Create account</Text>
        </Flex>
        </Box>
    )
}

