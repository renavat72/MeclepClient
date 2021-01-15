import React,{useState} from 'react'
import { Button, Avatar, CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import {Text, Flex} from 'rebass'
import { ModalRoute, ModalLink} from 'react-router-modal';
import { useRouteMatch } from 'react-router-dom';

import {GET_AUTH_USER} from '../../apis/UserAPI'
import Follow from '../Follow'
import ProfileWindow from '../Profile'
import { DialogBlock, DialogFriend } from '../FriendsWindow'
import ChatWindow from '../Dialog/ChatWindow'



export default function FollowersBlock({handleClick},authUser){
    const {data, loading} = useQuery(GET_AUTH_USER);
    const FollowersData = data&&data.getAuthUser.followers;
    const [isOpen, setIsOpen] = useState(false)
    const [infoFriend, setInfoFriend] = useState()
    const {url} =useRouteMatch();
    const handleOpen = (user) => {
          setInfoFriend(user)
          setIsOpen(!isOpen);
          console.log(user)
    }
    return(
          <DialogBlock>
                   { isOpen ?
                  <ChatWindow handleOpen={handleOpen} authUser={authUser} user={infoFriend} alert={handleClick}/>:null
            }
          { loading ? (
                <CircularProgress/>
          ) : ( FollowersData <= 0  ? <Text textAlign="center" fontWeight='bold'  color="#aaa">No followers</Text> :
                      FollowersData.map(user => (
                        <DialogFriend my={1} key={user.id} >
                       <ModalLink path={`/id${user.id}`} component={ProfileWindow} props={user.id}>
                                          <Avatar>{user.followerFirstName[0] + user.followerSecondName[0]}</Avatar>
                        </ModalLink>
                        <Flex my="auto">
                              <Text mx={2} fontSize={[14,16]}>
                                 {user.followerFirstName}
                              </Text>
                              <Text fontSize={[14,16]}>
                                 {user.followerSecondName}
                              </Text>
                        </Flex>
                        <Flex ml="auto" my="auto">
                              <Flex ml="auto">
                                    <Follow user={user} />
                                          <Button onClick={()=>handleOpen(user)}>
                                                Send
                                          </Button>
                              </Flex>                        
                        </Flex>
                  </DialogFriend>
                )))}
    </DialogBlock>
    )
}