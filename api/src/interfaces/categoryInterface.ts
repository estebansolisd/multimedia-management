export interface Category {
  name: string;
  image: string; // Path to the category image
  permissions: {
    images: boolean;
    videos: boolean;
    texts: boolean;
  };
}
