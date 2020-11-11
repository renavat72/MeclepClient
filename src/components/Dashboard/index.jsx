import React, { useState} from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Box, Flex } from 'rebass';

import Map from '../Map'
import Layout from '../Layout'
import AddEventWindow from '../Events/AddEventWindow'


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
                <Layout />
              </Flex>
              <Flex ml="auto" mr={4} >
                <Fab color="primary">
                    <AddIcon onClick={handleEventWindow}/>
                </Fab>
              </Flex>
          </Flex>

             
      </Box>
    )
}