import React, {useState} from 'react'
import { useMutation} from '@apollo/react-hooks'
import { Button, Avatar} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';

import {UPLOAD_PHOTO, DELETE_USER_COVER_PHOTO} from '../../apis/EditUserAPI'
import { Box, Flex } from 'rebass';



export default function UploadUserCover({data}){
    const [imageCover, setImageCover] = useState()
    const handleUploadPhoto = (e) => {
      const file = e.target.files[0];
      if (!file) return null;
      setImageCover(file);
      e.target.value = null;
      onSubmit()
    };
  
    const [uploadPhoto] = useMutation(UPLOAD_PHOTO, {
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
    });
    const [deletePhoto] = useMutation(DELETE_USER_COVER_PHOTO,{
      update(_, result){
        console.log(data)
        console.log(result)
      },
      variables: { 
          id:'',
          coverImage:'',
          coverImagePublicId:'',
    }
    });
  const onSubmit = async() =>{
  uploadPhoto();
  }
  const handleDeletePhotos = async()=>{
    deletePhoto({variables:{
          id:data.getAuthUser.id,
          coverImage:data.getAuthUser.coverImage,
          coverImagePublicId:data.getAuthUser.coverImagePublicId
    }});
  }
  const InitialsWords =  data.getAuthUser.firstName[0] + data.getAuthUser.secondName[0] ;
    return(
           <Flex pb={3} mx="auto"  flexDirection="column">
                  {data.getAuthUser.coverImage? 
                  <Flex width={1}>
                        <img alt="coverImage"style={{maxWidth:150, maxHeight:150, width:"100%", borderRadius: "50%"}} src={data.getAuthUser.coverImage}/>
                  </Flex>
                      :<Avatar>{InitialsWords}</Avatar>} 
                 <Flex flexDirection="row" mx="auto">
                   <input
                          style={{ display: 'none' }}
                          name="image"
                          type="file"
                          id="profile-image"
                          onChange={handleUploadPhoto}
                          accept="image/x-png,image/jpeg"
                          />
                            <Flex my="auto">
                              <label htmlFor="profile-image" >
                               <AddIcon/>
                              </label>
                            </Flex>
                          <Box>
                      {data.getAuthUser.coverImage?<Button onClick={()=>handleDeletePhotos()}>  <DeleteOutlineIcon/></Button>:null}
                    </Box>
                 </Flex>
                </Flex>
    )
  }