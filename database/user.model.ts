import { AgeRange, Membership } from "@/types/auth";
import mongoose, { models } from "mongoose";

export interface IUser {
  _id: string;
  fname: string; // First Name
  lname: string; // Last Name
  age: AgeRange;
  email: string;
  password: string;
  admin: boolean; // Whether user is admin
  membership: Membership; // Determines discounts user recieves
  phone: string; // Phone number
  address: {
    line1: string;
    line2: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
  activated: boolean; // Whether the user has activated via email
  stripeCusId: string; // Stripe Customer ID
  regDate: Date; // Date of registration
  emailToken: string; // Token for user activation
  emailTokenExpires: Date; // Time when token expires
  resetToken: string; // Token for password reset
  resetTokenExpires: Date; // Time when reset token expires
}

const userSchema = new mongoose.Schema<IUser>({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  age: {
    type: String,
    enum: Object.values(AgeRange),
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  admin: { type: Boolean, default: false },
  membership: {
    type: String,
    enum: Object.values(Membership),
    default: Membership.Member,
  },
  phone: { type: String, required: true },
  address: {
    line1: String,
    line2: String,
    suburb: String,
    state: String,
    postcode: { type: String, required: true },
    country: String,
  },
  activated: { type: Boolean, default: false },
  stripeCusId: String,
  regDate: { type: Date, default: Date.now },
  emailToken: { type: String, unique: true, sparse: true },
  emailTokenExpires: { type: Date },
  resetToken: { type: String, unique: true, sparse: true },
  resetTokenExpires: { type: Date },
});

const User = models.User || mongoose.model<IUser>("User", userSchema);

export default User;
