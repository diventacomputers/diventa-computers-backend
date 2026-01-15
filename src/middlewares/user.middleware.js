import { AppError } from '../utils/errorHandler.js';
import { findUserByEmail } from '../services/user.service.js';

export const checkDuplicateEmailOrDocument = async (req, res, next) => {
  const { email, documento } = req.body;
  
  if (email) {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return next(new AppError('El email ya está en uso', 400));
    }
  }
  
  if (documento) {
    const existingUser = await User.findOne({ documento });
    if (existingUser) {
      return next(new AppError('El documento ya está registrado', 400));
    }
  }
  
  next();
};

export const validateUserData = (req, res, next) => {
  const { nombre, apellido, documento } = req.body;
  
  if (!nombre || !apellido || !documento) {
    return next(new AppError('Nombre, apellido y documento son obligatorios', 400));
  }
  
  if (documento.toString().length < 7) {
    return next(new AppError('El documento debe tener al menos 7 dígitos', 400));
  }
  
  next();
};

export const prepareUserUpdate = (req, res, next) => {
  const allowedFields = ['nombre', 'apellido', 'direccion', 'telefono'];
  const filteredBody = {};
  
  Object.keys(req.body).forEach(field => {
    if (allowedFields.includes(field)) {
      filteredBody[field] = req.body[field];
    }
  });
  
  if (Object.keys(filteredBody).length === 0) {
    return next(new AppError('No hay campos válidos para actualizar', 400));
  }
  
  req.filteredBody = filteredBody;
  next();
};