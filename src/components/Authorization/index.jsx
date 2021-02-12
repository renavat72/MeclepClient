import React, { useState} from 'react'
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';

import Login from '../Login'
import SignUp from '../SignUp'
import SliderText from '../SliderText'
import People from '../../images/People.jpg'

const WrapperDialog = styled(Flex)`
    width:100%;

    top:200%;
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
             <Box ml={2} display={["none","none", "block"]}>
              <SliderText />
              </Box>
        <WrapperDialog mb="auto"ml={[null,"auto"]}sx={{
            position: ['relative','absolute'],
            maxWidth: ['300px'],
            right:[0,'1%'],   
            float: [null,'right'],
            mt:[100,0],
            mx: ["auto"],
         }} >
              <Flex flexDirection="column">
                    <Text mx="auto" fontSize={24} fontWeight='bold' color="#3f51b5">
                        Meclep
                    </Text>
            {isLogin ? <Login setIsLogin={setIsLogin}/>: <SignUp setIsLogin={setIsLogin}/>}
            </Flex>
        </WrapperDialog>
        </Flex>
    )
}

