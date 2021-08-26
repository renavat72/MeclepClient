import React, { useState } from 'react';
import { Text, Box, Flex } from 'rebass';
import { useTranslation } from 'react-i18next';
import './style.css'

import Login from './Login';
import SignUp from './SignUp';

export default function Authorization(props) {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="AuthoriztionPage">
    { window.innerWidth > 1024 ?  <div className="AuthorizationPageText">
            <Box pb={4} style={{fontSize:64, color: "#BF814B"}}>Meclep</Box>
            <Box >
                <Text>Find happy </Text>
                <Text my={2}>Connect to a party </Text>
                <Text>Create your event</Text>
            </Box>
        </div>: null}
      <div className="AuthoriztionBlock" >
        <Flex flexDirection="column">
          
          {isLogin ? <Login setIsLogin={setIsLogin} /> : <SignUp setIsLogin={setIsLogin} />}
        </Flex>
      </div>
    </div>
  );
}
