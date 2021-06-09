import Axios from 'axios';
import backendUrl from '../backendUrl';
import { ProjectPayload } from '../redux/types';

const getProjects = async () => {
  const response = await Axios.get(`${backendUrl}/projects`, {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
};

const getProject = async (id: any) => {
  const response = await Axios.get(`${backendUrl}/projects/${id}`, {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
};

const createProject = async (projectData: ProjectPayload) => {
  const response = await Axios.post(`${backendUrl}/projects`, projectData, {
    withCredentials: true,
  });

  console.log(response);
  return response.data;
};

const deleteProject = async (projectId: string) => {
  const response = await Axios.delete(`${backendUrl}/projects/${projectId}`, {
    withCredentials: true,
  });

  return response;
};

const projectService = {
  getProjects,
  createProject,
  getProject,
  deleteProject,
};

export default projectService;
