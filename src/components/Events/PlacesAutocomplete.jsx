import React, {useEffect}  from 'react'
import { TextField} from '@material-ui/core';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import { Box, Text } from 'rebass';


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
              <Box width={1}>
                <Text>{main_text}</Text> <Text>{secondary_text}</Text>
              </Box>
              </li>
            );
          });

      return (
        <Box width="200px">
        <TextField
            name="locationOfEvent"
            values={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Street of party"
          />

        {status === "OK" && <ul width={1/2}><Box >{renderSuggestions(value)}</Box></ul>}
      </Box>
    );
  };
