import argon from 'argon2';
import UserModel from '../models/user.model';
import { ILogin, IUser } from '../utils/interfaces';
import jwtGenerator from '../helpers/jwtGenerator';

export const createUser = async (userData: IUser) => {
  const { email, name, password } = userData;

  const hash = await argon.hash(password);

  const result = await UserModel.create({ email, name, password: hash }).catch((e) => {
    if (e.message.includes('duplicate key error')) return null;
  });

  return result ? { code: 201, data: { token: jwtGenerator({ email, name }) } }
    : { code: 409, data: { message: 'User already registered' } };
};

export const login = async (credentials: ILogin) => {
  const { email, password } = credentials;

  const user = await UserModel.findOne({ email });

  if (!user || !(await argon.verify(user.password, password))) {
    return { code: 400, data: { message: 'Invalid credentials' } };
  }

  return { code: 200, data: { token: jwtGenerator({ email: user.email, name: user.name }) } };
};

export const listUsers = async () => {
  const users = await UserModel.find({}, '-_id name email');

  return { code: 200, data: users };
};

export const getUserById = async (id: string) => {
  const user = await UserModel.findById(id, 'name email');

  return user ? { code: 200, data: user } : { code: 404, data: { message: 'User does not exist' } };
};
