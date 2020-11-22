import React, { useState, useContext } from 'react'
import { Box, Flex, Text} from 'rebass'
import { useMutation } from '@apollo/react-hooks'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Form } from 'react-final-form'
import CircularProgress from '@material-ui/core/CircularProgress';

import {AuthContext} from '../../context/auth'
import { useForm } from "../../util/hooks"
import {REGISTER_USER} from '../../apis/UserAPI'
import {Validate} from '../validate'

export default function SignUp(props){
    const {setIsLogin} = props;
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState([]);
    
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
            variables: values
    });

    function registerUser(){
        const errors = Validate(values.email,values.firstName,values.secondName, values.password, values.confirmPassword);
        if (errors) {
            setErrors(errors);
            return false;
          }
        addUser();
    }
    console.log(errors)
    return(
     <Box>
       <Form onSubmit={onSubmit} render={({handleSubmit, form}) => (
        <form onSubmit={handleSubmit} noValidate className={loading ? <CircularProgress/> : ""} >
            <Flex >
                <Box  mx="auto">
                <Flex pt={6}>
                <TextField name="firstName"
                    placeholder="First Name"
                    values={values.firstName}
                    onChange={onChange}
                    />
                </Flex>
                <Flex pt={3}>
                <TextField name="secondName"
                    placeholder="Second name"
                    type="text"
                    values={values.secondName}
                    onChange={onChange}/>
                </Flex>
                <Flex pt={3}>
                <TextField
                    name="email"
                    placeholder="Email"
                    type="email"
                    values={values.email}
                    onChange={onChange}/>
                </Flex>
                <Flex pt={3}>
                <TextField  name="password"
                    placeholder="Password"
                    type="password"
                    values={values.password}
                    onChange={onChange}/> 
                </Flex>
                <Flex pt={3}>
                <TextField name="confirmPassword"
                    placeholder="Confirm password"
                    type="password"
                    values={values.confirmPassword}
                    onChange={onChange}
                    />
                </Flex>
                <Flex>
                {errors && (
                    <Box mt={4}mx="auto">
                        <Text>
                            {errors}
                        </Text>
                    </Box>
                )}
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


