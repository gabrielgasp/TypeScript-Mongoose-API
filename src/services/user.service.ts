import { Types } from 'mongoose';
import argon from 'argon2';
import UserModel from '../models/user.model';
import { ILogin, IUpdateUser, IUser } from '../utils/interfaces';
import jwtGenerator from '../helpers/jwtGenerator';

export const createUser = async (userData: IUser) => {
  const { email, name, password } = userData;

  const hash = await argon.hash(password);

  const newUser = await UserModel.create({ email, name, password: hash }).catch((e) => {
    if (e.message.includes('duplicate key error')) return null;
  });

  if (!newUser) return { code: 409, data: { message: 'User already registered' } };

  const token = jwtGenerator({ id: newUser._id, email, name });

  return { code: 201, data: { token } };
};

export const login = async (credentials: ILogin) => {
  const { email, password } = credentials;

  const user = await UserModel.findOne({ email });

  if (!user || !(await argon.verify(user.password, password))) {
    return { code: 400, data: { message: 'Invalid credentials' } };
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
  const { password } = data;

  if (password) {
    const hash = await argon.hash(password);
    await UserModel.findByIdAndUpdate(id, { ...data, password: hash }, { new: true });
  } else {
    await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  return { code: 200, data: { message: 'User successfully updated' } };
};

export const deleteSelf = async (id: Types.ObjectId) => {
  await UserModel.findByIdAndDelete(id);

  return { code: 200, data: { message: 'User successfully deleted' } };
};
