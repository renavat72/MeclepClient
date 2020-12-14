import React,{useEffect, useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton} from '@material-ui/core';
import { useMutation } from "@apollo/react-hooks"
import { Flex} from 'rebass'
import {LIKE_POST} from '../../apis/EventAPI'
import {LIKE_PARSER_EVENT} from '../../apis/ParserEventAPI'

export default function LikeButton(props){
    const {user, post, postId} = props;
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const likedUser = user && post.likes.find(like => like.userId === user.id);
    const [liked, setLiked] = useState(likedUser? true: false);
    // const likeCount = post.likes.length;
    const LikeButton = (
        liked ? (
            <FavoriteIcon />
            ) : (
                <FavoriteIcon color="secondary"/>
        )
    )
    const variables = {
        parserEventId: postId,
        postId: postId
    }; 
    useEffect(()=>{
        if(likedUser){
            setLiked(false);
        } else {
            setLiked(true) 
        };
     }, [likedUser]
    );
    useEffect(()=>{
        if(!liked){
            setLikeCount(prev=> prev + 1);
        } else
        setLikeCount(prev=> prev - 1);
     }, [liked]
    );
    
     const [likePost] = useMutation(LIKE_POST, {
        update(){
            
        },
        variables    
     });
     const [likeParserPost] = useMutation(LIKE_PARSER_EVENT, {
        update(){
            
        },
        variables
     });
   
    function handleLike(){
        setLiked(!liked)
        // liked ? setLikeCount(  prev=> prev- 1) : setLikeCount( prev=> prev + 1);
        post.website ?  likeParserPost(): likePost();
       
       
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