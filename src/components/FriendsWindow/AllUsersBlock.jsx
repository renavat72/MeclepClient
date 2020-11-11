import React, {useState, useContext, useEffect} from 'react'
import { Button, Avatar, CircularProgress,  } from '@material-ui/core';
import { generatePath, Link } from 'react-router-dom';
import {Text, Box, Flex} from 'rebass'
import { useQuery } from '@apollo/react-hooks';

import {GET_ALL_USERS } from '../../apis/UserAPI'
import Follow from '../Follow'
import { AuthContext } from '../../context/auth'
import * as Routes from '../../routes';
import{DialogBlock, DialogFriend} from '../FriendsWindow'


export default function  AllUsersBlock (){
    const authUser = useContext(AuthContext);
    const variables = {
        userId: authUser.user.id,
      };
      const {data, loading, refetch} = useQuery(GET_ALL_USERS,{variables});
    const UserData = data&&data.getUsers;

    useEffect(()=>{
        setUsersData(UserData); 
        refetch()
      }, [ data, loading]);
console.log( UserData === 0)
    const [usersData, setUsersData] = useState(UserData)
    if (usersData === undefined){
        return  null
     } else {
         return(
          <DialogBlock variables={variables}>
          { loading ? (
                <CircularProgress/>
          ) : (
            UserData <= 0 ? <Text textAlign="center" fontWeight='bold'  color="#aaa">No users</Text> :
            UserData.map(user => (
                      <DialogFriend my={2} key={user.id} >
                            <Box mr={4}>
                                  <Link  to={generatePath(Routes.USER_PROFILE, {id: user.id,})}>
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
}