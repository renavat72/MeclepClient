import React from "react";
import { GoogleMap,  useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';

import {FETCH_POSTS_QUERY} from '../../apis/EventAPI'
import EventWindow from '../Events/EventWindow'

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
  // maxWidth: "auto",
  position: 'absolute',
  top: -10,
  // left: 0,
  bottom: 0,
  right: -7,
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const { data  } = useQuery(FETCH_POSTS_QUERY);
  // const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);


  // const onMapClick = React.useCallback((e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // const panTo = React.useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });~
  //   mapRef.current.setZoom(14);
  // }, []);

  if (loadError) return "Error";
  if (!isLoaded) return <CircularProgress />;


  return (
      <GoogleMap
      // onClick={onMapClick}
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
          {data&& data.getPosts.map(post => (
            <Marker
              key={post.id}
              position={{ lat: post.lat, lng: post.lng }}
              onClick={() => {
                console.log(post)
                setSelected(true);
                }}
              >
                 {selected ? (
                    <InfoWindow  key={selected.post}position={{lat: selected.lat, lng: selected.lng}} onCloseClick={()=>{
                        setSelected(null)
                      }}>
                      <EventWindow post={post}/>
                      </InfoWindow>
                  ): null}
            </Marker>
            )
        )}
      </GoogleMap>
  );
}