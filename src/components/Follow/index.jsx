import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Fab } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import { useTranslation } from 'react-i18next';

import { GET_AUTH_USER, CREATE_FOLLOW, DELETE_FOLLOW } from '../../apis/UserAPI';
import { AuthContext } from '../../context/auth';
import { Box, Flex } from 'rebass';

export default function Follow({ user, onFollowBtn, followBtn }) {
  const authUser = useContext(AuthContext);
  const { data } = useQuery(GET_AUTH_USER);
  const isFollowing = data && data.getAuthUser.following.find((f) => f.id === user.id);
  const { t } = useTranslation();

  const [followUser] = useMutation(CREATE_FOLLOW, {
    update() {},
    variables: {
      input: {
        userId: user.id,
        coverImageUser: user.coverImage,
        firstNameUser: user.firstName,
        secondNameUser: user.secondName,
        coverImageFollower: data && data.getAuthUser.coverImage,
        firstNameFollower: authUser.user.firstName,
        secondNameFollower: authUser.user.secondName,
        followerId: authUser.user.id,
      },
    },
  });
  const [unFollowUser] = useMutation(DELETE_FOLLOW, {
    update(_, result) {
      console.log(result);
    },
    variables: {
      input: { id: isFollowing ? isFollowing.id : null },
    },
  });
  return (
    <Flex my="auto">
      {isFollowing ? (
        <Box onClick={unFollowUser}>
          {onFollowBtn ? (
            <Fab color="secondary">
              {' '}
              <CancelIcon fontSize="large" />
            </Fab>
          ) : (
            <Button>{t('common.unFollow')}</Button>
          )}
        </Box>
      ) : (
        <Box onClick={followUser}>
          {followBtn ? (
            <Fab color="primary">
              {' '}
              <GroupAddIcon fontSize="large" />
            </Fab>
          ) : (
            <Button>{t('common.follow')}</Button>
          )}
        </Box>
      )}
    </Flex>
  );
}
