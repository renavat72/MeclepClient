import React, { useState, useContext } from 'react';
import Countdown from 'react-countdown'
import {Card, CardHeader, CardMedia, CardContent, CardActions,IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Text, Box, Flex} from 'rebass'
import LikeButton from '../Buttons/LikeButton'

import {AuthContext} from '../../context/auth'

export default function EventWindow (props){
    const {post} = props
    const {user} = useContext(AuthContext)
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a complete state
          return 'Over'
        } else {
          // Render a countdown
          return (
            <span>
              {days}:{hours}:{minutes}:{seconds}
            </span>
          );
        }
      };
    return(
        <Card >
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
            <Countdown date={Date.now()+300000000} renderer={renderer}/>
            </Text>
          </CardActions>
          </Flex>
            <Flex >
             <Box ml="auto" >
               <Text>{post.firstname}  {post.secondname} </Text>
             </Box>
            </Flex>
        </Flex>
      </Card>
    )
}