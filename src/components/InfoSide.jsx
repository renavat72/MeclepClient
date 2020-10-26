import React, {useState} from 'react'
import { Box, Flex, Text } from 'rebass'
import { Slide, Zoom } from 'react-slideshow-image';
import Party from '../images/Party.jpg'
import People from '../images/People.jpg'







export default function InfoSide(){
    const [autoplay, setAutoplay] = useState(true);

    const style = {
    textAlign: "center",
    background: "teal",
    padding: "200px 0",
    fontSize: "30px"
  }
        const images = [
            Party,People
        ];
        
        const zoomInProperties = {
          indicators: true,
          scale: 1.4
        }
        return (
          <div>
              
           <Zoom {...zoomInProperties}>
              {images.map((each, index) => (
          <div key={index} style={{width: "100%"}}>
            <img style={{ objectFit: "cover", width: "100%" }} src={each} />
          </div>
        ))}
      </Zoom>
          </div>
        )
      
    }