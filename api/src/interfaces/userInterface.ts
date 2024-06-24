export interface User {
  id: string;
  alias: string;
  username: string;
  email: string;
  password: string;
  role: string; // Admin, Reader, Creator
}
