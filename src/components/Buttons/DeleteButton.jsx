import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import { Button } from '@material-ui/core';
import {DELETE_POST} from '../../apis/EventAPI'
import { useTranslation } from 'react-i18next';

export default function DeleteButton({postId}){
    const variables = {
        postId: postId,
    }; 
    const { t } = useTranslation();
    const [deletePost] = useMutation(DELETE_POST,{variables});
    
    return (
    <Button onClick={deletePost}color="secondary" >
        {t('common.delete')}
    </Button>
    )
}