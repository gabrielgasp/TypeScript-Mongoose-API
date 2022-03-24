import { Types } from 'mongoose';
import argon from 'argon2';
import UserModel from '../models/user.model';
import { ILogin, IUpdateUser, IUser } from '../utils/interfaces';
import jwtGenerator from '../helpers/jwtGenerator';

export const createUser = async (userData: IUser) => {
  const newUser = await UserModel.create(userData).catch((e) => {
    if (e.message.includes('duplicate key error')) return null;
  });

  if (!newUser) return { code: 409, data: { message: 'This email is already registered' } };

  const token = jwtGenerator({ id: newUser._id, email: newUser.email, name: newUser.name });

  return { code: 201, data: { token } };
};

export const login = async (credentials: ILogin) => {
  const { email = '', password = '' } = credentials;

  const user = await UserModel.findOne({ email });

  if (!user || !(await argon.verify(user.password, password))) {
    return { code: 401, data: { message: 'Invalid login credentials' } };
  }

  const token = jwtGenerator({ id: user._id, email: user.email, name: user.name });

  return { code: 200, data: { token } };
};

export const listUsers = async () => {
  const users = await UserModel.find({}, '_id name email');

  const data = users.map((user) => ({ id: user._id, name: user.name, email: user.email }));

  return { code: 200, data };
};

export const getUserById = async (id: string) => {
  const user = await UserModel.findById(id, '-_id name email')
    .catch((e) => {
      if (e.message.includes('Cast to ObjectId failed')) return null;
      throw e;
    });

  return user ? { code: 200, data: user } : { code: 404, data: { message: 'User does not exist' } };
};

export const searchUsersByName = async (name: string) => {
  const users = await UserModel.find({ name: new RegExp(name, 'i') }, '_id name email');

  const data = users.map((user) => ({ id: user._id, name: user.name, email: user.email }));

  return { code: 200, data };
};

export const updateSelf = async (id: Types.ObjectId, data: IUpdateUser) => {
  const updateResponse = await UserModel.findByIdAndUpdate(id, data).catch((e) => {
    if (e.message.includes('duplicate key error')) return 'conflict';
  });

  if (!updateResponse) {
    return {
      code: 401,
      data: { message: 'There is a problem with your authentication, please log in again' },
    };
  }

  if (updateResponse === 'conflict') {
    return { code: 409, data: { message: 'This email is already registered' } };
  }

  return { code: 200, data: { message: 'User successfully updated' } };
};

export const deleteSelf = async (id: Types.ObjectId) => {
  await UserModel.findByIdAndDelete(id);

  return { code: 200, data: { message: 'User successfully deleted' } };
};
