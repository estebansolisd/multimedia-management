import { Schema, model, Document } from "mongoose";

export interface IContent extends Document {
  title: string;
  description: string;
  type: "image" | "video" | "text";
  url: string;
  theme: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
}

const contentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["image", "video", "text"], required: true },
  url: { type: String, required: true },
  theme: { type: Schema.Types.ObjectId, ref: "Theme", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model<IContent>("Content", contentSchema);
