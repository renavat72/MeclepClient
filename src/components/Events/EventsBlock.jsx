import React,{useContext,useEffect,useState} from 'react'
import { Dialog, TextField, Checkbox, Accordion, AccordionDetails, AccordionSummary, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';

import {FETCH_POSTS_QUERY} from '../../apis/EventAPI'
import {FETCH_ALL_EVENTS_QUERY} from '../../apis/ParserEventAPI'

import { AuthContext } from '../../context/auth';
import ParserEvent from './ParserEvent'

const WrapperEvent = styled(Box)`
width:100%;
min-height: 720px;


`
const WrapperFilterEvent = styled(Box)`
/* position: fixed; */
`
const WrapperBlock = styled(Box)`
/* overflow:hidden; */
`


const Block = ({children }) => (
      <Box>
      {children}
      </Box>
);

export default function EventsBlock(props){
      const {eventsWindow, handleEventsWindow,authUser} = props;
      const [typeValue, setTypeValue] = useState("");
      const [favorite, setFavorite] = useState();
      const [myFollowing, setMyFollowing] = useState();
      const [searchValue, setSearchValue] = useState();

      const onTypeChange = e => setTypeValue(e.target.value);
      const onSearchChange = e => setSearchValue(e.target.value);
      const { data } = useQuery(FETCH_ALL_EVENTS_QUERY);

      const mergeData = data && data.getParserEvents.concat(data.getPosts)

      const {user} = useContext(AuthContext);
      const filteredEvents =  mergeData&&mergeData.filter(post => (
            (!typeValue || post.typeOfEvent === typeValue) && 
            (!searchValue || post.nameOfEvent === searchValue) &&  //Доработать ввод 
            (!favorite || post.likes.find(user =>user.userId === favorite)) 
            &&(!myFollowing || post.userId === myFollowing) //Доработать сравнение. Не видит значения 
            ));
      function favoriteHandle(){
            favorite ? setFavorite(null): setFavorite(user.id )
      }
      function myFollowingHandle(){
            myFollowing ? setMyFollowing(null): setMyFollowing(authUser&&authUser.getAuthUser.following.map(user=> user.user))
      }

      // console.log(data&& data.getPosts.map(post => post.nameOfEvent === searchValue))

      return (
       <Dialog open={eventsWindow}  onClose={handleEventsWindow} width={1} maxWidth="xl"  >
         <WrapperBlock m={[3,4]} >
            <Flex mb={4}>
                  <Text  fontWeight='bold'>Events</Text>
            </Flex>
            <Flex width={1} flexDirection={["column-reverse","row"]} >
                  <WrapperEvent mr={[0,5]}>
                   <EventsList events={filteredEvents} user={user} panTo={props.panTo} handleEventsWindow={handleEventsWindow}/>
                  </WrapperEvent>
                  <Box width={[1,1/3,1/3]} >
                    <FilterBlock
                        typeValue={typeValue}
                        onTypeChange={onTypeChange}
                        searchValue={searchValue}
                        onSearchChange={onSearchChange}
                        favoriteHandle={favoriteHandle}
                        myFollowingHandle={myFollowingHandle}
                        />
                  </Box>
            </Flex>
        </WrapperBlock>
       </Dialog>
      )
}

function EventsList({events, user, panTo,handleEventsWindow}){
      useEffect(()=>{
            setEventsData(events)
      },[events] )
      const [eventsData, setEventsData ] = useState();

      return(
      <Box> {eventsData <= 0 ? 
            <Box mt="300px">
              <Text textAlign="center" fontWeight='bold'  color="#aaa">No events</Text>
            </Box>
            :
            eventsData && eventsData.sort((a, b) => b.date - a.date).map(post => (
            <Block item key={post.id}>
                  <Box my={3} ml={1}>
                  <ParserEvent post={post} user={user} panTo={panTo} handleEventsWindow={handleEventsWindow}/>
                  </Box>
            </Block>
            )) }
      </Box>
)
}

function FilterBlock(props){
      const {favoriteHandle, myFollowingHandle} =props;
      return(
            <Flex ml="auto" >
                  <WrapperFilterEvent maxWidth={[null,"200px","170px"]} width={1}>
               <Box >
                     <TextField 
                        maxWidth
                        placeholder="Find event" 
                        value={props.searchValue}
                        onChange={props.onSearchChange}/>
               <Accordion>
                  <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  >
                  <Text textAlign="left">Types</Text>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Flex flexDirection="column" mr="auto " >
                  <RadioGroup value={props.typeValue} onChange={props.onTypeChange}>
                     <FormControlLabel value="Party" control={
                           <Radio 
                           color="primary"/>}
                           label="Party"/>
                     <FormControlLabel value="Club" control={
                           <Radio 
                           color="primary"/>}
                           label="Club"/>
                     <FormControlLabel value="Meeting" control={
                           <Radio 
                           color="primary"/>}
                           label="Meeting"/>
                      <FormControlLabel value="Exhibition" control={
                            <Radio 
                            color="primary"/>}
                            label="Exhibition"/>
                    </RadioGroup>
                   </Flex>
                  </AccordionDetails>
                  </Accordion>
                  </Box>
                  <Flex mt={3} flexDirection="column">
                    <FormControlLabel control={
                        <Checkbox 
                        onChange={()=>favoriteHandle()} 
                        color="primary"/>}
                        label="Favorite"/>
                    <FormControlLabel control={
                        <Checkbox 
                        onChange={()=>myFollowingHandle()}
                        color="primary"/>}
                        label="My friends"/>
                  </Flex>
            </WrapperFilterEvent>
            </Flex>
      )
}
