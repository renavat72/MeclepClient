import React, {useState} from 'react'
import { TextField, Button, Dialog, DialogTitle,  CircularProgress, NativeSelect, InputLabel, FormControlLabel, Checkbox} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Flex, Box, Text } from 'rebass';
import { Form } from 'react-final-form'
import { useMutation} from '@apollo/react-hooks'
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';

import {CREATE_POST_MUTATION} from '../../apis/EventAPI'
import PlacesAutocomplete from "./PlacesAutocomplete"
import {Validate} from '../../util/validates/validateEvent'


const CurrentInfoSide = styled(Flex)`
     background-color: #f8f8f8;
     border-left: 1px solid #e5e5e5;
`
const AddEventWrapper = styled(Flex)`
      box-sizing: border-box;
      overflow: hidden;
`


export default function AddEventWindow(props){
  const [isOpen, setIsOpen] = useState(true)
  const {url} =useRouteMatch()

  function handleOpen(){
        setIsOpen(!isOpen);
        window.history.pushState('', '', `${url}`);
  }
  const {eventWindow, handleEventWindow} = props;
  const [currentSide, setCurrentSide ] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleCurrentSide = () => {
    setCurrentSide(!currentSide);
  };
  const [values, setValues] = useState({
    nameOfEvent: '',
    typeOfEvent: 'Party',
    aboutOfEvent: '',
    timeOfEvent:'',
    lat:'',
    lng:'',
    address: '',
    privateEvent: false,
    notifyFriends: false,
    adultEvent: false,
    image: '',

  })
  const onChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
  };

  const onSubmit =() =>{
    createPostCallback()
  }

  const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
    update(_, result){
      console.log(result)
    },
    variables: values,
  })

  function createPostCallback(){
    const errors = Validate(values.nameOfEvent,values.aboutOfEvent, values.address, values.timeOfEvent );
    console.log(errors)
    if (errors) {
      setErrors(errors);
      return false;
    }
    createPost();
    handleEventWindow()
  };
  
  function DatePicker(){
    
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate()
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();


    const Datetime = year + '-' + month + '-' + day + 'T' + "00" + ':' + "00";
    return Datetime;
  }
  DatePicker();

  const [selectedDate, setSelectedDate] = useState(DatePicker());
    return(
     <Dialog open={isOpen}  onClose={handleOpen}  maxWidth="xl">
        <Form validate={errors=>{
          if(errors){return {errors}}
        }}onSubmit={onSubmit} render={({handleSubmit}) => (
          <form onSubmit={handleSubmit} noValidate className={error ? <CircularProgress/> : ""}>
             <AddEventWrapper flexDirection="column">
               <Flex flexDirection="row">
                 <Flex flexDirection="column">
                    <Box  mr="auto">
                      <DialogTitle>Create event</DialogTitle>
                    </Box>
                    <Box ml={4}>
                    <Flex pt={4}>
                    <TextField
                        fullWidth
                        name="nameOfEvent"
                        placeholder="Name of event"
                        type="text"
                        values={values.nameOfEvent}
                        onChange={onChange}
                       />
                    </Flex>
                    <Flex pt={3} flexDirection="column" maxWidth="235px">
                    <InputLabel htmlFor="typeOfEvent">Type</InputLabel>
                    <NativeSelect
                     fullWidth
                      name="typeOfEvent"
                      values={values.typeOfEvent}
                      onChange={onChange}
                    >
                      <option value="Party">Party</option>
                      <option value="Club">Club</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Exhibition">Exhibition</option>
                    </NativeSelect>
                    </Flex>
                    <Flex pt={3}  >
                    <TextField
                        fullWidth
                        name="timeOfEvent"
                        placeholder="Time of event"
                        type="datetime-local"
                        // value={selectedDate}
                        inputProps={{
                          min:{selectedDate},
                          max:"2020-12-31T00:00"
                        }}
                        values={values.timeOfEvent}
                        onChange={onChange}/>
                    </Flex>
                    <Flex pt={3}>
                      <PlacesAutocomplete setValues={setValues} values={values}/>
                    <Flex>
                    </Flex>
                    </Flex>
                    <Flex pt={3}>
                    <TextField 
                        fullWidth
                        name="aboutOfEvent"
                        placeholder="About of event"
                        type="text"
                        values={values.aboutOfEvent}
                        onChange={onChange}
                        />
                    </Flex>
                    </Box>
                    <Flex mx="auto" my={4}>
                      <Text color="red">
                        {errors}
                      </Text>
                    </Flex>
                    <Flex ml="auto" mb={3} flexDirection="row"  >
                    <Box my="auto" >
                        <Button onClick={handleEventWindow} color="primary">
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" >
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
               <CurrentInfo values={values} onChange={onChange} setValues={setValues}/> : null}
              </Flex>
              </AddEventWrapper>
          </form>
       )}/>
      </Dialog>
    )

   

function CurrentInfo(props){
  const {values, setValues} = props;
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };
  return(
    <CurrentInfoSide flexDirection="column" px={3}>
        <Flex flexDirection="column"  my="auto">
          <FormControlLabel
            control={
              <Checkbox
                name="privateEvent"
                checked={values.privateEvent}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Private event"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="adultEvent"
                checked={values.adultEvent}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Adult event"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="notifyFriends"
                checked={values.notifyFriends}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Notify friends"
          />
        </Flex>
        <Flex mt="auto" ml="auto">
          <UploadFile values={values} setValues={setValues}/>
          
        </Flex>
    </CurrentInfoSide>
  )
}
};
function UploadFile(props) {
  const {values, setValues} = props;

  const handlePostImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setValues({ ...values, image:file})
    e.target.value = null;
  };
  console.log(values)
  return (
    <div>
    <input multiple name="image" onChange={handlePostImageUpload} type="file" id="post-image" accept="image/x-png,image/jpeg"  style={{ display: 'none' }}/>
    <label htmlFor="post-image">
    <PhotoCamera color="primary" />
    </label>
    </div>
    );
}