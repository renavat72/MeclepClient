import React, {useState, useEffect} from 'react'
import {  Button, Avatar, CircularProgress,  } from '@material-ui/core';
import {Text, Flex} from 'rebass'
import { useQuery } from '@apollo/react-hooks';
import { ModalLink} from 'react-router-modal';
import { useRouteMatch } from 'react-router-dom';

import { FOLLOWING_USER} from '../../apis/UserAPI'
import Follow from '../Follow'
import ProfileWindow from '../Profile'
import ChatWindow from '../Dialog/ChatWindow'

import{DialogBlock, DialogFriend} from '../FriendsWindow'


export default function FollowingBlock({handleClick},authUser){
      const {data, loading, refetch} = useQuery(FOLLOWING_USER);
      useEffect(()=>{
             setFollowingState(FollowingData);
             refetch()
      }, [ data]);


      const [followingState, setFollowingState] = useState(FollowingData);
      const [isOpen, setIsOpen] = useState(false)
      const [infoFriend, setInfoFriend] = useState()
      const FollowingData = data&&data.followingUser;
      const {url} =useRouteMatch();
      const handleOpen = (user) => {
            setInfoFriend(user)
            setIsOpen(!isOpen);
      }
      if (followingState === undefined){
            return  null
      } else {
        return(
            <DialogBlock >
                  { isOpen ?
                  <ChatWindow handleOpen={handleOpen} authUser={authUser} user={infoFriend} alert={handleClick}/>:null
            }
                  { loading ? (
                        <CircularProgress/>
                        ) : ( followingState  <= 0  ? <Text textAlign="center" fontWeight='bold'  color="#aaa">No following</Text> :
                  followingState.map(user => (
                              <DialogFriend my={1} key={user.id} >
                                    <ModalLink path={`/id${user.id}`} component={ProfileWindow} props={user.id}>
                                          <Avatar>{user.firstName[0] + user.secondName[0]}</Avatar>
                                    </ModalLink>
                                    <Flex my="auto">
                                          <Text mx={2} fontSize={[14,16]}>
                                          {user.firstName}
                                          </Text>
                                          <Text fontSize={[14,16]}>
                                          {user.secondName}
                                          </Text>
                                    </Flex>
                                    <Flex ml="auto">
                                    <Follow user={user} />
                                          <Button onClick={()=>handleOpen(user)}>
                                    Send
                                          </Button>
                                    </Flex>
                              </DialogFriend> 
                              )))}
            </DialogBlock>
      );
    }
}
