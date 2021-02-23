import React, { useState, useContext, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Text, Flex } from 'rebass';
import { useQuery } from '@apollo/react-hooks';
import { ModalLink } from 'react-router-modal';
import { useTranslation } from 'react-i18next';

import { GET_ALL_USERS } from '../../apis/UserAPI';
import Follow from '../Follow';
import { AuthContext } from '../../context/auth';
import { DialogBlock, DialogFriend } from '../FriendsWindow';
import ProfileWindow from '../Profile';
import AvatarUser from '../AvatarUser';

export default function AllUsersBlock({ searchFollowing }) {
  const authUser = useContext(AuthContext);
  const variables = {
    userId: authUser.user.id,
  };
  const { data, loading, refetch } = useQuery(GET_ALL_USERS, { variables });
  const UserData = data && data.getUsers;
  const [usersData, setUsersData] = useState();
  const MergeData =
    UserData &&
    UserData.filter(
      (user) =>
        !searchFollowing ||
        user.firstName === searchFollowing ||
        user.secondName === searchFollowing,
    );
  const { t } = useTranslation();

  useEffect(() => {
    setUsersData(UserData);
    refetch();
  }, [UserData]);

  if (usersData === undefined) {
    return <CircularProgress />;
  } else {
    return (
      <DialogBlock variables={variables}>
        {loading ? (
          <CircularProgress />
        ) : MergeData <= 0 ? (
          <Text textAlign="center" fontWeight="bold" color="#aaa">
            {t('friends.noUsers')}
          </Text>
        ) : (
          MergeData.map((user) => (
            <DialogFriend my={1} key={user.id}>
              <ModalLink path={`/id${user.id}`} component={ProfileWindow} props={user.id}>
                <AvatarUser props={user} size="small" />
              </ModalLink>
              <Flex my="auto">
                <Text mx={2} fontSize={[14, 16]}>
                  {user.firstName}
                </Text>
                <Text fontSize={[14, 16]}>{user.secondName}</Text>
              </Flex>
              <Flex ml="auto">
                <Follow user={user} />
              </Flex>
            </DialogFriend>
          ))
        )}
      </DialogBlock>
    );
  }
}