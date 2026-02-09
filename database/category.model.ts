import { IImage, imageSchema } from "./image.model";
import { Schema, model, models } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  nameCN: string; // Name in chinese
  url: string; // Optional url to learn about the tea
  catID: number; // Category ID associated with the product
  active: boolean; // Whether the category should be displayed
  image: IImage; // Display banner of the category
  description: string; // Description of the category
  recWater: string; // Recommended water temperature
  recTemp: string; // Recommended brewing temperature
  recTime: string; // Recommended brewing time
  recTimes: string; // Recommended brewing times
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  nameCN: { type: String, required: true },
  url: String,
  image: { type: imageSchema, required: true },
  catID: { type: Number, required: true },
  active: { type: Boolean, default: true },
  description: String,
  recWater: String,
  recTemp: String,
  recTime: String,
  recTimes: String,
});

const Category = models.Category || model("Category", categorySchema);
export default Category;
