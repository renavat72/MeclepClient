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
    const mapRef = React.useRef();
;
    const panTo = React.useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(17);
    }, []);
    
      return(
        <Box >
          <AddEventWindow eventWindow={eventWindow}  handleEventWindow={handleEventWindow}/>
          <Map mapRef={mapRef}>
            <Flex>
              <Flex>
               <Sidebar panTo={panTo}/>
              </Flex>
              <Flex ml="auto" mr={4} mt={2} >
                <Fab color="primary">
                  <Tooltip title="Create event">
                    <AddIcon onClick={handleEventWindow}/>
                  </Tooltip>
                </Fab>
              </Flex>
          </Flex>
          </Map>
      </Box>
    )
}