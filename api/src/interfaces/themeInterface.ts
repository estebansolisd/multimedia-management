import { Category } from "./categoryInterface";

export interface Theme {
  name: string;
  categories: Category[]; // References to allowed categories
}
