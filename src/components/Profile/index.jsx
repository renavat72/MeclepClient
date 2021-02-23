import React, { useState, useContext } from 'react';
import { Box, Text, Flex } from 'rebass';
import { useQuery } from '@apollo/react-hooks';
import { Fab, IconButton, Dialog, Button, GridList, GridListTile } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ModalImage from 'react-modal-image';
import { useTranslation } from 'react-i18next';

import { GET_CURRENT_USER } from '../../apis/UserAPI';
import { FollowingDialog } from '../Profile/FollowingDialog';
import { FollowersDialog } from '../Profile/FollowersDialog';
import ChatWindow from '../Dialog/ChatWindow';
import { AuthContext } from '../../context/auth';
import Follow from '../Follow';
import AvatarUser from '../AvatarUser';

const BackgroundImage = styled(Flex)`
  position: absolute;
  height: 30vh;

  background-image: url(${(p) => p.imageBackground});
  background-color: ${(p) => (p.imageBackground ? p.imageBackground : '#ABCEE8')};
  background-size: cover;
  background-position: center;

  filter: blur(3px);
`;

export default function ProfileWindow(props) {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);
  const [dialogWindow, setDialogWindow] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const { url } = useRouteMatch();
  const { t } = useTranslation();
  const userId = props.match.params.id;
  const variables = {
    userId: userId,
  };
  const { data } = useQuery(GET_CURRENT_USER, { variables });
  function handleOpen() {
    setIsOpen(false);
    window.history.pushState('', '', `${url}`);
  }
  if (!data) return null;
  const handleOpenChat = (user) => {
    setIsOpenChat(!isOpenChat);
  };
  return (
    <Dialog open={isOpen} onClose={() => handleOpen()} maxWidth="xl">
      {dialogWindow === 0 ? (
        <FollowersDialog userInfo={data && data.getCurrentUser.followers} />
      ) : dialogWindow === 1 ? (
        <FollowingDialog userInfo={data && data.getCurrentUser.following} />
      ) : null}
      {isOpenChat ? (
        <ChatWindow
          handleOpen={handleOpen}
          authUser={user.id}
          user={data && data.getCurrentUser}
          alert={props.handleClick}
        />
      ) : null}
      <Flex minWidth={['300px', '700px']} minHeight="470px" flexDirection="column">
        <BackgroundImage
          minWidth={['300px', '700px']}
          imageBackground={data && data.getCurrentUser.coverImage}
        />
        <Flex ml="auto">
          <IconButton onClick={() => handleOpen()}>
            <CloseIcon variant="second" />
          </IconButton>
        </Flex>
        <Flex flexDirection="column" mx="auto" width="300px" sx={{ zIndex: 100 }}>
          <Flex mx="auto" my={4}>
            <AvatarUser props={data && data.getCurrentUser} />
          </Flex>
          <Flex flexDirection="row" mx="auto" mb={3} justifyContent="center" width={1}>
            <Text fontSize={24} mr={2} textAlign="center" color="white">
              {data && data.getCurrentUser.firstName}
            </Text>
            <Text fontSize={24} textAlign="center" color="white">
              {data && data.getCurrentUser.secondName}
            </Text>
          </Flex>
          <Flex flexDirection="row" mx="auto" justifyContent="center" width={1}>
            <Box>
              <Text color="white">{t('profile.followers')}</Text>
              <Button size="small" onClick={() => setDialogWindow(0, true)}>
                <Text textAlign="center" color="white">
                  {data && data.getCurrentUser.followers.length}
                </Text>
              </Button>
            </Box>
            <Box mx={3}>
              <Text color="white">{t('profile.following')}</Text>
              <Button size="small" onClick={() => setDialogWindow(1, true)}>
                <Text textAlign="center" color="white">
                  {data && data.getCurrentUser.following.length}
                </Text>
              </Button>
            </Box>
            {/* <Box >
                      <Text>Events</Text>
                      <Text textAlign="center">21</Text>
                    </Box> */}
          </Flex>
        </Flex>
        <Flex flexDirection="column" m={3}>
          <Box my={5}>
            <Text>
              {t('profile.images')}:
              {data && data.getCurrentUser.images ? (
                <GridList cellHeight={160} cols={3}>
                  {data &&
                    data.getCurrentUser.images.map((image) => (
                      <GridListTile
                        key={image}
                        style={{ maxWidth: 50, maxHeight: 50, width: '100%' }}
                      >
                        <ModalImage large={image} small={image} />
                      </GridListTile>
                    ))}
                </GridList>
              ) : null}
            </Text>
          </Box>
          {/* <Flex flexDirection="row" >
                  <Text my="auto" mr={2}>
                    I like:
                  </Text>
                  <Text>
                      <Chip color="primary" label="Party"/>
                  </Text>
                </Flex> */}
          <Flex my={[4, 2]}>
            <Flex flexDirection="row" justifyContent="space-evenly" width={1} mx={[4, 7]}>
              <Fab color="primary">
                <ChatBubbleOutlineIcon
                  onClick={() => handleOpenChat(data && data.getCurrentUser)}
                />
              </Fab>
              <Follow user={data && data.getCurrentUser} followBtn={true} onFollowBtn={true} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Dialog>
  );
}
