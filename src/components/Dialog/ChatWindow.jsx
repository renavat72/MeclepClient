import React, {useContext, useState, useCallback, useEffect} from 'react'
import { Dialog } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { Form } from 'react-final-form'
import { useRouteMatch } from 'react-router-dom';

import {  CREATE_MESSAGE} from '../../apis/MessageAPI'

export default function ChatWindow(user, {authUser}, handleOpen,handleOpenChat,alert){
    const [textMessage, setTextMessage ] = useState('');
    const {url} =useRouteMatch()
          
    const [isOpen, setIsOpen] = useState(true)

    function handleOpen(){
          setIsOpen(false);
          window.history.pushState('', '', `${url}`);

    }
    const [createMessage] = useMutation(CREATE_MESSAGE, {
          update(_, result){
          console.log(result)
        },
        variables: {
          input: {
            sender: user.authUser.authUser||user.authUser,
            receiver: user.user ?user.user.id||user.user : null,
            message: textMessage,
          }
          },
      },)
      console.log(user)

      const onSubmit =() =>{
        if (!textMessage) return;
        createMessage()
        setTextMessage('');
        // user.alert()
      }

      const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
          onSubmit();
        }
      };
  
    return(
        <Dialog  maxWidth="xl" open={isOpen}  onClose={handleOpen}>
        <Flex flexDirection="row" minWidth={["200px","300px"]} minHeight="200px" m={2}>
            <Flex flexDirection="row">
            <Text>{user.user.firstName}</Text>
            <Text>{user.user.secondName}</Text>
            </Flex>
        <Flex mt="auto">
        <Form onSubmit={onSubmit} render={({handleSubmit}) => (
                  <form onSubmit={handleSubmit} >
                    <Flex>
                        <TextField 
                         
                          value={textMessage} 
                          onChange={(e)=> setTextMessage(e.target.value)} 
                          onKeyDown={onEnterPress}
                          />
                      <Box ml="auto">
                        <Button variant="contained" color="primary" type="submit" onClick={handleOpen}>Send</Button>
                      </Box>
                      </Flex>
                  </form>
                )}/>
        </Flex>
        </Flex>         
        </Dialog>
    )
}