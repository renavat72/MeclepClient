import React, {useContext} from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Button} from '@material-ui/core';
import { useMutation } from "@apollo/react-hooks"

import {GET_AUTH_USER, CREATE_FOLLOW, DELETE_FOLLOW} from '../../apis/UserAPI'
import { AuthContext } from '../../context/auth'
import { Box } from 'rebass';

export default function Follow({user}){
    const authUser = useContext(AuthContext)
    const {data} = useQuery(GET_AUTH_USER)
    const isFollowing = data && data.getAuthUser.following.find((f) => f.user === user.id)

    const [followUser] = useMutation(CREATE_FOLLOW, {
      update(){

      },
      variables: {
        input:  {userId: user.id, followerId: authUser.user.id}
      }

   })
   const [onFollowUser] = useMutation(DELETE_FOLLOW, {
    update(_, result){
      console.log(result)
    },
    variables: {
      input: {  id: isFollowing ? isFollowing.id : null },
    }
    
 })
      return (<Box>
        { isFollowing  ? 
      <Button onClick={onFollowUser}  >
      onFollow
      </Button>
      :
        <Button onClick={followUser}>
        Follow
        </Button> }
      </Box>
      );
}