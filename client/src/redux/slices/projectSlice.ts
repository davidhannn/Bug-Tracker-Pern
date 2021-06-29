import { ProjectSortValues } from './../types';
import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProjectState, ProjectPayload } from '../types';
import projectService from '../../services/projects';
import { History } from 'history';

interface InitialProjectsState {
  projects: ProjectState[];
  fetchStatus: 'idle' | 'loading' | 'success' | 'fail';
  fetchError: string | null;
  submitLoading: boolean;
  submitError: string | null;
  sortBy: ProjectSortValues;
}

const initialState: InitialProjectsState = {
  projects: [],
  fetchStatus: 'idle',
  fetchError: null,
  submitLoading: false,
  submitError: null,
  sortBy: 'newest',
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
      // state.projects = [...state.projects, action.payload];
      state.projects.push(action.payload);
      state.submitLoading = false;
      state.submitError = null;
    },
    setProjectsFetchLoading: (state) => {
      state.fetchStatus = 'loading';
      state.fetchError = null;
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    updateProjectName: (
      state,
      action: PayloadAction<{ data: { name: string }; projectId: string }>
    ) => {
      state.projects = state.projects.map((project) =>
        project.id === action.payload.projectId
          ? { ...project, ...action.payload.data }
          : project
      );
    },
    setSubmitProjectLoading: (state) => {
      state.submitLoading = true;
      state.submitError = null;
    },
    sortProjectsBy: (state, action: PayloadAction<ProjectSortValues>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setProjects,
  addProject,
  setProjectsFetchLoading,
  removeProject,
  updateProjectName,
  setSubmitProjectLoading,
  sortProjectsBy,
} = projectsSlice.actions;

export const fetchProjects = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setProjectsFetchLoading());
      const allProjects = await projectService.getProjects();
      dispatch(setProjects(allProjects));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createNewProject = (
  projectData: ProjectPayload,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitProjectLoading());
      const newProject = await projectService.createProject(projectData);
      dispatch(addProject(newProject));
      closeDialog && closeDialog();
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProject = (
  projectId: string,
  history: History
): AppThunk => {
  return async (dispatch) => {
    try {
      await projectService.deleteProject(projectId);
      history.push('/');
      dispatch(removeProject(projectId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const editProjectName = (projectId: string, name: string): AppThunk => {
  return async (dispatch) => {
    try {
      const updatedProjectName = await projectService.editProjectName(
        projectId,
        name
      );
      dispatch(
        updateProjectName({
          data: { name: updatedProjectName.name },
          projectId,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const selectProjectsState = (state: RootState) => state.projects;

export const selectProjectById = (state: RootState, projectId: string) => {
  return state.projects.projects.find((p) => p.id === projectId);
};

export default projectsSlice.reducer;
