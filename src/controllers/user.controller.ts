import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import * as UserServices from '../services/user.service';

const joiSchema = Joi.object({
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

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = joiSchema.validate(req.body);

    if (error) return res.status(400).json({ message: error.message });

    const { code, data } = await UserServices.createUser(req.body);

    return res.status(code).json(data);
  } catch (e) {
    return next(e);
  }
};
