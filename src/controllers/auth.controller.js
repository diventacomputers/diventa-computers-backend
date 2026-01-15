import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.js';

const register = async (req, res) => {
  try {
    const { nombre, apellido, documento, email, password, direccion, telefono, role } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ $or: [{ email }, { documento }] });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'El email o documento ya está en uso',
        details: {
          email: existingUser.email === email ? 'Email ya registrado' : undefined,
          documento: existingUser.documento === documento ? 'Documento ya registrado' : undefined
        }
      });
    }

    const user = new User({
      nombre,
      apellido,
      documento,
      email,
      password,
      direccion,
      telefono,
      role: role || 'cliente'
    });

    await user.save();
    
    // Generar token
    const token = generateToken(user._id);
    
    res.status(201).json({ 
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        role: user.role
      },
      token 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al registrar usuario', 
      message: error.message,
      details: error.errors 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken(user._id);
    
    res.json({ 
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        role: user.role
      },
      token 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al iniciar sesión', 
      message: error.message 
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener perfil', 
      message: error.message 
    });
  }
};

export { register, login, getMe };