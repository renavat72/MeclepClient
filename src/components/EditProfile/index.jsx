import React,{useState} from 'react'
import { Dialog, TextField, CircularProgress, Button, Chip, IconButton } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import { Form } from 'react-final-form';
import { useMutation, useQuery} from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

import {CHANGE_FIRSTNAME, GET_AUTH_USER} from '../../apis/UserAPI'
import { useForm } from "../../util/hooks"
import UploadPhoto from '../UploadPhoto'


function FormEditProfile({data}){
    const { onChange, onSubmit, values } = useForm(editProfileCallback, {
        currentFirstName: data && data.getAuthUser.firstName,
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
                    <Flex flexDirection="column"  mt={5}>
                        <Flex flexDirection="column">
                          <Flex flexDirection="column">
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
                          <Flex flexDirection="column">
                            <TextField type="password" label="Change password"/>
                            <TextField type="password" label="Confirm password"/>
                          </Flex>
                          <Flex mt={3} flexDirection="row">
                           <Text my="auto" mr={2}>I like:</Text>
                           <Chip color="primary" label={`Party`}/>
                            
                            {/* <TextField type="password" label="Confirm password"/> */}
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
        <Box   minWidth={["500px","700px"]} minHeight="470px">
            <Flex flexDirection="row" width={1}>
              <Box width={1/2}>
            
                <FormEditProfile data={data}/>
              </Box>
              <Box width={1/2}>
                <UploadPhoto data={data}/>
              </Box>
            </Flex>
        </Box>
        </Box>
       </Dialog>
    )
}