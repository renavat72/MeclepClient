import React from 'react'
import { Button, Avatar, CircularProgress,  } from '@material-ui/core';
import { generatePath, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import {Text, Box, Flex} from 'rebass'

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
                            <DialogFriend my={2} key={user.id} >
                            <Box mr={4}>
                                  <Link to={generatePath(Routes.USER_PROFILE, {id: user.id,})}>
                                  <Avatar>H</Avatar>
                                  </Link>
                            </Box>
                            <Flex my="auto" width={1} mr={6}>
                                  <Box mr={4}>
                              <Text >
                               {user.firstName}
                              </Text>
                                  </Box>
                             <Box>
                              <Text>
                               {user.secondName}
                              </Text>
                                  </Box>
                             </Flex>
                         <Flex  my="auto" width={1} >
                               <Box   >
                               <Follow user={user}/>
                               </Box>
                               <Box >
                               <Button>Send</Button>
                               </Box>
                         </Flex>
                      </DialogFriend>
                ))
                )
                }
    </DialogBlock>
    )
}