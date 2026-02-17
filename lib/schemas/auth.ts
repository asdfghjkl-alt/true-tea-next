import Joi from "joi";
import { AgeRange } from "@/types/auth";

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

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Current password is required",
    "any.required": "Current password is required",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 6 characters",
    "any.required": "New password is required",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords must match",
      "string.empty": "Please confirm your new password",
      "any.required": "Please confirm your new password",
    }),
});
