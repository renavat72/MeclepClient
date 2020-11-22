import React from 'react'
import { Button, Avatar, CircularProgress,  } from '@material-ui/core';
import { generatePath, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import {Text, Flex} from 'rebass'

import {GET_AUTH_USER} from '../../apis/UserAPI'
import Follow from '../Follow'
import * as Routes from '../../routes';
import { DialogBlock, DialogFriend } from '../FriendsWindow'



export default function FollowersBlock(){
    const {data, loading} = useQuery(GET_AUTH_USER);
    const FollowersData = data&&data.getAuthUser.followers;

    return(
          <DialogBlock>
          { loading ? (
                <CircularProgress/>
          ) : ( FollowersData <= 0  ? <Text textAlign="center" fontWeight='bold'  color="#aaa">No followers</Text> :
                      FollowersData.map(user => (
                        <DialogFriend my={1} key={user.id} >
                        <Link to={generatePath(Routes.USER_PROFILE, {id: user.id,})}>
                              <Avatar>{user.firstName[0] + user.secondName[0]}</Avatar>
                        </Link>
                        <Flex my="auto">
                              <Text mx={2}>
                                 {user.firstName}
                              </Text>
                              <Text>
                                 {user.secondName}
                              </Text>
                        </Flex>
                        <Flex ml="auto" my="auto">
                        <Follow user={user} />
                        <Button>Send</Button>
                        </Flex>
                  </DialogFriend>
                )))}
    </DialogBlock>
    )
}