import React, {useContext, useEffect} from "react";
import { GoogleMap,  useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';

import {FETCH_POSTS_QUERY} from '../../apis/EventAPI'
// import AnotherEventWindow from '../Events/EventsInfoWindow/AnotherEventWindow';
import MyEventWindow from '../Events/EventsInfoWindow/MyEventWindow';
import { AuthContext } from '../../context/auth';
import Party from '../../icons/Markers/party.svg'
import Club from '../../icons/Markers/club.svg'
import Meeting from '../../icons/Markers/meeting.svg'
import Exhibition from '../../icons/Markers/exhibition.svg'

const libraries = ["places"];
const mapContainerStyle = {
  position: 'absolute',
  height: "100vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: false,
};
const center = {
  lat: 55.751244,
  lng: 37.618423,
};

export default function Map() {

  useEffect(()=>{
    setMarkers(MarkersData)
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const { data  } = useQuery(FETCH_POSTS_QUERY);
  const {user} = useContext(AuthContext);

  const MarkersData = data&& data.getPosts;
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

   const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });~
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return <CircularProgress />;

  const TypeMarker = (post) => {
    if(post.typeOfEvent === 'Party'){return Party}
    if(post.typeOfEvent === 'Meeting'){return Meeting}
    if(post.typeOfEvent === 'Exhibition'){return Exhibition}
    else return Club
  }
  return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
          {markers&&markers.map((post) => (
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
                      position={{ lat: selected.lat, lng: selected.lng }} 
                      onCloseClick={()=>{
                        setSelected(null)
                      }}>
                      <MyEventWindow post={selected} user={user} />
                      {/* <AnotherEventWindow/> */}
                      </InfoWindow>
                  ): null}
      </GoogleMap>
  );
}