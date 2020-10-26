import React,{useContext} from 'react'
import { Dialog, Grid, CircularProgress, TextField, Checkbox, Accordion, AccordionDetails, AccordionSummary, FormControlLabel } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';


import {FETCH_POSTS_QUERY} from '../../apis/EventAPI'
// import DeleteButton from '../Buttons/DeleteButton'
import { AuthContext } from '../../context/auth';
// import LikeButton from '../Buttons/LikeButton'
import Event from './Event'

const WrapperEvent = styled(Box)`
box-sizing: border-box;
max-width: 1024px;
min-width: 360px;
width:720px;
height:500px;
`




export default function Events(props){

      const {eventsWindow, handleEventsWindow} = props;
      const {user} = useContext(AuthContext)
      const { data, loading  } = useQuery(FETCH_POSTS_QUERY);
      return (
       <Dialog open={eventsWindow}  onClose={handleEventsWindow}    maxWidth="lg" scroll="body">
        <WrapperEvent m={4} flexDirection="column">
            <Flex mb={4}>
                  <Text>Events</Text>
            </Flex>
            <Flex flexDirection="row">
                  <Flex width={3/4}>
                        <Grid>
                              { loading ? (
                                    <CircularProgress/>
                              ) : (
                                    data && data.getPosts.map(post => (
                                     <Grid item key={post.id}>
                                           <Event post={post} user={user}/>
                                    </Grid>
                                    ))
                              )}
                        </Grid>
                  </Flex>
                  <Box width={1/4} >
                      <FilterBlock/>
                  </Box>
            </Flex>
        </WrapperEvent>
       </Dialog>
      )
}

function FilterBlock(){
      return(
            <Flex mx="auto">
            <Flex flexDirection="column">
            <TextField placeholder="Find a event"/>
               <Accordion>
                  <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  >
                  <Text>Types</Text>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Flex flexDirection="column" mr="auto">
                     <FormControlLabel control={
                        <Checkbox color="primary"/>}
                        label="Party"/>
                       <FormControlLabel control={
                        <Checkbox color="primary"/>}
                        label="Club"/>
                        <FormControlLabel control={
                        <Checkbox color="primary"/>}
                        label="Meeting"/>
                        <FormControlLabel control={
                        <Checkbox color="primary"/>}
                        label="Exhibition"/>
                   </Flex>
                  </AccordionDetails>
                  </Accordion>
                  <Box mt={3}>
                    <FormControlLabel control={
                        <Checkbox color="primary"/>}
                        label="Favorite"/>
                    <FormControlLabel control={
                        <Checkbox color="primary"/>}
                        label="My friends"/>
                  </Box>
            </Flex>
      </Flex>
      )
}
