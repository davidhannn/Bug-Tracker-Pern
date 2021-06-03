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

const Routes = () => {
  const { user } = useSelector(selectAuthState);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <BrowserRouter>
      {user ? <Navbar /> : null}
      <Switch>
        <Route exact path="/">
          {user ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login">
          {!user ? <LoginPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/createProject">
          {user ? <CreateProjectPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/projects/:projectId">
          {user ? <ProjectPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/projects/:projectId/bugs/:bugId">
          {user ? <BugPage /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
