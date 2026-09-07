Feature: Gestión de Clientes
  Para administrar la base de datos
  Como consumidor de la API
  Quiero validar la creación de clientes

  Scenario: Crear cliente con datos válidos
    Given un payload con nombre "Mauro" y email "mauro@test.com"
    When hago una peticion POST a "/api/v1/clientes"
    Then el codigo de respuesta de la API debe ser 201
