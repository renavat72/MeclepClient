import React, { useState, useContext } from 'react'
import {Button, Drawer, List, ListItem, ListItemText, Avatar, Badge, ListItemIcon } from '@material-ui/core';
import { Box, Flex } from 'rebass';
import { AuthContext } from '../../context/auth'
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import MailIcon from '@material-ui/icons/Mail';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Events from '../Events/Events'
import EditProfile from '../EditProfile'
import DialogWindow from '../Dialog'
import FriendsWindow from '../FriendsWindow'

const Sidebar = (props) => {
    const { user, logout } = useContext(AuthContext)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [eventsWindow, setEventsWindow] = useState(false);
    const [dialogWindow, setDialogWindow] = useState(false);
    const [friendsWindow, setFriendsWindow] = useState(false);
    const [editProfileWindow,setEditProfileWindow] = useState(false);

    const handleEventsWindow = () => {
        setEventsWindow(!eventsWindow);
      };
      const handleFriendsWindow = () => {
        setFriendsWindow(!friendsWindow);
      };

    const handleDialogWindow = () => {
        setDialogWindow(!dialogWindow);
      };

    const handleEditProfileWindow = () => {
        setEditProfileWindow(!editProfileWindow);
      };

    const openHandler = () =>{
        setSidebarOpen(!sidebarOpen)
     }

    const Logout = () => {
        return (
            <Box>
            <Button variant="outlined"  onClick = { logout } href="/login"> <ListItemIcon> <ExitToAppIcon /></ListItemIcon> Logout </Button>
            </Box>
        )
    }

    const EventsBlock = () => {
        return (
            <Box>
            <Button onClick={handleEventsWindow}>  <ListItemIcon> <EventIcon /></ListItemIcon>Events</Button>
            </Box>
        )
    }
    const DialogBlock = () => {
        return (
            <Box >
             <Button onClick={handleDialogWindow}>
                 <Badge badgeContent={0} color="secondary">
                     <MailIcon />
                 </Badge>
                 <Box ml={4}>
                 Dialog
                </Box></Button>
            </Box>
        )
    }
    const FriendWindowBlock = () => {
        return (
            <Box>
            <Button onClick={handleFriendsWindow}><ListItemIcon> <PeopleOutlineIcon /></ListItemIcon>Friends</Button>
            </Box>
        )
    }
    const EditProfileBlock = () => {
        return (
            <Box>
            <Button onClick={handleEditProfileWindow}> <ListItemIcon> <AccountBoxOutlinedIcon /></ListItemIcon>Edit profile</Button>
            </Box>
        )
    }
    function DrawerSide(){
        const [open, setOpen] = useState(false);
        const handleClick = () => {
            setOpen(!open);
        };

        return(
         <Drawer anchor="left" variant="permanent" onClose={openHandler} open={sidebarOpen} >
            <Flex flexDirection="column" px={2}>
                <Flex mx={3} my={4}>
                    <Avatar>H</Avatar>
                    <Flex my="auto">
                    <Box width={1/3} ml={2}>
                        {user.firstname}
                    </Box>
                    <Box width={1/3}>
                        {user.secondname}
                    </Box>
                    </Flex>
                </Flex>
                <Flex flexDirection="column">
                    <List>
                        {[<FriendWindowBlock/>, <DialogBlock/>, <EventsBlock />, <EditProfileBlock/>].map((text) => (
                            <ListItem key={text} onClick={handleClick} my={1}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Flex>
         </Flex>
            <Flex mx={3} mt="auto" mb={4}>
                    <Logout/>
            </Flex>
        </Drawer>
        )
    }
    return (

        <div>
            <DrawerSide/>
            <EditProfile editProfileWindow={editProfileWindow}  handleEditProfileWindow={handleEditProfileWindow}/>
            <Events eventsWindow={eventsWindow}  handleEventsWindow={handleEventsWindow}/>
            <DialogWindow dialogWindow={dialogWindow}  handleDialogWindow={handleDialogWindow}/>
            <FriendsWindow friendsWindow={friendsWindow} handleFriendsWindow={handleFriendsWindow}/>
            <Button variant="contained" onClick={openHandler}>Menu</Button>
        </div>

    )
}
export default Sidebar