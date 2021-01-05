import React, { useState } from 'react';
import Countdown from 'react-countdown'
import { CardActions,IconButton,  } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Text, Box, Flex, Image} from 'rebass'
import {useMutation} from '@apollo/react-hooks'

import {DELETE_POST} from '../../../apis/EventAPI'
import LikeButton from '../../Buttons/LikeButton'
import Slider from '../../Slider' 


export default function MyEventWindow (props){
    const {post, user} = props
    const [expanded, setExpanded] = useState(false);
    const variables = {
      postId: post.id,
    }; 
    const [deletePost] = useMutation(DELETE_POST,{
      update(){
      },
      variables
      })
    const handleExpandClick = () => {
      setExpanded(!expanded);
      };
      const parseDate = Date.parse(post.timeOfEvent);
      const completedDate = parseDate + 43200000;

      const renderer = ({ days,hours, minutes, seconds, completed }) => {
        if (completed) {
          return "Completed"
        }
        if (0 >completedDate){
          deletePost()
       }
          return <span>{days}:{hours}:{minutes}:{seconds}</span>;
        }
      
      console.log(completedDate)
      
    return(
        <Box  >
          <Flex flexDirection="column">
            <Flex flexDirection='column' mr="auto" mb={3}>
             <Text fontWeight='bold' fontSize={18} textAlign="left"  width="250px"  mb={2}>
               {post.nameOfEvent}
              </Text>
              <Text fontSize={14} textAlign="left" width="200px">
                {post.address}
              </Text>
              <Text my={1} textAlign="left">{post.typeOfEvent}</Text>
          </Flex>
          <Flex my={1} maxWidth="300px">
            <Text color="textSecondary" textAlign="left">
              {post.aboutOfEvent}
            </Text>
          </Flex>
          <Flex mt={3} flexDirection="row">
              <Slider images={post.image}/>
          </Flex>
          <Flex>
          <CardActions >
            <LikeButton user={user} post={post}postId={post.id}/>
            {/* <IconButton>
              <ShareIcon />
            </IconButton> */}
          </CardActions>
            <Flex ml="auto" my="auto">

            <Text color="textSecondary">
            <Countdown date={parseDate} renderer={renderer}/>
            </Text>
            </Flex>
          </Flex>
            <Flex ml="auto" >
             <Box >
               <Text>{post.firstName}  {post.secondName} </Text>
             </Box>
            </Flex>
        </Flex>
      </Box>
    )
}