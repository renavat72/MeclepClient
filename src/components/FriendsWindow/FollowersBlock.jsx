import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { Text, Flex } from 'rebass';
import { ModalLink } from 'react-router-modal';
import { useTranslation } from 'react-i18next';

import { GET_AUTH_USER } from '../../apis/UserAPI';
import Follow from '../Follow';
import ProfileWindow from '../Profile';
import { DialogBlock, DialogFriend } from '../FriendsWindow';
import ChatWindow from '../Dialog/ChatWindow';
import AvatarUser from '../AvatarUser';

export default function FollowersBlock({ handleClick, authUser, searchFollowing }) {
  const { data, loading } = useQuery(GET_AUTH_USER);
  const FollowersData = data && data.getAuthUser.followers;
  const [isOpen, setIsOpen] = useState(false);
  const [infoFriend, setInfoFriend] = useState();
  const { t } = useTranslation();
  const MergeData =
    FollowersData &&
    FollowersData.filter(
      (user) =>
        !searchFollowing ||
        user.followerFirstName === searchFollowing ||
        user.followerSecondName === searchFollowing,
    );
  const handleOpen = (user) => {
    setInfoFriend(user);
    setIsOpen(!isOpen);
  };
  return (
    <DialogBlock>
      {isOpen ? (
        <ChatWindow
          handleOpen={handleOpen}
          authUser={{ authUser }}
          user={infoFriend.follower}
          alert={handleClick}
        />
      ) : null}
      {loading ? (
        <CircularProgress />
      ) : MergeData <= 0 ? (
        <Text textAlign="center" fontWeight="bold" color="#aaa">
          {t('friends.noFollowers')}
        </Text>
      ) : (
        MergeData.map((user) => (
          <DialogFriend my={1} key={user.id}>
            <ModalLink path={`/id${user.follower}`} component={ProfileWindow} props={user.follower}>
              <AvatarUser props={user} size="small" followers={true} />
            </ModalLink>
            <Flex my="auto">
              <Text mx={2} fontSize={[14, 16]}>
                {user.followerFirstName}
              </Text>
              <Text fontSize={[14, 16]}>{user.followerSecondName}</Text>
            </Flex>
            <Flex ml="auto" my="auto">
              <Flex ml="auto">
                <Follow user={user} />
                <Button onClick={() => handleOpen(user)}>{t('common.send')}</Button>
              </Flex>
            </Flex>
          </DialogFriend>
        ))
      )}
    </DialogBlock>
  );
}
