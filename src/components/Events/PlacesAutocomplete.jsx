import React, {useEffect}  from 'react'
import { TextField} from '@material-ui/core';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";


export default function PlacesAutocomplete(props){
    const {values, setValues} = props
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
      requestOptions:{},
      debounce: 300,
    });

    useEffect(()=>{
      handleLocateInfo()
  }, [handleInput])

    function handleLocateInfo (lat, lng, description){
      setValues({...values,lat:lat, lng:lng, address:description });
    }
    const handleInput = (e) => {
      setValue(e.target.value);
    };
    const handleSelect = ({ description}) => () => {
      setValue(description, false);
      clearSuggestions();
      getGeocode({ address: description })
      .then((results) => getLatLng(results[0]),
      )
      .then(({lat, lng}) => {
        handleLocateInfo(lat, lng, description)
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    };

    const renderSuggestions = () =>
        data.map((suggestion, id) => {
          const {
            structured_formatting: { main_text, secondary_text },
          } = suggestion;

          return (
            <li key={id} onClick={handleSelect(suggestion, value)}>
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </li>
            );
          });

      return (
        <div >
        <TextField
            name="locationOfEvent"
            values={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Street of party"
          />

        {status === "OK" && <ul>{renderSuggestions(value)}</ul>}
      </div>
    );
  };
