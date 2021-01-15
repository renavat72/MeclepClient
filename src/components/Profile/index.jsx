import React, {useState} from 'react';
import { Box, Text,Flex } from 'rebass';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, IconButton, Dialog, Chip, Button} from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

import People from '../../images/People.jpg'
import {GET_CURRENT_USER} from '../../apis/UserAPI'
import {FollowingDialog} from '../Profile/FollowingDialog'
import {FollowersDialog} from '../Profile/FollowersDialog'



const BackgroundImage = styled(Flex)`
position: absolute;
/* z-index:1; */
    
/* width:75vw; */
height:30vh;

background-image: url(${People});
background-size: cover;
background-position:center;

filter: blur(3px) ;
`

export default function ProfileWindow(props){
    const [isOpen, setIsOpen] = useState(true);
    const [dialogWindow,setDialogWindow] = useState(false);
    const {url} =useRouteMatch();
    const userId = props.match.params.id;
    const variables = {
        userId: userId,
    }; 
    const {data} = useQuery(GET_CURRENT_USER,{variables})
    function handleOpen(){
          setIsOpen(false);
          window.history.pushState('', '', `${url}`);
    }     
    console.log(data)
    console.log(data&&data.getCurrentUser.following)

    const InitialsWords = data&&data.getCurrentUser.firstName[0] + data.getCurrentUser.secondName[0];

      return(
        
        <Dialog open={isOpen} onClose={()=>handleOpen()}  maxWidth="xl">
           {
            dialogWindow === 0 ? <FollowersDialog userInfo={data&&data.getCurrentUser.followers}/> : dialogWindow === 1 ?<FollowingDialog userInfo={data&&data.getCurrentUser.following}/> : null
          }
          <Flex  minWidth={["500px","700px"]} minHeight="470px" m={3} flexDirection="column">
          <BackgroundImage minWidth={["500px","700px"]}/>
          <Flex ml="auto" >
              <IconButton onClick={()=>handleOpen()}>

              <CloseIcon variant="second"/>
              </IconButton>
            </Flex>
                <Flex  flexDirection="column" mx="auto" width="300px" sx={{zIndex:100}}>
                <Flex mx="auto"my={4}>
                  <Avatar>
                    {InitialsWords}
                  </Avatar>
                </Flex>
                <Flex flexDirection="row" mx="auto" mb={3} justifyContent="center" width={1}>
                      <Text fontSize={24} mr={2} textAlign="center" color="white">{data&&data.getCurrentUser.firstName}</Text>
                      <Text fontSize={24} textAlign="center" color="white">{data&&data.getCurrentUser.secondName}</Text>
                </Flex>
                <Flex flexDirection="row" mx="auto" justifyContent="center" width={1}>
                    <Box >
                      <Text color="white">Followers</Text>
                      <Button size="small" onClick={()=>setDialogWindow(0,true)}>
                      <Text textAlign="center" color="white">{data&&data.getCurrentUser.followers.length}</Text>
                      </Button>
                    </Box>
                    <Box mx={3}>
                      <Text color="white">Following</Text>
                      <Button size="small" onClick={()=>setDialogWindow(1,true)}>
                      <Text textAlign="center" color="white">{data&&data.getCurrentUser.following.length}</Text>
                      </Button>
                    </Box>
                    {/* <Box >
                      <Text>Events</Text>
                      <Text textAlign="center">21</Text>
                    </Box> */}
                 </Flex>
                </Flex>
              <Flex flexDirection="column">
                <Box my={5}>
                <Text>
                  Images:
                </Text>
                </Box>
                <Flex flexDirection="row" >
                  <Text my="auto" mr={2}>
                    I like:
                  </Text>
                  <Text>
                      <Chip color="primary" label="Party"/>
                  </Text>
                </Flex>
              </Flex>
          </Flex>
        </Dialog>
    )
}
