import { Types } from 'mongoose';
import argon from 'argon2';
import UserModel from '../models/user.model';
import { ILogin, IUpdateUser, IUser } from '../utils/interfaces';
import jwtGenerator from '../helpers/jwtGenerator';
import mongooseValidationHandler from '../helpers/mongooseValidationHandler';

export const createUser = async (userData: IUser) => {
  const newUser = await UserModel.create(userData).catch((e) => mongooseValidationHandler(e));

  if ('code' in newUser) return { code: newUser.code, data: newUser.data };

  const token = jwtGenerator({ id: newUser._id, email: newUser.email, name: newUser.name });

  return { code: 201, data: { token } };
};

export const login = async (credentials: ILogin) => {
  const { email = '', password = '' } = credentials;

  const user = await UserModel.findOne({ email });

  if (!user || !(await argon.verify(user.password, password))) {
    return { code: 400, data: { message: 'Invalid login credentials' } };
  }

  const token = jwtGenerator({ id: user._id, email: user.email, name: user.name });

  return { code: 200, data: { token } };
};

export const listUsers = async () => {
  const users = await UserModel.find({}, '-_id name email');

  return { code: 200, data: users };
};

export const getUserById = async (id: string) => {
  const user = await UserModel.findById(id, 'name email');

  return user ? { code: 200, data: user } : { code: 404, data: { message: 'User does not exist' } };
};

export const searchUsersByName = async (name: string) => {
  const users = await UserModel.find({ name: new RegExp(name, 'i') }, '-_id name email');

  return { code: 200, data: users };
};

export const updateSelf = async (id: Types.ObjectId, data: IUpdateUser) => {
  const updateResponse = await UserModel.updateOne({ _id: id }, data)
    .catch((e) => mongooseValidationHandler(e));

  if ('code' in updateResponse) return { code: updateResponse.code, data: updateResponse.data };

  return { code: 200, data: { message: 'User successfully updated' } };
};

export const deleteSelf = async (id: Types.ObjectId) => {
  await UserModel.findByIdAndDelete(id);

  return { code: 200, data: { message: 'User successfully deleted' } };
};
