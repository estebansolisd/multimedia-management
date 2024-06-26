import { Content, User } from '@/types';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.url !== '/login' && config.url !== '/register') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const registerUser = async (user: User) => {
  const response = await api.post('/register', user);
  return response.data;
};

export const fetchContents = async () => {
  const response = await api.get<Content[]>('/contents');
  return response.data;
};

