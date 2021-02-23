import React from 'react';
import { Box, Flex } from 'rebass';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ChatSide from './ChatSide';
import ConversationsSide from './ConversationsSide';

export default function MobileDialog(props) {
  return (
    <Box>
      <Flex maxWidth="500px" minWidth="310px" minHeight="470px" flexDirection="row">
        {props.friendInfo ? (
          <MobileChatSide props={props} />
        ) : (
          <MobileConversationsSide props={props} />
        )}
      </Flex>
    </Box>
  );
}
function MobileChatSide({ props }) {
  return (
    <Box>
      <Flex flexDirection="column">
        <Flex mr="auto">
          <ArrowBackIcon onClick={() => props.setFriendInfo('')} />
        </Flex>
      </Flex>
      <ChatSide
        friendInfo={props.friendInfo}
        authUser={props.authUser}
        messages={props.messages ? props.messages : []}
      />
    </Box>
  );
}
function MobileConversationsSide({ props }) {
  return (
    <Box width="100%">
      <ConversationsSide setFriendInfo={props.setFriendInfo} authUser={props.authUser} />
    </Box>
  );
}
