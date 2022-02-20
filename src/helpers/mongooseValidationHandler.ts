import { MongoError } from 'mongodb';
import { Error } from 'mongoose';
import { IValidationResponse } from '../utils/interfaces';

export default (err: unknown) => {
  if (err instanceof MongoError && err.message.includes('duplicate key error')) {
    return { code: 409, data: { error: 'User already registered' } };
  }

  if (err instanceof Error.ValidationError) {
    const response: IValidationResponse = { code: 400, data: {} };

    Object.values(err.errors).forEach((e) => {
      if (e instanceof Error.ValidatorError) {
        response.data[e.properties.path!] = e.properties.message;
      }
      if (e instanceof Error.CastError) {
        console.log(e);
        response.data[e.path] = `${e.path} must be a ${e.kind.toLowerCase()}`;
      }
    });

    return response;
  }

  throw err;
};
