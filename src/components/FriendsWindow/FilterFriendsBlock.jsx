import React from 'react'
import {Button,TextField } from '@material-ui/core';
import { Box, Flex} from 'rebass'


export default  function FilterFriendsBlock(){
    return(
          <Box >
          <Flex mx="auto">
                <TextField placeholder="Find a friend"/>
          </Flex>
                <Button>Friends</Button>
          </Box>
    )
}