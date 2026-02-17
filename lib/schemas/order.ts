import Joi from "joi";
import { AgeRange } from "@/types/auth";
import { profileSchema } from "./profile";

export const userDetailsSchema = Joi.object({
  fname: Joi.string().required().messages({
    "string.empty": "First name cannot be blank",
    "any.required": "First name is required",
  }),
  lname: Joi.string().required().messages({
    "string.empty": "Last name cannot be blank",
    "any.required": "Last name is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email cannot be blank",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
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
  address: Joi.object({
    line1: Joi.string().required().messages({
      "string.empty": "Address Line 1 is required",
      "any.required": "Address Line 1 is required",
    }),
    line2: Joi.string().allow("").optional(),
    suburb: Joi.string().required().messages({
      "string.empty": "Suburb is required",
      "any.required": "Suburb is required",
    }),
    state: Joi.string().required().messages({
      "string.empty": "State is required",
      "any.required": "State is required",
    }),
    postcode: Joi.string().required().messages({
      "string.empty": "Postcode is required",
      "any.required": "Postcode is required",
    }),
    country: Joi.string().required().messages({
      "string.empty": "Country is required",
      "any.required": "Country is required",
    }),
  }).required(),
});

export const orderBackendSchema = profileSchema.keys({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email cannot be blank",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
  age: Joi.string()
    .valid(...Object.values(AgeRange))
    .allow("")
    .optional(),
  address: Joi.object({
    line1: Joi.string().required().messages({
      "string.empty": "Address Line 1 is required",
      "any.required": "Address Line 1 is required",
    }),
    line2: Joi.string().allow("").optional(),
    suburb: Joi.string().required().messages({
      "string.empty": "Suburb is required",
      "any.required": "Suburb is required",
    }),
    state: Joi.string().required().messages({
      "string.empty": "State is required",
      "any.required": "State is required",
    }),
    postcode: Joi.string().required().messages({
      "string.empty": "Postcode is required",
      "any.required": "Postcode is required",
    }),
    country: Joi.string().required().messages({
      "string.empty": "Country is required",
      "any.required": "Country is required",
    }),
  }).required(),
});
