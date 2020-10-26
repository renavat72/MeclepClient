import React, {useState, useContext} from 'react'
import { Dialog, Button,  Grid, Avatar, CircularProgress,  } from '@material-ui/core';
import { generatePath } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Text, Box, Flex} from 'rebass'
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import {GET_AUTH_USER, GET_ALL_USERS, FOLLOWING_USER} from '../../apis/UserAPI'
import FilterFriendsBlock from './FilterFriendsBlock'
import Follow from '../Follow'
import { AuthContext } from '../../context/auth'
import { Link } from 'react-router-dom';
import * as Routes from '../../routes';

const FriendsWindowBlock = styled(Box)`
max-width: 1024px;
min-height: 400px;
overflow: auto;
box-sizing: border-box;
`
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



export default function FriendsWindow(props){
      const {friendsWindow, handleFriendsWindow} = props;
      const authUser = useContext(AuthContext);

      function FriendsBlock(){
            const {data, loading} = useQuery(FOLLOWING_USER)
            return(
                  <DialogBlock>
                  { loading ? (
                        <CircularProgress/>
                  ) : (
                              data && data.followingUser.map(user => (
                                    <DialogFriend my={2} key={user.id} >
                                    <Flex width={1} >
                                       <Box width={1/5}>
                                         <Avatar>H</Avatar>
                                       </Box>
                                       <Flex my="auto" width={1}>
                                         <Text mr={2}>
                                          {user.firstName}
                                         </Text>
                                         <Text>
                                          {user.secondName}
                                         </Text>
                                        </Flex>
                                    </Flex>
                                    <Flex width={2/5} >
                                          <Follow user={user}  />
                                          <Button>Send</Button>
                                    </Flex>
                                 </DialogFriend>
                        ))
                        )
                        }
            </DialogBlock>
            )
      }

      function FollowersBlock(){
            const {data, loading} = useQuery(GET_AUTH_USER)

            return(
                  <DialogBlock>
                  { loading ? (
                        <CircularProgress/>
                  ) : (
                          data && data.getAuthUser.followers.map(user => (
                              <DialogFriend key={user.id} my={2}>
                                 <Flex width={1}>
                                    <Box width={1/5}>
                                      <Avatar>H</Avatar>
                                    </Box>
                                    <Flex my="auto" width={1}>
                                      <Text mr={2}>
                                       {user.user}
                                      </Text>
                                      <Text>
                                       {/* {user.secondName} */}
                                      </Text>
                                     </Flex>
                                 </Flex>
                                 <Flex width={2/5} >
                                 <Follow user={user} />
                                          <Button>Send</Button>
                                 </Flex>
                              </DialogFriend>
                        ))
                        )
                        }
            </DialogBlock>
            )
      }

      const AllUsersBlock = () => {
            const variables = {
                  userId: authUser.user.id,
                };
            const {data, loading} = useQuery(GET_ALL_USERS,{variables})
            return(
                  <DialogBlock variables={variables}>
                  { loading ? (
                        <CircularProgress/>
                  ) : (
                         data && data.getUsers.map(user => (
                              <DialogFriend my={2} key={user.id} >
                                 <Flex width={1} >
                                    <Box width={1/5}>
                                    <Link to={generatePath(Routes.USER_PROFILE, {id: user.id,})}>
                                      <Avatar>H</Avatar>
                                    </Link>
                                    </Box>
                                    <Flex my="auto" width={1}>
                                      <Text mr={2}>
                                       {user.firstName}
                                      </Text>
                                      <Text>
                                       {user.secondName}
                                      </Text>
                                     </Flex>
                                 </Flex>
                                 <Flex width={2/5} >
                                       <Follow user={user} />
                                       <Button>Send</Button>
                                 </Flex>
                              </DialogFriend>
                        ))
                        )
                        }
            </DialogBlock>
            )
      }

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
                  // centered
                  >
                        <Tab label="Following" />
                        <Tab label="Followers" />
                        <Tab label="All users" />
                  </Tabs>
                  <TabPanel tab={tab} index={0}>
                        <FriendsBlock/>
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
       <Dialog open={friendsWindow}  onClose={handleFriendsWindow}    maxWidth="lg" scroll="body">
        <FriendsWindowBlock m={4} width="720px">
            <Flex>
            <Box width={4/5}>
                 <TabsUsers/>
            </Box>
            <Box width={1/5} ml={3}>
                  <FilterFriendsBlock/>
            </Box>
        </Flex>
        </FriendsWindowBlock>
       </Dialog>
    )
}
