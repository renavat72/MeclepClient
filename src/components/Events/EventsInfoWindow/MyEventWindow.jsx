import React, { useState } from 'react';
import Countdown from 'react-countdown'
import { CardActions } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass';
import {useMutation} from '@apollo/react-hooks'
import {  ModalLink} from 'react-router-modal';

import {DELETE_POST} from '../../../apis/EventAPI'
import LikeButton from '../../Buttons/LikeButton'
import Slider from '../../Slider' 
import ProfileWindow from '../../Profile'


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
              <Slider images={post.image} window={true}/>
          </Flex>
          <Flex>
          <CardActions >
            <LikeButton user={user} post={post}postId={post.id}/>
          </CardActions>
            <Flex ml="auto" my="auto">

            <Text color="textSecondary">
            <Countdown date={parseDate} renderer={renderer}/>
            </Text>
            </Flex>
          </Flex>
            <Flex ml="auto" >
             <Box >
             <ModalLink path={`/id${user.id}`} component={ProfileWindow} props={user.id}>
               <Text>{post.firstName}  {post.secondName} </Text>
                        </ModalLink>
             </Box>
            </Flex>
        </Flex>
      </Box>
    )
}