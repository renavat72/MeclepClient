import React,{useState} from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';
import ChatSide from './ChatSide';
import ConversationsSide from './ConversationsSide';


export default function MobileDialog(props){
    console.log(props)
    const [isOpen,setIsOpen] = useState(false)
    return(
        <Box >
            <Flex width="500px" >
             <ConversationsSide setFriendInfo={props.setFriendInfo} authUser={props.authUser} />
             <ChatSide  friendInfo={props.friendInfo} authUser={props.authUser}  messages={props.messages.data ? props.messages.data.getMessages : []}/>
            </Flex>
        </Box>
    )
}