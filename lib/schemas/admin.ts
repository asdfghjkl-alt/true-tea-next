import Joi from "joi";
import { Membership } from "@/types/auth";

export const adminUserUpdateSchema = Joi.object({
  address: Joi.object({
    line1: Joi.string().allow("").optional(),
    line2: Joi.string().allow("").optional(),
    suburb: Joi.string().allow("").optional(),
    state: Joi.string().allow("").optional(),
    postcode: Joi.string().allow("").optional(),
  }).optional(),
  membership: Joi.string()
    .valid(...Object.values(Membership))
    .required()
    .messages({
      "any.only": "Invalid membership value",
      "any.required": "Membership is required",
    }),
  admin: Joi.boolean().required().messages({
    "any.required": "Admin status is required",
  }),
  activated: Joi.boolean().required().messages({
    "any.required": "Activated status is required",
  }),
});
