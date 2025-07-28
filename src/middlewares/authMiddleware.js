import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded.userId;
    req.sessionId = decoded.sessionId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
