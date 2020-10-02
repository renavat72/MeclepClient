import React, {useState} from 'react'
import { Dialog, Button, Card, CardHeader,  Grid, Avatar, CircularProgress, TextField } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import {GET_ALL_USERS} from '../../apis'


export default function FriendsWindow(props){
      const {friendsWindow, handleFriendsWindow} = props;
      const { data, loading  } = useQuery(GET_ALL_USERS);

      const DialogBlock = styled(Grid)`
            /* max-width: 800px; */
            max-height: 700px;
            overflow: auto;
            box-sizing: border-box;
      `
       const DialogFriend = styled(Flex)`
            box-sizing: border-box;
            /* background-color: #f8f8f8; */
            border: 1px solid black;
       `

      function FilterBlock(){
            return(
                  <Box >
                  <Flex mx="auto">
                        <TextField placeholder="Find a friend"/>
                  </Flex>
                        <Button>Friends</Button>
                  </Box>
            )
      }

      function FriendsBlock(){
            return(
                  <DialogBlock>
                  { loading ? (
                        <CircularProgress/>
                  ) : (
                              data && data.getUsers.map(user => (
                              <DialogFriend key={user.id} m={2}>
                                 <Flex width={1}>
                                    <Box width={1/5}>
                                      <Avatar>H</Avatar>
                                    </Box>
                                    <Flex my="auto" width={1}>
                                      <Text mr={2}>
                                       {user.firstname}
                                      </Text>
                                      <Text>
                                       {user.secondname}
                                      </Text>
                                     </Flex>
                                 </Flex>
                                 <Flex width={2/5} >
                                       <Button>Add</Button>
                                       <Button>Send</Button>
                                 </Flex>
                              </DialogFriend>
                        ))
                        )
                        }
            </DialogBlock>
            )
      }

      return (
       <Dialog open={friendsWindow}  onClose={handleFriendsWindow}    maxWidth="md" scroll="body">
        <Box m={4} width="720px" maxWidth="1024px">
            <Flex mb={4}>
                  <Text>Users</Text>
            </Flex>
            <Flex>
            <Box width={2/3}>
                   <FriendsBlock/>
            </Box>
            <Box width={1/3} >
                  {/* <FilterBlock/> */}
            </Box>
        </Flex>
        </Box>
       </Dialog>
    )
}
