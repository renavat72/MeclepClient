import React, { useState, useContext } from 'react';
import { Box, Flex, Text } from 'rebass';
import { useMutation } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Form } from 'react-final-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

import { AuthContext } from '../../../context/auth';
import { useForm } from '../../../util/hooks';
import { REGISTER_USER } from '../../../apis/UserAPI';
import { Validate } from '../../../util/validates/validateRegister';

export default function SignUp(props) {
  const { setIsLogin } = props;
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const { t } = useTranslation();
  let history = useHistory();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push('/');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].message);
    },
    variables: values,
  });

  function registerUser() {
    const errors = Validate(
      values.email,
      values.firstName,
      values.secondName,
      values.password,
      values.confirmPassword,
      t,
    );
    if (errors) {
      setErrors(errors);
      return false;
    }
    addUser();
  }
  return (
    <Box>
      <Text mx="auto" pt={4} pb={4} fontSize={36} fontWeight="bold" color="#000000">
            {t('signUp.signUp')}
          </Text>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate className={loading ? <CircularProgress /> : ''}>
            <Flex>
              <Box mx="auto">
                <Flex pt={5}>
                  <TextField
                    name="firstName"
                    placeholder={t('signUp.firstName')}
                    values={values.firstName}
                    onChange={onChange}
                  />
                </Flex>
                <Flex pt={3}>
                  <TextField
                    name="secondName"
                    placeholder={t('signUp.secondName')}
                    type="text"
                    values={values.secondName}
                    onChange={onChange}
                  />
                </Flex>
                <Flex pt={3}>
                  <TextField
                    name="email"
                    placeholder={t('signUp.email')}
                    type="email"
                    values={values.email}
                    onChange={onChange}
                  />
                </Flex>
                <Flex pt={3}>
                  <TextField
                    name="password"
                    placeholder={t('signUp.password')}
                    type="password"
                    values={values.password}
                    onChange={onChange}
                  />
                </Flex>
                <Flex pt={3}>
                  <TextField
                    name="confirmPassword"
                    placeholder={t('signUp.confirmPassword')}
                    type="password"
                    values={values.confirmPassword}
                    onChange={onChange}
                  />
                </Flex>
                <Flex flexDirection="column">
                  {errors && (
                    <Box mt={[0, 0, 4]} mx="auto">
                      <Text>{errors}</Text>
                    </Box>
                  )}
                </Flex>
                <Flex pt={5}>
                  <Box mx="auto">
                    <Button type="submit" variant="contained" color="primary">
                      {t('common.submit')}
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </form>
        )}
      />
      <Flex py={3}>
        <Box mx="auto">
          <Button onClick={() => setIsLogin(true)}>{t('common.back')}</Button>
        </Box>
      </Flex>
    </Box>
  );
}
