import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  email: { type: String, unique: true },
  name: { type: String, default: '' },
  password: { type: String, default: '' },
  role: { type: String, default: 'regular' },
}, { timestamps: true });

export const UserModel = mongoose.model('users', userSchema);
