import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './Routes';
import Axios from 'axios';
import backendUrl from './backendUrl';

import { autoLogin, selectAuthState } from './redux/slices/authSlice';
import classes from '*.module.css';
import { useBodyStyles } from './styles/muiStyles';

Axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const classes = useBodyStyles();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <div className={classes.root}>
      <Routes />
    </div>
  );
};

export default App;
