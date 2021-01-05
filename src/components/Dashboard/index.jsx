import React, { useState, useContext, useEffect, useReducer} from 'react'
import {Fab, Tooltip} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Box, Flex } from 'rebass';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { useRouteMatch } from "react-router-dom";

import Map from '../Map'
import AddEventWindow from '../Events/AddEventWindow'
import Sidebar from '../Sidebar';
import { geolocationReducer, SET_CITY } from '../../reducers/geolocation'
import { AuthContext } from '../../context/auth'
import {BrowserRouter, Route, Switch, useHistory,useLocation } from 'react-router-dom'

import { useStore } from '../../context/store';
import DialogWindow from '../Dialog';
import Profile from '../Profile';

export default function Dashboard(){
     const { user, logout } = useContext(AuthContext);

    const [eventWindow,setEventWindow] = useState(false)
    const handleEventWindow = () => {
      setEventWindow(!eventWindow);
    };
    const mapRef = React.useRef();
    const { url } = useRouteMatch();

    const panTo = React.useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(17);
    }, []);
      return(
        <Box >
        {/* <ModalRoute  path="/:id" children={Profile}/> */}
        {/* <ModalRoute  path={`${url}/dialog`} children={
          ({ match })=>{
            return (<DialogWindow onClose={ ()=>{}} open={Boolean(match)}/>
            )
          }
        }/> */}
          <AddEventWindow eventWindow={eventWindow}  handleEventWindow={handleEventWindow}/>
          <Map mapRef={mapRef} >
            <Flex>
              <Flex>
               <Sidebar user={user}panTo={panTo} logout={logout}/>
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