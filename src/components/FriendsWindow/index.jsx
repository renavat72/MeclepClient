import React, {useState} from 'react'
import { Dialog,Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';

import FilterFriendsBlock from './FilterFriendsBlock'
import FollowingBlock from './FollowingBlock'
import FollowersBlock from './FollowersBlock'
import AllUsersBlock from './AllUsersBlock'

export const FriendsWindowBlock = styled(Box)`
max-width: 1024px;
min-height: 400px;
overflow: auto;
box-sizing: border-box;
`
export const DialogBlock = styled(Grid)`
/* max-width: 800px; */
max-height: 700px;
overflow: auto;
box-sizing: border-box;
`
export const DialogFriend = styled(Flex)`
box-sizing: border-box;
overflow:hidden;
/* background-color: #f8f8f8; */
border: 1px solid black;
`



export default function FriendsWindow(props){
      const {friendsWindow, handleFriendsWindow} = props;
      const TabsUsers = () =>{
            const [tab, setTab] = useState(0);
            const handleChange = (e, newTab) => {
                  setTab(newTab)
            };

            return(
              <Box>
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
       <Dialog open={friendsWindow}  onClose={handleFriendsWindow}    maxWidth="xl" >
        <FriendsWindowBlock m={4} >
            <Flex width={1}>
            <Box width={4/5}>
                 <TabsUsers/>
            </Box>
            <Box ml={3} width={1/5}>
                  <FilterFriendsBlock/>
            </Box>
        </Flex>
        </FriendsWindowBlock>
       </Dialog>
    )
}
