import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
//import routes from './routes/index.js';
import productRoutes from './routes/products.routes.js';
//import errorHandler from './middlewares/errorHandler';

const app = express();

// Middlewares
app.use(cors()); // URL de tu frontend
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
//app.use('/api/v1', routes);
// Ruta productos 
app.use('/api/products', productRoutes);
// Manejo de errores
//app.use(errorHandler);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });
export default app;