import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  type: string;
  thumbnail: string;
}

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

export default model<ICategory>('Category', categorySchema);
