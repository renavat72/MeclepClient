import React, { useContext, useState } from 'react';
import { Text, Box, Flex } from 'rebass';
import { Button, TextField } from '@material-ui/core';
import { Form } from 'react-final-form';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from "react-router-dom";

import { LOGIN_USER } from '../../../apis/UserAPI';
import { useForm } from '../../../util/hooks';
import { AuthContext } from '../../../context/auth';

export default function Login(props) {
  const context = useContext(AuthContext);
  const { t } = useTranslation();
  let history = useHistory();

  const { setIsLogin } = props;
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push('/');

    },
    onError(error) {
      setError(error.graphQLErrors[0].message);
      if (!values.email || !values.password) {
        setError(`${t('login.email')}`);
        return;
      }
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Box><Text mx="auto" pt={4} pb={4} fontSize={36} fontWeight="bold" color="#000000">
    {t('login.login')}
  </Text>
      <Form
        onSubmit={onSubmit}
        noValidate
        className={loading ? 'loading' : ''}
        render={({ form, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box mx="auto">
              <Box pt={5}>
                <TextField
                  name="email"
                  placeholder={t('login.email')}
                  type="email"
                  value={values.email}
                  onChange={onChange}
                />
              </Box>
              <Box pt={3}>
                <TextField
                  name="password"
                  placeholder={t('login.password')}
                  type="password"
                  value={values.password}
                  onChange={onChange}
                />
              </Box>
              </Box>
              <Box mx="auto" pt={5}>
                <Button type="submit" variant="contained" color="primary">
                  {t('login.button')}
                </Button>
              </Box>
          </form>
        )}
      />
      <Flex py={3} flexDirection="column">
        {error && (
          <Box mt={[0, 0, 4]} mx="auto">
            <Text>{error}</Text>
          </Box>
        )}
        <Box mx="auto" width={200} fontSize={14}>
          <Text >{t('login.text')}
          </Text>
          <Text fontWeight="bold">
            <Link  onClick={() => setIsLogin(false)} >{t('login.createAcc')}</Link>
          </Text>
          {/* <Button color="primary" onClick={() => setIsLogin(false)}>
          </Button> */}
        </Box>
      </Flex>
    </Box>
  );
}
