import React, {useContext} from 'react'
import {Text, Box, Flex} from 'rebass'
import {Button, TextField } from '@material-ui/core';
import { Form } from 'react-final-form'
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks'

import {LOGIN_USER} from '../../apis'
import { useForm } from "../../util/hooks"
import {AuthContext} from '../../context/auth'

const WrapperDialog = styled(Box)`
    box-sizing: border-box;
    max-width: 720px;
    overflow: hidden;
    margin-top: 15%;
    margin-left: auto;
    padding: 50px;

    background: #fff;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
`

export default function Login(props){
    const context = useContext(AuthContext)

    const {onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: '',
    })

    const [loginUser, {loading}] = useMutation (LOGIN_USER, {
        update(_, {data:{login: userData}}){
            context.login(userData)
            props.history.push('/login')
        },
        variables: values
    });

    function loginUserCallback(){
        loginUser();
    }

    return(
        <WrapperDialog >
       <Flex flexDirection="column"my="auto">
        <Flex>
            <Text mx="auto">
                myEvent
            </Text>
        </Flex>
        <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""} render={({form, handleSubmit}) => (
            <form onSubmit={handleSubmit}>
            <Box  mx="auto">
            <Flex pt={6}>
            <TextField name="email"
              placeholder="Email"
              type="email"
              value={values.email}
              error={loading ? "Invalid login" : false}
              onChange={onChange}
                    />
            </Flex>
            <Flex pt={3}>
            <TextField name="password"
               placeholder="Password"
              type="password"
              value={values.password}
              error={loading ? "Invalid password" : false}
              onChange={onChange}/>
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
            {/* {loading && (
                <div>
                    <ul>
                        <li>
                            {loading.gtaphQLErrors[0].message}
                        </li>
                    </ul>
                </div>
            )} */}
        </Flex>
        <Flex pt={4}mx="auto">
            <Text>New user? <a href="/registration">Create account</a></Text>
        </Flex>
        </Flex>
        </WrapperDialog>
    )
}

