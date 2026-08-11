import { createServer, IncomingMessage, ServerResponse } from "node:http";

const estudiantesMock = [
  { id: 1, nombre: "Ana García", carrera: "Programación" },
  { id: 2, nombre: "Carlos López", carrera: "Sistemas" },
  { id: 42, nombre: "Mauro Monzón", carrera: "Programación" }
];

const puerto = Number(process.env.PORT ?? 3000);

const enviarRespuesta = (respuesta: ServerResponse, statusCode: number, data: object) => {
  respuesta.writeHead(statusCode);
  respuesta.end(JSON.stringify(data));
};

const servidor = createServer((solicitud: IncomingMessage, respuesta: ServerResponse) => {
  respuesta.setHeader("Content-Type", "application/json; charset=utf-8");

  const metodo = solicitud.method;
  const url = solicitud.url || "/";

  if (metodo === "GET" && url === "/salud") {
    return enviarRespuesta(respuesta, 200, {
      estado: "ok",
      fecha: new Date().toISOString()
    });
  }

  if (metodo === "GET" && url === "/hora") {
    return enviarRespuesta(respuesta, 200, {
      hora: new Date().toLocaleTimeString('es-AR')
    });
  }

  if (metodo === "GET" && url.startsWith("/estudiantes/")) {
    const partesUrl = url.split("/");
    const idParametro = partesUrl[2];

    if (partesUrl.length !== 3 || !idParametro) {
      return enviarRespuesta(respuesta, 400, { error: "Formato de URL inválido" });
    }

    const idBuscado = parseInt(idParametro, 10);

    if (isNaN(idBuscado)) {
      return enviarRespuesta(respuesta, 400, { error: "El ID debe ser un número entero" });
    }

    const estudiante = estudiantesMock.find(e => e.id === idBuscado);

    if (estudiante) {
      return enviarRespuesta(respuesta, 200, estudiante);
    } else {
      return enviarRespuesta(respuesta, 404, { error: `Estudiante con id ${idBuscado} no encontrado` });
    }
  }

  return enviarRespuesta(respuesta, 404, { error: "Recurso no encontrado" });
});

servidor.listen(puerto, () => {
  console.log(`Servidor disponible en http://localhost:${puerto}`);
});
