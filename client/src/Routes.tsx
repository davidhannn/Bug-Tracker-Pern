import { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from './redux/slices/authSlice';

import CreateProjectPage from './pages/create-project/createprojectpage.component';
import RegisterPage from './pages/register/registerpage.component';
import LoginPage from './pages/login-page/loginpage.component';
import HomePage from './pages/home-page/homepage.component';
import ProjectPage from './pages/project-page/projectpage.component';
import BugPage from './pages/bug-page/bugpage.component';

import Navbar from './components/navbar/navbar.component';
import Axios from 'axios';
import backendUrl from './backendUrl';

import { useTheme } from '@material-ui/core/styles';
import { Container, useMediaQuery } from '@material-ui/core';
import storage from './utils/localStorage';

const Routes = () => {
  const { user } = useSelector(selectAuthState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const isLoggedIn = storage.loadUser() || user;

  return (
    <Container disableGutters={isMobile}>
      <BrowserRouter>
        {isLoggedIn ? <Navbar /> : null}
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <HomePage /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login">
            {!isLoggedIn ? <LoginPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/createProject">
            {isLoggedIn ? <CreateProjectPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/projects/:projectId">
            {isLoggedIn ? <ProjectPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/projects/:projectId/bugs/:bugId">
            {isLoggedIn ? <BugPage /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default Routes;
