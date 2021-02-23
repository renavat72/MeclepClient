import React from 'react';
import { Box } from 'rebass';
import { Slide } from 'react-slideshow-image';

export default function SliderBackground() {
  const slideImages = ['../../images/Party.jpg"', '../../images/People.jpg"'];
  return (
    <Box>
      <Slide>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[0]})` }}>
            <span>Slide 1</span>
          </div>
        </div>
        <div>
          <div style={{ backgroundImage: `url(${slideImages[1]})` }}>
            <span>Slide 2</span>
          </div>
        </div>
      </Slide>
    </Box>
  );
}
