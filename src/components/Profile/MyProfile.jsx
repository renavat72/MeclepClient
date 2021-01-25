import React, {useState} from 'react';
import { Box, Text,Flex } from 'rebass';
import {  useQuery } from '@apollo/react-hooks';
import { Dialog, Chip, IconButton,Button} from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import ModalImage from "react-modal-image";

import AvatarUser from '../AvatarUser'
import {GET_AUTH_USER} from '../../apis/UserAPI'
import {FollowingDialog} from '../Profile/FollowingDialog'
import {FollowersDialog} from '../Profile/FollowersDialog'


const BackgroundImage = styled(Flex)`
position: absolute;
height:30vh;

background-image: url( ${(p) => p.imageBackground ? p.imageBackground:'#e5e5e5'});
background-size: cover;
background-position:center;

filter: blur(3px);
`


export default function MyProfileWindow(props){
    const {data} = useQuery(GET_AUTH_USER);
    const [isOpen, setIsOpen] = useState(true);
    const {url} =useRouteMatch();
    const [dialogWindow,setDialogWindow] = useState(false);

    function handleOpen(){
          setIsOpen(false);
          window.history.pushState('', '', `${url}`);
    }     
    const InitialsWords = data&&data.getAuthUser.firstName[0] + data.getAuthUser.secondName[0];
    
      return(
        
        <Dialog open={isOpen} onClose={()=>handleOpen()}  maxWidth="xl"   >
          {
            dialogWindow === 0 ? <FollowersDialog userInfo={data&&data.getAuthUser.followers}/> : dialogWindow === 1 ?<FollowingDialog userInfo={data&&data.getAuthUser.following}/> : null
          }
          <Flex  minWidth={["500px","700px"]} minHeight="470px"flexDirection="column" zIndex={200}>
             <BackgroundImage minWidth={["500px","700px"]} imageBackground={data&&data.getAuthUser.coverImage}/>
            <Flex ml="auto" >
              <IconButton onClick={()=>handleOpen()}>
               <CloseIcon variant="second"/>
              </IconButton>
            </Flex>
                <Flex  flexDirection="column" mx="auto" width="300px" sx={{zIndex:100}}>
                <Flex mx="auto"my={4}>
                  <AvatarUser props={data&&data.getAuthUser} size="large"/>
               
                    
                </Flex>
                <Flex flexDirection="row" mx="auto" mb={3} justifyContent="center" width={1} >
                      <Text fontSize={24} mr={2} textAlign="center" color="white">{data&&data.getAuthUser.firstName}</Text>
                      <Text fontSize={24} textAlign="center" color="white">{data&&data.getAuthUser.secondName}</Text>
                </Flex>
                <Flex flexDirection="row" mx="auto" justifyContent="center" width={1}>
                    <Box  >
                      <Text color="white">Followers</Text>
                      <Button size="small" onClick={()=>setDialogWindow(0,!isOpen)}>
                       <Text textAlign="center" color="white">{data&&data.getAuthUser.followers.length}</Text>
                      </Button>
                    </Box>
                    <Box mx={3}>
                      <Text color="white">Following</Text>
                          <Button size="small" onClick={()=>setDialogWindow(1,!isOpen)}>
                      <Text textAlign="center" color="white">
                            {data&&data.getAuthUser.following.length}
                        </Text>
                          </Button>
                    </Box>
                    {/* <Box >
                      <Text>Events</Text>
                      <Text textAlign="center">21</Text>
                    </Box> */}
                 </Flex>
                </Flex>
              <Flex flexDirection="column" m={3}>
                <Box my={5}>
                  <Flex  flexDirection="row">
                <Text mr={2} my="auto">
                Images:
                </Text>
                     {data&&data.getAuthUser.images.map(image=>
                          <Box key={image} style={{maxWidth:50, maxHeight:50, width:"100%"}} >
                          <ModalImage large={image} small={image} />
                      </Box>
                          )}
                  </Flex>
                </Box>
                <Flex flexDirection="row" >
                  <Text my="auto" mr={2}>
                    I like:
                  </Text>
                      <Chip color="primary" label={`Party`}/>
                </Flex>
              </Flex>
          </Flex>
        </Dialog>
    )
}
