import { Schema, model, Document } from "mongoose";

export interface IContent extends Document {
  title: string;
  description: string;
  category: Schema.Types.ObjectId;
  content: string;
  theme: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
}

const contentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  content: { type: String, required: true },
  theme: { type: Schema.Types.ObjectId, ref: "Theme", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model<IContent>("Content", contentSchema);
