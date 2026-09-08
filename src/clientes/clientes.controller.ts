import { Request, Response, NextFunction } from 'express';
import { ClientesService } from './clientes.service.js';

export class ClientesController {
  constructor(private readonly service: ClientesService) {}

  crear = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cliente = await this.service.crear(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      next(error);
    }
  };

  buscarPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cliente = await this.service.buscarPorId(req.params.id);
      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  };
}