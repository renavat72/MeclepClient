import React, {useState} from 'react'
import { useMutation} from '@apollo/react-hooks'
import { Form } from 'react-final-form';
import { Button} from '@material-ui/core';
import ModalImage from "react-modal-image";

import {UPLOAD_PHOTO,UPLOAD_PHOTOS} from '../../apis/UserAPI'
import { Box, Flex } from 'rebass';


function UploadUserCover({data}){
  
  const [imageCover, setImageCover] = useState()
  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return null;
    setImageCover(file);
    e.target.value = null;

  };

  const [uploadPhoto,{error}] = useMutation(UPLOAD_PHOTO, {
    update(_, result){
      console.log(result)
    },
    variables: { 
      input: {
            id: data.getAuthUser.id,
            coverImage: imageCover,
            coverImagePublicId: data.getAuthUser.coverImagePublicId,
            isCover:true,
      }
    }
  })
const onSubmit = async() =>{
uploadPhoto();
}

  return(
         <Flex mx="auto"  flexDirection="column">
                 <img  style={{maxWidth:150, maxHeight:150, width:"100%", borderRadius: "50%"}} src={data.getAuthUser.coverImage}/>
               <Flex flexDirection="column">
                <Form onSubmit={onSubmit} render={({handleSubmit})=>(
                  <form onSubmit={handleSubmit} >
                        <input
                        style={{ display: 'none' }}
                        name="image"
                        type="file"
                        id="profile-image"
                        onChange={handleUploadPhoto}
                        accept="image/x-png,image/jpeg"
                        />
                        <label htmlFor="profile-image" >
                            click
                        </label>
                      <Button type="submit">
                        Ok
                      </Button>
                    </form>
              )}/>
               </Flex>
              </Flex>
  )
} 
  
function UploadPhotos({userPhotos}){
  const [images, setImages] = useState({
    id:userPhotos.getAuthUser.id,
    images:'',
  })
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages({ ...images, images:file})
    e.target.value = null;

  };
  const [uploadPhotos,{data,loading}] = useMutation(UPLOAD_PHOTOS,{
    update(_, result){
      console.log(data)
      console.log(result)

    },
    variables: { id:userPhotos.getAuthUser.id,
      images:images.images,
     }
  });
  const onSubmit = async() =>{
    try{
      uploadPhotos();
    } catch(e){
      console.log(e)
    }
  }

  return(
    <Flex mt={1} ml={4} flexDirection="column">
        <Flex flexDirection="row">
        {userPhotos.getAuthUser.images.map(image=>
          <Box key={image} style={{maxWidth:50, maxHeight:50, width:"100%"}} >
              <ModalImage large={image} small={image} />
          </Box>
        )}
        <Form onSubmit={onSubmit} render={({handleSubmit})=>(
          <form onSubmit={handleSubmit}>
             <input
                    style={{ display: 'none' }}
                    name="images"
                    type="file"
                    id="images"
                    onChange={handleUploadPhoto}
                    multiple
                    accept="image/x-png,image/jpeg,image/jpg"
                    />
                  <Button>
                    <label   htmlFor="images">
                      +
                    </label>
                  </Button>
                <Button type="submit">
                  Ok
                </Button>
              </form>
          )}/>
          </Flex>
      </Flex>
  )
}

export default function UploadPhoto({data}){
   
  return(
    <Box  mt={4}  >
      <Flex flexDirection="column">
        <UploadUserCover data={data}/>
        <UploadPhotos userPhotos={data}/>
        </Flex>
    </Box>
  )
}
