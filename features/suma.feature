# language: es

Característica: Función suma
  Como desarrollador
  Quiero sumar dos valores
  Para obtener el resultado correcto o capturar un error si los datos son inválidos

  Esquema del escenario: Sumar dos números válidos
    Dado que tengo el primer número <num1>
    Y tengo el segundo número <num2>
    Cuando ejecuto la función suma
    Entonces el resultado debe ser <resultado>

    Ejemplos:
      | num1 | num2 | resultado |
      | 2    | 3    | 5         |
      | -1   | -4   | -5        |

  Escenario: Intentar sumar con un tipo de dato inválido
    Dado que tengo el primer valor "2" de tipo texto
    Y tengo el segundo número 3
    Cuando intento ejecutar la función suma
    Entonces se debe lanzar un error con el mensaje "Ambos argumentos deben ser números"
