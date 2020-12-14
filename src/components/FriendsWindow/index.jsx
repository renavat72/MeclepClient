import React, {useState} from 'react'
import { Dialog, Tabs, Tab } from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';

import FilterFriendsBlock from './FilterFriendsBlock'
import FollowingBlock from './FollowingBlock'
import FollowersBlock from './FollowersBlock'
import AllUsersBlock from './AllUsersBlock'

export const FriendsWindowBlock = styled(Box)`
max-width: 1024px;
overflow: auto;
box-sizing: border-box;
`
export const DialogBlock = styled(Flex)`
flex-direction:column;
overflow: auto;
box-sizing: border-box;
`
export const DialogFriend = styled(Flex)`
box-sizing: border-box;
border: 1px solid black;
`
export const FilterFriends = styled(Flex)`
/* position: fixed; */
`
export const WrapperFriends = styled(Box)`
height: 720px;
`

export default function FriendsWindow(props){
      const {friendsWindow, handleFriendsWindow} = props;
      const TabsUsers = () =>{
            const [tab, setTab] = useState(0);
            const handleChange = (e, newTab) => {
                  setTab(newTab)
            };

            return(
              <Box >
                  <Tabs
                  value={tab}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  >
                        <Tab label="Following" />
                        <Tab label="Followers" />
                        <Tab label="All users" />
                  </Tabs>
                  <TabPanel tab={tab} index={0}>
                        <FollowingBlock/>
                  </TabPanel>
                  <TabPanel tab={tab} index={1}>
                        <FollowersBlock/>
                  </TabPanel>
                  <TabPanel tab={tab} index={2}>
                        <AllUsersBlock/> 
                  </TabPanel>
              </Box>
            )
            function TabPanel(props) {
                  const { children, tab, index, ...other } = props;
                  return (
                    <div
                      role="tabpanel"
                      hidden={tab !== index}
                      id={`simple-tabpanel-${index}`}
                      aria-labelledby={`simple-tab-${index}`}
                      {...other}
                    >
                      {tab === index && (
                        <Box p={3}>
                          <Text>{children}</Text>
                        </Box>
                      )}
                    </div>
                  );
                }
      }

      return (
       <Dialog open={friendsWindow}  onClose={handleFriendsWindow} maxWidth="xl">
        <FriendsWindowBlock m={[1,4]} minWidth={[null,"700px"]} >
            <Flex flexDirection={["column-reverse","row"]}>
            <WrapperFriends >
                 <TabsUsers />
            </WrapperFriends>
            <Box width={[1,2/7]} mx={[0,3]}my={[2,0]}>
                  <FilterFriendsBlock  width="170px"/>
            </Box> 
        </Flex>
        </FriendsWindowBlock>
       </Dialog>
    )
}
