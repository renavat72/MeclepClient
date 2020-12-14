import React from 'react'
import {Button,TextField } from '@material-ui/core';
import { Box } from 'rebass'

import{FilterFriends} from '../FriendsWindow'


export default  function FilterFriendsBlock(){
    return(
            <FilterFriends flexDirection="column">
                  <TextField placeholder="Find a friend" />
            </FilterFriends>
    )
}