import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchContents = async () => {
  const response = await api.get('/contents');
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const fetchThemes = async () => {
  const response = await api.get('/themes');
  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const addContent = async (data: any, token: string) => {
  const response = await api.post('/contents', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default api;
