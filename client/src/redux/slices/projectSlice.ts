import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProjectState, ProjectPayload } from '../types';
import projectService from '../../services/projects';

interface InitialProjectsState {
  projects: ProjectState[];
  fetchStatus: 'idle' | 'loading' | 'success' | 'fail';
  fetchError: string | null;
}

const initialState: InitialProjectsState = {
  projects: [],
  fetchStatus: 'idle',
  fetchError: null
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectState[]>) => {
      state.projects = action.payload;
      state.fetchStatus = 'success';
      state.fetchError = null;
    },
    addProject: (state, action: PayloadAction<ProjectState>) => {
      state.projects.push(action.payload);
    },
    setProjectsFetchLoading: (state) => {
      state.fetchStatus = 'loading';
      state.fetchError = null;
    }
  },
});

export const { setProjects, addProject, setProjectsFetchLoading } = projectsSlice.actions;

export const fetchProjects = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setProjectsFetchLoading())
      const allProjects = await projectService.getProjects();
      dispatch(setProjects(allProjects));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createNewProject = (projectData: ProjectPayload): AppThunk => {
  return async (dispatch) => {
    try {
      const newProject = await projectService.createProject(projectData);
      dispatch(addProject(newProject));
    } catch (err) {
      console.log(err);
    }
  };
};

export const selectProjectsState = (state: RootState) => state.projects;

export default projectsSlice.reducer;
