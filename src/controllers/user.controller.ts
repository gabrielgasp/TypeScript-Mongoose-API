import { NextFunction, Request, Response } from 'express';
import * as UserServices from '../services/user.service';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await UserServices.createUser(req.body);

    return res.status(code).json(data);
  } catch (e) {
    return next(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await UserServices.login(req.body);

    return res.status(code).json(data);
  } catch (e) {
    return next(e);
  }
};

export const listUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await UserServices.listUsers();

    return res.status(code).json(data);
  } catch (e) {
    return next(e);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await UserServices.getUserById(req.params.id);

    return res.status(code).json(data);
  } catch (e) {
    return next(e);
  }
};

export const searchUsersByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.query.name ? req.query.name as string : '';

    const { code, data } = await UserServices.searchUsersByName(name);

    return res.status(code).json(data);
  } catch (e) {
    return next(e);
  }
};

export const updateSelf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await UserServices.updateSelf(req.tokenData!.id, req.body);

    return res.status(code).json(data);
  } catch (e) {
    return next(e);
  }
};

export const deleteSelf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await UserServices.deleteSelf(req.tokenData!.id);

    return res.status(code).json(data);
  } catch (e) {
    return next(e);
  }
};
