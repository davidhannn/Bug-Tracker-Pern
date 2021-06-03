import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../types';
import authService from '../../services/auth';
import usersService from '../../services/users';

interface InitialUsersState {
  users: User[];
}

const initialState: InitialUsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const getUsers = (): AppThunk => {
  return async (dispatch) => {
    try {
      const allUsers = await usersService.getUsers();
      dispatch(setUsers(allUsers));
    } catch (err) {
      console.log(err);
    }
  };
};

export const selectUsersState = (state: RootState) => state.users;

export default usersSlice.reducer;
