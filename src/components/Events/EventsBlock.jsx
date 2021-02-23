import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  TextField,
  Checkbox,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
} from '@material-ui/core';
import { Text, Box, Flex } from 'rebass';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useRouteMatch } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

import { FETCH_ALL_EVENTS_QUERY } from '../../apis/ParserEventAPI';
import { AuthContext } from '../../context/auth';
import ParserEvent from './ParserEvent';
import Event from './Event';

const WrapperEvent = styled(Box)`
  width: 100%;
  min-height: 720px;
`;


const Block = ({ children }) => <Box>{children}</Box>;

export default function EventsBlock(props) {
  const { handleEventsWindow, authUser } = props;
  const [typeValue, setTypeValue] = useState('');
  const [favorite, setFavorite] = useState();
  const [myFollowing, setMyFollowing] = useState();
  const [onlineEvents, setOnlineEvents] = useState();
  const [searchValue, setSearchValue] = useState('');
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(true);
  const { url } = useRouteMatch();

  function handleOpen() {
    setIsOpen(false);
    window.history.pushState('', '', `${url}`);
  }

  const onTypeChange = (e) => setTypeValue(e.target.value);
  const onSearchChange = (e) => setSearchValue(e.target.value);
  const variables = {
    skip: null,
    limit: 10,
  };
  const { data, fetchMore } = useQuery(FETCH_ALL_EVENTS_QUERY, { variables });

  const mergeData = data && data.getParserEvents.concat(data.getPosts);
  const { user } = useContext(AuthContext);
  const filteredEvents =
    mergeData &&
    mergeData.filter(
      (post) =>
        // (post.city === geolocation.city || post.city === "")&& //Добавить логику контент от страны
        (!typeValue || post.typeOfEvent === typeValue) &&
        (!onlineEvents || post.isOnline === true) &&
        (!searchValue || post.nameOfEvent === searchValue) && //Доработать ввод
        (!favorite || post.likes.find((user) => user.userId === favorite)) &&
        (!myFollowing || post.userId === myFollowing), //Доработать сравнение. Не видит значения
    );
  function favoriteHandle() {
    favorite ? setFavorite(null) : setFavorite(user.id);
  }
  function onlineHandle() {
    onlineEvents
      ? setOnlineEvents(null)
      : setOnlineEvents(mergeData && mergeData.map((post) => post.isOnline === true));
  }
  function myFollowingHandle() {
    myFollowing
      ? setMyFollowing(null)
      : setMyFollowing(authUser && authUser.getAuthUser.following.map((user) => user.user));
  }
  const showMore = () => {
    fetchMore({
      variables: { limit: mergeData.length + 10 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        console.log(fetchMoreResult);

        if (!fetchMoreResult) return prevResult;
        return {
          ...prevResult,
          ...fetchMoreResult,
        };
      },
    });
  };
  return (
    <Dialog open={isOpen} onClose={() => handleOpen()} width={1} maxWidth="xl">
      <Flex mx={[3, 4]} my={[3, 1]} minWidth={[null, '650px']} flexDirection="column">
        <Flex mb={3} justifyContent="space-between">
          <Text fontWeight="bold" my="auto">
            {' '}
            {t('common.events')}
          </Text>
          <IconButton onClick={() => handleOpen()}>
            <CloseIcon variant="second" />
          </IconButton>
        </Flex>
        <Flex width={1} flexDirection={['column-reverse', 'row']}>
          <WrapperEvent mr={[0, 5]}>
            <EventsList
              events={filteredEvents}
              handleOpen={handleOpen}
              user={user}
              panTo={props.panTo}
              handleEventsWindow={handleEventsWindow}
              showMore={showMore}
            />
          </WrapperEvent>
          <Box width={[1, 1 / 3, 1 / 3]}>
            <FilterBlock
              typeValue={typeValue}
              onTypeChange={onTypeChange}
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              favoriteHandle={favoriteHandle}
              myFollowingHandle={myFollowingHandle}
              onlineHandle={onlineHandle}
            />
          </Box>
        </Flex>
      </Flex>
    </Dialog>
  );
}

function EventsList({ events, user, panTo, showMore, handleOpen }) {
  useEffect(() => {
    setEventsData(events);
  }, [events]);
  const [eventsData, setEventsData] = useState('');
  const { t } = useTranslation();
  return (
    <Box>
      {eventsData <= 0 ? (
        <Box mt="300px">
          <Text textAlign="center" fontWeight="bold" color="#aaa">
            {t('common.noEvents')}
          </Text>
        </Box>
      ) : (
        eventsData &&
        eventsData
          .sort((a, b) => b.date - a.date)
          .map((post) => (
            <Block item key={post.id}>
              <Box my={3} ml={1}>
                {post.website ? (
                  <ParserEvent post={post} user={user} panTo={panTo} handleOpen={handleOpen} />
                ) : (
                  <Event post={post} user={user} panTo={panTo} />
                )}
              </Box>
            </Block>
          ))
      )}
      {eventsData >= 10 ? null : (
        <Flex width={1}>
          <Flex mx="auto">
            <ArrowDownwardIcon onClick={() => showMore()} color="primary" fontSize="large" />
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

function FilterBlock(props) {
  const { t } = useTranslation();
  const { favoriteHandle, myFollowingHandle, onlineHandle } = props;
  return (
    <Flex ml="auto">
      <Box maxWidth={[null, '200px', '170px']} width={1}>
        <Box>
          <TextField
            placeholder={t('events.find')}
            value={props.searchValue}
            onChange={props.onSearchChange}
          />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Text textAlign="left">{t('common.type')}</Text>
            </AccordionSummary>
            <AccordionDetails>
              <Flex flexDirection="column" mr="auto ">
                <RadioGroup value={props.typeValue} onChange={props.onTypeChange}>
                  <FormControlLabel
                    value="Party"
                    control={<Radio color="primary" />}
                    label={t('common.party')}
                  />
                  <FormControlLabel
                    value="Club"
                    control={<Radio color="primary" />}
                    label={t('common.club')}
                  />
                  <FormControlLabel
                    value="Meeting"
                    control={<Radio color="primary" />}
                    label="Meeting"
                  />
                  <FormControlLabel
                    value="Exhibition"
                    control={<Radio color="primary" />}
                    label={t('common.exhibition')}
                  />
                </RadioGroup>
              </Flex>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Flex mt={3} flexDirection="column">
          <FormControlLabel
            control={<Checkbox onChange={() => favoriteHandle()} color="primary" />}
            label={t('common.favorite')}
          />
          <FormControlLabel
            control={<Checkbox onChange={() => myFollowingHandle()} color="primary" />}
            label={t('friends.myFriends')}
          />
          <FormControlLabel
            control={<Checkbox onChange={() => onlineHandle()} color="primary" />}
            label={t('events.online')}
          />
        </Flex>
      </Box>
    </Flex>
  );
}
