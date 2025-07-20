import mongoose from 'mongoose';
import { emailValid, passwordValid } from '../../constants/users-constants.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: emailValid },
    password: { type: String, required: true, match: passwordValid },
  },
  { versionKey: false, timestamps: true },
);

const User = mongoose.model('User', userSchema);
export default User;
