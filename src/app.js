import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
//import routes from './routes/index.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/products.routes.js';
//import errorHandler from './middlewares/errorHandler';

const app = express();

// Middlewares
app.use(cors({
  origin: [
    "https://diventacomputers.netlify.app", // dominio Netlify
    "http://localhost:3000" // Para desarrollo local
  ]
})); // Habilitar CORS para todas las rutas
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
//app.use('/api/v1', routes);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Ruta productos 
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API REST con Autenticación' });
});
// Manejo de errores
//app.use(errorHandler);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });
export default app;