import React, {useState} from 'react'
import { TextField, Button, Dialog, DialogTitle, IconButton, CircularProgress, Select, MenuItem, InputLabel, FormControlLabel, Checkbox} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Flex, Box } from 'rebass';
import { Form } from 'react-final-form'
import { useMutation, gql} from '@apollo/react-hooks'
import styled from 'styled-components';

import {CREATE_POST_MUTATION} from '../../apis'
import PlacesAutocomplete from "./PlacesAutocomplete"


const CurrentInfoSide = styled(Flex)`
     background-color: #f8f8f8;
     border-left: 1px solid #e5e5e5;
`
const AddEventWrapper = styled(Flex)`
      box-sizing: border-box;
      overflow: hidden;
`



export default function AddEventWindow(props){
  const {eventWindow, handleEventWindow} = props;
  const [currentSide, setCurrentSide ] = useState(false);

  const handleCurrentSide = () => {
    setCurrentSide(!currentSide);
  };
  const [values, setValues] = useState({
    nameOfEvent: '',
    typeOfEvent: '',
    timeOfEvent: '',
    aboutOfEvent: '',
    lat:'',
    lng:'',
    address: '',
    // privateEvent: false,
    // notifyFriends: false,
    // adultEvent: false,
    imagesOfEvent: "",

  })
  const MUTATION = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      success
    }
  }
`;

function UploadFile() {
  const [mutate] = useMutation(MUTATION);

  function onChange({
    target: {
      validity,
      files: [file],
    },
  }) {
    if (validity.valid) mutate({ variables: { file } });
  }

  return <input type="file" required onChange={onChange} />;
}

  const onChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
  };

  const onSubmit =() =>{
    createPostCallback()
  }

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(_, result){
      console.log(result)
    },
    variables: values,
  })

  function createPostCallback(){
    createPost()
  }

    return(
     <Dialog open={eventWindow}  onClose={handleEventWindow}>
        <Form onSubmit={onSubmit} render={({handleSubmit}) => (
          <form onSubmit={handleSubmit} noValidate className={error ? <CircularProgress/> : ""}>
             <AddEventWrapper flexDirection="column">
               <Flex flexDirection="row">
                 <Flex flexDirection="column">
                    <Box  mr="auto">
                      <DialogTitle>Create event</DialogTitle>
                    </Box>
                    <Box ml={4}>
                    <Flex pt={4}>
                    <TextField name="nameOfEvent"
                        placeholder="Name of event"
                        type="text"
                        values={values.nameOfEvent}
                        onChange={onChange}
                        />
                    </Flex>
                    <Flex pt={3} flexDirection="column" maxWidth="200px">
                    <InputLabel htmlFor="typeOfEvent">Type</InputLabel>
                    <Select
                      labelId="typeOfEvent"
                      name="typeOfEvent"
                      values={values.typeOfEvent}
                      onChange={onChange}
                    >
                      <MenuItem value="Party">Party</MenuItem>
                      <MenuItem value="Club">Club</MenuItem>
                      <MenuItem value="Meeting">Meeting</MenuItem>
                      <MenuItem value="Exhibition">Exhibition</MenuItem>
                    </Select>
                    </Flex>
                    <Flex pt={3}  maxWidth="200px">
                    <TextField
                        name="timeOfEvent"
                        placeholder="Time of event"
                        type="datetime-local"
                        values={values.timeOfEvent}
                        onChange={onChange}/>
                    </Flex>
                    <Flex pt={3}>
                      <PlacesAutocomplete setValues={setValues} values={values}/>
                    <Flex>
                    </Flex>
                    </Flex>
                    <Flex pt={3}>
                    <TextField name="aboutOfEvent"
                        placeholder="About of event"
                        type="text"
                        values={values.aboutOfEvent}
                        onChange={onChange}
                        />
                    </Flex>
                    </Box>
                    <Flex mt={5} ml="auto" mb={3} flexDirection="row"  >
                    <Box my="auto" >
                        <Button onClick={handleEventWindow} color="primary">
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary"  onClick={handleEventWindow}>
                        Submit
                        </Button>
                    </Box>
                </Flex>
                </Flex>
                   <Flex my="auto">
                  { currentSide ?
                        <Button onClick={handleCurrentSide} color="primary">
                        <ArrowBackIosIcon/> 
                        </Button>
                      :
                          <Button onClick={handleCurrentSide} color="primary">
                          <ArrowForwardIosIcon/>
                        </Button>
                      }
                  </Flex>
                  { currentSide ?
               <CurrentInfo values={values} onChange={onChange}/> : null}
              </Flex>
              </AddEventWrapper>
          </form>
       )}/>
      </Dialog>
    )

   

function CurrentInfo(values, onChange){
  return(
    <CurrentInfoSide flexDirection="column" px={3}>
        <Flex flexDirection="column"  my="auto">
          <FormControlLabel
            control={
              <Checkbox
                values={values.privateEvent}
                onChange={onChange}
                color="primary"
              />
            }
            label="Private event?"
          />
          <FormControlLabel
            control={
              <Checkbox
                values={values.adultEvent}
                onChange={onChange}
                color="primary"
              />
            }
            label="Adult event?"
          />
          <FormControlLabel
            control={
              <Checkbox
                values={values.notifyFriends}
                onChange={onChange}
                color="primary"
              />
            }
            label="Notify friends?"
          />
        </Flex>
        <Flex mt="auto" ml="auto">
          <UploadFile/>
        {/* <label htmlFor="icon-button-file">
          <Box css="display: none;">
        <input onChange={onChange}  values={values.imagesOfEvent} id="icon-button-file" type="file" />
        </Box>
                  <IconButton color="primary" type="submit" component="span">
                    <PhotoCamera />
                  </IconButton>
          </label> */}
        </Flex>
    </CurrentInfoSide>
  )
}
}
