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
  console.log(post)
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="EventMarkerWindow">
      <Flex flexDirection="column" >
      <Flex   style={{marginTop:-36}}>
         <Slider images={post.images} window={true}/>
        </Flex>
        <Flex flexDirection="column" mb={3} m={2}>
          <Text
            fontWeight="bold"
            fontSize={[16, 18]}
            textAlign="center"
            mb={2}
          >
            {post.title}
          </Text>
          <Flex >
            <Text mr="auto" fontSize={14} textAlign="left"  mb={1} >
              {post.address}
            </Text>
            <Text ml="auto" fontSize={[12,14]} fontWeight="bold">
                <Link href={post.urlContent}> {post.website}</Link>
            </Text>
          </Flex>
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
        <Flex ml={2} mb={3} maxWidth={['200px', '250px']}>
          <Text color="textSecondary" textAlign="left">
            {post.headerDescription}
          </Text>
        </Flex>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Flex mx={2} my={1}  flexDirection="column" >
            <Text color="textSecondary" fontSize={16}  style={{overflow:"auto"}}>
              {post.description}
            </Text>
          </Flex>
        </Collapse>
        {post.description.length !== 0 ? (
          <Flex mx="auto">
            {open ? (
              <Button onClick={handleClick}>{t('common.hide')}</Button>
            ) : (
              <Button onClick={handleClick}>{t('common.showMore')}</Button>
            )}
          </Flex>
        ) : null}
        <Flex>
          <CardActions>
            <LikeButton post={post} postId={post.id} />
          </CardActions>
        </Flex>
      </Flex>
    </div>
  );
}
