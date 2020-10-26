import React, {useState} from 'react'
import { useMutation} from '@apollo/react-hooks'
import styled from 'styled-components';

import {UPLOAD_PHOTO} from '../../apis/UserAPI'

const Input = styled.input`
  display: none;
`;

export default function UploadPhoto(props){
    const {authUser} = props
    
    const [values, setValues] = useState({
        id: authUser.id,
        coverImage: '',
        imagePublicId: authUser.coverImagePublicId,
        isCover: true,
      })
     
        const [uploadPhoto] = useMutation(UPLOAD_PHOTO, {
            update(_, result){
            console.log(result)
            },
            variables: {
                    input: { 
                        id: values.id,
                        image: values.coverImage,
                        imagePublicId: values.imagePublicId,
                        isCover: values.isCover,
                    }
            }
        })
        
        function handleUploadPhoto(event){
            setValues({...values, [event.target.name]: event.target.value});
        
            uploadPhoto()
        }
        console.log(values)
    
    return(
        <div>
          <Input
            name="coverImage"
            type="file"
            id="coverImage"
            value={values.photo}
            onChange={handleUploadPhoto}
            accept="image/x-png,image/jpeg"
        />
        <label htmlFor="coverImage">
            click
        </label>
        </div>
    )
}