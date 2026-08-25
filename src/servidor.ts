import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { obtenerEstudiantes, crearEstudiante, type Estudiante } from "./estudiantes.ts";

const estudiantesMock: Estudiante[] = [
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
  const urlCompleta = new URL(solicitud.url || "/", `http://localhost:${puerto}`);
  const ruta = urlCompleta.pathname;

  if (metodo === "GET" && ruta === "/salud") {
    return enviarRespuesta(respuesta, 200, {
      estado: "ok",
      fecha: new Date().toISOString()
    });
  }

  if (metodo === "GET" && ruta === "/estudiantes") {
    const carreraParam = urlCompleta.searchParams.get("carrera") ?? undefined;
    const resultado = obtenerEstudiantes(estudiantesMock, carreraParam);
    return enviarRespuesta(respuesta, 200, resultado);
  }

  if (metodo === "POST" && ruta === "/estudiantes") {
    let cuerpo = "";

    solicitud.on("data", (trozo) => {
      cuerpo += trozo;
    });

    solicitud.on("end", () => {
      try {
        const datos = JSON.parse(cuerpo || "{}");
        const nuevoEstudiante = crearEstudiante(estudiantesMock, datos);
        return enviarRespuesta(respuesta, 201, nuevoEstudiante);
      } catch (error: any) {
        return enviarRespuesta(respuesta, 400, { error: error.message || "JSON inválido" });
      }
    });

    return;
  }

  if (metodo === "GET" && ruta.startsWith("/estudiantes/")) {
    const partesUrl = ruta.split("/");
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