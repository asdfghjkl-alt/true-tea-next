import { Schema, model, models } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  nameCN: string; // Name in chinese
  url: string; // Optional url to learn about the tea
  catID: number; // Category ID associated with the product
  active: boolean; // Whether the category should be displayed
  image: string; // Display banner of the category
  description: string; // Description of the category
  recWater: String; // Recommended water temperature
  recTemp: String; // Recommended brewing temperature
  recTime: String; // Recommended brewing time
  recTimes: String; // Recommended brewing times
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  nameCN: String,
  url: String,
  image: String,
  catID: Number,
  active: Boolean,
  description: String,
  recWater: String,
  recTemp: String,
  recTime: String,
  recTimes: String,
});

const Category = models.Category || model("Category", categorySchema);
export default Category;
