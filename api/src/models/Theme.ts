import { Schema, model, Document } from "mongoose";

export interface ITheme extends Document {
  name: string;
  allowsImages: boolean;
  allowsVideos: boolean;
  allowsTexts: boolean;
}

const themeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  allowsImages: { type: Boolean, required: true },
  allowsVideos: { type: Boolean, required: true },
  allowsTexts: { type: Boolean, required: true },
});

export default model<ITheme>("Theme", themeSchema);
