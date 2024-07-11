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
  q: Joi.string().required().messages({
    "string.base": "query must be name",
  }),
});
