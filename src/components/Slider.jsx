import React from 'react';
import { Box, Flex, Image } from 'rebass';
import {GridList, GridListTile, MobileStepper, Button} from '@material-ui/core';
import styled from 'styled-components';



const SliderRoot = styled(Flex)`    
    flex-wrap: wrap;
    justify-content:space-around;
    overflow: hidden;

`

export default function Slider(props){
    const {images}=props;
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    if (!images){
        return null
    }
    return(
        images != 0 ? <Box>
        <Flex m="auto" width={1}>
         <img style={{maxWidth:300, height:200, width:"100%"}} src={images[activeStep]}/>
        </Flex>
           <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
            </Button>
          }
          backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>
          }
          />
    </Box>: null 

    )
}