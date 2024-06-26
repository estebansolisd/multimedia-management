export interface Theme {
  name: string;
  allowsImages: boolean;
  allowsVideos: boolean;
  allowsTexts: boolean;
}

export interface Content {
  title: string;
  description: string;
  type: "image" | "video" | "text";
  url: string;
  theme: Theme;
  createdBy: Date;
}

export interface Category {
  name: string;
  type: 'image' | 'video' | 'text';
  thumbnail: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'reader' | 'creator';
}