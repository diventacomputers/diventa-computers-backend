import { verifyToken } from '../utils/jwt.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('Acceso denegado. No se proporcionó token.');
    }

    const decoded = verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Autenticación fallida', message: error.message });
  }
};

export default auth;