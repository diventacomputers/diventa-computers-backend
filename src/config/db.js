import mongoose from 'mongoose';
import 'dotenv/config';

// Configuración de la conexión
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/diventadb';

// Opciones de conexión
const options = {
  autoIndex: true, // Solo en desarrollo
  serverSelectionTimeoutMS: 5000, // Tiempo de espera para conexión
};

// Conectar a MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, options);
    console.log('✅ Conectado a MongoDB');
    
    // Eventos de conexión
    mongoose.connection.on('connected', () => {
      console.log('Mongoose conectado a DB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Error de conexión:', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose desconectado');
    });
    
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1); // Salir si no hay conexión
  }
};

// Cerrar conexión limpiamente
export const closeDB = async () => {
  await mongoose.connection.close();
  console.log('Conexión a MongoDB cerrada');
};