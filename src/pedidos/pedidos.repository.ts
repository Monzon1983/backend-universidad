import { prisma } from "../config/prisma.js";

export class PedidosRepository {
  async crearPedidoConDetalles(usuarioId: number, items: { productoId: number; cantidad: number }[]) {
    // La transacción asegura ACID: si algo falla, se hace ROLLBACK automático
    return await prisma.$transaction(async (tx) => {
      let precioTotal = 0;
      const detallesData = [];

      for (const item of items) {
        // 1. Buscar el producto para validar stock actual
        const producto = await tx.producto.findUnique({
          where: { id: item.productoId },
        });

        if (!producto) {
          throw new Error(`PRODUCT_NOT_FOUND: El producto con ID ${item.productoId} no existe.`);
        }

        if (producto.stock < item.cantidad) {
          throw new Error(`OUT_OF_STOCK: Stock insuficiente para el producto ${producto.nombre}. Stock actual: ${producto.stock}`);
        }

        // 2. Descontar inventario
        await tx.producto.update({
          where: { id: item.productoId },
          data: { stock: producto.stock - item.cantidad },
        });

        const subtotal = producto.precio * item.cantidad;
        precioTotal += subtotal;

        detallesData.push({
          productoId: item.productoId,
          cantidad: item.cantidad,
          subtotal,
        });
      }

      // 3. Crear el pedido definitivo con sus detalles asociados
      const nuevoPedido = await tx.pedido.create({
        data: {
          usuarioId,
          precioTotal,
          detallesPedido: {
            create: detallesData,
          },
        },
        include: {
          detallesPedido: true,
        },
      });

      return nuevoPedido;
    });
  }
}