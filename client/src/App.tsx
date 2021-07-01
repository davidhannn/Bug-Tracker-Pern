import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Routes from './Routes';

import { autoLogin } from './redux/slices/authSlice';
import classes from '*.module.css';
import { useBodyStyles } from './styles/muiStyles';

// Axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const classes = useBodyStyles();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <Routes />
      </div>
    </div>
  );
};

export default App;
