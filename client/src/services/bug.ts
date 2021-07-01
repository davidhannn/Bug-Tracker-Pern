import Axios from 'axios';
import backendUrl from '../backendUrl';

import { BugPayload } from '../redux/types';
import { setConfig } from './auth';

const getBugs = async (projectId: string) => {
  const response = await Axios.get(
    `${backendUrl}/projects/${projectId}/bugs`,
    setConfig()
  );

  return response.data;
};

const createBug = async (projectId: string, bugData: BugPayload) => {
  const response = await Axios.post(
    `${backendUrl}/projects/${projectId}/bugs`,
    bugData,
    setConfig()
  );

  return response.data;
};

const deleteBug = async (projectId: string, bugId: string) => {
  const response = await Axios.delete(
    `${backendUrl}/projects/${projectId}/bugs/${bugId}`,
    setConfig()
  );

  return response.data;
};

const closeBug = async (projectId: string, bugId: string) => {
  const response = await Axios.post(
    `${backendUrl}/projects/${projectId}/bugs/${bugId}/close`,
    null,
    setConfig()
  );

  return response.data;
};

const reopenBug = async (projectId: string, bugId: string) => {
  const response = await Axios.post(
    `${backendUrl}/projects/${projectId}/bugs/${bugId}/reopen`,
    null,
    setConfig()
  );
};
const bugService = { getBugs, createBug, deleteBug, closeBug, reopenBug };

export default bugService;
