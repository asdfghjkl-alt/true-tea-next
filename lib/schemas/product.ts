import Joi from "joi";

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

export const productEditSchema = Joi.object({
  name: Joi.string().required(),
  nameCN: Joi.string().allow("", null),
  category: Joi.string().required(),
  seqNr: Joi.number().optional(),
  price: Joi.number().min(0).required(),
  discount: Joi.number().min(0).max(100).optional(),
  includeGST: Joi.boolean().optional(),
  unit: Joi.string().required(),
  stock: Joi.number().min(0).required(),
  onShelf: Joi.boolean().optional(),
  region: Joi.string().allow("", null),
  year: Joi.string().allow("", null),
  note: Joi.string().allow("", null),
  imageOrder: Joi.string().optional(), // JSON string
});
