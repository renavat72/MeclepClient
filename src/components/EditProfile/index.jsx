import React,{useState} from 'react'
import { Dialog, TextField, CircularProgress, Button } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import { Form } from 'react-final-form';
import { useMutation, useQuery} from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom';

import {CHANGE_FIRSTNAME, GET_AUTH_USER} from '../../apis/UserAPI'
import { useForm } from "../../util/hooks"
import UploadPhoto from '../UploadPhoto'


function FormEditProfile(props){
    const {data} = useQuery(GET_AUTH_USER);
    const { onChange, onSubmit, values } = useForm(editProfileCallback, {
        currentFirstName: data&& data.getAuthUser.firstName,
        newFirstName: '',
        secondName: '',
        photo:''
      });
    // Добавить secondname (бек - готов)

    const [changeFirstName, { error }] = useMutation(CHANGE_FIRSTNAME, {
        update(_){
          values.newFirstName = ''
        },
        variables: values,
      });

    function editProfileCallback(){
        changeFirstName()
      }
    if (!data){
      return null;
    }else {
      return(
        <Box>
            <Form onSubmit={onSubmit} render={({handleSubmit}, form)=>(
                <form onSubmit={handleSubmit}  noValidate className={error ? <CircularProgress/> : ""}>
                    <Flex flexDirection="column">
                        <Flex flexDirection="column">
                        <Flex>
                        <TextField 
                            label="Change first name"
                            values={values.newFirstName}
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
                        </Flex>
                        <Flex ml="auto" mt={4}>
                        <Button type="submit" variant="contained">Edit</Button>
                        </Flex>
                    </Flex>
                </form>
            )} />
            <UploadPhoto authUser={data.getAuthUser}/>
        </Box>
    )
  }
}

export default function EditProfile(props){
  const [isOpen, setIsOpen] = useState(true);
    const {url} =useRouteMatch()

    function handleOpen(){
          setIsOpen(false);
          window.history.pushState('', '', `${url}`);
    }   
     return (
       <Dialog open={isOpen}  onClose={()=>handleOpen()} >
        <Box  m={4}>
            <Flex mb={4}>
                  <Text>Edit profile</Text>
            </Flex>
            <Flex>
            <FormEditProfile />
            </Flex>
        </Box>
       </Dialog>
    )
}