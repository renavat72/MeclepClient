import React from 'react'
import Button from '@material-ui/core/Button';
import { Dialog, TextField } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'

import styled from 'styled-components';


const FriendsSide = styled(Flex)`

    background-color: #f8f8f8;
    box-shadow: 0 0 15px rgba(0,0,0,0.08);
`
const FriendsBlock = styled(Flex)`
     border-top: 1px solid #e5e5e5;
     box-sizing: border-box;
     cursor: pointer;
     max-height: 400px;
     overflow: auto;

     :hover {
        background-color: #a0b9de;
        transition: opacity 0.6s;
        opacity: 0.9;
     };
     :active {
        background-color: #a0b9de;
        transition: opacity 0.6s;
        opacity: 0.9;
}
`

const DialogSide = styled(Flex)`

`

const InputBlock = styled(Flex)`
     background-color: #f8f8f8;
     border: 1px solid #ececec;
     box-sizing: border-box;
     cursor: pointer;
`
const DialogBlock = styled(Flex)`
    max-width: 400px;
    max-height: 400px;
    overflow: auto;
    box-sizing: border-box;
`

export default function DialogWindow(props){
      const {dialogWindow, handleDialogWindow} = props;

      return (
       <Dialog open={dialogWindow}  onClose={handleDialogWindow}  width="lg">
        <Box  maxWidth="900px" css="box-sizing: border-box;">
            <Flex flexDirection="row" >
                <FriendsSide width={1/4} >
                    <Box mx="auto" mt={2}>
                            <FriendsBlock flexDirection="row" p={2} mb={1}>
                                <Text mr="auto">Ava</Text>
                                <Text>User User</Text>
                            </FriendsBlock>
                            <FriendsBlock flexDirection="row" p={2}>

                            <Text mr={1}>Ava</Text>
                            <Text>User User</Text>
                        </FriendsBlock>
                    </Box>
                </FriendsSide>
                <DialogSide width={3/4} flexDirection="column" >
                     <Box mb={3} >
                         <DialogBlock flexDirection="column" pt={3} px={2}>
                            <Flex flexDirection="column" mb={3}>
                                <Text mb={2} ml="auto">User1</Text>
                                <Text ml="auto" textAlign="right" css="background-color: #8dabd8; border-radius: 8px; padding: 10px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium rem tempora maiores facere, distinctio voluptatem eos commodi facilis nihil laborum nesciunt? Blanditiis assumenda enim tempore minus repudiandae obcaecati nisi et.</Text>
                            </Flex>
                            <Flex flexDirection="column"  mb={3}>
                                <Text mb={2} >User2</Text>
                                <Text css="background-color: #a8a6a3; border-radius: 8px; padding: 10px;">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque quas quos expedita natus tenetur architecto soluta fugit nesciunt quod optio laborum dolorum, doloremque numquam corporis sit id quaerat. Alias, non.</Text>
                            </Flex>
                        </DialogBlock>
                    </Box>
                    <InputBlock width={1} p={3}>
                            <Box width={1} >
                              <TextField fullWidth/>
                            </Box>
                            <Box px={3}>
                             <Button variant="contained" color="primary" >Send</Button>
                            </Box>
                    </InputBlock>
                </DialogSide>
            </Flex>
        </Box>
       </Dialog>
    )
}       
