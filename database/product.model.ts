import mongoose, { models, Schema } from "mongoose";

export interface IImage {
  url: string; // URL of the image
  filename: string; // Name of the image file
  size: number; // Size of the image in bytes
}

interface IProductBase {
  _id: string;
  name: string;
  slug?: string; // Auto-generated from name for SEO
  nameCN: string; // Chinese name
  seqNr: number; // Order in which product should be displayed
  images: (IImage | string)[]; // Array of image objects or image URLs
  price: number; // Price of the product
  discount: number; // Discount percentage
  includeGST: boolean; // Whether the price includes GST
  unit: string; // Unit of measurement
  stock: number; // Stock quantity
  onShelf: boolean; // Whether the product is on the shelf
  entryDate: Date; // Date the product was added
  region: string; // Region of origin
  year: string; // Year of production
  note: string; // Additional notes
}

export interface ProductFormData {
  name: string;
  nameCN: string;
  seqNr: number;
  price: number;
  discount: number;
  includeGST: boolean;
  unit: string;
  category: string;
  stock: number;
  onShelf: boolean;
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

const imageSchema = new Schema<IImage>({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  size: { type: Number, required: true },
});

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
  entryDate: { type: Date, default: Date.now },
  images: [Schema.Types.Mixed],
  region: String,
  note: String,
});

const Product =
  models.Product || mongoose.model<IProductDB>("Product", productSchema);
export default Product;
