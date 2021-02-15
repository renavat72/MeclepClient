import React, {useContext, useEffect, useState,  useCallback} from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Flex } from "rebass";

import {FETCH_ALL_EVENTS_QUERY} from '../../apis/ParserEventAPI'
import AnotherEventWindow from '../Events/EventsInfoWindow/AnotherEventWindow';
import MyEventWindow from '../Events/EventsInfoWindow/MyEventWindow';
import { AuthContext } from '../../context/auth';
import Party from '../../icons/Markers/party.svg'
import Club from '../../icons/Markers/club.svg'
import Meeting from '../../icons/Markers/meeting.svg'
import Exhibition from '../../icons/Markers/exhibition.svg'
import ParserMarker from '../../icons/Markers/parserMarker.svg'
import mapStyles from "./mapStyles";



export const Loading = styled(Flex)`
  position:absolute;
  left:50%;
  transform: translate(100%, 1000%);
`
const libraries = ["places"];
const mapContainerStyle = {
  position: 'absolute',
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: false,
  minZoom:16,

};
const center = {
  lat: 55.751244,
  lng: 37.618423,
};

const TypeMarker = (post) => {
  if(post.typeOfEvent === 'Party'){return Party}
  if(post.typeOfEvent === 'Meeting'){return Meeting}
  if(post.typeOfEvent === 'Exhibition'){return Exhibition}
  if(post.typeOfEvent === 'Club'){return Club}

  else return ParserMarker
}


export default function Map({children,mapRef}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState('');
  const {user} = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const { data, loading } = useQuery(FETCH_ALL_EVENTS_QUERY);
  const mergeData = data && data.getParserEvents.concat(data.getPosts);

  useEffect(()=>{
    setMarkers(mergeData)
  },[data]);


  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loading) return <Loading>
       <CircularProgress />
      </Loading>
  if (loadError) return "Error";
  if (!isLoaded) return <Loading m="auto">
  <CircularProgress />
  </Loading>
  if (markers === undefined) return<Loading m="auto">
  <CircularProgress />
  </Loading>

  return (
    <div>
    <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {children}
        {markers.filter(post=>post.lat!==null).map((post) => ( 
              <Marker
              key={post.id}
              icon={TypeMarker(post)}
              position={{ lat: post.lat, lng: post.lng }}
              onClick={() => {
                setSelected(post);
                }}
                />
            ))} 
          {selected ? (
            <InfoWindow
            position={{ lat: selected.lat , lng: selected.lng}} 
            onCloseClick={()=>{
              setSelected(null)
            }}>
                {
                  selected.urlContent ? <AnotherEventWindow post={selected} />: <MyEventWindow post={selected} user={user} />
                }
                </InfoWindow>
            ): null}      
          </GoogleMap>
    </div>
  );
}
