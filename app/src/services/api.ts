import { TOKEN_KEY } from "@/context/AuthContext";
import { Category, Content, CreateContent, Theme, User } from "@/types";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (!config.url?.includes("/auth/login") && !config.url?.includes("/auth/register")) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (user: User) => {
  const response = await api.post("/auth/register", user);
  return response.data;
};

export const fetchContents = async () => {
  const response = await api.get<Content[]>("/contents");
  return response.data;
};

export const fetchThemes = async () => {
  const response = await api.get<Theme[]>("/themes");
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};

export const createContent = async (newContent: CreateContent) => {
  try {
    const response = await api.post('/contents', newContent);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCategory = async (newCategory: Category) => {
  const response = await api.post('/categories', newCategory);
  return response.data;
};

export const createTheme = async (newTheme: Theme) => {
  const response = await api.post('/themes', newTheme);
  return response.data;
};

export const me = async () => {
  const response =  await api.post('/auth/me');
  return response.data;
};