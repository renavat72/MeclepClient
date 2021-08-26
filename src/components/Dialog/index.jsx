import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Dialog } from '@material-ui/core';
import { Flex } from 'rebass';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRouteMatch } from 'react-router-dom';

import {
  GET_CONVERSATIONS,
  GET_MESSAGES,
  GET_MESSAGES_SUBSCRIPTION,
  UPDATE_MESSAGE_SEEN,
} from '../../apis/MessageAPI';
import { GET_AUTH_USER } from '../../apis/UserAPI';

import { AuthContext } from '../../context/auth';
import ConversationsSide from './ConversationsSide';
import ChatSide from './ChatSide';
import MobileDialog from './MobileDialog';
import "./index.css"

export default function DialogWindow(props) {
  const { url } = useRouteMatch();
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useContext(AuthContext);
  const [friendInfo, setFriendInfo] = useState('');
  function handleOpen() {
    setIsOpen(false);
    window.history.pushState('', '', `${url}`);
  }
  if (friendInfo === undefined) {
    return <ConversationsSide setFriendInfo={setFriendInfo} authUser={user.id} />;
  }
  const variables = {
    authUserId: user.id,
    userId: friendInfo.id,
  };

  const { subscribeToMore, data } = useQuery(GET_MESSAGES, {
    variables,
    fetchPolicy: 'network-only',
  });

  const updateMessageSeen = useCallback(async () => {
   await useMutation(UPDATE_MESSAGE_SEEN, {
      update(_, result) {
        console.log(result);
      },
      variables: variables,
      refetchQueries: () => [
        {
          query: GET_CONVERSATIONS,
          variables: variables,
        },
        { query: GET_AUTH_USER },
      ],
    });
  }, [variables]);

  useEffect(() => {
    setFriendInfo(friendInfo);
  }, [friendInfo]);

  useEffect(() => {
    const unsubscribeToMore = subscribeToMore({
      document: GET_MESSAGES_SUBSCRIPTION,
      variables: { authUserId: user.id, userId: friendInfo.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageCreated;
        const mergedMessages = [...prev.getMessages, newMessage];

        return { getMessages: mergedMessages };
      },
    });
    return () => {
      unsubscribeToMore();
    };
  }, [user.id, friendInfo, subscribeToMore]);
  
  if (window.innerWidth < 768)
    return (
      <Dialog open={isOpen} onClose={() => handleOpen()}fullWidth={true} maxWidth={false}>
        <MobileDialog
          setFriendInfo={setFriendInfo}
          authUser={user.id}
          friendInfo={friendInfo}
          messages={data ? data.getMessages : []}
        />
      </Dialog>
    );
  else
    return (
      <Dialog open={isOpen} onClose={() => handleOpen()} fullWidth={true} maxWidth={false}>
        <Flex flexDirection="row" minWidth={['500px', '700px']} minHeight="720px">
          <ConversationsSide
            setFriendInfo={setFriendInfo}
            authUser={user.id}
          />
          <ChatSide
            friendInfo={friendInfo}
            setFriendInfo={setFriendInfo}
            authUser={user.id}
            messages={data ? data.getMessages : []}
          />
        </Flex>
      </Dialog>
    );
}
