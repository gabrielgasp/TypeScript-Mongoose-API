import { Types } from 'mongoose';

export interface IUser {
  email: string;
  name: string;
  password: string;
}

export interface IUpdateUser {
  email?: string;
  name?: string;
  password?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ITokenData {
  id: Types.ObjectId;
  email: string;
  name: string;
}

export interface IValidationResponse {
  code: number;
  data: {[k: string]: string}
}
