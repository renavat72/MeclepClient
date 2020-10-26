import React from 'react';
import Countdown from 'react-countdown'
import {IconButton} from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';
import ShareIcon from '@material-ui/icons/Share';

import DeleteButton from '../Buttons/DeleteButton'
import LikeButton from '../Buttons/LikeButton'



const WrapperCard = styled(Flex)`
box-sizing: border-box;
background: #fff;
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
`

export default function Event (props){
    const {post, user} = props;
    const parseDate = Date.parse(post.timeOfEvent);
    return(

          <WrapperCard >
                <Flex m={3} flexDirection="column" >
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
                   </Text>
                  </Flex>
                  <Flex my={1} >
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
                     <Countdown date={parseDate}/>
                   </Box>
                   </Flex>
                   <Flex >
                    <Box ml="auto" >
                      <Text>{post.firstName}  {post.secondName} </Text>
                    </Box>
                  </Flex>
             </Flex>
       </WrapperCard>
    )
}
