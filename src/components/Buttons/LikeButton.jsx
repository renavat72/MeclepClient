import React,{useEffect, useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton} from '@material-ui/core';
import { useMutation } from "@apollo/react-hooks"
import { Flex} from 'rebass'
import {LIKE_POST} from '../../apis/EventAPI'

export default function LikeButton(props){
    const {user, post, postId} = props;
    const [likeCount, setLikeCount] = useState(post.likeCount)
    const [liked, setLiked] = useState(false);
    const LikeButton = (
        liked ? (
           <FavoriteIcon color="secondary"/>
        ) : (
           <FavoriteIcon />
        )
    )
    const variables = {
        postId: postId,
    }; 
      console.log(user)
    useEffect(()=>{
        if(user && post.likes.find(like => like.userId === user.id)){
            setLiked(true)
        } else setLiked(false)
     }, [user, post.likeCount]
    );
     const [likePost] = useMutation(LIKE_POST, {
        update(){
            
        },
        variables
     });
     function handleLikeCount(){

     }
    function handleLike(){
   
        setLikeCount(prev=> prev + 1)
        likePost()
    }

    
    return(
        <Flex>
              {likeCount}
              <IconButton onClick={handleLike}>
             {LikeButton}
            </IconButton>
        </Flex>

    )

}