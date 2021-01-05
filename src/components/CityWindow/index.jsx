import React, {useContext, useState, useCallback, useEffect} from 'react'
import { Dialog } from '@material-ui/core';
import {Box, Flex, Text} from 'rebass'
import { useRouteMatch } from 'react-router-dom';

import DataCity from '../../content/City.json'
import { AuthContext } from '../../context/auth'
import SearchAddress from '../Map/SearchAddress';

export default function CityWindow(props){
      const {cityWindow, setSelectedCity, panTo, handleCityWindow} = props;
      const [isOpen, setIsOpen] = useState(true);
      const {url} =useRouteMatch()
  
      function handleOpen(){
            setIsOpen(false);
            window.history.pushState('', '', `${url}`);
      }   

      const handleSelect = (value) =>{
        setSelectedCity(value.nameRu);
        setIsOpen(false);        
        navigator.geolocation.getCurrentPosition(
          () => {
            panTo({
              lat: value.lat,
              lng:value.lng ,
            });
          },
        )
       
      }

      return(
       <Dialog open={isOpen} onClose={()=>handleOpen()}  maxWidth="xl">
              <Flex flexDirection="column" minWidth={["500px","700px"]} m={2}  css={"max-height: 400px;box-sizing: border-box;"}>
            {DataCity.city.map((city,i)=>
            <Box key={i} onClick={()=>handleSelect(city)}>
            <Text>
              {city.nameRu}
            </Text>
            </Box>
             )}
            </Flex>
         
       </Dialog>
    )
}