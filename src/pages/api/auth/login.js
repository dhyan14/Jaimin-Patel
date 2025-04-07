import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

const SECRET_KEY = 'your-secret-key-here'; // In production, use environment variable
const ADMIN_USERNAME = 'dyn.me'; // Your provided username
const ADMIN_PASSWORD = 'dyn#12484'; // Your provided password

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    
    res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    }));

    return res.status(200).json({ message: 'Logged in successfully' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
}
