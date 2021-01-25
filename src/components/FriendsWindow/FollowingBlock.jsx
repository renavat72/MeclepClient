import React, {useState, useEffect} from 'react'
import {  Button, Avatar, CircularProgress,  } from '@material-ui/core';
import {Text, Flex} from 'rebass'
import { useQuery } from '@apollo/react-hooks';
import { ModalLink} from 'react-router-modal';
import { useRouteMatch } from 'react-router-dom';

import { GET_AUTH_USER} from '../../apis/UserAPI'
import Follow from '../Follow'
import ProfileWindow from '../Profile'
import ChatWindow from '../Dialog/ChatWindow'
import{DialogBlock, DialogFriend} from '../FriendsWindow'
import AvatarUser from '../AvatarUser'


export default function FollowingBlock({handleClick,authUser,searchFollowing}){
      const {data, loading, refetch} = useQuery(GET_AUTH_USER);

      useEffect(()=>{
             setFollowingState(FollowingData);
             refetch()
      }, [ data]);

      console.log({searchFollowing})
      const [followingState, setFollowingState] = useState(FollowingData);
      const [isOpen, setIsOpen] = useState(false)
      const [infoFriend, setInfoFriend] = useState()
      const FollowingData = data&&data.getAuthUser.following;
      const MergeData= FollowingData&&FollowingData.filter(user=>(!searchFollowing || user.userFirstName===searchFollowing||user.userSecondName===searchFollowing))
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
                  <ChatWindow handleOpen={handleOpen} authUser={{authUser}} user={infoFriend} alert={handleClick}/>:null
            }
                  { loading ? (
                        <CircularProgress/>
                        ) : ( MergeData  <= 0  ? <Text textAlign="center" fontWeight='bold'  color="#aaa">No following</Text> :
                        MergeData.map(user => (
                              <DialogFriend my={1} key={user.id} >
                                    <ModalLink path={`/id${user.user}`} component={ProfileWindow} props={user.user,handleClick}>
                                       <AvatarUser props={user} following={true}/>
                                    </ModalLink>
                                    <Flex my="auto">
                                          <Text mx={2} fontSize={[14,16]}>
                                          {user.userFirstName}
                                          </Text>
                                          <Text fontSize={[14,16]}>
                                          {user.userSecondName}
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
