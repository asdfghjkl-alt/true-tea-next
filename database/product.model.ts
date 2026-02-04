import mongoose, { models, Schema } from "mongoose";

interface IProductBase {
  _id: string;
  name: string;
  slug?: string;
  nameCN: string;
  seqNr: number;
  image: string;
  images: string[];
  price: number;
  discount: number;
  includeGST: boolean;
  unit: string;
  stock: number;
  onShelf: boolean;
  entryDate: Date;
  region: string;
  year: string;
  note: string;
}

export interface IProductDB extends IProductBase {
  categoryId: Schema.Types.ObjectId;
}

export interface IProduct extends IProductBase {
  categoryId: string;
}

const productSchema = new Schema<IProductDB>({
  name: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  nameCN: String,
  seqNr: Number,
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  year: String,
  price: Number,
  discount: Number,
  includeGST: { type: Boolean, default: true },
  unit: String,
  stock: Number,
  onShelf: { type: Boolean, default: true },
  entryDate: Date,
  image: String,
  images: [String],
  region: String,
  note: String,
});

const Product =
  models.Product || mongoose.model<IProductDB>("Product", productSchema);
export default Product;
