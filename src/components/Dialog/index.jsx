import React, {useContext, useState, useCallback, useEffect} from 'react'
import { Dialog } from '@material-ui/core';
import {Flex} from 'rebass'
import styled from 'styled-components';
import { useQuery,useMutation } from '@apollo/react-hooks';
import { useRouteMatch } from 'react-router-dom';

import {GET_CONVERSATIONS, GET_MESSAGES, GET_MESSAGES_SUBSCRIPTION, UPDATE_MESSAGE_SEEN} from '../../apis/MessageAPI'
import {GET_AUTH_USER} from '../../apis/UserAPI'

import { AuthContext } from '../../context/auth'
import ConversationsSide from './ConversationsSide'
import ChatSide from './ChatSide'
import MobileDialog from './MobileDialog'

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
      const {url} =useRouteMatch()          
      const [isOpen, setIsOpen] = useState(true)
      const { user } = useContext(AuthContext);
      const [friendInfo, setFriendInfo] = useState('');

      function handleOpen(){
            setIsOpen(false);
            window.history.pushState('', '', `${url}`);
      }
      if(friendInfo===undefined){
        return  <ConversationsSide setFriendInfo={setFriendInfo} authUser={user.id}/>
      }
      const variables = {
        authUserId: user.id,
        userId: friendInfo.id
      };
      
      const { subscribeToMore, data} = useQuery(GET_MESSAGES,{variables,fetchPolicy: 'network-only'});
  
      const updateMessageSeen = useCallback(async () => {
        useMutation(UPDATE_MESSAGE_SEEN, {
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
           variables: {authUserId: user.id, userId:friendInfo.id },
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
      //  const { data:{userIsOnline}, loading } = useSubscription(IS_USER_ONLINE_SUBSCRIPTION, {
      //   variables:{ authUserId:  user.id, userId: friendInfo.id }
      // });
      // let isUserOnline = friendInfo.isOnline;
      // if (!loading && userIsOnline) {
      //   isUserOnline = userIsOnline.isUserOnline;
      // }
      if (window.innerWidth < 768) return (<Dialog open={isOpen}  onClose={()=>handleOpen()} maxWidth="xl">
        <MobileDialog setFriendInfo={setFriendInfo}  authUser={user.id} friendInfo={friendInfo}  messages={data ? data.getMessages : []}/>
      </Dialog>)
      else return (
       <Dialog open={isOpen}  onClose={()=>handleOpen()} maxWidth="xl">
   
            <Flex flexDirection="row" minWidth={["500px","700px"]} minHeight="470px">
               <ConversationsSide 
                  setFriendInfo={setFriendInfo} 
                  authUser={user.id} 
                  // isUserOnline={isUserOnline}
                  />
               <ChatSide 
                  friendInfo={friendInfo} 
                  setFriendInfo={setFriendInfo} 
                  authUser={user.id} 
                  // isUserOnline={isUserOnline}  
                  messages={data ? data.getMessages : []}
                  />
            </Flex>         
    </Dialog>
    )
}