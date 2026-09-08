import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import clientesRoutes from './clientes/clientes.routes.js';
import { pedidosRouter } from './pedidos/pedidos.routes.js';

const app = express();
app.use(express.json());

// Documentación Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/clientes', clientesRoutes);
app.use('/api/pedidos', pedidosRouter);

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