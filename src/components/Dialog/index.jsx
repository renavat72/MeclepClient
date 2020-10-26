import React, {useContext, useState} from 'react'
import Button from '@material-ui/core/Button';
import { Dialog, TextField } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import {GET_CONVERSATIONS, GET_MESSAGES} from '../../apis/MessageAPI'
// import {GET_AUTH_USER} from '../../apis/UserAPI'

import { AuthContext } from '../../context/auth'


const FriendsSide = styled(Flex)`

    background-color: #f8f8f8;
    box-shadow: 0 0 15px rgba(0,0,0,0.08);
`
const FriendsBlock = styled(Flex)`
     border-top: 1px solid #e5e5e5;
     box-sizing: border-box;
     cursor: pointer;
     max-height: 400px;
     overflow: auto;

     :hover {
        background-color: #a0b9de;
        transition: opacity 0.6s;
        opacity: 0.9;
     };
     :active {
        background-color: #a0b9de;
        transition: opacity 0.6s;
        opacity: 0.9;
}
`



const InputBlock = styled(Flex)`
     background-color: #f8f8f8;
     border: 1px solid #ececec;
     box-sizing: border-box;
     cursor: pointer;
`
const DialogBlock = styled(Flex)`
    min-height: 400px;
    overflow: auto;
    box-sizing: border-box;
`

export default function DialogWindow(props){
      const authUser = useContext(AuthContext)

      const {dialogWindow, handleDialogWindow} = props;    
      const [friendInfo, setFriendInfo] = useState()
    //   const {data} = useQuery(GET_AUTH_USER);
    //     console.log(friendInfo)

      return (
       <Dialog open={dialogWindow}  onClose={handleDialogWindow}  maxWidth="lg">
        <Box  maxWidth="900px" css="box-sizing: border-box;">
            <Flex flexDirection="row" >
              <DialogFriendsSide setFriendInfo={setFriendInfo} authUser={authUser}/>
               <DialogSide friendInfo={friendInfo} authUser={authUser.user.id}/>
            </Flex>
        </Box>
       </Dialog>
    )
}        

function DialogSide(props){
    const {friendInfo, authUser} = props;
    const variables = {
        authUserId: authUser,
        userId: friendInfo
      };   
    const { data} = useQuery(GET_MESSAGES,{variables})
    // const client = useApolloClient();

    // const updateMessageSeen = useCallback(async () => {
    //     try {
    //       await client.mutate({
    //         mutation: UPDATE_MESSAGE_SEEN,
    //         variables: {
    //           input: {
    //             receiver: authUser.id,
    //             sender: friendInfo,
    //           },
    //         },
    //         refetchQueries: () => [
    //           {
    //             query: GET_CONVERSATIONS,
    //             variables: { friendInfo: authUser},
    //           },
    //           { query: GET_AUTH_USER },
    //         ],
    //       });
    //     } catch (err) {}
    //   }, [authUser, client, friendInfo]);
    
    //   useEffect(() => {
    //     const unsubscribe = subscribeToMore({
    //       document: GET_MESSAGES_SUBSCRIPTION,
    //       variables: { authUserId: authUser, userId:friendInfo },
    //       updateQuery: (prev, { subscriptionData }) => {
    //         if (!subscriptionData.data) return prev;
    
    //         updateMessageSeen();
    
    //         const newMessage = subscriptionData.data.messageCreated;
    //         const mergedMessages = [...prev.getMessages, newMessage];
    
    //         return { getMessages: mergedMessages };
    //       },
    //     });
    
    //     return () => {
    //       unsubscribe();
    //     };
    //   }, [authUser, friendInfo, subscribeToMore, updateMessageSeen]);

    return(
        <Flex width={4/5} flexDirection="column" >
        <Box mb={3} >
                    {data && data.getMessages.map((message) =>{
                    const isAuthUserReceiver = authUser.id === message.sender.id;
                    return(
                     <DialogBlock flexDirection="column" pt={3} px={2} userMessage={isAuthUserReceiver} key={message.id} >
                       <Box>
                           <Flex flexDirection="column">
                           {!isAuthUserReceiver && (
                                <Text mb={2} ml="auto">{message.sender.firstName}</Text>
                            )}
                           <Text ml="auto" textAlign="right" css="background-color: #8dabd8; border-radius: 8px; padding: 10px;" userMessage={isAuthUserReceiver}>{message.message}</Text>
                       </Flex>
                       <Flex flexDirection="column" >
                           <Text mb={2} >{message.receiver.firstName}</Text>
                           <Text css="background-color: #a8a6a3; border-radius: 8px; padding: 10px;">{message.message}</Text>
                       </Flex>
                       </Box>
                  </DialogBlock>
)
                    }
                        )}
       </Box>
       <InputBlock width={1} p={3}>
               <Box width={1} >
                 <TextField fullWidth/>
               </Box>
               <Box px={3}>
                <Button variant="contained" color="primary" >Send</Button>
               </Box>
       </InputBlock>
   </Flex>
    )
}

function DialogFriendsSide(props){
    const {authUser, setFriendInfo} = props;
    const variables = {
        authUserId: authUser.user.id,
      };    
    const {data} = useQuery(GET_CONVERSATIONS,{variables})

    return(
        <FriendsSide width={1/5} variables={variables}>
        <Box mx="auto" mt={2}>
            {data && data.getConversations.map((user) =>
                <FriendsBlock flexDirection="row" p={2} mb={1} key={user.id} onClick={(()=>setFriendInfo(user.id))}>
                    <Text mr="auto">Ava</Text>
                    <Text>{user.firstName}</Text>
                </FriendsBlock>
            )}
        </Box>
    </FriendsSide>
    )
}