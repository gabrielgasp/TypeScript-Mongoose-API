import { hash } from 'argon2';
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

userSchema.pre('save', async function () {
  this.password = await hash(this.password);
});

userSchema.pre('updateOne', async function () {
  if (this._update.password) this._update.password = await hash(this._update.password);
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
