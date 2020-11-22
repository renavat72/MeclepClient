import React, {useContext, useState, useCallback, useEffect} from 'react'
import { Dialog } from '@material-ui/core';
import {Flex} from 'rebass'
import styled from 'styled-components';
import { useQuery,useMutation } from '@apollo/react-hooks';

import {GET_CONVERSATIONS, GET_MESSAGES, GET_MESSAGES_SUBSCRIPTION, UPDATE_MESSAGE_SEEN} from '../../apis/MessageAPI'
import {GET_AUTH_USER} from '../../apis/UserAPI'

import { AuthContext } from '../../context/auth'
import ConversationsSide from './ConversationsSide'
import ChatSide from './ChatSide'

export const FriendsSide = styled(Flex)`
    /* width:300px; */
    background-color: #f8f8f8;
    box-shadow: 0 0 15px rgba(0,0,0,0.08);
`
export const FriendsBlock = styled(Flex)`

     border-bottom: 1px solid #e5e5e5;
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

export default function DialogWindow(props){
      const {dialogWindow, handleDialogWindow} = props;
      const { user } = useContext(AuthContext);
      const [friendInfo, setFriendInfo] = useState('');
      if(friendInfo===undefined){
        return  <ConversationsSide setFriendInfo={setFriendInfo} authUser={user.id}/>
      }
      
      const variables = {
          authUserId: user.id,
          userId: friendInfo
        };
   
      const { subscribeToMore, data} = useQuery(GET_MESSAGES,{variables,fetchPolicy: 'network-only'});

      const updateMessageSeen = useCallback(async () => {
        ()=>useMutation(UPDATE_MESSAGE_SEEN, {
          update(_, result){
          console.log(result)
        },
        variables:variables,
        refetchQueries: () => [
          {
            query: GET_CONVERSATIONS,
            variables:variables,
          },
          { query: GET_AUTH_USER },
        ],
      }
      )}, [variables]);

      useEffect(()=>{
         setFriendInfo(friendInfo)
      },[friendInfo])
      
      useEffect(()=>{
         const unsubscribeToMore = subscribeToMore({
           document: GET_MESSAGES_SUBSCRIPTION,
           variables: {authUserId: user.id, userId:friendInfo },
           updateQuery:(prev, {subscriptionData}) =>{
             if(!subscriptionData.data) return prev;
             updateMessageSeen();
               const newMessage = subscriptionData.data.messageCreated;
               const mergedMessages = [...prev.getMessages, newMessage];

               return { getMessages: mergedMessages };
           },
           }
         )
         return () => {
          unsubscribeToMore();
         };
       },[ user.id, friendInfo, subscribeToMore]);
      
      return (
       <Dialog open={dialogWindow}  onClose={handleDialogWindow}  maxWidth="xl">
            <Flex flexDirection="row" minWidth="700px">
               <ConversationsSide setFriendInfo={setFriendInfo} authUser={user.id}/>
               <ChatSide friendInfo={friendInfo} authUser={user.id}  messages={data ? data.getMessages : []}/>
            </Flex>
       </Dialog>
    )
}