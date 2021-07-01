import Axios from 'axios';
import backendUrl from '../backendUrl';
import { setConfig } from './auth';

const getUsers = async () => {
  const response = await Axios.get(`${backendUrl}/users`, setConfig());
  return response.data;
};

const usersService = { getUsers };

export default usersService;
