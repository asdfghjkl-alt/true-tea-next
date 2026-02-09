import Joi from "joi";
import { AgeRange } from "@/types/auth";

export const productSchema = Joi.object({
  name: Joi.string().required().label("Name").messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  nameCN: Joi.string().required().label("Chinese Name").messages({
    "string.empty": "Chinese Name is required",
    "any.required": "Chinese Name is required",
  }),
  seqNr: Joi.number().required().label("Sequence Number").messages({
    "number.base": "Sequence Number must be a number",
    "any.required": "Sequence Number is required",
  }),
  price: Joi.number().greater(0).required().label("Price").messages({
    "number.greater": "Price must be greater than 0",
    "any.required": "Price is required",
    "number.base": "Price must be a number",
  }),
  category: Joi.string().required().label("Category").messages({
    "string.empty": "Category is required",
    "any.required": "Category is required",
  }),
  discount: Joi.number()
    .min(0)
    .max(100)
    .allow(0)
    .required()
    .label("Discount")
    .messages({
      "number.min": "Discount cannot be less than 0",
      "number.max": "Discount cannot be more than 100",
      "any.required": "Discount is required",
    }),
  includeGST: Joi.boolean().required().label("Include GST"),
  unit: Joi.string().required().label("Unit").messages({
    "string.empty": "Unit is required",
    "any.required": "Unit is required",
  }),
  stock: Joi.number().min(0).required().label("Stock").messages({
    "number.min": "Stock cannot be negative",
    "any.required": "Stock is required",
    "number.base": "Stock must be a number",
  }),
  onShelf: Joi.boolean().required().label("On Shelf"),
  region: Joi.string().allow("").label("Region"),
  year: Joi.string().allow("").label("Year"),
  note: Joi.string().allow("").label("Note"),
});

export const registerSchema = Joi.object({
  fname: Joi.string().required().messages({
    "string.empty": "First name cannot be blank",
    "any.required": "First name is required",
  }),
  lname: Joi.string().required().messages({
    "string.empty": "Last name cannot be blank",
    "any.required": "Last name is required",
  }),
  phone: Joi.string()
    .pattern(/^04\d{8}$/)
    .required()
    .messages({
      "string.empty": "Mobile number cannot be blank",
      "string.pattern.base":
        "Please enter a valid Australian mobile number starting with 04 (10 digits)",
      "any.required": "Mobile number is required",
    }),
  age: Joi.string()
    .valid(...Object.values(AgeRange))
    .required()
    .messages({
      "any.only": "Please select a valid age range",
      "string.empty": "Age range is required",
      "any.required": "Age range is required",
    }),
  postcode: Joi.string().required().messages({
    "string.empty": "Postcode cannot be blank",
    "any.required": "Postcode is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email cannot be blank",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password cannot be blank",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "any.required": "Confirm Password is required",
  }),
});

export const categorySchema = Joi.object({
  name: Joi.string().required().label("Name").messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  nameCN: Joi.string().required().label("Chinese Name").messages({
    "string.empty": "Chinese Name is required",
    "any.required": "Chinese Name is required",
  }),
  url: Joi.string().allow("").label("URL"),
  catID: Joi.number().required().label("Category ID").messages({
    "number.base": "Category ID must be a number",
    "any.required": "Category ID is required",
  }),
  active: Joi.boolean().default(true).label("Active"),
  description: Joi.string().allow("").label("Description"),
  recWater: Joi.string().allow("").label("Recommended Water"),
  recTemp: Joi.string().allow("").label("Recommended Temperature"),
  recTime: Joi.string().allow("").label("Recommended Time"),
  recTimes: Joi.string().allow("").label("Recommended Times"),
});
