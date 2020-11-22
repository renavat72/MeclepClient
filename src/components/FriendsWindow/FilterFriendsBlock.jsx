import React from 'react'
import {Button,TextField } from '@material-ui/core';
import { Box } from 'rebass'

import{FilterFriends} from '../FriendsWindow'


export default  function FilterFriendsBlock(){
    return(
          <Box >
            <FilterFriends flexDirection="column" width="170px">
                  <TextField placeholder="Find a friend" width="170px"/>
                  <Box mr="auto">
                <Button>Friends</Button>
                  </Box>
            </FilterFriends>
          </Box>
    )
}