import { hash } from 'argon2';
import mongoose from 'mongoose';
import { IUser } from '../utils/interfaces';

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
  collection: 'users',
});

userSchema.pre(/^(updateOne|save|findOneAndUpdate)/, async function () {
  // WHEN CREATING NEW USER
  if (this.password) {
    this.password = await hash(this.password);
    return;
  }

  // WHEN UPDATING USER
  if (this._update.password) {
    this._update.password = await hash(this._update.password);
  }
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
