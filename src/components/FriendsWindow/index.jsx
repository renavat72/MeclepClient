import React, { useState, useContext } from 'react';
import { Dialog, Tabs, Tab, IconButton } from '@material-ui/core';
import { Text, Box, Flex } from 'rebass';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import "./index.css"

import FilterFriendsBlock from './FilterFriendsBlock';
import FollowingBlock from './FollowingBlock';
import FollowersBlock from './FollowersBlock';
import AllUsersBlock from './AllUsersBlock';
import { AuthContext } from '../../context/auth';

export default function FriendsWindow({ handleClick }) {
  const { url } = useRouteMatch();
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);
  const [searchFollowing, setSearchFollowing] = useState('');
  const { t } = useTranslation();

  function handleOpen() {
    setIsOpen(false);
    window.history.pushState('', '', `${url}`);
  }
  const TabsUsers = () => {
    const [tab, setTab] = useState(0);
    const handleChange = (e, newTab) => {
      setTab(newTab);
    };

    return (
      <Box >
        <Tabs value={tab} onChange={handleChange} indicatorColor="primary" textColor="primary">
          <Tab label={t('friends.following')} />
          <Tab label={t('friends.followers')} />
          <Tab label={t('friends.allUsers')} />
        </Tabs>
        <TabPanel tab={tab} index={0}>
          <FollowingBlock
            url={url}
            authUser={user.id}
            handleClick={handleClick}
            searchFollowing={searchFollowing}
          />
        </TabPanel>
        <TabPanel tab={tab} index={1} url={url}>
          <FollowersBlock
            authUser={user.id}
            handleClick={handleClick}
            searchFollowing={searchFollowing}
          />
        </TabPanel>
        <TabPanel tab={tab} index={2} url={url}>
          <AllUsersBlock searchFollowing={searchFollowing} />
        </TabPanel>
      </Box>
    );
    function TabPanel(props) {
      const { children, tab, index, ...other } = props;
      return (
        <div
          role="tabpanel"
          hidden={tab !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {tab === index && (
            <Box pl={[null, null, 3]} py={3}>
              <Text>{children}</Text>
            </Box>
          )}
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => handleOpen()} maxWidth={false} >
      <Flex m={[1, 2]} flexDirection="column"  minHeight="720px" >
        <Box className="FriendsWindowBlock">
          <Flex flexDirection={['column-reverse', 'row']}>
            <Box>
              <TabsUsers />
            </Box>
            <Box width={[1, 2 / 7]} mx={[0, 3]} my={[2, 0]}>
              <FilterFriendsBlock
                width="170px"
                searchFollowing={searchFollowing}
                setSearchFollowing={setSearchFollowing}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Dialog>
  );
}
