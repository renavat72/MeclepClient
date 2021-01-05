import React, {useState} from 'react';
import { Box, Text,Flex } from 'rebass';
import {GET_CURRENT_USER} from '../../apis/UserAPI'
import { useQuery } from '@apollo/react-hooks';
import { Dialog } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import { ModalRoute, ModalLink} from 'react-router-modal';



export default function ProfileWindow(props){
  const [isOpen, setIsOpen] = useState(true);
  const {url} =useRouteMatch();
    const userId = props.match.params.id;
    const variables = {
        userId: userId,
    }; 
    const {data} = useQuery(GET_CURRENT_USER,{variables})
 
    function handleOpen(){
          setIsOpen(false);
          window.history.pushState('', '', `${url}`);
    }     
    
      return(
        
        <Dialog isOpen={isOpen} onClose={()=>handleOpen()}  maxWidth="xl">
           <Box>
             2313213
           </Box>
      {/* <ProfilePage/> */}
        </Dialog>
    )
}
