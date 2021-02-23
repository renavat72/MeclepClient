import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { Text, Flex } from 'rebass';
import { useQuery } from '@apollo/react-hooks';
import { ModalLink } from 'react-router-modal';
import { useTranslation } from 'react-i18next';

import { GET_AUTH_USER } from '../../apis/UserAPI';
import Follow from '../Follow';
import ProfileWindow from '../Profile';
import ChatWindow from '../Dialog/ChatWindow';
import { DialogBlock, DialogFriend } from '../FriendsWindow';
import AvatarUser from '../AvatarUser';

export default function FollowingBlock({ handleClick, authUser, searchFollowing }) {
  const { data, loading, refetch } = useQuery(GET_AUTH_USER);
  const { t } = useTranslation();

  useEffect(() => {
    setFollowingState(FollowingData);
    refetch();
  }, [data]);

  const FollowingData = data && data.getAuthUser.following;
  const [followingState, setFollowingState] = useState(FollowingData);
  const [isOpen, setIsOpen] = useState(false);
  const [infoFriend, setInfoFriend] = useState();
  const MergeData =
    FollowingData &&
    FollowingData.filter(
      (user) =>
        !searchFollowing ||
        user.userFirstName === searchFollowing ||
        user.userSecondName === searchFollowing,
    );
  const handleOpen = (user) => {
    setInfoFriend(user);
    setIsOpen(!isOpen);
  };
  // const showMore = () => {
  //       fetchMore({
  //         variables: { limit:MergeData.length+10 },
  //         updateQuery: (prevResult, { fetchMoreResult }) => {
  //                   console.log(fetchMoreResult)

  //               if (!fetchMoreResult) return prevResult;
  //               return {
  //                     ...prevResult, ...fetchMoreResult
  //                   };
  //         }
  //   });
  //   }
  if (followingState === undefined) {
    return null;
  } else {
    return (
      <DialogBlock>
        {isOpen ? (
          <ChatWindow
            handleOpen={handleOpen}
            authUser={{ authUser }}
            user={infoFriend.user}
            alert={handleClick}
          />
        ) : null}
        {loading ? (
          <CircularProgress />
        ) : MergeData <= 0 ? (
          <Text textAlign="center" fontWeight="bold" color="#aaa">
            {t('friends.noFollowing')}
          </Text>
        ) : (
          MergeData.map((user) => (
            <DialogFriend my={1} key={user.id}>
              <ModalLink
                path={`/id${user.user}`}
                component={ProfileWindow}
                props={(user.user, handleClick)}
              >
                <AvatarUser props={user} following={true} />
              </ModalLink>
              <Flex my="auto">
                <Text mx={2} fontSize={[14, 16]}>
                  {user.userFirstName}
                </Text>
                <Text fontSize={[14, 16]}>{user.userSecondName}</Text>
              </Flex>
              <Flex ml="auto">
                <Follow user={user} />
                <Button onClick={() => handleOpen(user)}>{t('common.send')}</Button>
              </Flex>
            </DialogFriend>
          ))
        )}
      </DialogBlock>
    );
  }
}
