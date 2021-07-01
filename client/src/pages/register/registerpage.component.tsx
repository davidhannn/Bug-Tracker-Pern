import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  registerUser,
  setAuthError,
  selectAuthState,
  clearAuthError,
} from '../../redux/slices/authSlice';

import { useHistory } from 'react-router-dom';
import { TextField, Paper, Typography, Button } from '@material-ui/core';

import { authPageStyles } from '../../styles/muiStyles';

import ErrorAlert from '../../components/error-alert/error-alert.component';
interface InputValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Required')
    .max(20, 'Must be at most 20 characters')
    .min(3, 'Must be at least 3 characters')
    .matches(
      /^[a-zA-Z0-9-_]*$/,
      'Only alphanum, dash & underscore characters are allowed'
    ),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
});

const RegisterPage = () => {
  const classes = authPageStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const { loading, error } = useSelector(selectAuthState);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const handleRegister = ({
    username,
    password,
    confirmPassword,
  }: InputValues) => {
    if (password !== confirmPassword) {
      return dispatch(setAuthError('Passwords need to match'));
    }
    dispatch(registerUser({ username, password }, history));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.body} elevation={2}>
        <Typography variant="h4" style={{ marginBottom: '2rem' }}>
          Register Page
        </Typography>
        <form onSubmit={handleSubmit(handleRegister)}>
          <TextField
            required
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            name="username"
            fullWidth
            inputRef={register}
            className={classes.inputField}
            error={'username' in errors}
            helperText={'username' in errors ? errors.username.message : ''}
          />
          <TextField
            required
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            fullWidth
            inputRef={register}
            className={classes.inputField}
            error={'password' in errors}
            helperText={'password' in errors ? errors.password.message : ''}
          />
          <TextField
            required
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            fullWidth
            inputRef={register}
            className={classes.inputField}
            error={'confirmPassword' in errors}
            helperText={
              'confirmPassword' in errors ? errors.confirmPassword.message : ''
            }
          />
          <Button
            type="submit"
            size="large"
            color="primary"
            variant="contained"
            fullWidth
          >
            Register!
          </Button>
        </form>
        <Typography
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Already have an account? <a href="/login">Log in</a>
        </Typography>
        {error && (
          <ErrorAlert
            errorMsg={error}
            clearErrorMsg={() => dispatch(clearAuthError())}
          />
        )}
      </Paper>
    </div>
  );
};

export default RegisterPage;
