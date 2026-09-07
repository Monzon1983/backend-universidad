import { ClientesRepository } from './clientes.repository.js';

export class ClientesService {
  constructor(private readonly repository: ClientesRepository) {}

  async crear(datos: any) {
    if (!datos.nombre) {
      const error: any = new Error('Falta título (nombre)');
      error.statusCode = 422;
      throw error;
    }
    return await this.repository.crear(datos.nombre, datos.email);
  }

  async buscarPorId(idParam: any) {
    const id = Number(idParam);
    if (isNaN(id)) {
      const error: any = new Error('ID inválido');
      error.statusCode = 400;
      throw error;
    }

    const cliente = await this.repository.buscarPorId(id);
    if (!cliente) {
      const error: any = new Error('No encontrado');
      error.statusCode = 404;
      throw error;
    }

    return cliente;
  }
}