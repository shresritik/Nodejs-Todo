import Joi from "joi";
export const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(5)
    .required()
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be atleast 8 characters",
      "password.uppercase": "Password must have atlease one uppercase",
      "password.lowercase": "Password must have atlease one lowercase",
      "password.special": "Password must have atlease one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
}).options({
  stripUnknown: true,
});
export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().required().optional(),
  password: Joi.string()
    .min(5)
    .required()
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be atleast 8 characters",
      "password.uppercase": "Password must have atlease one uppercase",
      "password.lowercase": "Password must have atlease one lowercase",
      "password.special": "Password must have atlease one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
}).options({
  stripUnknown: true,
});
export const getUserByIdSchema = Joi.object({
  id: Joi.string().required(),
}).options({
  stripUnknown: true,
});
export const getUserByQuerySchema = Joi.object({
  q: Joi.string().optional().messages({
    "string.base": "query must start with q and must be string",
  }),
}).options({
  stripUnknown: true,
});
