import React from 'react'
import { Dialog, TextField, IconButton, CircularProgress, Button } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Form } from 'react-final-form';
import { useMutation} from '@apollo/react-hooks'

import {CHANGE_FIRSTNAME, CHANGE_SECONDNAME} from '../../apis'
import { useForm } from "../../util/hooks"

function FormEditProfile(){
    const { onChange, onSubmit, values } = useForm(editProfileCallback, {
        firstname: '',
        secondname: ''
      });
    // Добавить secondname (бек - готов)
      const [changeFirstname, { error }] = useMutation(CHANGE_FIRSTNAME, {
        update(_, result){
          console.log(result)
          values.firstname = ''
        },
        variables: values
      })

      function editProfileCallback(){
        console.log(values)
        changeFirstname()
      }


    return(

        <Box>
            <Form onSubmit={onSubmit} render={({handleSubmit}, form)=>(
                <form onSubmit={handleSubmit}  noValidate lassName={error ? <CircularProgress/> : ""}>
                    <Flex flexDirection="column">
                        <Flex flexDirection="column">
                        <Flex>
                        <TextField 
                            label="Change first name"  
                            values={values.firstname}
                            onChange={onChange}/>
                        <TextField 
                            label="Change second name" 
                            values={values.secondname}
                            onChange={onChange}/>
                        </Flex>
                        <TextField label="Change email"/>
                        <Flex>
                        <TextField type="password" label="Change password"/>
                        <TextField type="password" label="Confirm password"/>
                        </Flex>
                        </Flex>
                        <Flex>
                        <input accept="image/*" id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                            </label>   
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
