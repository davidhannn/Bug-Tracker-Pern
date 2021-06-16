import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BugState, BugPayload } from '../types';
import bugService from '../../services/bug';
interface InitialBugState {
  bugs: { [projectId: string]: BugState[] };
  fetchStatus: boolean;
  fetchError: string | null;
  submitStatus: boolean;
  submitError: string | null;
}

const initialState: InitialBugState = {
  bugs: {},
  fetchStatus: false,
  fetchError: null,
  submitStatus: false,
  submitError: null,
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
      state.fetchStatus = false;
      state.fetchError = null;
    },
    addBug: (
      state,
      action: PayloadAction<{ bug: BugState; projectId: string }>
    ) => {
      if (action.payload.projectId in state.bugs) {
        state.bugs[action.payload.projectId] = [
          ...state.bugs[action.payload.projectId],
          action.payload.bug,
        ];
        state.submitStatus = false;
        state.submitError = null;
      } else {
        state.bugs[action.payload.projectId] = [action.payload.bug];
      }
    },
    removeBug: (
      state,
      action: PayloadAction<{ projectId: string; bugId: string }>
    ) => {
      state.bugs[action.payload.projectId] = state.bugs[
        action.payload.projectId
      ].filter((bug) => bug.id !== action.payload.bugId);
    },
    updateBugStatus: (
      state,
      action: PayloadAction<{
        isResolved: Boolean;
        projectId: string;
        bugId: string;
      }>
    ) => {
      state.bugs[action.payload.projectId] = state.bugs[
        action.payload.projectId
      ].map((bug) =>
        bug.id === action.payload.bugId
          ? { ...bug, ...action.payload.isResolved }
          : bug
      );
    },
    setFetchBug: (state) => {
      state.fetchStatus = true;
      state.fetchError = null;
    },
    setSubmitBug: (state) => {
      state.submitStatus = true;
      state.submitError = null;
    },
  },
});

export const {
  setBugs,
  addBug,
  setSubmitBug,
  setFetchBug,
  removeBug,
  updateBugStatus,
} = bugSlice.actions;

export const fetchBugs = (projectId: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setFetchBug());
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
      dispatch(setSubmitBug());
      const createdBug = await bugService.createBug(projectId, bugData);
      dispatch(addBug({ bug: createdBug, projectId }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteBug = (projectId: string, bugId: string): AppThunk => {
  return async (dispatch) => {
    await bugService.deleteBug(projectId, bugId);
    dispatch(removeBug({ projectId, bugId }));
  };
};

export const resolveBug = (
  projectId: string,
  bugId: string,
  action: 'close' | 'reopen'
): AppThunk => {
  return async (dispatch) => {
    try {
      let updatedBug;
      if (action === 'close') {
        updatedBug = await bugService.closeBug(projectId, bugId);
      } else {
        updatedBug = bugService.reopenBug(projectId, bugId);
      }

      const { isResolved } = updatedBug;

      dispatch(updateBugStatus({ isResolved, bugId, projectId }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const selectBugsState = (state: RootState) => state.bugs;

export const selectBugsStateForProject = (
  state: RootState,
  projectId: string
) => {
  return state.bugs.bugs?.[projectId];
};

export const selectBugById = (
  state: RootState,
  bugId: string,
  projectId: string
) => {
  return state.bugs.bugs?.[projectId].find((b) => b.id === bugId);
};
export default bugSlice.reducer;
