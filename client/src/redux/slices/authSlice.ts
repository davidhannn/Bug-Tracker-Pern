import { AppThunk } from './../store';
import { CredentialsPayload } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserState } from '../types';
import authService from '../../services/auth';
import { History } from 'history';

import { fetchProjects } from './projectSlice';
import storage from '../../utils/localStorage';
import { getErrorMsg } from './../../utils/helper';

interface InitialAuthState {
  user: UserState | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialAuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logOutUser: (state, action) => {
      state.user = null;
    },
    setAuthLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, logOutUser, setAuthError, clearAuthError } =
  authSlice.actions;

export const login = (
  credentials: CredentialsPayload,
  history: History
): AppThunk => {
  return async (dispatch) => {
    try {
      const userData = await authService.login(credentials);
      dispatch(setUser(userData));

      storage.saveUser(userData);
      authService.setToken(userData.token);
      history.push('/');
      dispatch(fetchProjects());
    } catch (e) {
      dispatch(setAuthError(getErrorMsg(e)));
    }
  };
};

export const registerUser = (
  credentials: CredentialsPayload,
  history: History
): AppThunk => {
  return async (dispatch) => {
    try {
      const newUser = await authService.register(credentials);
      dispatch(setUser(newUser));

      storage.saveUser(newUser);
      authService.setToken(newUser.token);
      history.push('/');
      dispatch(fetchProjects());
    } catch (e) {
      dispatch(setAuthError(getErrorMsg(e)));
    }
  };
};

export const autoLogin = (): AppThunk => {
  return async (dispatch) => {
    try {
      const loggedUser = storage.loadUser();
      if (loggedUser) {
        dispatch(setUser(loggedUser));
        authService.setToken(loggedUser.token);
        dispatch(fetchProjects());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const logout = (): AppThunk => {
  return async (dispatch) => {
    dispatch(logOutUser);
    storage.removeUser();
  };
};

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
