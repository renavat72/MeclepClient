import React from 'react'
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';

const SliderWrapper = styled(Flex)`
 position:relative;
    float: right;
    top:500%;
    font-size: 54px;
    color:#aaa;
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    align-items: left;
    text-align:left;
    justify-content: center;
`
const Slider = styled(Box)`
 height: 74px; 
 overflow: hidden;

 @keyframes slide {
  0% {margin-top:-210px;}
  5% {margin-top:-210px;}
  15% {margin-top:-210px;}
  33% {margin-top:-140px;}
  38% {margin-top:-140px;}
  45% {margin-top:-140px;}
  50% {margin-top:-70px;}

  55% {margin-top:-70px;}
  60% {margin-top:-70px;}

  66% {margin-top:-70px;}
  70% {margin-top:0px;}

  71% {margin-top:0px;}
  100% {margin-top:0px;}
}
`
const SlideText = styled(Text)`
  color: black;
  height: 70px;
  margin-bottom: 10px;
  padding: 0px 15px;
  text-align: left;
  box-sizing: border-box;
`

export default function SliderText(){
    return(
        <SliderWrapper flexDirection="row">
        <Box>
          <Text>Meclep is: </Text>
         </Box>
         <Slider  pl="15px">
            <SlideText css="animation: slide 10s running linear infinite;">Create your event</SlideText>
            <SlideText>Find happy</SlideText>
            <SlideText>Connect to a party</SlideText>
        </Slider>
    </SliderWrapper>
    )
}