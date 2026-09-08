import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Universidad - Sistema de Pedidos',
      version: '1.0.0',
      description: 'Documentación oficial de la API para la gestión de pedidos y control de stock atómico con Prisma ORM.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desarrollo',
      },
    ],
    components: {
      schemas: {
        ItemPedido: {
          type: 'object',
          required: ['productoId', 'cantidad'],
          properties: {
            productoId: {
              type: 'integer',
              example: 1,
            },
            cantidad: {
              type: 'integer',
              example: 2,
            },
          },
        },
        PedidoInput: {
          type: 'object',
          required: ['usuarioId', 'items'],
          properties: {
            usuarioId: {
              type: 'integer',
              example: 1,
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ItemPedido',
              },
            },
          },
        },
      },
    },
  },
  // Rutas donde swagger-jsdoc va a buscar los comentarios JSDoc con anotaciones OpenAPI
  apis: ['./src/pedidos/*.ts', './src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);