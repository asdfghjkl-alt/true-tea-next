import Joi from "joi";
import { AgeRange } from "@/types/auth";
import { Membership } from "@/types/auth";

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
