import React, {useState, useEffect} from 'react'
import {  Button, Avatar, CircularProgress,  } from '@material-ui/core';
import { generatePath, Link } from 'react-router-dom';
import {Text, Flex} from 'rebass'
import { useQuery } from '@apollo/react-hooks';
import { ModalRoute, ModalLink} from 'react-router-modal';
import { useRouteMatch } from 'react-router-dom';

import { FOLLOWING_USER} from '../../apis/UserAPI'
import Follow from '../Follow'
import ProfileWindow from '../Profile'

import * as Routes from '../../routes';
import{DialogBlock, DialogFriend} from '../FriendsWindow'


export default function FollowingBlock(props){
      const {data, loading, refetch} = useQuery(FOLLOWING_USER);
      useEffect(()=>{
             setFollowingState(FollowingData);
             refetch()
      }, [ data])
      const FollowingData = data&&data.followingUser;
      const [followingState, setFollowingState] = useState(FollowingData);
      const {url} =useRouteMatch();

      if (followingState === undefined){
            return  null
      } else {
        return(
            <DialogBlock >
                  { loading ? (
                        <CircularProgress/>
                  ) : ( followingState  <= 0  ? <Text textAlign="center" fontWeight='bold'  color="#aaa">No following</Text> :
                  followingState.map(user => (
                              <DialogFriend my={1} key={user.id} >
                                    <ModalLink path={`/${ user.id}`}  parentPath={url} component={ProfileWindow}>
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
                                    <Button >Send</Button>
                                    </Flex>
                              </DialogFriend> 
                              )))}
            </DialogBlock>
      );
    }
}
