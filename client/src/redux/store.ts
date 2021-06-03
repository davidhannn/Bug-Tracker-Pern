import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import userReducer from './slices/usersSlice';
import bugReducer from './slices/bugSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    users: userReducer,
    bugs: bugReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
