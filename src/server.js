import { connectDB } from './config/db.js';
import app from './app.js';
import { closeDB } from './config/db.js';

// Configuración directa del puerto
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor DiventaComputers corriendo en http://localhost:${PORT}`);
    });

    // Manejo de cierre
    process.on('SIGINT', async () => {
      await closeDB();
      console.log('Servidor apagado');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();