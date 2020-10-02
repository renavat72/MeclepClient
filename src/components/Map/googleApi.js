import {  useLoadScript } from '@react-google-maps/api';


export default function GoogleApiWrapper(){

    const libraries = ["places"];
    const  {isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    });
}

