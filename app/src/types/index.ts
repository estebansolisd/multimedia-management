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

export interface Content {
  _id?: string;
  title: string;
  description: string;
  type: Category;
  content: string;
  theme: Theme;
  createdBy: User;
}

export interface Category {
  _id?: string;
  name: string;
  type: string;
  thumbnail: string;
}

