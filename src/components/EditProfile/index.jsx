import React,{useState} from 'react'
import { Dialog, TextField, Button,  IconButton } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import { Form } from 'react-final-form';
import { useMutation, useQuery} from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

import {GET_AUTH_USER} from '../../apis/UserAPI'
import {CHANGE_FIRSTNAME, CHANGE_SECONDNAME, CHANGE_EMAIL, CHANGE_PASSWORD} from '../../apis/EditUserAPI'
import { useForm } from "../../util/hooks"
import UploadPhoto from '../UploadPhoto'


function FormEditProfile({data}){
    const { onChange, onSubmit, values } = useForm(editProfileCallback, {
        id:data&&data.getAuthUser.id,
        firstName:'',
        secondName: '',
        email:'',
        password:'',
        confirmPassword:'',
      });
    const [changeFirstName] = useMutation(CHANGE_FIRSTNAME, {
        variables:{
          id:values.id,
          newFirstName:values.firstName, 
        },
      });
    const [changeSecondName] = useMutation(CHANGE_SECONDNAME, {
        variables:{
          id:values.id,
          newSecondName:values.secondName, 
        }
      });
    const [changeEmail] = useMutation(CHANGE_EMAIL, {
        variables:{
          id:values.id,
          newEmail:values.email, 
        }
      });
    const [changePassword] = useMutation(CHANGE_PASSWORD, {
        variables:{
          id:values.id,
          newPassword:values.password, 
        }
      });
    function editProfileCallback(){
      if(values.firstName) return changeFirstName()
      if(values.secondName) return changeSecondName()
      if(values.email) return changeEmail()
      if(values.password && values.confirmPassword) return changePassword()
      }
    if (!data){
      return null;
    }else {
      return(
        <Box>
            <Form onSubmit={onSubmit} render={({handleSubmit}, form)=>(
                <form onSubmit={handleSubmit}  noValidate >
                    <Flex flexDirection="column"  mt={5}>
                        <Flex flexDirection="column">
                          <Flex flexDirection="column">
                          <TextField 
                              name="firstName"
                              label="Change first name"
                              values={values.firstName}
                              onChange={onChange}/>
                          <TextField 
                              name="secondName"
                              label="Change second name"
                              values={values.secondName}
                              onChange={onChange}/>
                          </Flex>
                          <TextField 
                              name="email"
                              label="Change email"
                              values={values.email}
                              onChange={onChange}/>
                          <Flex flexDirection="column">
                            <TextField 
                              name="password"
                              type="password" 
                              label="Change password"
                              values={values.password}
                              onChange={onChange}/>
                            <TextField name="confirmPassword"
                              type="password" 
                              label="Confirm password"
                              values={values.confirmPassword}
                              onChange={onChange}/>
                          </Flex>
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
}

export default function EditProfile(props){
  const [isOpen, setIsOpen] = useState(true);
  const {data} = useQuery(GET_AUTH_USER);
    const {url} =useRouteMatch()
    if(!data) return null

    function handleOpen(){
          setIsOpen(false);
          window.history.pushState('', '', `${url}`);
    }   
     return (
       <Dialog open={isOpen}  onClose={()=>handleOpen()}   maxWidth="xl">
         <Box mx={3} my={2}>
           <Flex mb={1} justifyContent="space-between"  >
              <Text  fontWeight='bold' my="auto">Edit profile</Text>
                <IconButton onClick={()=>handleOpen()} >
                  <CloseIcon variant="second"/>
                </IconButton>
           </Flex>
        <Box   minWidth={["270px","700px"]} minHeight="470px">
            <Flex flexDirection={["column-reverse","row"]} width={1}>
              <Box width={[1,1/2]}>
                <FormEditProfile data={data}/>
              </Box>
              <Box width={[1,1/2]}>
                <UploadPhoto data={data}/>
              </Box>
            </Flex>
        </Box>
        </Box>
       </Dialog>
    )
}