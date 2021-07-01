import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import { navStyles } from '../../styles/muiStyles';
import { logout, selectAuthState } from '../../redux/slices/authSlice';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Navbar = () => {
  const classes = navStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  const { user } = useSelector(selectAuthState);
  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  const handleBack = () => {
    if (pathname.includes('/bugs')) {
      history.push(`${pathname.slice(0, pathname.indexOf('/bugs'))}`);
    } else {
      history.push('/');
    }
  };

  const navButton = () => {
    if (['/'].includes(pathname)) {
      return (
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => history.push('/')}
        >
          Bug Tracker
        </Typography>
      );
    } else {
      return (
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          className={classes.backButton}
        >
          {pathname.includes('/bugs') ? 'Project' : 'Home'}
        </Button>
      );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.navWrapper}>
            {navButton()}

            <div className={classes.buttonWrapper}>
              <Avatar className={classes.avatar}>
                {user && user.username.slice(0, 1)}
              </Avatar>
              <Button color="inherit" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
