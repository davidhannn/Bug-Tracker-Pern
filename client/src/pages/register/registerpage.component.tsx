import React, { useState, Fragment } from 'react';

import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { registerUser } from '../../redux/slices/authSlice';

import { useHistory } from 'react-router-dom';
import { TextField, Paper, Typography, Button } from '@material-ui/core';

import { authPageStyles } from '../../styles/muiStyles';
interface InputValues {
  username: string;
  password: string;
}

const RegisterPage = () => {
  const classes = authPageStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('error, passwords not matching');
    }
    dispatch(registerUser({ username, password }));
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.body} elevation={2}>
        <Typography variant="h4" style={{ marginBottom: '2rem' }}>
          Register Page
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
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
            name="password2"
            fullWidth
            className={classes.inputField}
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
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
          <Typography
            style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            Already have an account? <a href="/login">Log in</a>
          </Typography>
        </form>
      </Paper>
    </div>
  );
};

export default RegisterPage;
