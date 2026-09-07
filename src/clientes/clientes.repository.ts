import db from '../config/database.js';

export interface Cliente {
  id?: number;
  nombre: string;
  email: string;
}

export class ClientesRepository {
  async crear(nombre: string, email: string): Promise<Cliente> {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO clientes (nombre, email) VALUES (?, ?)`, [nombre, email], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, nombre, email });
      });
    });
  }

  async buscarPorId(id: number): Promise<Cliente | undefined> {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM clientes WHERE id = ?`, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row as Cliente);
      });
    });
  }
}