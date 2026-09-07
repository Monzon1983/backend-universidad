import { Router } from 'express';
import { ClientesRepository } from './clientes.repository.js';
import { ClientesService } from './clientes.service.js';
import { ClientesController } from './clientes.controller.js';

const router = Router();
const repository = new ClientesRepository();
const service = new ClientesService(repository);
const controller = new ClientesController(service);

router.post('/', controller.crear);
router.get('/:id', controller.buscarPorId);

export default router;