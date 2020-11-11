import React,{useEffect, useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton} from '@material-ui/core';
import { useMutation } from "@apollo/react-hooks"
import { Flex} from 'rebass'
import {LIKE_POST} from '../../apis/EventAPI'

export default function LikeButton(props){
    const {user, post, postId} = props;
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const likedUser = user && post.likes.find(like => like.userId === user.id);
    const [liked, setLiked] = useState(likedUser? true: false);
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
    useEffect(()=>{
        if(user && post.likes.find(like => like.userId === user.id)){
            setLiked(true) 
        } else {
            setLiked(false);
        };
     }, [likedUser]
    );
    // useEffect(()=>{
    //     if(!liked){
    //         setLikeCount(prev=> prev +1);
    //     } else setLikeCount(prev=> prev - 1);
    //  }, [liked, likeCount]
    // );
    
     const [likePost] = useMutation(LIKE_POST, {
        update(){
            
        },
        variables
     });
   
    function handleLike(){
        setLiked(!liked)
        liked ? setLikeCount(  prev=> prev- 1) : setLikeCount( prev=> prev + 1);
        likePost();
       
    }

    return(
        <Flex>
            <Flex my="auto">
              {likeCount}
            </Flex>
              <IconButton onClick={handleLike}>
             {LikeButton}
            </IconButton>
        </Flex>

    )

}