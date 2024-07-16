import Joi from "joi";
import { STATUS } from "../enum";
const checkStatus = (value: STATUS, helpers: Joi.CustomHelpers) => {
  const lowerValue = value.toLowerCase();
  if (
    lowerValue !== STATUS.ONGOING &&
    lowerValue !== STATUS.INCOMPLETE &&
    lowerValue !== STATUS.COMPLETE
  ) {
    return helpers.error("status.base");
  }
  return value;
};
export const createTodoSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name of task is required",
    "string.base": "Name must be string",
  }),
  status: Joi.string()
    .required()
    .messages({
      "any.required": "Status of task is required",
      "string.base": "Status must be string",
      "status.base": "Status must be either ongoing,incomplete or complete",
    })
    .custom(checkStatus),
});
export const updateTodoSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.base": "Name must be string",
  }),
  status: Joi.string()
    .optional()
    .messages({
      "string.base": "Status must be string",
      "status.base": "Status must be either ongoing,incomplete or complete",
    })
    .custom(checkStatus),
});
export const getTodoByIdSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "id must be number",
  }),
});
export const getTodoByQuerySchema = Joi.object({
  q: Joi.string().optional().messages({
    "string.base": "query must be name",
  }),

  page: Joi.number()
    .min(1)
    .optional()
    .messages({
      "number.base": "page must be number",
      "number.min": "page must be greater than 0",
    })
    .default(1),
  size: Joi.number()
    .min(1)
    .max(10)
    .optional()
    .messages({
      "number.base": "size must be number",
      "number.min": "size must be greater than 0",
      "number.max": "size must be less than 11",
    })
    .default(10),
});
