import React from 'react';
import { Box, Text,Flex } from 'rebass';
import {GET_CURRENT_USER} from '../../apis/UserAPI'
import { useQuery } from '@apollo/react-hooks';
import { Dialog } from '@material-ui/core';
// Fix ProfilePage
export default function Profile(props){
    const userId = props.match.params.id;
    const variables = {
        userId: userId,
    }; 
    const {data} = useQuery(GET_CURRENT_USER,{variables})
    console.log("123")
  
        return(
            <Box>
                <Text>Text</Text>
                 {/* <Dialog open={true}    maxWidth="xl" >

              <ProfilePage/>
                 </Dialog> */}
                </Box>
      )
    
    function ProfilePage(){
        if(!data){
            <Text>Loading</Text>
        } else{
            return(
                <Box>
                {data && data.getCurrentUser.map((user) =>
                  <Box>
                      <Flex>
                          <Text>123
                              {user.firsName}
                          </Text>
                      </Flex>
                  </Box>
          
              )}
            </Box>
          )
        }
        }
      
}
