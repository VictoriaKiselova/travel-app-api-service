import User from '../db/models/User.js';
import Session from '../db/models/Session.js';
import { hashString } from '../utils/hash.js';

export const signup = async (data) => {
  const { password } = data;
  const hashPassword = await hashString(password, 10);
  return await User.create({ ...data, password: hashPassword });
};

export const existingUser = async (email) => {
  return await User.findOne({ email });
};

export const findSessionByToken = async (refreshToken) => {
  return await Session.findOne({ refreshToken });
};

export const deletedSession = async (refreshToken) => {
  return await Session.findOneAndDelete({ refreshToken });
};
