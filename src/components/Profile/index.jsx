import React from 'react';
import { Box, Text,Flex } from 'rebass';
import {GET_CURRENT_USER} from '../../apis/UserAPI'
import { useQuery } from '@apollo/react-hooks';
// Fix ProfilePage
export default function Profile(props){
    const userId = props.match.params.id;
    const variables = {
        userId: userId,
    }; 
    const {data} = useQuery(GET_CURRENT_USER,{variables})
    return(
      data && data.getCurrentUser.map((user) =>
        <Box>
            <Flex>
                <Text>
                    {user.firsName}
                </Text>
            </Flex>
        </Box>

    )
)
}
