import React, {useState, useEffect} from 'react'
import {  Button, Avatar, CircularProgress,  } from '@material-ui/core';
import { generatePath, Link } from 'react-router-dom';
import {Text, Box, Flex} from 'rebass'
import { useQuery } from '@apollo/react-hooks';

import { FOLLOWING_USER} from '../../apis/UserAPI'
import Follow from '../Follow'
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
      console.log(followingState);
    
    if (followingState === undefined){
       return  null
    } else {
      return(
            <DialogBlock>
            { loading ? (
                  <CircularProgress/>
            ) : ( followingState  <= 0  ? <Text textAlign="center" fontWeight='bold'  color="#aaa">No following</Text> :
            followingState.map(user => (
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
                                 <Flex  my="auto" width={1}mr={4} >
                                       <Box >
                                       <Follow user={user} />
                                       </Box>
                                       <Box width={1}ml={5}>
                                       <Button>Send</Button>
                                       </Box>
                                 </Flex>
                              </DialogFriend>
                  )) 
                  )
                  }
      </DialogBlock>
      );

    }

           
}