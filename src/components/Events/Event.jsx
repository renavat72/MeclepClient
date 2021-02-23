import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { IconButton, Button } from '@material-ui/core';
import { Text, Box, Flex } from 'rebass';
import styled from 'styled-components';
import ShareIcon from '@material-ui/icons/Share';
import { useTranslation } from 'react-i18next';

import DeleteButton from '../Buttons/DeleteButton';
import LikeButton from '../Buttons/LikeButton';

const WrapperCard = styled(Flex)`
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
`;

export default function Event(props) {
  const { post, user, handleEventsWindow } = props;
  const parseDate = Date.parse(post.timeOfEvent);
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  function LocateToAddress({ panTo }) {
    function handleLocate() {
      navigator.geolocation.getCurrentPosition(() => {
        panTo({
          lat: post.lat,
          lng: post.lng,
        });
      });
      handleEventsWindow();
    }

    return (
      <Text fontSize={[12, 14]} onClick={() => handleLocate()}>
        {post.address}
      </Text>
    );
  }

  const handleModal = () => {
    setOpen(!open);
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return 'Completed';
    } else {
      return (
        <span>
          {days}:{hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <Box>
      <WrapperCard>
        <Flex m={3} flexDirection="column" width="500px">
          <Flex flexDirection="column">
            <Text fontWeight="bold" fontSize={20}>
              {post.nameOfEvent}
            </Text>
            <Text fontSize={18}>
              <LocateToAddress panTo={props.panTo} />
            </Text>
            <Text my={1}>{post.typeOfEvent}</Text>
          </Flex>
          <Flex my={3} width="320px">
            <Text>{post.aboutOfEvent}</Text>
          </Flex>
          <Flex my={1}>
            <Flex flexDirection="row">
              <LikeButton user={user} postId={post.id} post={post} />
              <IconButton>
                <ShareIcon />
              </IconButton>

              {user &&
                user.id === post.userId &&
                (open ? (
                  <Button onClick={handleModal}>{t('common.back')}</Button>
                ) : (
                  <Button onClick={handleModal}>{t('common.delete')}</Button>
                ))}
            </Flex>
            {open ? <DeleteButton post={post} postId={post.id} /> : null}
            <Box ml="auto" my="auto">
              <Countdown date={parseDate} renderer={renderer} />
            </Box>
          </Flex>
          <Flex></Flex>
          <Box ml="auto" mb="auto">
            <Text>
              {post.firstName} {post.secondName}{' '}
            </Text>
          </Box>
        </Flex>
      </WrapperCard>
    </Box>
  );
}
