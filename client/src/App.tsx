import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './Routes';
import Axios from 'axios';
import backendUrl from './backendUrl';

import { autoLogin, selectAuthState } from './redux/slices/authSlice';

Axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
