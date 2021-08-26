import React, { useState, useContext } from 'react';
import { Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Box, Flex } from 'rebass';
import { ModalLink } from 'react-router-modal';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import { GET_AUTH_USER } from '../../apis/UserAPI';
import Map from '../Map';
import AddEventWindow from '../Events/AddEventWindow';
import Sidebar from '../Sidebar';
import { AuthContext } from '../../context/auth';

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const { data } = useQuery(GET_AUTH_USER);
  const { t } = useTranslation();

  const [eventWindow, setEventWindow] = useState(false);
  const handleEventWindow = () => {
    setEventWindow(!eventWindow);
  };
  const mapRef = React.useRef();

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);
  return (
    <Box>
      <Map mapRef={mapRef}>
        <Flex>
            <Sidebar user={data && data.getAuthUser} panTo={panTo} logout={logout} />
          </Flex>
          <Flex>
          {window.innerWidth > 768 ? (
            <Flex ml="auto" mr={4} mt={2}>
              <ModalLink path={`/createEvent`} component={AddEventWindow}>
                <Fab color="primary">
                  <Tooltip title={t('events.createEvent')}>
                    <AddIcon onClick={handleEventWindow} />
                  </Tooltip>
                </Fab>
              </ModalLink>
            </Flex>
          ) : null}
        </Flex>
      </Map>
    </Box>
  );
}
