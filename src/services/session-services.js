import Session from '../db/models/Session.js';

export const createSession = async (userId, { accessToken, refreshToken }) => {
  const now = new Date();
  try {
    const session = await Session.create({
      userId,
      accessToken,
      refreshToken,
      accessTokenLifeTime: new Date(now.getTime() + 60 * 60 * 1000),
      refreshTokenLifeTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    });
    return session;
  } catch (error) {
    throw error;
  }
};
