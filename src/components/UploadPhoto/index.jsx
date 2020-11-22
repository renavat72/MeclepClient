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
        image: '',
        imagePublicId: authUser.coverImagePublicId,
        isCover:'',
      })
     
      const [uploadPhoto] = useMutation(UPLOAD_PHOTO, {
        update(_, result){
        console.log(result)
        },
        variables: {
                input: { 
                    id: authUser.id,
                    image: values.image,
                    imagePublicId: values.imagePublicId,
                    isCover: values.true,
                }
        }
    })
        
    async function handleUploadPhoto(event){
            const file = event.target.files[0];
    
            if (!file) return;
            setValues({...values,image:file, isCover:true});

            uploadPhoto()
           
        }
        console.log(values)

    return(
        <div>
          <Input
            name="coverImage"
            type="file"
            id="coverImage"
            onChange={handleUploadPhoto}
            accept="image/x-png,image/jpeg"
        />
        <label htmlFor="coverImage">
            click
        </label>
        </div>
    )
}