import React from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';
import UploadUserCover from './UploadUserCover';
import UploadPhotos from './UploadUserPhotos';

const BoxImages = styled(Box)`
width: 75%;
border-top: 1px solid  #e5e5e5;
`

export default function UploadPhoto({ data }) {
  return (
    <Box mt={4}>
      <Flex flexDirection="column">
        <UploadUserCover data={data} />
        <BoxImages mx="auto"/>
          <UploadPhotos userPhotos={data} />
      </Flex>
    </Box>
  );
}
