import React from 'react'
import {IconButton} from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom';

import DeleteButton from '../Buttons/DeleteButton'
import LikeButton from '../Buttons/LikeButton'



const WrapperCard = styled(Flex)`
box-sizing: border-box;
background: #fff;
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
`

export default function Event (props){
    const {post, user} = props;
    console.log(post.userId)
    return(
      
          <WrapperCard >
                <Flex
                    m={3}
                    flexDirection="column" 
                    // as={Link} 
                    // to={`/posts/${post.id}`}
                    >
                  <Flex flexDirection="column">
                    <Text fontWeight='bold' fontSize={26}>
                      {post.nameOfEvent}
                    </Text>
                    <Text fontSize={18}>
                      {post.address}
                    </Text>
                    <Text my={1}>{post.typeOfEvent}</Text>
                  </Flex>
                  <Flex my={3} width="280px">
                   <Text>
                         {post.aboutOfEvent}
                         {/* Lrem, ipsum dolor sit amet consectetur adipisicing elit. Totam labore, quidem dolores tempora reiciendis porro recusandae minima minus eos natus quia eum dignissimos accusantium vel praesentium maiores itaque veritatis provident. */}
                   </Text>
                  </Flex>
                  <Flex my={1} >
                   <Box my="auto" mr={3}>
                         {post.likeCount}
                   </Box>
                   <Box>
                      <LikeButton user={user} postId={post.id} post={post} />
                      <IconButton>
                            <ShareIcon />
                      </IconButton>
                      {user && user.id === post.userId && (
                            <DeleteButton post={post}postId={post.id}/>
                      )}
                   </Box>
                   <Box ml="auto" my="auto">
                     <Text >{post.timeOfEvent}</Text>
                   </Box>
                   </Flex>
                   <Flex >
                    <Box ml="auto" >
                      <Text>{post.firstname}  {post.secondname} </Text>
                    </Box>
                  </Flex>
             </Flex>
       </WrapperCard>
    )
}
