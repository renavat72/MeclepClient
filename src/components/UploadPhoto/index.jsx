import React from 'react'
import { Box, Flex } from 'rebass';
import UploadUserCover from './UploadUserCover'
import  UploadPhotos from './UploadUserPhotos'



export default function UploadPhoto({data}){

  return(
    <Box  mt={4}  >
      <Flex flexDirection="column">
        <UploadUserCover data={data} />
        <UploadPhotos userPhotos={data} />
        </Flex>
    </Box>
  )
}
