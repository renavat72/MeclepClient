import React from 'react';
import { Dialog, ListItemIcon, Avatar, Button } from '@material-ui/core';
import { Box, Flex, Text } from 'rebass';
import AddIcon from '@material-ui/icons/Add';
import { ModalLink } from 'react-router-modal';

import AddEventWindow from '../Events/AddEventWindow';

export default function MobileSidebar({
  user,
  Logout,
  Locate,
  EditProfileBlock,
  mobSidebarOpen,
  handleMobSidebar,
}) {
  if(!user) return null;
  return (
    <Dialog open={mobSidebarOpen} onClose={() => handleMobSidebar()} width="xl ">
      <Flex py={4} minWidth={['250px', '300px']}  my="auto" flexDirection="column">
        <Flex mx="auto" mt="auto" mb={4}>
          {user.coverImage ? (
            <img
              alt="coverImage"
              style={{ maxWidth: 150, maxHeight: 150, width: '100%', borderRadius: '50%' }}
              src={user.coverImage.image}
            />
          ) : (
            <Avatar>
              {user.firstName[0]}
              {user.secondName[0]}
            </Avatar>
          )}
        </Flex>
        <Flex mb={3}>
          <Flex my="auto" justifyContent="space-evenly" width={1} px={5}>
            <Text>{user.firstName}</Text>
            <Text>{user.secondName}</Text>
          </Flex>
        </Flex>
        <Flex mx="auto" flexDirection="Column">
          <Flex mb={4} mx="auto">
            <Locate />
          </Flex>
          <Flex mb={3} mx="auto">
            <ModalLink path={`/createEvent`} component={AddEventWindow}>
              <Flex flexDirection="row" mx="auto" justifyContent="space-between">
              <Button>
                <Text>Create event</Text>
              </Button>
              </Flex>
            </ModalLink>
          </Flex>
          {/* <Flex mb={4}>
            <EditProfileBlock />
          </Flex> */}
          <Flex mx="auto">
            <Logout />
          </Flex>
        </Flex>
      </Flex>
    </Dialog>
  );
}
