import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export const generateTokens = (id) => {
  const payload = { id };
  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};
