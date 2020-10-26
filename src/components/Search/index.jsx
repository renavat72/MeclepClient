import React, {useState} from 'react'
import {Button,TextField } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import {SEARCH_USERS} from '../../apis/UserAPI'

export default function Search(){
    const [users, setUsers] = useState([])
    const { data, loading  } = useQuery(SEARCH_USERS);
    return(
        
        <TextField placeholder="Find a friend"/>
    )
}