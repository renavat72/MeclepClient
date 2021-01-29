import React from 'react'
import {TextField } from '@material-ui/core';

import{FilterFriends} from '../FriendsWindow'


export default  function FilterFriendsBlock(props){
    const {searchFollowing, setSearchFollowing} = props
    const onSearchChange = e => setSearchFollowing(e.target.value);

    return(
            <FilterFriends flexDirection="column">
                  <TextField
                      placeholder="Find a friend" onChange={onSearchChange} value={searchFollowing} />
            </FilterFriends>
    )
}