import React, { useState, useContext } from 'react';
import { Dialog, Tabs, Tab, IconButton } from '@material-ui/core';
import { Text, Box, Flex } from 'rebass';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

import FilterFriendsBlock from './FilterFriendsBlock';
import FollowingBlock from './FollowingBlock';
import FollowersBlock from './FollowersBlock';
import AllUsersBlock from './AllUsersBlock';
import { AuthContext } from '../../context/auth';

export const FriendsWindowBlock = styled(Box)`
  max-width: 1024px;
  overflow: auto;
  box-sizing: border-box;
`;
export const DialogBlock = styled(Flex)`
  flex-direction: column;
  overflow: auto;
  box-sizing: border-box;
`;
export const DialogFriend = styled(Flex)`
  box-sizing: border-box;
  border: 1px solid black;
`;

export const WrapperFriends = styled(Box)`
  height: 720px;
`;
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
      <Box>
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
            <Box p={3}>
              <Text>{children}</Text>
            </Box>
          )}
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => handleOpen()} maxWidth="xl">
      <Flex m={[1, 2]} minWidth={[null, '700px']} flexDirection="column">
        <Flex ml="auto">
          <IconButton onClick={() => handleOpen()}>
            <CloseIcon variant="second" />
          </IconButton>
        </Flex>
        <FriendsWindowBlock>
          <Flex flexDirection={['column-reverse', 'row']}>
            <WrapperFriends>
              <TabsUsers />
            </WrapperFriends>
            <Box width={[1, 2 / 7]} mx={[0, 3]} my={[2, 0]}>
              <FilterFriendsBlock
                width="170px"
                searchFollowing={searchFollowing}
                setSearchFollowing={setSearchFollowing}
              />
            </Box>
          </Flex>
        </FriendsWindowBlock>
      </Flex>
    </Dialog>
  );
}
