import React, {useEffect, useState} from 'react';
import {Text,Flex } from 'rebass';
import { Avatar, Dialog, ListItem, ListItemAvatar, ListItemText, DialogTitle, List} from '@material-ui/core';
import {  ModalLink} from 'react-router-modal';

import ProfileWindow from '../Profile'


export function FollowingDialog (userInfo){
    const [isOpen, setIsOpen] = useState(true);
    const [followingInfo, setFollowingInfo] = useState(userInfo);
    useEffect(()=>{
      setFollowingInfo(userInfo);
    },[userInfo])
    const handleOpen = () =>{
        setIsOpen(!isOpen)
    }
    console.log(followingInfo)
    if(!userInfo) return null

    return(
      <Dialog open={isOpen} onClose={()=>handleOpen()} width={1}>
        <DialogTitle>Following</DialogTitle>
        
        {followingInfo.userInfo <= 0 ? 
          <Flex  p={6} m="auto">
            <Text>No following</Text>
          </Flex>:
          <List>
          {followingInfo&&followingInfo.userInfo.map((user) => (
            <ListItem button key={user.id}>
                <ModalLink path={`/id${user.user}`} component={ProfileWindow} props={user}>
                  <Flex flexDirection="row" my="auto"  width={1}>
                    <ListItemAvatar>
                            <Avatar>{user.userFirstName[0] + user.userSecondName[0]}</Avatar>
                    </ListItemAvatar>
                      <ListItemText>
                        <Flex flexDirection="row" my="auto"  width="200px">
                          <Text ml={2}mr={4}  >
                            {user.userFirstName}
                          </Text>
                          <Text mr="auto">
                          {user.userSecondName}
                          </Text>
                        </Flex>
                      </ListItemText>
                    </Flex>
                  </ModalLink>
              </ListItem>
          ))}
        </List>
        }
      </Dialog>
    )
  }