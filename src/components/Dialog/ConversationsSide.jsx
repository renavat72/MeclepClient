import React, { useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import { Text, Box, Flex } from 'rebass';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import { GET_CONVERSATIONS, GET_CONVERSATIONS_SUBSCRIPTION } from '../../apis/MessageAPI';

const FriendsSide = styled(Flex)`
  background-color: #f8f8f8;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
`;

const FriendsBlock = styled(Flex)`
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
  cursor: pointer;
  max-height: 400px;
  overflow: auto;

  :hover {
    background-color: #a0b9de;
    transition: opacity 0.6s;
    opacity: 0.9;
  }
  :active {
    background-color: #a0b9de;
    transition: opacity 0.6s;
    opacity: 0.9;
  }
`;

export default function ConversationsSide(props) {
  const { authUser, setFriendInfo } = props;
  const { t } = useTranslation();
  const variables = {
    authUserId: authUser,
  };
  if (!variables.authUserId) {
    return null;
  }
  const { subscribeToMore, data } = useQuery(GET_CONVERSATIONS, { variables });
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_CONVERSATIONS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newConversation } = subscriptionData.data;
        const oldConversations = prev.getConversations;

        if (oldConversations.some((u) => u.id === newConversation.id)) {
          return prev;
        }
        const conversations = newConversation;
        delete conversations['receiverId'];
        const mergedConversations = [newConversation, ...oldConversations];

        return { getConversations: mergedConversations };
      },
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);
  return (
    <FriendsSide variables={variables} width={[1, 2 / 6]}>
      <Box mt={2} width={1}>
        {data &&
          data.getConversations.map((user) => (
            <FriendsBlock
              flexDirection="row"
              p={[0, 2]}
              mb={1}
              py={1}
              key={user.id}
              onClick={() => setFriendInfo(user)}
              backgroundColor={user.seen ? 'Gray' : '#8dabd9'}
            >
              <Avatar>{user.firstName[0] + user.secondName[0]}</Avatar>
              <Flex ml={3} flexDirection="column">
                <Flex flexDirection="row" my="auto">
                  <Text mr={2} fontSize={14}>
                    {user.firstName}
                  </Text>
                  <Text fontSize={14}>{user.secondName}</Text>
                </Flex>
                <Flex>
                  {user.lastMessageSender ? (
                    <Text fontSize={14}>
                      {t('common.you')}: {user.lastMessage}
                    </Text>
                  ) : (
                    <Text fontSize={14}>{user.lastMessage}</Text>
                  )}
                </Flex>
              </Flex>
            </FriendsBlock>
          ))}
      </Box>
    </FriendsSide>
  );
}
