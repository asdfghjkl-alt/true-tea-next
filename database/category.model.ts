import { Schema, model, models } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  nameCN: string;
  url: string;
  catID: number;
  active: boolean;
  image: string;
  description: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  recWater: String;
  recTemp: String;
  recTime: String;
  recTimes: String;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  nameCN: String,
  url: String,
  image: String,
  catID: Number,
  active: Boolean,
  description: String,
  p1: String,
  p2: String,
  p3: String,
  p4: String,
  p5: String,
  recWater: String,
  recTemp: String,
  recTime: String,
  recTimes: String,
});

const Category = models.Category || model("Category", categorySchema);
export default Category;
