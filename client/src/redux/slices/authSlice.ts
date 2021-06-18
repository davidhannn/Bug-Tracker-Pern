import { AppThunk } from './../store';
import { CredentialsPayload } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserState } from '../types';
import authService from '../../services/auth';

import { fetchProjects } from './projectSlice';

interface InitialAuthState {
  user: UserState | null;
}

const initialState: InitialAuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    logOutUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, logOutUser } = authSlice.actions;

export const login = (credentials: CredentialsPayload): AppThunk => {
  return async (dispatch) => {
    try {
      const userData = await authService.login(credentials);
      dispatch(setUser(userData));

      dispatch(fetchProjects());
    } catch (err) {
      console.log(err);
    }
  };
};

export const registerUser = (credentials: CredentialsPayload): AppThunk => {
  return async (dispatch) => {
    try {
      const newUser = await authService.register(credentials);
      dispatch(setUser(newUser));

      const loggedUser = await authService.verify();
      if (loggedUser) {
        dispatch(setUser(loggedUser));
      }
      dispatch(fetchProjects());
    } catch (err) {
      console.log(err);
    }
  };
};

export const autoLogin = (): AppThunk => {
  return async (dispatch) => {
    try {
      const loggedUser = await authService.verify();
      if (loggedUser) {
        dispatch(setUser(loggedUser));
      }

      dispatch(fetchProjects());
    } catch (err) {
      console.log(err);
    }
  };
};

export const logout = (): AppThunk => {
  return async (dispatch) => {
    await authService.logout();
    dispatch(logOutUser);
  };
};

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
