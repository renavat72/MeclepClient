import React from 'react'
import { Dialog, TextField, CircularProgress, Button } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import { Form } from 'react-final-form';
import { useMutation, useQuery} from '@apollo/react-hooks'

import {CHANGE_FIRSTNAME, GET_AUTH_USER} from '../../apis/UserAPI'
import { useForm } from "../../util/hooks"
import UploadPhoto from '../UploadPhoto'


function FormEditProfile(data){
    const { onChange, onSubmit, values } = useForm(editProfileCallback, {
        firstName: '',
        secondName: '',
        photo:''
      });
    // Добавить secondname (бек - готов)
      const [changeFirstName, { error }] = useMutation(CHANGE_FIRSTNAME, {
        update(_, result){
          console.log(result)
          values.firstName = ''
        },
        variables: values
      });

      function editProfileCallback(){
        console.log(values)
        changeFirstName()
      }

    return(

        <Box>
            <Form onSubmit={onSubmit} render={({handleSubmit}, form)=>(
                <form onSubmit={handleSubmit}  noValidate className={error ? <CircularProgress/> : ""}>
                    <Flex flexDirection="column">
                        <Flex flexDirection="column">
                        <Flex>
                        <TextField 
                            label="Change first name"  
                            values={values.firstName}
                            onChange={onChange}/>
                        <TextField 
                            label="Change second name" 
                            values={values.secondName}
                            onChange={onChange}/>
                        </Flex>
                        <TextField label="Change email"/>
                        <Flex>
                        <TextField type="password" label="Change password"/>
                        <TextField type="password" label="Confirm password"/>
                        </Flex>
                        </Flex>
                        <Flex>
                        <UploadPhoto authUser={data}/>
                        </Flex>
                        <Flex ml="auto" mt={4}>
                        <Button type="submit" variant="contained">Edit</Button>
                        </Flex>
                    </Flex>
                </form>
            )} />
        </Box>
    )
}

export default function EditProfile(props){ 
      const {editProfileWindow, handleEditProfileWindow} = props;
      const {data} = useQuery(GET_AUTH_USER);
      console.log(data)

      return (
       <Dialog open={editProfileWindow}  onClose={handleEditProfileWindow}>
        <Box  m={4}>
            <Flex mb={4}>
                  <Text>Edit profile</Text>
            </Flex>
            <Flex>
            <FormEditProfile/>
            </Flex>
        </Box>
       </Dialog>
    )
}       
