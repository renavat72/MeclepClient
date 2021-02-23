import React, { useState } from 'react';
import { CardActions, Link, Collapse, Button } from '@material-ui/core';
import { Text, Box, Flex } from 'rebass';
import { useTranslation } from 'react-i18next';

import LikeButton from '../../Buttons/LikeButton';
import Slider from '../../Slider';

export default function AnotherEventWindow(props) {
  const { post } = props;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box minWidth="200px"  maxWidth="300px">
      <Flex flexDirection="column">
        <Flex flexDirection="column" mr="auto" mb={3}>
          <Text
            fontWeight="bold"
            fontSize={[16, 18]}
            textAlign="left"
            width={['200px', '250px']}
            mb={2}
          >
            {post.title}
          </Text>
          <Text fontSize={14} textAlign="left" width="200px" mb={1} >
            {post.address}
          </Text>
          <Flex my={1} flexDirection="row" justifyContent="space-between">
            <Flex flexDirection="column" ml="auto">
              <Text textAlign="right" fontSize={14} mb={1}>
                {post.time}
              </Text>
              <Text textAlign="right" fontSize={10} mb={1}>
                {post.period}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex mb={3} maxWidth={['200px', '250px']}>
          <Text color="textSecondary" textAlign="left">
            {post.headerDescription}
          </Text>
        </Flex>
        <Flex  maxWidth={['200px', '250px']} mx="auto">
        <Slider images={post.images} window={true} />
        </Flex>
        {post.description !== 0 ? (
          <Flex mr="auto">
            {open ? (
              <Button onClick={handleClick}>{t('common.hide')}</Button>
            ) : (
              <Button onClick={handleClick}>{t('common.showMore')}</Button>
            )}
          </Flex>
        ) : null}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Flex my={1} maxWidth={['200px', '250px']} flexDirection="column">
            <Text color="textSecondary" textAlign="left">
              {post.description}
            </Text>
          </Flex>
        </Collapse>
        <Flex>
          <CardActions>
            <LikeButton post={post} postId={post.id} />
          </CardActions>
          <Flex my="auto" ml="auto">
            <Box ml="auto">
              <Text fontSize={16}>
                <Link href={post.urlContent}> {post.website}</Link>
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
