import React,{useState, useEffect, useRef} from 'react'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { Form } from 'react-final-form'

import {  CREATE_MESSAGE} from '../../apis/MessageAPI'


const InputBlock = styled(Flex)`
background-color: #f8f8f8;
border: 1px solid #e5e5e5;
`
const DialogBlock = styled(Flex)`
flex-direction:column;
height: 400px;
overflow-x: hidden;
`
const Message = styled(Text)`
width:fit-content;
background-color: ${(p) => p.userMessage ? "#8dabd8":"gray"};
border-radius: 8px; 
padding: 10px;
`

export default function ChatSide(props){
  const {friendInfo, authUser, messages} = props;
  const [textMessage, setTextMessage ] = useState('');
  const bottomRef = useRef(null);
  const [createMessage] = useMutation(CREATE_MESSAGE, {
        update(_, result){
        console.log(result)
      },
      variables: {
        input: {
          sender: authUser,
          receiver: friendInfo ? friendInfo : null,
          message: textMessage,
        }
        },
    },)

    useEffect(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView();
      }
    }, [bottomRef, messages]);

    const onSubmit =() =>{
      if (!textMessage) return;
      createMessage()
      setTextMessage('')
    }

    const onEnterPress = (e) => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        onSubmit();
      }
    };

    return(
        <Flex flexDirection="column" width={5/6}>
        <DialogBlock >
            {messages<= 0 ? <Flex m="auto">
                <Text textAlign="center" fontWeight='bold'  color="#aaa">Select a chat</Text>
              </Flex> :
                      messages.map((message) =>{
                      const isAuthUserReceiver = authUser === message.sender.id;
                      return(
                      <Flex flexDirection="column" width={1} pr={1} userMessage={isAuthUserReceiver} key={message.id} pt={2}>
                            {isAuthUserReceiver ? 
                                  <Text mb={2} ml="auto">{message.sender.firstName}</Text>
                                  : <Text mb={2} mr="auto">{message.sender.firstName}</Text>
                              }
                                  <Message 
                                      ml={isAuthUserReceiver? "auto":null}
                                      userMessage={isAuthUserReceiver}>
                                      {message.message}
                                  </Message>
                    </Flex>
                  )
              }
          )
         }
        <div ref={bottomRef} />
       </DialogBlock>
        { messages <=0 ? null:  
        <InputBlock width={1} p={3} flexDirection="column">
                <Form onSubmit={onSubmit} render={({handleSubmit}) => (
                  <form onSubmit={handleSubmit} >
                    <Flex>
                        <TextField 
                          fullWidth
                          value={textMessage} 
                          onChange={(e)=> setTextMessage(e.target.value)} 
                          onKeyDown={onEnterPress}
                          />
                      <Box px={3}>
                        <Button variant="contained" color="primary" type="submit" >Send</Button>
                      </Box>
                      </Flex>
                  </form>
                )}/>
              </InputBlock>}
   </Flex>
    )
        }
