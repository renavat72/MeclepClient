import React, { useState, useContext } from 'react'
import {Button, Drawer, List, ListItem, ListItemText, Avatar, Badge, ListItemIcon } from '@material-ui/core';
import { Box, Flex } from 'rebass';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import MailIcon from '@material-ui/icons/Mail';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../../context/auth'
import EventsBlock from '../Events/EventsBlock'
import EditProfile from '../EditProfile'
import DialogWindow from '../Dialog'
import FriendsWindow from '../FriendsWindow'
import {GET_AUTH_USER} from '../../apis/UserAPI'

const Sidebar = ({panTo}) => {
    const { user, logout } = useContext(AuthContext);
    const { data} = useQuery(GET_AUTH_USER);
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
            <Button variant="outlined"  onClick = { logout } href="/authorization"> <ListItemIcon> <ExitToAppIcon /></ListItemIcon> Logout </Button>
            </Box>
        )
    }

    const EventsBlockWindow = () => {
        return (
            <Box>
            <Button onClick={handleEventsWindow}>  <ListItemIcon> <EventIcon /></ListItemIcon>Events</Button>
            </Box>
        )
    };
    function BackToLocate({ panTo }) {
        function toLocate(){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                  panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                },
                () => null
              );
        };

        return (
          <Button
            className="locate"
            onClick={() => toLocate()}
          >
         +
          </Button>
        );
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
    const IsDesktopDrawer = () =>{
        return(
         <Drawer anchor="left" variant="permanent" onClose={openHandler} open={sidebarOpen} >
            <Flex flexDirection="column" px={2}>
                <Flex mx={3} my={4} >
                    <Avatar>{InitialsWords}</Avatar>
                    <Flex my="auto">
                    <Box width={1/3} ml={2}>
                        {user.firstName}
                    </Box>
                    <Box width={1/3}>
                        {user.secondName}
                    </Box>
                    </Flex>
                </Flex>
            <Flex flexDirection="column">
                <List>
                    {[<FriendWindowBlock/>, <DialogBlock/>, <EventsBlockWindow/>,  <BackToLocate panTo={panTo}/>, <EditProfileBlock/>].map((block, index) => (
                        <ListItem key={index} onClick={handleClick} my={1}>
                            <ListItemText primary={block} />
                        </ListItem>
                    ))}
                </List>
            </Flex>
            </Flex>
            <Flex mx={4} mt="auto" mb={4}>
                    <Logout/>
            </Flex>
    </Drawer>
    )
    }
    const IsMobileDrawer = () =>{
        return(
         <Drawer anchor="bottom" variant="permanent" onClose={openHandler} open={sidebarOpen} >
                <List>
                    <Flex>
                    {[<PeopleOutlineIcon ml={3} onClick={handleFriendsWindow}/>,
                        <MailIcon onClick={handleDialogWindow}/>,
                        <EventIcon onClick={handleEventsWindow}/>,
                        <AccountBoxOutlinedIcon  onClick={handleEditProfileWindow}/>
                    ].map((block, index) => (
                        <Flex key={index} onClick={handleClick} my={1} mx="auto">
                            <ListItemText primary={block} />
                        </Flex>
                    ))}
                    </Flex>
                </List>
            {/* <Flex mx={4} mt="auto" mb={4}>
                    <Logout/>
            </Flex> */}
    </Drawer>
    )
    }
    const InitialsWords = user.firstName[0] + user.secondName[0];
    if (window.innerWidth < 768) return <IsMobileDrawer/>;
    else return <IsDesktopDrawer/>

    }
    return (

        <div>
            <DrawerSide/>
            <EditProfile editProfileWindow={editProfileWindow}  handleEditProfileWindow={handleEditProfileWindow}/>
            <EventsBlock eventsWindow={eventsWindow}  handleEventsWindow={handleEventsWindow} authUser={data} panTo={panTo}/>
            <DialogWindow dialogWindow={dialogWindow}  handleDialogWindow={handleDialogWindow}/>
            <FriendsWindow friendsWindow={friendsWindow} handleFriendsWindow={handleFriendsWindow}/>
        </div>

    )
}
export default Sidebar