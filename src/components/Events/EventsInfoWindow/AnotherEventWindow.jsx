import React, { useState } from 'react';
import { CardActions,IconButton,Link, Collapse, Button  } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Text, Box, Flex} from 'rebass';
import Map from '../../Map'

import LikeButton from '../../Buttons/LikeButton'
import Slider from '../../Slider' 


export default function AnotherEventWindow (props){
    const {post} = props
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
  
    return(
        <Box width="250px">
          <Flex flexDirection="column">
            <Flex flexDirection='column' mr="auto" mb={3}>
             <Text fontWeight='bold' fontSize={18} textAlign="left" width="250px" mb={2}>
             {post.title}
              </Text>
              <Text fontSize={14} textAlign="left" width="200px" mb={1}>
              {post.address}

              </Text>
              <Flex my={1}  flexDirection="row" justifyContent="space-between" >
                  <Box>
                 <Text textAlign="left"  fontSize={14}>Выстовка</Text>
                </Box>
                <Flex flexDirection="column">
                 <Text textAlign="right"  fontSize={14}>{post.time}</Text>
                 <Text textAlign="right" fontSize={10}>{post.period}</Text>
                </Flex>
              </Flex>
          </Flex>
          <Flex my={1} maxWidth="250px">
            <Text color="textSecondary" textAlign="left">
            {post.headerDescription}
            </Text>
          </Flex>
          <Flex mt={3} flexDirection="row">
              <Slider images={post.images}/>
          </Flex>
          <Flex mr="auto">
          {open ? <Button onClick={handleClick}>Hide</Button>:<Button onClick={handleClick}>Show more</Button>  }
          </Flex>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Flex my={1} maxWidth="250px" flexDirection="column">
                    <Text color="textSecondary" textAlign="left">
                    {post.description}
                    </Text>
                </Flex>
            </Collapse>
          <Flex>
          <CardActions >
            <LikeButton post={post}postId={post.id}/>
           
            <IconButton>
              <ShareIcon />
            </IconButton>
            {/* <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <ExpandMoreIcon />
            </IconButton> */}

          </CardActions>
            <Flex my="auto" ml="auto">
             <Box ml="auto" >
               <Text fontSize={16}><Link href={post.urlContent}> {post.website}</Link></Text>
             </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    )
}