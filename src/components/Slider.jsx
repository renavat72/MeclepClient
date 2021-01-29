import React from 'react';
import { Box, Flex} from 'rebass';
import { MobileStepper, Button} from '@material-ui/core';
import ModalImage from "react-modal-image";


export default function Slider(props){
    const {images, window}=props;
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
        images !== 0 ? <Box>
          <Flex m="auto" width={1}>
            {window?
            <img alt="images" style={{maxWidth:300, height:200, width:"100%"}} src={images[activeStep]}/>:
              <ModalImage large={images[activeStep]} small={images[activeStep]} />
            }
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