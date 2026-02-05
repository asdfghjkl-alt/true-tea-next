import { AgeRange } from "@/types/auth";
import mongoose, { models } from "mongoose";

export interface IUser {
  _id: string;
  fname: string;
  lname: string;
  gender: string;
  age: AgeRange;
  email: string;
  password: string;
  admin: boolean;
  membership: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
  activated: boolean;
  stripeCusId: string;
  regDate: Date;
  emailToken: string;
  emailTokenExpires: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  fname: String,
  lname: String,
  gender: String,
  age: {
    type: String,
    enum: Object.values(AgeRange),
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  admin: { type: Boolean, default: false },
  membership: String,
  phone: String,
  address: {
    line1: String,
    line2: String,
    suburb: String,
    state: String,
    postcode: String,
    country: String,
  },
  activated: { type: Boolean, default: false },
  stripeCusId: String,
  regDate: Date,
  emailToken: String,
  emailTokenExpires: Date,
});

const User = models.User || mongoose.model<IUser>("User", userSchema);

export default User;
