import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  type: 'image' | 'video' | 'text';
  thumbnail: string;
}

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['image', 'video', 'text'], required: true },
  thumbnail: { type: String, required: true },
});

export default model<ICategory>('Category', categorySchema);
