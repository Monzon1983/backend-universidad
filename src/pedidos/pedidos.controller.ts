import { Request, Response } from "express";
import { PedidosRepository } from "./pedidos.repository.js";

const pedidosRepository = new PedidosRepository();

export class PedidosController {
  async crear(req: Request, res: Response) {
    try {
      const { usuarioId, items } = req.body;

      // Validaciones básicas de entrada
      if (!usuarioId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          error: "Datos incompletos. Se requiere 'usuarioId' y un array de 'items' (productoId y cantidad)."
        });
      }

      // Ejecutar la transacción del repositorio
      const nuevoPedido = await pedidosRepository.crearPedidoConDetalles(Number(usuarioId), items);

      return res.status(201).json({
        message: "Pedido creado con éxito y stock descontado correctamente.",
        data: nuevoPedido
      });

    } catch (error: any) {
      // Capturar los errores personalizados lanzados desde la transacción (stock insuficiente, producto no encontrado)
      if (error.message.includes("OUT_OF_STOCK") || error.message.includes("PRODUCT_NOT_FOUND")) {
        return res.status(400).json({ error: error.message });
      }

      // Error genérico de servidor
      console.error("Error al crear el pedido:", error);
      return res.status(500).json({ error: "Error interno del servidor al procesar el pedido." });
    }
  }
}