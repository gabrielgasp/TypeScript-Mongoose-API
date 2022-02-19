import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
  collection: 'users',
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
