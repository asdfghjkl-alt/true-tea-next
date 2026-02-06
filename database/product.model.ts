import mongoose, { models, Schema } from "mongoose";
import { ICategory } from "./category.model";

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
  categoryId: ICategory;
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
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  year: String,
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  includeGST: { type: Boolean, default: true },
  unit: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  onShelf: { type: Boolean, default: true },
  entryDate: { type: Date, default: Date.now },
  images: [Schema.Types.Mixed],
  region: String,
  note: String,
});

productSchema.pre("save", async function () {
  // Generates slug if name modified or slug doesn't exist
  if (this.isModified("name") || !this.slug) {
    const slugName = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // Uses last 6 chars of the objectID to guarantee uniqueness
    const suffix = this._id.toString().substring(18);
    this.slug = `${slugName}-${suffix}`;
  }
});

const Product =
  models.Product || mongoose.model<IProductDB>("Product", productSchema);
export default Product;
