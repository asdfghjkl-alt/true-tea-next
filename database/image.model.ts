import { Schema } from "mongoose";

export interface IImage {
  url: string; // URL of the image
  filename: string; // Name of the image file
  size: number; // Size of the image in bytes
}

export const imageSchema = new Schema<IImage>(
  {
    url: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { _id: false },
);
