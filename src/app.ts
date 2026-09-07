import express, { Request, Response, NextFunction } from 'express';
import clientesRoutes from './clientes/clientes.routes.js';

const app = express();
app.use(express.json());

app.use('/api/v1/clientes', clientesRoutes);

// Manejo de ruta desconocida (Punto 14)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware de errores global
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message });
});

export default app;