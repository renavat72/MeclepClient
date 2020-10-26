import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import { Button } from '@material-ui/core';
import {DELETE_POST} from '../../apis/EventAPI'

export default function DeleteButton({postId}){
    const variables = {
        postId: postId,
    }; 
    const [deletePost] = useMutation(DELETE_POST,{
        update(){

        },
        variables
    })
    return (
    <Button onClick={deletePost}>
        Delete
    </Button>
    )
}