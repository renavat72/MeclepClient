import React, { useState } from 'react';
import Countdown from 'react-countdown'
import { CardActions,IconButton,  } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Text, Box, Flex} from 'rebass'
import LikeButton from '../../Buttons/LikeButton'


export default function MyEventWindow (props){
    const {post, user} = props
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      const parseDate = Date.parse(post.timeOfEvent);
      
      const renderer = ({ days,hours, minutes, seconds, completed }) => {
        if (completed) {
  
          return "Completed"
        } else {
          return <span>{days}:{hours}:{minutes}:{seconds}</span>;
        }
      };

    return(
        <Box  width="250px" >
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
          <Flex>
          <CardActions >
        
            <LikeButton user={user} post={post}postId={post.id}/>
            <IconButton>
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <ExpandMoreIcon />
            </IconButton>
            <Text color="textSecondary">
            <Countdown date={parseDate} renderer={renderer}/>
            </Text>
          </CardActions>
          </Flex>
            <Flex >
             <Box ml="auto" >
               <Text>{post.firstName}  {post.secondName} </Text>
             </Box>
            </Flex>
        </Flex>
      </Box>
    )
}