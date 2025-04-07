import { verify, sign } from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key-here'; // In production, use environment variable

export function generateToken(username) {
  return sign({ username }, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    return verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

export function withAuth(handler) {
  return async (req, res) => {
    try {
      const token = req.cookies.auth_token;
      
      if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  };
}
