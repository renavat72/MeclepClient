import React, { useState, useEffect, useReducer } from 'react'
import {Button, Drawer, List, ListItem, ListItemText, Avatar, Badge, ListItemIcon } from '@material-ui/core';
import { Box, Flex, Text } from 'rebass';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import MailIcon from '@material-ui/icons/Mail';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { useQuery } from '@apollo/react-hooks';
import { generatePath, Link,useRouteMatch } from 'react-router-dom';
import { ModalContainer, ModalLink,ModalRoute } from 'react-router-modal';
import styled from 'styled-components';

import { geolocationReducer, SET_CITY } from '../../reducers/geolocation'
import { AuthContext } from '../../context/auth'

import EventsBlock from '../Events/EventsBlock'
import EditProfile from '../EditProfile'
import DialogWindow from '../Dialog'
import FriendsWindow from '../FriendsWindow'
import {GET_AUTH_USER} from '../../apis/UserAPI'
import CityWindow from '../CityWindow';
import { useStore } from '../../context/store';


const Sidebar = ({panTo, user, logout}) => {
    const { data} = useQuery(GET_AUTH_USER);
    const localCity = localStorage.getItem("City");
    const [{geolocation}, dispatch] = useStore();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [eventsWindow, setEventsWindow] = useState(false);
    const [dialogWindow, setDialogWindow] = useState(false);
    // const [cityWindow, setCityWindow] = useState(false);
    // const [friendsWindow, setFriendsWindow] = useState(false);
    const [editProfileWindow,setEditProfileWindow] = useState(false);
    const [selectedCity, setSelectedCity ] = useState(localCity);

    useEffect(() => {
        localStorage.setItem("City", selectedCity)
        dispatch({ type: SET_CITY, payload: selectedCity });
    },[ dispatch, selectedCity]);
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
                <ModalLink path={`/events`}component={EventsBlock}>
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
                <ModalLink path={`/city`} component={CityWindow } props={{setSelectedCity, panTo}} >
                   <Button >
                      <RoomOutlinedIcon onClick={toLocate}/>
                    <Text  mr="auto"  >
                        {selectedCity}
                    </Text>
                   </Button>
            </ModalLink>
              </Box>
        );
      }
      const DialogBlock = () => {
        return (
            <Box >
               <ModalLink path={`/dialog`}component={DialogWindow} textDecoration={"none"} >
               <Button >
                 <Badge badgeContent={0} color="secondary">
                     <MailIcon />
                 </Badge>
                    <Box ml={4}>
                    Dialog
                    </Box>
                </Button>
          </ModalLink>
            </Box>
        )
    }

    const FriendWindowBlock = () => {
        return (
            <Box>
                <ModalLink path={`/friends`} component={FriendsWindow} >
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
    const InitialsWords = user.firstName[0] + user.secondName[0];
    if (window.innerWidth < 768) return <IsMobileDrawer/>;
    else return <IsDesktopDrawer/>

    }
    return (

        <div>                     
             {/* <ModalContainer/> */}
            <DrawerSide/>
            {/* <EditProfile editProfileWindow={editProfileWindow}  handleEditProfileWindow={handleEditProfileWindow}/> */}
            {/* <EventsBlock eventsWindow={eventsWindow}  handleEventsWindow={handleEventsWindow} authUser={data} panTo={panTo}/> */}
           {/* <ModalLink path="/friends" component={FriendsWindow}> */}
               
            {/* <CityWindow  panTo={panTo}  setSelectedCity={setSelectedCity}/> */}
        </div>

    )
}
export default Sidebar