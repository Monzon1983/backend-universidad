import { Given, When, Then } from "@cucumber/cucumber";
import request from "supertest";
import assert from "assert";
import app from "../../../src/app.js";

let payload: any = {};
let response: request.Response;

Given("un payload con nombre {string} y email {string}", function (nombre: string, email: string) {
  payload = { nombre, email };
});

When("hago una peticion POST a {string}", async function (ruta: string) {
  response = await request(app)
    .post(ruta)
    .send(payload);
});

Then("el codigo de respuesta de la API debe ser {int}", function (statusCode: number) {
  assert.strictEqual(response.status, statusCode, `Esperaba ${statusCode} pero recibí ${response.status}`);
});
