import React, { useState, useEffect } from 'react'
import {Button, Drawer, List, ListItem, ListItemText, Avatar, Snackbar, ListItemIcon } from '@material-ui/core';
import { Box, Flex, Text } from 'rebass';
import MuiAlert from '@material-ui/lab/Alert';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import MailIcon from '@material-ui/icons/Mail';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import {  ModalLink } from 'react-router-modal';
import styled from 'styled-components';

import {  SET_CITY } from '../../reducers/geolocation'
import EventsBlock from '../Events/EventsBlock'
import EditProfile from '../EditProfile'
import DialogWindow from '../Dialog'
import FriendsWindow from '../FriendsWindow'
import CityWindow from '../CityWindow';
import { useStore } from '../../context/store';
import ProfileWindow from '../Profile'
import MyProfileWindow from '../Profile/MyProfile'
import AvatarUser from '../AvatarUser'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  export const CustomModalLink = styled(ModalLink)`
        text-decoration: none; 
  `


const Sidebar = ({panTo, user, logout}) => {
    const localCity = localStorage.getItem("City");
    const [{geolocation}, dispatch] = useStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [eventsWindow, setEventsWindow] = useState(false);
    const [dialogWindow, setDialogWindow] = useState(false);
    // const [cityWindow, setCityWindow] = useState(false);
    // const [friendsWindow, setFriendsWindow] = useState(false);
    const [editProfileWindow,setEditProfileWindow] = useState(false);
    const [selectedCity, setSelectedCity ] = useState(localCity);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        localStorage.setItem("City", selectedCity)
        dispatch({ type: SET_CITY, payload: selectedCity });
    },[ dispatch, selectedCity]);

    const handleClick = () => {
        setOpen(!open);
      };
     
    const handleEventsWindow = () => {
        setEventsWindow(!eventsWindow);
      };

    const handleDialogWindow = () => {
        setDialogWindow(!dialogWindow);
      };

    const handleEditProfileWindow = () => {
        setEditProfileWindow(!editProfileWindow);
      };

    const openHandler = () =>{
        setSidebarOpen(!sidebarOpen)
     };

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
                <ModalLink path={`/events`}component={EventsBlock} props={{panTo}}>
                  <Button >  
                    <ListItemIcon> 
                        <EventIcon />
                    </ListItemIcon>
                    <Text>
                    Events
                    </Text>
                    </Button>
                </ModalLink>
            </Box>
        )
    };
    function Locate({ panTo }) {
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
            <Box>
                <CustomModalLink path={`/city`} component={CityWindow } props={{setSelectedCity, panTo}} >
                   <Button >
                      <RoomOutlinedIcon onClick={toLocate}/>
                    <Text  mr="auto"  >
                        {selectedCity}
                    </Text>
                   </Button>
            </CustomModalLink>
              </Box>
        );
      }
      const DialogBlock = () => {
        return (
            <Box >
               <CustomModalLink path={`/dialog`}component={DialogWindow} textDecoration={"none"}  >
               <Button >
                     <MailIcon />
                    <Box ml={4}>
                    Dialog
                    </Box>
                </Button>
          </CustomModalLink>
            </Box>
        )
    }

    const FriendWindowBlock = () => {
        return (
            <Box>
                <ModalLink path={`/friends`} component={FriendsWindow} props={{handleClick}}>
                    <Button >
                        <ListItemIcon> 
                                <PeopleOutlineIcon />
                        </ListItemIcon>
                        <Text sx={{textDecoration: 'none'}} >
                            Friends
                        </Text>
                        </Button>
                </ModalLink>
            </Box>
        )
    }
    const EditProfileBlock = () => {
        return (
            <Box>
              <ModalLink path={`/settings`} component={EditProfile}> 
              <Button >
                    <ListItemIcon> 
                        <AccountBoxOutlinedIcon />
                     </ListItemIcon>
                     <Text >
                        Edit profile
                     </Text>
              </Button>
              </ModalLink>
            </Box>
        )
    }
    function DrawerSide(){
        const [open, setOpen] = useState(false);
        const handleClick = () => {
            setOpen(!open);
        };
    const IsDesktopDrawer = ({user}) =>{
        if(!{user})return null
        return(
         <Drawer anchor="left" variant="permanent" onClose={openHandler} open={sidebarOpen} >
            <Flex flexDirection="column" px={2}>
            <ModalLink path={`/myProfile`} component={MyProfileWindow} > 
                <Flex mx={3} my={4} >
                      <AvatarUser props={user}/>
                    <Flex my="auto"  justifyContent="space-evenly" width={1} >
                        <Box >
                            {user.firstName}
                        </Box>
                        <Box>
                            {user.secondName}
                        </Box>
                        </Flex>
                </Flex>
            </ModalLink>
            <Flex flexDirection="column">
                <List>
                    {[ <Locate panTo={panTo}/>,<FriendWindowBlock/>, <DialogBlock/>, <EventsBlockWindow/>, <EditProfileBlock/>].map((block, index) => (
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
                    {[<ModalLink path={`/friends`} component={FriendsWindow}><PeopleOutlineIcon ml={3}/></ModalLink>,
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
    if (window.innerWidth < 768) return <IsMobileDrawer/>;
    else return <IsDesktopDrawer user={user}/>

    }
    return (

        <div>                     
             {/* <ModalContainer/> */}
            <DrawerSide/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClick}>
                <Alert onClose={handleClick} severity="success">
                Your message has been sent
                </Alert>
            </Snackbar>
            {/* <EditProfile editProfileWindow={editProfileWindow}  handleEditProfileWindow={handleEditProfileWindow}/> */}
            {/* <EventsBlock eventsWindow={eventsWindow}  handleEventsWindow={handleEventsWindow} authUser={data} panTo={panTo}/> */}
           {/* <ModalLink path="/friends" component={FriendsWindow}> */}
            {/* <CityWindow  panTo={panTo}  setSelectedCity={setSelectedCity}/> */}
        </div>

    )
}
export default Sidebar