import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { TextField, Paper, Typography, Button } from '@material-ui/core';
import Axios from 'axios';
import backendUrl from '../../backendUrl';

import { login } from '../../redux/slices/authSlice';

import { authPageStyles } from '../../styles/muiStyles';

interface InputValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const classes = authPageStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      dispatch(login({ username, password }));
      history.push('/');
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
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            name="username"
            fullWidth
            className={classes.inputField}
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            fullWidth
            className={classes.inputField}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
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
          <Typography style={{ marginTop: '1rem' }}>
            Don't have an account? <a href="/register">Register Here</a>
          </Typography>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;
