import React, { useState, useEffect } from 'react';
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  ListItemIcon,
} from '@material-ui/core';
import { Box, Flex, Text } from 'rebass';
import MuiAlert from '@material-ui/lab/Alert';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import MailIcon from '@material-ui/icons/Mail';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { ModalLink } from 'react-router-modal';
import styled from 'styled-components';
import ReorderIcon from '@material-ui/icons/Reorder';
import { useTranslation } from 'react-i18next';
import './style.css';

import { SET_CITY } from '../../reducers/geolocation';
import EventsBlock from '../Events/EventsBlock';
import EditProfile from '../EditProfile';
import DialogWindow from '../Dialog';
import FriendsWindow from '../FriendsWindow';
// import CityWindow from '../CityWindow';
import { useStore } from '../../context/store';
import MobileSidebar from './MobileSidebar';
import MyProfileWindow from '../Profile/MyProfile';
import AvatarUser from '../AvatarUser';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CustomModalLink = styled(ModalLink)`
  text-decoration: none;
`;

const Sidebar = ({ panTo, user, logout }) => {
  const localCity = localStorage.getItem('City');
  const [{ geolocation }, dispatch] = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobSidebarOpen, setMobSidebarOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(localCity);
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem('City', selectedCity);
    dispatch({ type: SET_CITY, payload: selectedCity });
  }, [dispatch, selectedCity]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleMobSidebar = () => {
    setMobSidebarOpen(!mobSidebarOpen);
  };

  const openHandler = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const Logout = () => {
    return (
      <Box >
        <Button size="large"variant="outlined" onClick={logout} href="/authorization">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          {t('common.logout')}
        </Button>
      </Box>
    );
  };
  const EventsBlockWindow = () => {
    return (
      <ModalLink path={`/events`} component={EventsBlock} props={{ panTo }}>
          <Flex flexDirection="row">
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <Text>{t('common.events')}</Text>
      </Flex>
        </ModalLink>
    );
  };
  function Locate({ panTo }) {
    function toLocate() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => null,
      );
    }
    return (
      // <ModalLink 
      //     path={`/friends`} 
      //     component={FriendsWindow} 
      //     props={{ handleClick }}
      //   >
      <Flex flexDirection="row">
          <ListItemIcon>
            <RoomOutlinedIcon/>
          </ListItemIcon>
          <Text sx={{ textDecoration: 'none' }} color="Gray"> Moscow</Text>
        </Flex>
      // </ModalLink>
    );
  }
  const DialogBlock = () => {
    return (
        <CustomModalLink path={`/dialog`} component={DialogWindow} textDecoration={'none'}>
        <Flex flexDirection="row">
          <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <Text sx={{ textDecoration: 'none' }}>{t('sidebar.dialog')}</Text>
        </Flex>
        </CustomModalLink>
    );
  };

  const FriendWindowBlock = () => {
    return (
        <ModalLink path={`/friends`} component={FriendsWindow}>
        <Flex flexDirection="row">
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <Text style={{ textDecoration: 'none' }}>{t('sidebar.friends')}</Text>
          </Flex>
        </ModalLink>
    );
  };
  const EditProfileBlock = () => {
    return (
        <ModalLink path={`/settings`} component={EditProfile}>
        <Flex flexDirection="row">
            <ListItemIcon>
              <AccountBoxOutlinedIcon />
            </ListItemIcon>
            <Text>{t('sidebar.editProfile')}</Text>
          </Flex>
        </ModalLink>
    );
  };
  function DrawerSide() {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(!open);
    };
    const IsDesktopDrawer = ({ user }) => {
      if (user === undefined) return null;
      return (
        <div anchor="left" variant="permanent" onClose={openHandler} open={sidebarOpen} className="Drawer">
          <Flex flexDirection="column" px={2}>
            <ModalLink path={`/myProfile`} component={MyProfileWindow}>
              <Flex mx={2} my={4}>
                <AvatarUser props={user}/>
                <Flex my="auto" justifyContent="space-evenly" width={1} ml={3}>
                  <Text fontWeight="500">{user.firstName}</Text>
                  <Text fontWeight="500">{user.secondName}</Text>
                </Flex>
              </Flex>
            </ModalLink>
            <Flex flexDirection="column" >
              <List>
                {[
                  <Locate panTo={panTo} />,
                  <FriendWindowBlock />,
                  <DialogBlock />,
                  <EventsBlockWindow />,
                  <EditProfileBlock />,
                ].map((block, index) => (
                  <ListItem key={index} onClick={handleClick} my={2}>
                    <ListItemText primary={block} />
                  </ListItem>
                ))}
              </List>
            </Flex>
          <Flex mx={4} mt="auto" pb={5} >
            <Logout />
          </Flex>
          </Flex>
        </div>
      );
    };
    const IsMobileDrawer = () => {
      return (
        <Drawer anchor="bottom" variant="permanent" onClose={openHandler} open={sidebarOpen}>
          <List>
            <Flex>
              {[
                <ModalLink path={`/friends`} component={FriendsWindow}>
                  <PeopleOutlineIcon  />
                </ModalLink>,
                <ModalLink path={`/events`} component={EventsBlock}>
                  <EventIcon  />
                </ModalLink>,
                <ModalLink path={`/dialog`} component={DialogWindow}>
                  <MailIcon  />
                </ModalLink>,
                <ModalLink path={`/`}>
                <ReorderIcon onClick={handleMobSidebar} />,
              </ModalLink>,
              ].map((block, index) => (
                <Flex key={index} onClick={handleClick} my={1} mx="auto">
                  <ListItemText primary={block} />
                </Flex>
              ))}
            </Flex>
          </List>
        </Drawer>
      );
    };
    if (window.innerWidth < 768) return <IsMobileDrawer />;
    else return <IsDesktopDrawer user={user} />;
  }
  return (
    <div>
      <DrawerSide />
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
        EditProfileBlock={EditProfileBlock}
      />
    </div>
  );
};
export default Sidebar;
