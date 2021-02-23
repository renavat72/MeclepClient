import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { Text, Box, Flex } from 'rebass';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { Form } from 'react-final-form';
import { ModalLink } from 'react-router-modal';
import { useTranslation } from 'react-i18next';

import { CREATE_MESSAGE } from '../../apis/MessageAPI';
import ProfileWindow from '../Profile';

const InputBlock = styled(Flex)`
  background-color: #f8f8f8;
  border: 1px solid #e5e5e5;
`;
const DialogBlock = styled(Flex)`
  flex-direction: column;
  height: 400px;
  padding-bottom: 14px;
  overflow-x: hidden;
`;
const Message = styled(Text)`
  width: fit-content;
  background-color: ${(p) => (p.userMessage ? '#8dabd8' : '#e5e5e5')};
  border-radius: 8px;
  padding: 10px;
`;

export default function ChatSide(props) {
  const { friendInfo, authUser, messages } = props;
  const [textMessage, setTextMessage] = useState('');
  const bottomRef = useRef(null);
  const { t } = useTranslation();

  const [createMessage] = useMutation(CREATE_MESSAGE, {
    update(_, result) {
      console.log(result);
    },
    variables: {
      input: {
        sender: authUser,
        receiver: friendInfo.id ? friendInfo.id : null,
        message: textMessage,
      },
    },
  });

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [bottomRef, messages]);

  const onSubmit = () => {
    if (!textMessage) return;
    createMessage();
    setTextMessage('');
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      onSubmit();
    }
  };
  return (
    <Flex flexDirection="column" width={[1, 5 / 6]}>
      <DialogBlock>
        {messages <= 0 ? null : (
          <Flex
            width={2 / 3}
            mx="auto"
            p={2}
            sx={{ borderBottomWidth: 0.5, borderBottomStyle: 'solid', borderBottomColor: '#aaa' }}
          >
            <Flex mx="auto">
              <ModalLink
                path={`/id${friendInfo.id}`}
                component={ProfileWindow}
                props={friendInfo.id}
              >
                <Flex mx="auto" flexDirection="row">
                  <Text mr={2}>{friendInfo.firstName}</Text>
                  <Text>{friendInfo.secondName}</Text>
                </Flex>
              </ModalLink>
            </Flex>
          </Flex>
        )}
        {messages <= 0 ? (
          <Flex m="auto">
            <Text textAlign="center" fontWeight="bold" color="#e5e5e5">
              {t('dialog.selectChat')}
            </Text>
          </Flex>
        ) : (
          messages.map((message) => {
            const isAuthUserReceiver = authUser === message.sender.id;
            return (
              <Flex
                flexDirection="column"
                width={1}
                px={3}
                userMessage={isAuthUserReceiver}
                key={message.id}
                pt={3}
              >
                {isAuthUserReceiver ? (
                  <Text mb={2} ml="auto">
                    {message.sender.firstName}
                  </Text>
                ) : (
                  <Text mb={2} mr="auto">
                    {message.sender.firstName}
                  </Text>
                )}
                <Message ml={isAuthUserReceiver ? 'auto' : null} userMessage={isAuthUserReceiver}>
                  {message.message}
                </Message>
                <Flex ml="auto">
                  {message.seen ? <Text fontSize={12}>{t('common.send')}</Text> : null}
                </Flex>
              </Flex>
            );
          })
        )}
        <div ref={bottomRef} />
      </DialogBlock>
      {messages <= 0 ? null : (
        <InputBlock width={1} p={3} flexDirection="column">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Flex>
                  <TextField
                    fullWidth
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    onKeyDown={onEnterPress}
                  />
                  <Box px={3}>
                    <Button variant="contained" color="primary" type="submit">
                      {t('common.send')}
                    </Button>
                  </Box>
                </Flex>
              </form>
            )}
          />
        </InputBlock>
      )}
    </Flex>
  );
}
