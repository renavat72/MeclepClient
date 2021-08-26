import React, { useState } from 'react';
import { Button,Collapse } from '@material-ui/core';
import { Text, Box, Flex, Link } from 'rebass';
import { useTranslation } from 'react-i18next';

import LikeButton from '../Buttons/LikeButton';
import Slider from '../Slider';


export default function ParserEvent(props) {
  const { post, handleOpen } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };
  function LocateToAddress({ panTo }) {
    function handleLocate() {
      navigator.geolocation.getCurrentPosition(() => {
        panTo({
          lat: post.lat,
          lng: post.lng,
        });
      });
      handleOpen();
    }

    return (
      <Text fontSize={[12, 14]} onClick={() => handleLocate()}>
        {post.address}
      </Text>
    );
  }
  return (
    <div className="EventCard">
      <Flex flexDirection="column" width={[null, 500]}>
        <Flex  m={3}  flexDirection="column">
          <Text  fontWeight="bold" fontSize={[16, 22]}>
            {post.title}
          </Text>
          <Text fontSize={[14, 16]}  my={2}>{post.headerDescription}</Text>
          <Box>
            <Text fontWeight="600" color="#3f51b5" style={{cursor: "pointer"}}>
              <LocateToAddress panTo={props.panTo} />
            </Text>
          </Box>
        </Flex>
        <Flex flexDirection="row" >
          <Slider images={post.images} />
        </Flex>
          <Flex  mx={3}flexDirection="column" >
          {post.description !== 0 ? (
            <Flex mx="auto" >
              {open ? (
                <Button onClick={handleModal}>{t('common.hide')}</Button>
                ) : (
                  <Button onClick={handleModal}>{t('common.showMore')}</Button>
                  )}
            </Flex>
          ) : null}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Flex my={1} flexDirection="column">
            <Text fontSize={[12, 14]} my={3}>{post.time}</Text>
              <Text color="textSecondary" fontSize={[14, 16]}>
                {post.description}
              </Text>
            </Flex>
          </Collapse>
          <Flex my={1} flexDirection="row">
            <LikeButton user={props.user} postId={post.id} post={post} />
            <Flex my="auto" ml="auto">
              <Text textAlign="right" fontSize={[12,12]} >
                {post.period}
              </Text>
            </Flex>
          </Flex>
          <Box ml="auto" mt="auto" mb={3}>
            <Text fontSize={[12,14]} fontWeight="bold">
              <Link variant='nav' href={post.urlContent} > {post.website}</Link>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
