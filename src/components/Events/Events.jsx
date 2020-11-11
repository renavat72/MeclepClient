import React,{useContext,useEffect,useState} from 'react'
import { Dialog, TextField, Checkbox, Accordion, AccordionDetails, AccordionSummary, FormControlLabel, Radio, RadioGroup, Button } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';


import {FETCH_POSTS_QUERY} from '../../apis/EventAPI'

import { AuthContext } from '../../context/auth';
import Event from './Event'

const WrapperEvent = styled(Box)`
width:100%;
min-height: 720px;


`
const WrapperFilterEvent = styled(Box)`
position: fixed;

`
const WrapperBlock = styled(Box)`
/* overflow:hidden; */
`


const Block = ({children }) => (
      <Box>
      {children}
      </Box>
);

export default function Events(props){
      const {eventsWindow, handleEventsWindow,authUser} = props;
      const [typeValue, setTypeValue] = useState("");
      const [favorite, setFavorite] = useState();
      const [myFollowing, setMyFollowing] = useState();
      const [searchValue, setSearchValue] = useState();

      const onTypeChange = e => setTypeValue(e.target.value);
      const onSearchChange = e => setSearchValue(e.target.value);
      const { data } = useQuery(FETCH_POSTS_QUERY);
      const {user} = useContext(AuthContext);
      const filteredEvents =  data&&data.getPosts.filter(post => (
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
         <WrapperBlock m={4} flexDirection="column" minWidth="600px" >
            <Flex mb={4}>
                  <Text fontSize={3} fontWeight='bold'>Events</Text>
            </Flex>
            <Flex width={1}>
                  <WrapperEvent >
                   <EventsList events={filteredEvents} user={user}/>
                  </WrapperEvent>
                  <Box width={3/4} mr="auto">
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

function EventsList({events, user}){
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
            eventsData && eventsData.map(post => (
            <Block item key={post.id}>
                  <Box my={3} ml={1}>
                  <Event post={post} user={user}/>
                  </Box>
            </Block>
            )) }
      </Box>
)
}

function FilterBlock(props){
      const {typeValue, onTypeChange, searchValue, onSearchChange, favoriteHandle, myFollowingHandle} =props;
      return(
            <Flex flexDirection="column"  ml="auto" width={3/4}>
                  <WrapperFilterEvent>
                  <Box width="170px">
                     <TextField 
                        // width="180px"
                        placeholder="Find event" 
                        value={searchValue}
                        onChange={onSearchChange}/>
                  </Box>
               <Box width="170px" >
               <Accordion>
                  <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  >
                  <Text textAlign="left">Types</Text>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Flex flexDirection="column" mr="auto " >
                  <RadioGroup value={typeValue} onChange={onTypeChange}>
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
                  <Box mt={3}>
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
                  </Box>
            </WrapperFilterEvent>
            </Flex>
      )
}
