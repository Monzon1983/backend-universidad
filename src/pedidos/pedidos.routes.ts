import { Router } from "express";
import { PedidosController } from "./pedidos.controller.js";

const router = Router();
const pedidosController = new PedidosController();

/**
 * @openapi
 * /api/pedidos:
 *   post:
 *     summary: Crea un nuevo pedido con control de stock atómico
 *     description: Ejecuta una transacción ACID validando la existencia del usuario y el stock disponible de los productos solicitados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoInput'
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente y stock actualizado.
 *       400:
 *         description: Error de validación, usuario no encontrado, producto inexistente o stock insuficiente (OUT_OF_STOCK).
 */
// Ruta POST para crear el pedido (ej: /api/pedidos)
router.post("/", pedidosController.crear);

export const pedidosRouter = router;