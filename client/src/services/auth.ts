import Axios from 'axios';
import backendUrl from '../backendUrl';

interface Credentials {
  username: string;
  password: string;
}

const login = async (credentials: Credentials) => {
  const response = await Axios.post(`${backendUrl}/login`, credentials);
  return response.data;
};

const verify = async () => {
  const response = await Axios.get(`${backendUrl}/verify`, {
    withCredentials: true,
  });
  return response.data;
};

const logout = async () => {
  const response = await Axios.get(`${backendUrl}/logout`);
};
const authService = { login, logout, verify };

export default authService;
