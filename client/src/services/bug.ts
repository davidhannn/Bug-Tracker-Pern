import Axios from 'axios';
import backendUrl from '../backendUrl';

import { BugPayload } from '../redux/types';

const getBugs = async (projectId: string) => {
  const response = await Axios.get(`${backendUrl}/projects/${projectId}/bugs`, {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
};

const createBug = async (projectId: string, bugData: BugPayload) => {
  const response = await Axios.post(
    `${backendUrl}/projects/${projectId}/bugs`,
    bugData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const deleteBug = async (projectId: string, bugId: string) => {
  const response = await Axios.delete(
    `${backendUrl}/projects/${projectId}/bugs/${bugId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const bugService = { getBugs, createBug, deleteBug };

export default bugService;
