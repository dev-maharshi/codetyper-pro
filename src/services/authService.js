import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/login`, { username, password });
    const { token } = response.data;

    const decodedToken = jwtDecode(token);
    const user = { token, userId: decodedToken.userId };

    localStorage.setItem('user', JSON.stringify(user));

    return user;

  } catch (error) {
    throw new Error('Login failed');
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
  