import { OrderStatus } from "@/types/order";
import { Schema, model, models } from "mongoose";

export interface IOrderProduct {
  product_id: Schema.Types.ObjectId;
  name: string;
  imageUrl: string;
  nameCN: string;
  price: number;
  discount: number;
  GST: number;
  unit: string;
  quantity: number;
}

export interface IOrderProductFrontend {
  product_id: string;
  name: string;
  imageUrl: string;
  nameCN: string;
  price: number;
  discount: number;
  includeGST: boolean;
  unit: string;
  quantity: number;
}

export interface IUserDetails {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
}

export interface IOrder {
  owner_id: string;
  productList: IOrderProduct[];
  buyer: IUserDetails;
  delivery: IUserDetails;
  postage: number;
  discountTotal: number;
  orderTotal: number;
  GSTTotal: number;
  paymentId: string;
  paymentMethod: string;
  receipt: string;
  receiptUrl: string;
  status: OrderStatus;
  paidDate: Date;
  deliveredDate: Date | null;
  note: string;
}

const orderProductSchema = new Schema<IOrderProduct>(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    nameCN: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    GST: { type: Number, required: true },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

const userDetailsSchema = new Schema<IUserDetails>({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String, required: false },
    suburb: { type: String, required: true },
    state: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true },
  },
});

const orderSchema = new Schema<IOrder>({
  owner_id: { type: String, required: true },
  productList: { type: [orderProductSchema], required: true },
  buyer: {
    type: userDetailsSchema,
    required: true,
  },
  delivery: {
    type: userDetailsSchema,
    required: true,
  },
  postage: { type: Number, required: true },
  discountTotal: { type: Number, required: true },
  orderTotal: { type: Number, required: true },
  GSTTotal: { type: Number, required: true },
  paymentId: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  receipt: { type: String, required: true },
  receiptUrl: { type: String, required: false }, // URL to Stripe receipt
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.paid,
  },
  paidDate: { type: Date, required: true },
  deliveredDate: { type: Date, required: false },
  note: { type: String, required: false },
});

const Order = models.Order || model<IOrder>("Order", orderSchema);

export default Order;
