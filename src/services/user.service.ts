/* eslint-disable import/prefer-default-export */
import argon from 'argon2';
import UserModel from '../models/user.model';
import { IUser } from '../interfaces';
import jwtGenerator from '../utils/jwtGenerator';

export const createUser = async (userData: IUser) => {
  const { email, name, password } = userData;

  const hash = await argon.hash(password);

  const result = await UserModel.create({ email, name, password: hash }).catch((e) => {
    if (e.message.includes('duplicate key error')) return null;
  });

  return result ? { code: 201, data: { token: jwtGenerator({ email, name }) } }
    : { code: 409, data: { message: 'User already registered' } };
};
