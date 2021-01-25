import React,{useState, useEffect} from 'react';
import {Text,Flex } from 'rebass';
import { Avatar, Dialog, ListItem, ListItemAvatar, ListItemText, DialogTitle, List} from '@material-ui/core';
import {  ModalLink} from 'react-router-modal';

import ProfileWindow from '../Profile'
import AvatarUser from '../AvatarUser'


export function FollowersDialog(userInfo){
 
    const [isOpen, setIsOpen] = useState(true);
    const [followersInfo, setFollowersInfo] = useState(userInfo);
    useEffect(()=>{
      setFollowersInfo(userInfo);
    },[userInfo])
    const handleOpen = () =>{
        setIsOpen(!userInfo)
    };
    
    if(!userInfo) return null
    return(
      <Dialog open={isOpen} onClose={()=>handleOpen()} >
        <DialogTitle>Followers</DialogTitle>
        {followersInfo.userInfo <= 0 ? 
        <Flex p={6} m="auto">
          <Text>No followers</Text>
          </Flex>
          : <List>
          {followersInfo&&followersInfo.userInfo.map((user) => (
            <ListItem button key={user.id}>
                <ModalLink path={`/id${user.follower}`} component={ProfileWindow} props={user}>
                  <Flex flexDirection="row"  my="auto"  width={1}>
                      <ListItemAvatar>
                        <AvatarUser props={user} followers={true}/>
                      </ListItemAvatar>
                      <ListItemText>
                        <Flex flexDirection="row" my="auto"  width="200px">
                          <Text ml={2}mr={4}  >
                            {user.followerFirstName}
                          </Text>
                          <Text mr="auto">
                          {user.followerSecondName}
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