import React, { useState, useEffect } from 'react'
import {Button, Drawer, List, ListItem, ListItemText, Snackbar, ListItemIcon } from '@material-ui/core';
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
import ReorderIcon from '@material-ui/icons/Reorder';
import { useTranslation } from 'react-i18next';

import {  SET_CITY } from '../../reducers/geolocation'
import EventsBlock from '../Events/EventsBlock'
import EditProfile from '../EditProfile'
import DialogWindow from '../Dialog'
import FriendsWindow from '../FriendsWindow'
// import CityWindow from '../CityWindow';
import { useStore } from '../../context/store';
import MobileSidebar from './MobileSidebar'
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
    const [mobSidebarOpen,setMobSidebarOpen] = useState(false);
    const [selectedCity, setSelectedCity ] = useState(localCity);
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    useEffect(() => {
        localStorage.setItem("City", selectedCity)
        dispatch({ type: SET_CITY, payload: selectedCity });
    },[ dispatch, selectedCity]);

    const handleClick = () => {
        setOpen(!open);
      };
    const handleMobSidebar = () => {
        setMobSidebarOpen(!mobSidebarOpen);
      };

    const openHandler = () =>{
        setSidebarOpen(!sidebarOpen)
     };
    const Logout = () => {
        return (
            <Box>
            <Button variant="outlined"  onClick = { logout } href="/authorization"> <ListItemIcon> <ExitToAppIcon /></ListItemIcon> {t('common.logout')} </Button>
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
                    {t('common.events')}
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
                {/* <CustomModalLink 
                    path={`/city`} 
                    component={CityWindow } 
                    props={{setSelectedCity, panTo}} 
                > */}
                   <Button disabled>
                    <Flex mr={4}>
                      <RoomOutlinedIcon 
                    //   onClick={toLocate}
                    />
                    </Flex>
                    <Text  mr="auto"  >
                        {/* {selectedCity} */} 
                        {/* Доделать выбор города*/}
                    Moscow
                    </Text>
                   </Button>
            {/* </CustomModalLink> */}
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
                    {t('sidebar.dialog')}
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
                        {t('sidebar.friends')}
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
                     {t('sidebar.editProfile')}
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
        if(user===undefined) return null
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
                        <ModalLink path={`/dialog`} component={DialogWindow}><MailIcon ml={3}/></ModalLink>,
                        <ModalLink path={`/events`} component={EventsBlock}><EventIcon ml={3}/></ModalLink>,
                        <ReorderIcon onClick={handleMobSidebar}/>
                    ].map((block, index) => (
                        <Flex key={index} onClick={handleClick} my={1} mx="auto">
                            <ListItemText primary={block} />
                        </Flex>
                    ))}
                    </Flex>
                </List>
        </Drawer>
    )
    }
    if (window.innerWidth < 768) return <IsMobileDrawer/>;
    else return <IsDesktopDrawer user={user}/>
    }
    return (
        <div>
            <DrawerSide/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClick}>
                <Alert onClose={handleClick} severity="success">
                Your message has been sent
                </Alert>
            </Snackbar>
            <MobileSidebar 
                handleMobSidebar={handleMobSidebar} 
                mobSidebarOpen={mobSidebarOpen} 
                user={user} 
                Logout={Logout} 
                Locate={Locate}
                EditProfileBlock={EditProfileBlock}/>
        </div>

    )
}
export default Sidebar