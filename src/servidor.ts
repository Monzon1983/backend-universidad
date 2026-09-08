import app from './app.js';

const PORT = process.env.PORT || 3000;

// Evitamos que el servidor levante el puerto si lo estamos importando desde Vitest/Supertest
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
  });
}

export default app;