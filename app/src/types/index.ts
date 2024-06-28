export interface Theme {
  _id?: string;
  name: string;
  allowsImages: boolean;
  allowsVideos: boolean;
  allowsTexts: boolean;
}

export type Role ='admin' | 'reader' | 'creator'
export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}

interface BaseContent {
  _id?: string;
  title: string;
  description: string;
}

export interface Content extends BaseContent {
  category: Category;
  content: string;
  theme: Theme;
  createdBy: User;
}

export interface CreateContent extends BaseContent { 
  content: string;
  theme: string;
  category: string;
  createdBy: string;
}

export interface Category {
  _id?: string;
  name: string;
  type: string;
  thumbnail: string;
}

