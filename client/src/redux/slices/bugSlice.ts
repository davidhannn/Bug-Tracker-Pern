import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BugState, BugPayload } from '../types';
import bugService from '../../services/bug';

interface InitialBugState {
  bugs: { [projectId: string]: BugState[] };
  fetchStatus: boolean;
  fetchError: string | null;
}

const initialState: InitialBugState = {
  bugs: {},
  fetchStatus: false,
  fetchError: null,
};

const bugSlice = createSlice({
  name: 'bugs',
  initialState,
  reducers: {
    setBugs: (
      state,
      action: PayloadAction<{ bugs: BugState[]; projectId: string }>
    ) => {
      state.bugs[action.payload.projectId] = action.payload.bugs;
      state.fetchStatus = true;
      state.fetchError = null;
    },
    addBug: (
      state,
      action: PayloadAction<{ bug: BugState; projectId: string }>
    ) => {
      if (action.payload.projectId in state.bugs) {
        state.bugs[action.payload.projectId].push(action.payload.bug);
      } else {
        state.bugs[action.payload.projectId] = [action.payload.bug];
      }
    },
  },
});

export const { setBugs, addBug } = bugSlice.actions;

export const fetchBugs = (projectId: string): AppThunk => {
  return async (dispatch) => {
    try {
      const bugData = await bugService.getBugs(projectId);
      dispatch(setBugs({ bugs: bugData, projectId }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createBug = (projectId: string, bugData: BugPayload): AppThunk => {
  return async (dispatch) => {
    try {
      const createdBug = await bugService.createBug(projectId, bugData);
      dispatch(addBug({ bug: createdBug, projectId }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const selectBugsState = (state: RootState) => state.bugs;

export default bugSlice.reducer;
