import React from 'react'
import { Dialog, ListItemIcon, Avatar } from '@material-ui/core';
import { Box, Flex, Text } from 'rebass';
import AddIcon from '@material-ui/icons/Add';
import {  ModalLink } from 'react-router-modal';

import AddEventWindow from '../Events/AddEventWindow'


export default function MobileSidebar({user, Logout, Locate, EditProfileBlock, mobSidebarOpen, handleMobSidebar}){
    return(
        <Dialog open={mobSidebarOpen} onClose={()=>handleMobSidebar()} maxWidth="xl">
            <Flex  py={4} minWidth={["250px","700px"]} flexDirection="column">
                <Flex mx="auto" mt="auto" mb={3}>
                {user.coverImage? <img alt="coverImage" style={{maxWidth:150, maxHeight:150, width:"100%", borderRadius: "50%"}} src={user.coverImage.image}/>:<Avatar>{user.firstName[0]}{user.secondName[0]}</Avatar>}
                </Flex>
                <Box mb={3}>
                    <Flex my="auto"  justifyContent="space-evenly" width={1} px={4}>
                        <Text >{user.firstName}</Text>
                        <Text>{user.secondName}</Text>
                    </Flex>
                </Box>
                <Flex mx="auto" flexDirection="Column">
                    <Flex mb={4} mx="auto">
                        <Locate/>
                    </Flex>
                    <Flex mb={3} >
                        <ModalLink path={`/createEvent`}component={AddEventWindow}>
                            <Flex flexDirection="row">
                                <ListItemIcon>
                                <AddIcon/> 
                                </ListItemIcon>
                            <Text my="auto">Create event</Text>
                            </Flex>
                        </ModalLink>
                    </Flex>
                    <Flex  mb={4}>
                        <EditProfileBlock/>
                    </Flex>
                    <Flex mx="auto">
                      <Logout/>
                    </Flex>
                </Flex>
            </Flex>
        </Dialog>
    )
}