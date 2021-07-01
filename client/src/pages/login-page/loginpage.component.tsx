import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { TextField, Paper, Typography, Button } from '@material-ui/core';

import {
  login,
  clearAuthError,
  selectAuthState,
} from '../../redux/slices/authSlice';

import { authPageStyles } from '../../styles/muiStyles';

import ErrorAlert from '../../components/error-alert/error-alert.component';

interface InputValues {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

const LoginPage = () => {
  const classes = authPageStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectAuthState);
  // const [username, setUsername] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const handleLogin = ({ username, password }: InputValues) => {
    try {
      dispatch(login({ username, password }, history));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.body} elevation={2}>
        <Typography variant="h4" style={{ marginBottom: '2rem' }}>
          Login Page
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            name="username"
            fullWidth
            className={classes.inputField}
            inputRef={register}
            error={'username' in errors}
            helperText={'username' in errors ? errors.username.message : ''}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            fullWidth
            className={classes.inputField}
            inputRef={register}
            error={'password' in errors}
            helperText={'password' in errors ? errors.password.message : ''}
          />
          <Button
            type="submit"
            size="large"
            color="primary"
            variant="contained"
            fullWidth
          >
            Login!
          </Button>
        </form>
        <Typography style={{ marginTop: '1rem' }}>
          Don't have an account? <a href="/register">Register Here</a>
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

export default LoginPage;
