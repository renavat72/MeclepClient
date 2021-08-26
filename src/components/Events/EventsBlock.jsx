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
  Grid,
} from '@material-ui/core';
import { Text, Box, Flex, Button } from 'rebass';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useRouteMatch } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import './index.css'

import { FETCH_ALL_EVENTS_QUERY } from '../../apis/ParserEventAPI';
import { AuthContext } from '../../context/auth';
import ParserEvent from './ParserEvent';
import Event from './Event';

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
    <Dialog open={isOpen} onClose={() => handleOpen()} fullWidth={false} width={1} maxWidth="xl">
      <Flex flexDirection="column" >
        <Flex flexDirection={['column-reverse', 'row']} >
          <Flex   flexDirection="column">
            <Box m={[2,4]}>
            <Flex >   
             <Text fontWeight="bold" my="auto" mx={["auto",0, 0]} ml="auto">
                {t('common.events')}
              </Text>
            </Flex>
            <Flex my={3} ml="auto"> 
                <TextField
                placeholder={t('events.find')}
                value={searchValue}
                onChange={onSearchChange}
              />
            </Flex>
            <EventsList
              events={filteredEvents}
              handleOpen={handleOpen}
              user={user}
              panTo={props.panTo}
              handleEventsWindow={handleEventsWindow}
              showMore={showMore}
            />
            </Box>
            </Flex>
            <FilterBlock
              typeValue={typeValue}
              onTypeChange={onTypeChange}
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              favoriteHandle={favoriteHandle}
              myFollowingHandle={myFollowingHandle}
              onlineHandle={onlineHandle}
            />
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
    <div className="EventList">
      <div className="EventsBlockContent">
      {eventsData <= 0 ? (
        <Flex m="auto">
          <Text fontWeight="bold" color="#aaa" textAlign="center" >
          {t('common.noEvents')}
          </Text>
        </Flex>
      ) : 
      <Grid container  >
        {eventsData &&
        eventsData
        .sort((a, b) => b.date - a.date)
        .map((post) => (
          <Block item key={post.id}>
            <Grid item zeroMinWidth > 
                {post.website ? (
                  <ParserEvent post={post} user={user} panTo={panTo} handleOpen={handleOpen} />
                  ) : (
                    <Event post={post} user={user} panTo={panTo} />
                    )}
              </Grid>
            </Block>
          ))
          }
          </Grid>
}
        {eventsData <= 0  ?  null :
          <Flex py={3} width={1} style={{cursor: "pointer"}}>
          <Flex mx="auto">
            <ArrowDownwardIcon onClick={() => showMore()} color="primary" fontSize="large" />
          </Flex>
        </Flex>
      }
      </div>
      </div>
  );
}

function FilterBlock(props) {
  const { t } = useTranslation();
  const { favoriteHandle, myFollowingHandle, onlineHandle } = props;
  return (
    <div className="FilterBlock"  ml={[0, "auto"]}>
        <Box mx={[3, 0]} > 
         
          <Accordion className="AccordingFilter">
            <AccordionSummary className="AccordingType">
              <Text textAlign="left">{t('common.type')}</Text>
            </AccordionSummary>
            <AccordionDetails>
              <Flex flexDirection="column" mr="auto"  >
                <RadioGroup value={props.typeValue} onChange={props.onTypeChange}>
                  <FormControlLabel
                    value="Party"
                    control={<Radio color="primary" />}
                    label={t('common.party')}
                  ></FormControlLabel>
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
        <Flex mt={3} flexDirection="column" >
        <Box onClick={() => favoriteHandle()} className="FilterBtn" >
        <Text textAlign="left">{t('common.favorite')}</Text> 
        </Box>
        <Box onClick={() => myFollowingHandle()} className="FilterBtn">
        <Text textAlign="left">{t('friends.myFriends')}</Text> 
        </Box>
        <Box onClick={() => onlineHandle()} className="FilterBtn">
        <Text textAlign="left">{t('events.online')}</Text> 
        </Box>
           {/* <FormControlLabel
            control={<Button my={3} onClick={() => favoriteHandle()} color="primary" />}
            label={t('common.favorite')}
            /> 
          <FormControlLabel
            control={<Button my={3} onClick={() => myFollowingHandle()} color="primary" />}
            label={t('friends.myFriends')}
            />
          <FormControlLabel
            control={<Button onClick={() => onlineHandle()} color="primary" />}
            label={t('events.online')}
            />  */}
        </Flex>
            </Box>
      </div>
  );
}
