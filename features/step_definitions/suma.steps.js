const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert');
const { suma } = require('../../src/suma.js');

let num1;
let num2;
let resultado;
let errorLanzado;

Given('que tengo el primer número {int}', function (valor) {
  num1 = valor;
});

Given('tengo el segundo número {int}', function (valor) {
  num2 = valor;
});

Given('que tengo el primer valor {string} de tipo texto', function (valor) {
  num1 = valor;
});

When('ejecuto la función suma', function () {
  resultado = suma(num1, num2);
});

When('intento ejecutar la función suma', function () {
  errorLanzado = null;
  try {
    suma(num1, num2);
  } catch (error) {
    errorLanzado = error;
  }
});

Then('el resultado debe ser {int}', function (esperado) {
  assert.strictEqual(resultado, esperado);
});

Then('se debe lanzar un error con el mensaje {string}', function (mensajeEsperado) {
  assert.ok(errorLanzado, 'Se esperaba que la función lanzara un error');
  assert.strictEqual(errorLanzado.message, mensajeEsperado);
});
