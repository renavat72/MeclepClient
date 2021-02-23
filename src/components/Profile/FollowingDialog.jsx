import React, { useEffect, useState } from 'react';
import { Text, Flex } from 'rebass';
import {
  Dialog,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  List,
} from '@material-ui/core';
import { ModalLink } from 'react-router-modal';
import { useTranslation } from 'react-i18next';

import ProfileWindow from '../Profile';
import AvatarUser from '../AvatarUser';

export function FollowingDialog(userInfo) {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const [followingInfo, setFollowingInfo] = useState(userInfo);
  useEffect(() => {
    setFollowingInfo(userInfo);
  }, [userInfo]);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  if (!userInfo) return null;
  if (!followingInfo) return null;

  return (
    <Dialog open={isOpen} onClose={() => handleOpen()} width={1}>
      <DialogTitle>{t('friends.following')}</DialogTitle>
      {followingInfo.userInfo <= 0 ? (
        <Flex p={6} m="auto">
          <Text>{t('friends.noFollowers')}</Text>
        </Flex>
      ) : (
        <List>
          {followingInfo &&
            followingInfo.userInfo.map((user) => (
              <ListItem button key={user.id}>
                <ModalLink path={`/id${user.user}`} component={ProfileWindow} props={user}>
                  <Flex flexDirection="row" my="auto" width={1}>
                    <ListItemAvatar>
                      <AvatarUser props={user} following={true} />
                    </ListItemAvatar>
                    <ListItemText>
                      <Flex flexDirection="row" my="auto" width="200px">
                        <Text ml={2} mr={4}>
                          {user.userFirstName}
                        </Text>
                        <Text mr="auto">{user.userSecondName}</Text>
                      </Flex>
                    </ListItemText>
                  </Flex>
                </ModalLink>
              </ListItem>
            ))}
        </List>
      )}
    </Dialog>
  );
}
