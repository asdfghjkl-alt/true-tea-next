import mongoose from "mongoose";

export interface IProduct {
  _id: any;
  name: string;
  nameCN: string;
  seqNr: number;
  categoryId: string;
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

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameCN: String,
  seqNr: Number,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
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

const ProductModel = mongoose.model<IProduct>("Product", productSchema);
export default ProductModel;
