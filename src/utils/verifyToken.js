export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch (error) {
    throw new Error('Невалідний токен доступу');
  }
};
