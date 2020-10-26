import React, { useState, useContext } from 'react'
import {Text, Box, Flex} from 'rebass'
import { useMutation } from '@apollo/react-hooks'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Form } from 'react-final-form'
import CircularProgress from '@material-ui/core/CircularProgress';

import {AuthContext} from '../../context/auth'
import { useForm } from "../../util/hooks"
import {REGISTER_USER} from '../../apis/UserAPI'


export default function SignUp(props){
    const {setIsLogin} = props;
    const context = useContext(AuthContext)
    const [errors ] = useState({});
    
    const {onChange, onSubmit, values } = useForm(registerUser, {
        firstName: '',
        secondName: '',
        email: '',
        password: '',
        confirmPassword: '',  
    })
    
    const [ addUser, {loading }] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userData}}){
            context.login(userData)
            props.history.push('/')
        },
        // onError(err){
        //     setErrors(err.graphQLErrors[0].extensions.exception.errors);
        // },
            variables: values
    });

    function registerUser(){
        console.log(values)
        addUser();
    }

    return(
     <Box>
       <Form onSubmit={onSubmit} render={({handleSubmit, form}) => (
        <form onSubmit={handleSubmit} noValidate lassName={loading ? <CircularProgress/> : ""} >
            <Flex >
                <Box  mx="auto">
                <Flex pt={6}>
                <TextField name="firstName"
                    placeholder="First Name"
                    values={values.firstName}
                    helperText={errors.firstName ? "Error" : false}
                    error={errors.firstName ? true: false}
                    onChange={onChange}
                    />
                </Flex>
                <Flex pt={3}>
                <TextField name="secondName"
                    placeholder="Second name"
                    type="text"
                    values={values.secondName}
                    error={errors.secondName ? true : false}
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
            <Button  onClick={()=>setIsLogin(true)}>
                Back
            </Button>
            </Box>
        </Flex>
    </Box>
    )
}


