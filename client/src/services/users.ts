import Axios from 'axios';
import backendUrl from '../backendUrl';

const getUsers = async () => {
  const response = await Axios.get(`${backendUrl}/users`, {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
};

const usersService = { getUsers };

export default usersService;
