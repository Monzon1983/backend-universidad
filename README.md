# Backend Universidad

Proyecto de servidor HTTP básico utilizando el módulo nativo de Node.js (`node:http`) y TypeScript. 
Nota de autoría: Definí la lógica de los requerimientos y utilicé IA como asistente para la generación y estructuración del código.

## Ejecución y Pruebas

1. Instalar dependencias: `npm install`
2. Ejecutar en desarrollo: `npm run dev`
3. Ejecutar tests unitarios (Vitest / TDD): `npx vitest run`
4. Compilar a JS: `npm run build`

## Endpoints Disponibles

| Método | Endpoint | Descripción | Status Esperado |
| :--- | :--- | :--- | :--- |
| `GET` | `/salud` | Verificación de estado del servidor | `200 OK` |
| `GET` | `/hora` | Devuelve la hora local del servidor | `200 OK` |
| `GET` | `/estudiantes` | Lista todos los estudiantes registrados | `200 OK` |
| `GET` | `/estudiantes?carrera=Programación` | Filtra estudiantes por carrera | `200 OK` |
| `GET` | `/estudiantes/:id` | Busca un estudiante por su ID numérico | `200 OK` / `404 Not Found` |
| `POST` | `/estudiantes` | Crea un nuevo estudiante (`{ nombre, carrera }`) | `201 Created` / `400 Bad Request` |

## Casos de Prueba (cURL / PowerShell)

- Salud: `curl -i http://localhost:3000/salud`
- Hora: `curl -i http://localhost:3000/hora`
- Listar todos: `curl -i http://localhost:3000/estudiantes`
- Filtrar por carrera: `curl -i "http://localhost:3000/estudiantes?carrera=Programaci%C3%B3n"`
- Estudiante existente: `curl -i http://localhost:3000/estudiantes/42`
- Estudiante inexistente (404): `curl -i http://localhost:3000/estudiantes/999`
- Ruta inexistente (404): `curl -i http://localhost:3000/ruta-inexistente`
- Crear estudiante (POST): `Invoke-RestMethod -Uri "http://localhost:3000/estudiantes" -Method Post -ContentType "application/json; charset=utf-8" -Body '{"nombre": "Esteban Quito", "carrera": "Redes"}'`

## Diagrama del ciclo Solicitud-Respuesta

Cliente (Navegador/cURL/Postman)                Servidor (Node.js)
       |                                                |
       | --- 1. Solicitud HTTP GET / POST ------------> |
       |     (URL: /estudiantes, Body / Params)         |
       |                                                |
       |                                                |--> Procesa método y ruta
       |                                                |--> Ejecuta lógica / Valida datos
       |                                                |
       | <--- 2. Respuesta HTTP (200 / 201 / 400 / 404) |
       |     (Headers: Content-Type: application/json)  |
       |     (Cuerpo JSON serializado)                  |
       |                                                |

## Evidencias de Ejecución y Pruebas

### 1. Pruebas Unitarias Automatizadas (Vitest)
Suite de pruebas unitarias implementadas bajo metodología XP (TDD), verificando casos de éxito y errores de validación.
(<Captura de pantalla 2026-08-25 110843-1.png>)

### 2. Servidor HTTP Nativo en Ejecución
Servidor Node.js corriendo en el puerto 3000 con soporte para TypeScript.

(<Captura de pantalla 2026-08-25 110918.png>)

### 3. Creación de Recurso vía POST (Postman)
Petición `POST /estudiantes` enviando payload JSON y recibiendo status `201 Created` con el ID autoincremental asignado.

(<Captura de pantalla 2026-08-25 110206.png>)

### 4. Consulta y Listado vía GET (Postman)
Petición `GET /estudiantes` obteniendo la colección completa con status `200 OK`.

(<Captura de pantalla 2026-08-25 105759.png>)