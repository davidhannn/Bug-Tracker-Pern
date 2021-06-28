import Axios from 'axios';
import backendUrl from '../backendUrl';

interface Credentials {
  username: string;
  password: string;
}

type Token = string | null;

let token: Token = null;

const setToken = (newToken: string) => {
  token = newToken;
};

export const setConfig = () => {
  return {
    backendUrl,
    headers: {
      'x-auth-token': token,
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    // withCredentials: true,
  };
};

const login = async (credentials: Credentials) => {
  const response = await Axios.post(
    `${backendUrl}/login`,
    credentials,
    setConfig()
  );
  return response.data;
};

const register = async (credentials: Credentials) => {
  const response = await Axios.post(
    `${backendUrl}/register`,
    credentials,
    setConfig()
  );
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
const authService = { login, logout, verify, register, setToken };

export default authService;
