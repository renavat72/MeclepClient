import React from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Flex } from 'rebass';


export default function FilterFriendsBlock(props) {
  const { searchFollowing, setSearchFollowing } = props;
  const onSearchChange = (e) => setSearchFollowing(e.target.value);
  const { t } = useTranslation();

  return (
    <Flex flexDirection="column">
      <TextField
        placeholder={t('friends.find')}
        onChange={onSearchChange}
        value={searchFollowing}
      />
    </Flex>
  );
}
