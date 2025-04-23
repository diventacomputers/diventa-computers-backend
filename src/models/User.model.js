import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    maxlength: [50, 'El apellido no puede exceder los 50 caracteres']
  },
  documento: {
    type: Number,
    required: [true, 'El documento es obligatorio'],
    unique: true,
    min: [1000000, 'El documento debe tener al menos 7 dígitos'],
    max: [9999999999, 'El documento no puede exceder 10 dígitos']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
    select: false
  },
  direccion: {
    calle: String,
    ciudad: String,
    provincia: String,
    codigoPostal: String
  },
  telefono: {
    type: String,
    match: [/^[0-9]{10,15}$/, 'Por favor ingresa un teléfono válido (10-15 dígitos)']
  },
  role: {
    type: String,
    enum: ['cliente', 'tecnico', 'admin'],
    default: 'cliente'
  }
}, {
  timestamps: true
});

// Middleware para hashear la contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;