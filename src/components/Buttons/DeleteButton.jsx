import React from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import { Button, CircularProgress} from '@material-ui/core';
import {DELETE_POST} from '../../apis'

export default function DeleteButton({postId}){
    const [deletePost] = useMutation(DELETE_POST,{
        update(){

        },
        variables: {
            postId
        }
    })
    return (
    <Button onClick={deletePost}>
        Delete
    </Button>
    )
}