import React, { useState} from 'react'
import {Fab, Tooltip} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Box, Flex } from 'rebass';

import Map from '../Map'
import AddEventWindow from '../Events/AddEventWindow'
import Sidebar from '../Sidebar';


export default function Dashboard(){

    const [eventWindow,setEventWindow] = useState(false)
    const handleEventWindow = () => {
      setEventWindow(!eventWindow);
    };

      return(
        <Box >
          <AddEventWindow eventWindow={eventWindow}  handleEventWindow={handleEventWindow}/>
          <Map/>
            <Flex>
              <Flex>
               <Sidebar/>
              </Flex>
              <Flex ml="auto" mr={4} >
                <Fab color="primary">
                  <Tooltip title="Create event">
                    <AddIcon onClick={handleEventWindow}/>
                  </Tooltip>
                </Fab>
              </Flex>
          </Flex>
      </Box>
    )
}