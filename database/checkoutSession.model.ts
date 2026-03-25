import { Schema, model, models } from "mongoose";
import { IOrderProduct, IUserDetails } from "./order.model";

export interface ICheckoutSession {
  paymentIntentId: string;
  cart: IOrderProduct[];
  buyer: IUserDetails;
  delivery: IUserDetails;
  owner_id: string;
  createdAt: Date;
}

const checkoutSessionProductSchema = new Schema<IOrderProduct>(
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

const userDetailsSchema = new Schema<IUserDetails>(
  {
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
  },
  { _id: false },
);

const checkoutSessionSchema = new Schema<ICheckoutSession>({
  paymentIntentId: { type: String, required: true, unique: true },
  cart: { type: [checkoutSessionProductSchema], required: true },
  buyer: {
    type: userDetailsSchema,
    required: true,
  },
  delivery: {
    type: userDetailsSchema,
    required: true,
  },
  owner_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "24h" },
});

const CheckoutSession =
  models.CheckoutSession ||
  model<ICheckoutSession>("CheckoutSession", checkoutSessionSchema);

export default CheckoutSession;
