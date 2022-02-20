import { hash } from 'argon2';
import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { IUser } from '../utils/interfaces';

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, '"email" is required'],
    unique: true,
    lowercase: true,
    validate: [isEmail, '"email" must be a valid email'],
  },
  name: {
    type: String,
    minlength: [3, '"name" must be at least 3 characters long'],
    required: [true, '"name" is required'],
  },
  password: {
    type: String,
    minlength: [6, '"password" must be at least 6 characters long'],
    required: [true, '"password" is required'],
  },
}, {
  timestamps: true,
  collection: 'users',
});

userSchema.pre('save', async function () {
  this.password = await hash(this.password);
});

userSchema.pre('updateOne', async function () {
  if (this._update.password) this._update.password = await hash(this._update.password);
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
