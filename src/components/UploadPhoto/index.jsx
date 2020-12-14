import React, {useState, useRef} from 'react'
import { useMutation} from '@apollo/react-hooks'
import styled from 'styled-components';

import {UPLOAD_PHOTO} from '../../apis/UserAPI'

const Input = styled.input`
  display: none;
`;

export default function UploadPhoto(props){
    const {authUser} = props
    const InputRef=  useRef()
    const [uploadInput, setUploadInput] = useState([])
    const [values, setValues] = useState({
        id: authUser.id,
        image: '',
        imagePublicId: authUser.coverImagePublicId,
        isCover:true,
      })
      console.log(values)

   

        const handleUploadPhoto = (e) => {
          const file = e.target.files[0];
      
          if (!file) return;
      
          setValues({...values,image:file,});
          uploadPhoto()

          e.target.value = null;
          console.log(file)
        };
        const [uploadPhoto] = useMutation(UPLOAD_PHOTO, {
          update(_, result){
          console.log(values)
          },
          variables:{ input:values}
      })
          
    // async function handleUploadPhoto(event){
    //     const file = event.target.files[0];

    //     if (!file) return;
    //     // await setUploadInput([...uploadInput,[file]])
        

    //         event.target.values = null;
    //         console.log(file)
    //     }
    //     console.log(uploadInput)

        return(
            <div>
              <Input
                name="image"
                type="file"
                id="image"
                onChange={handleUploadPhoto}
                accept="image/x-png,image/jpeg"
            />
            <label htmlFor="image">
                click
            </label>
            </div>
        )
    }