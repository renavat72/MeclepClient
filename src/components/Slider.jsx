import React from 'react';
import { Box, Flex } from 'rebass';
import { MobileStepper, Button } from '@material-ui/core';
import ModalImage from 'react-modal-image';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import NoImage from '../images/no-image.png'

export default function Slider(props) {
  const { images, window } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  console.log(images)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  if (!images) {
    return null;
  }
  return images.length !== 0 ? (
    <Box>
          <div className="SliderContainer">
            <Flex justifyContent="space-between">
         <Button color="primary" onClick={handleBack} disabled={activeStep === 0} className="SliderBtn" >
           <ArrowBackIosIcon />
          </Button>
          <Button color="primary" onClick={handleNext} disabled={activeStep === maxSteps - 1}  className="SliderBtn">
            <ArrowForwardIosIcon />
          </Button>
            </Flex>
          <Box >
            {window ? (
              <Flex>
              <img
                className="SliderImg"
                alt="images"
                src={images[activeStep]}
                />
                </Flex>
            ) : (
              <ModalImage large={images[activeStep]} small={images[activeStep]} />
              )}
              </Box>
     
              </div>
      {/* <MobileStepper
        style={{backgroundColor:"#fff"}}
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
          {t('common.next')}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {t('common.back')}
          </Button>
        }
      ></MobileStepper> */}
    </Box>
  ) : <Box className="SliderContainer"> <img src={NoImage} className="SliderImg" style={{ minWidth: 350, maxHeight: 200, width: '100%' }}/></Box>;
}
