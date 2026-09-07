import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('Pruebas de Endpoints CRUD - Clientes (Ejercicio 14)', () => {
  let clienteId: number;

  it('Crear con datos válidos -> 201 y recurso creado', async () => {
    const res = await request(app)
      .post('/api/v1/clientes')
      .send({ nombre: 'Mauro Monzon', email: 'mauro@test.com' });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nombre).toBe('Mauro Monzon');
    
    // Guardamos el ID autogenerado para usarlo en el test de búsqueda
    clienteId = res.body.id; 
  });

  it('Crear sin título (nombre) -> 422', async () => {
    const res = await request(app)
      .post('/api/v1/clientes')
      .send({ email: 'sin-nombre@test.com' });
    
    expect(res.statusCode).toBe(422);
    expect(res.body.error).toBe('Falta título (nombre)');
  });

  it('Consultar ID existente -> 200', async () => {
    const res = await request(app).get(`/api/v1/clientes/${clienteId}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Mauro Monzon');
  });

  it('Consultar ID inexistente -> 404', async () => {
    const res = await request(app).get('/api/v1/clientes/9999');
    
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('No encontrado');
  });

  it('Consultar ID inválido -> 400', async () => {
    const res = await request(app).get('/api/v1/clientes/abc');
    
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('ID inválido');
  });

  it('Invocar ruta desconocida -> 404', async () => {
    const res = await request(app).get('/api/v1/ruta-inventada-que-no-existe');
    
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Ruta no encontrada');
  });
});