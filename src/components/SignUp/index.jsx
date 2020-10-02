import React, { useState, useContext } from 'react'
import {Text, Box, Flex} from 'rebass'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Form } from 'react-final-form'
import CircularProgress from '@material-ui/core/CircularProgress';

import {AuthContext} from '../../context/auth'
import { useForm } from "../../util/hooks"
import {REGISTER_USER} from '../../apis'

const WrapperDialog = styled(Box)`
    /* position: absolute; */
    z-index: 140;
    max-width: 720px;
    
    overflow: hidden;
    margin-top: 10%;
    margin-left: auto;
    padding: 50px;

    background: #fff;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
`


export default function SignUp(props){
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({});
    
    const {onChange, onSubmit, values } = useForm(registerUser, {
        firstname: '',
        secondname: '',
        email: '',
        password: '',
        confirmPassword: '',  
    })
    
    const [ addUser, {loading }] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userData}}){
            context.login(userData)
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
            variables: values
    });

    function registerUser(){
        console.log(values)
        addUser();
    }

    return(
        <WrapperDialog >
       <Flex flexDirection="column">
        <Flex>
            <Text mx="auto">
                myEvent
            </Text>
        </Flex>
       <Form onSubmit={onSubmit} render={({handleSubmit, form}) => (
        <form onSubmit={handleSubmit} noValidate lassName={loading ? <CircularProgress/> : ""} >
            <Flex >
                <Box  mx="auto">
                <Flex pt={6}>
                <TextField name="firstname"
                    placeholder="First Name"
                    values={values.firstname}
                    helperText={errors.firstname ? "Error" : false}
                    error={errors.firstname ? true: false}
                    onChange={onChange}
                    />
                </Flex>
                <Flex pt={3}>
                <TextField name="secondname"
                    placeholder="Second name"
                    type="text"
                    values={values.secondname}
                    error={errors.secondname ? true : false}
                    onChange={onChange}/>
                </Flex>
                <Flex pt={3}>
                <TextField
                    name="email"
                    placeholder="Email"
                    type="email"
                    values={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}/>
                </Flex>
                <Flex pt={3}>
                <TextField  name="password"
                    placeholder="Password"
                    type="password"
                    values={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}/> 
                </Flex>
                <Flex pt={3}>
                <TextField name="confirmPassword"
                    placeholder="Confirm password"
                    type="password"
                    values={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                    />
                </Flex>
                <Flex pt={5} >
                <Box mx="auto">
                    <Button type="submit" variant="contained" color="primary" >
                    Submit
                    </Button>
                </Box>
                </Flex>
                </Box>
          </Flex>
        </form>
       )}/>
            <Flex pt={3}>
            <Box mx="auto" >
            <Button  href="/login">
                Back
            </Button>
            </Box>
        </Flex>
        </Flex>
        </WrapperDialog>
    )
}


