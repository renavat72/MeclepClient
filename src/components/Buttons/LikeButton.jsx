import React,{useEffect, useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton} from '@material-ui/core';
import { useMutation } from "@apollo/react-hooks"
import {Text, Box, Flex} from 'rebass'
import {LIKE_POST} from '../../apis'

export default function LikeButton(props){
    const {user, post, postId} = props;
    const [liked, setLiked] = useState(false)
    useEffect(()=>{
        if(user && post.likes.find(like => like.firstname === user.firstname)){
            setLiked(true)
        } else setLiked(false)
     }, [user, post.likes]
    )
     const [likePost] = useMutation(LIKE_POST, {
        update(){

        },
        variables: {
            postId
        }

     })
     console.log(postId)

     const LikeButton = (
         liked ? (
            <FavoriteIcon color="secondary"/>
         ) : (
            <FavoriteIcon/>
         )
     )
    return(
        <Flex>
              <IconButton onClick={likePost}>
             {LikeButton}
            </IconButton>
        </Flex>

    )

}