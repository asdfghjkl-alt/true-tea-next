import Joi from "joi";

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
