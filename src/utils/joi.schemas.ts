import Joi from 'joi';

export const user = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': '"email" must be a string',
    'string.email': '"email" must be a valid email',
    'any.required': '"email" is required',
  }),
  name: Joi.string().min(3).required().messages({
    'string.base': '"name" must be a string',
    'string.min': '"name" length must be at least 3 characters long',
    'any.required': '"name" is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': '"password" must be a string',
    'string.min': '"password" length must be 6 characters long',
    'any.required': '"password" is required',
  }),
});

export const login = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': '"email" must be a string',
    'string.email': '"email" must be a valid email',
    'string.empty': '"email" is not allowed to be empty',
    'any.required': '"email" is required',
  }),
  password: Joi.string().required().messages({
    'string.base': '"password" must be a string',
    'string.empty': '"password" is not allowed to be empty',
    'any.required': '"password" is required',
  }),
});
