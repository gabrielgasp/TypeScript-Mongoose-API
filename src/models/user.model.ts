import mongoose from 'mongoose';
import { IUser } from '../utils/interfaces';

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
  collection: 'users',
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
