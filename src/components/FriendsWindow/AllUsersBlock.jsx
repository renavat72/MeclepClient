import React, {useState, useContext, useEffect} from 'react'
import { Button, Avatar, CircularProgress } from '@material-ui/core';
import { generatePath, Link } from 'react-router-dom';
import {Text, Flex} from 'rebass'
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
    const {data, loading, refetch } = useQuery(GET_ALL_USERS,{variables});
    const UserData = data&&data.getUsers;
    const [usersData, setUsersData] = useState();

    useEffect(()=>{
      setUsersData(UserData); 
      refetch()
    }, [ UserData]);

    console.log(usersData)
    if (usersData === undefined){
        return <CircularProgress/>
     } else {
         return(
          <DialogBlock variables={variables} >
          { loading ? (
                <CircularProgress/>
          ) : (
            UserData <= 0 ? <Text textAlign="center" fontWeight='bold'  color="#aaa">No users</Text> :
            UserData.map(user => (
              <DialogFriend my={1} key={user.id} >
                    <Link to={generatePath(Routes.USER_PROFILE, {id: user.id,})}>
                          <Avatar >{user.firstName[0] + user.secondName[0]}</Avatar>
                    </Link>
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
                    <Button>Send</Button>
                    </Flex>
               </DialogFriend>
                ))
                )
                }
    </DialogBlock>
    )
}


}