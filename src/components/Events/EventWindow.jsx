import React, { useState } from 'react';
import Countdown from 'react-countdown'
import { CardActions,IconButton,  } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Text, Box, Flex} from 'rebass'
import LikeButton from '../Buttons/LikeButton'


export default function EventWindow (props){
    const {post} = props
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      const parseDate = Date.parse(post.timeOfEvent);
      
      // const renderer = ({ parseDate }) => {
      //   if ({parseDate} > 0) {
      //     // Render a complete state
      //     return 'Over'
      //   } else {
      //     // Render a countdown
      //     return (
      //       <span>
      //        { parseDate}
      //       </span>
      //     );
      //   }
      // };
    return(
        <Box >
          <Flex flexDirection="column">
            <Flex flexDirection='column' mr="auto" mb={3}>
             <Text fontWeight='bold' fontSize={18} textAlign="left">
               {post.nameOfEvent}
              </Text>
              <Text fontSize={14} textAlign="left">
                {post.address}
              </Text>
              <Text my={1} textAlign="left">{post.typeOfEvent}</Text>
          </Flex>
          <Flex my={2} maxWidth="240px">
            <Text color="textSecondary" textAlign="left">
              {post.aboutOfEvent}
            </Text>
          </Flex>
          <Flex>
          <CardActions >
        
            <LikeButton post={post}postId={post.id}/>
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
            <Countdown date={parseDate}/>
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