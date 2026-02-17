import Joi from "joi";
import { AgeRange } from "@/types/auth";

export const profileSchema = Joi.object({
  fname: Joi.string().required().label("First Name").messages({
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),
  lname: Joi.string().required().label("Last Name").messages({
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  phone: Joi.string()
    .pattern(/^04\d{8}$/)
    .required()
    .label("Phone")
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base":
        "Please enter a valid Australian mobile number starting with 04 (10 digits)",
      "any.required": "Phone number is required",
    }),
  age: Joi.string()
    .valid(...Object.values(AgeRange))
    .required()
    .messages({
      "any.only": "Please select a valid age range",
      "string.empty": "Age range is required",
      "any.required": "Age range is required",
    }),
  address: Joi.object({
    line1: Joi.string().optional().allow("").label("Address Line 1"),
    line2: Joi.string().optional().allow("").label("Address Line 2"),
    suburb: Joi.string().optional().allow("").label("Suburb"),
    state: Joi.string().optional().allow("").label("State"),
    postcode: Joi.string().required().label("Postcode").messages({
      "string.empty": "Postcode is required",
      "any.required": "Postcode is required",
    }),
    country: Joi.string().default("Australia").label("Country"),
  }).optional(),
});
