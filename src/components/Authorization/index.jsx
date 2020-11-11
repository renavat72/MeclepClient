import React, { useState} from 'react'
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';

import Login from '../Login'
import SignUp from '../SignUp'
import SliderText from '../SliderText'
import People from '../../images/People.jpg'

const WrapperDialog = styled(Flex)`
    position:absolute;
    float: right;
    /* transform: translateY(20%); */
    top:200%;
    right:1%;

    max-width: 300px;
    width:100%;

    padding: 50px;

    background: #fff;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
`
    const BackgroundImage = styled(Flex)`
    position: absolute;
    
    width:100vw;
    height:100vh;
    background-image: url(${People});
    background-size: cover;
    background-position:center;
    
    filter: blur(8px) ;
   `
export default function Authorization(props){
    const [isLogin, setIsLogin] = useState(true)
    return(
        <Flex >
                <BackgroundImage/>
             <Box ml={2}>
              <SliderText />
              </Box>
      
        <WrapperDialog ml="auto" >
              <Flex flexDirection="column">
                    <Text mx="auto">
                        myEvent
                    </Text>
            {isLogin ? <Login setIsLogin={setIsLogin}/>: <SignUp setIsLogin={setIsLogin}/>}
            </Flex>
        </WrapperDialog>
        {/* </BackgroundImage> */}
        </Flex>
    )
}

