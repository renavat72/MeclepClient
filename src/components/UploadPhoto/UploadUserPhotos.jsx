import React, {useState} from 'react'
import { useMutation} from '@apollo/react-hooks'
import { Button, GridList, GridListTile } from '@material-ui/core';
import ModalImage from "react-modal-image";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';

import {DELETE_USER_PHOTOS,UPLOAD_PHOTOS, } from '../../apis/EditUserAPI'
import { Flex } from 'rebass';



export default function UploadPhotos({userPhotos}){
    const [images, setImages] = useState({
      id:userPhotos.getAuthUser.id,
      images:'',
      imagePublicId:'',
    })
   
    const handleUploadPhoto = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setImages({ ...images, images:file})
      e.target.value = null;
      onSubmit()

    };
    const [uploadPhotos,{data}] = useMutation(UPLOAD_PHOTOS,{
      update(_, result){
        console.log(data)
        console.log(result)

      },
      variables: { input:{id:userPhotos.getAuthUser.id,
        image:images.images
        }
      }
    });
    const onSubmit = async() =>{
      try{
        uploadPhotos();
      } catch(e){
        console.log(e)
      }
    }
  const [deletePhotos] = useMutation(DELETE_USER_PHOTOS,{
    update(_, result){
      console.log(data)
      console.log(result)

    },
    variables: { 
      deleteUserPhotosInput:{
        id:images.id,
        image:images.images,
        imagePublicId:images.imagePublicId,
    }
  }
  });
  const handleDeletePhotos = async(image)=>{
      setImages({...images, images:image.image, imagePublicId:image.imagePublicId});
      if(!images.images) return 
      deletePhotos();
  }
  return(
    <Flex ml={4} flexDirection="column">
        <Flex flexDirection={["column","row"]}>
            <GridList cellHeight={160} cols={3}>
                {userPhotos.getAuthUser.images.map((image,tile)=>
                        <GridListTile key={image.image} style={{maxWidth:75, maxHeight:75, width:"100%"}} >
                             <ModalImage large={image.image} small={image.image} cols={tile.cols || 1}/>
                            <Button >
                            <DeleteOutlineIcon onClick={()=>handleDeletePhotos(image)}/>
                            </Button>
                    </GridListTile>
                )}
            </GridList>
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
                    <AddIcon/>
                    </label>
                  </Button>
          </Flex>
      </Flex>
  )
}
