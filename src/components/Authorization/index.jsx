import React, { useState} from 'react'
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';

import Login from '../../components/Login'
import SignUp from '../../components/SignUp'

const WrapperDialog = styled(Flex)`
    float: right;
    transform: translateY(20%);
    max-width: 300px;
    padding: 50px;

    background: #fff;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
`

export default function Authorization(props){
    const [isLogin, setIsLogin] = useState(true)

    return(
        <Box >
        <WrapperDialog>
              <Flex flexDirection="column">
                <Flex>
                    <Text mx="auto">
                        myEvent
                    </Text>
                </Flex>
            {isLogin ? <Login setIsLogin={setIsLogin}/>: <SignUp setIsLogin={setIsLogin}/>}
            </Flex>
        </WrapperDialog>
        </Box>
    )
}

