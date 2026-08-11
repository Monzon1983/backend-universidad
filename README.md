# Backend Universidad

Proyecto de servidor HTTP básico utilizando el módulo nativo de Node.js y TypeScript. 
Nota de autoría: Definí la lógica de los requerimientos y utilicé IA como asistente para la generación y estructuración del código.

## Ejecución

1. Instalar dependencias: `npm install`
2. Ejecutar en desarrollo: `npm run dev`
3. Compilar a JS: `npm run build`

## Casos de Prueba (cURL)

- Salud: `curl -i http://localhost:3000/salud`
- Hora: `curl -i http://localhost:3000/hora`
- Estudiante existente: `curl -i http://localhost:3000/estudiantes/42`
- Estudiante inexistente (404): `curl -i http://localhost:3000/estudiantes/999`
- Ruta inexistente (404): `curl -i http://localhost:3000/ruta-inexistente`

## Diagrama del ciclo Solicitud-Respuesta

```text
Cliente (Navegador/cURL)                       Servidor (Node.js)
       |                                              |
       | --- 1. Solicitud HTTP GET -----------------> |
       |     (URL: /estudiantes/42, Método: GET)      |
       |                                              |
       |                                              |--> Procesa método y ruta
       |                                              |--> Busca ID 42 en memoria
       |                                              |
       | <--- 2. Respuesta HTTP 200 ----------------- |
       |     (Headers: application/json)              |
       |     (Cuerpo: {"id": 42, "nombre": ...})      |
       |                                              |