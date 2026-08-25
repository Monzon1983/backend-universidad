import { describe, it, expect } from 'vitest';
import { obtenerEstudiantes, crearEstudiante, type Estudiante } from './estudiantes.ts';

const mockData: Estudiante[] = [
  { id: 1, nombre: "Ana García", carrera: "Programación" },
  { id: 2, nombre: "Carlos López", carrera: "Sistemas" },
  { id: 42, nombre: "Mauro Monzón", carrera: "Programación" }
];

describe('Función obtenerEstudiantes', () => {
  it('debe retornar todos los estudiantes si no se pasa filtro de carrera', () => {
    const resultado = obtenerEstudiantes(mockData);
    expect(resultado).toHaveLength(3);
  });

  it('debe filtrar correctamente los estudiantes por carrera', () => {
    const resultado = obtenerEstudiantes(mockData, 'Programación');
    expect(resultado).toHaveLength(2);
    expect(resultado[0].nombre).toBe('Ana García');
    expect(resultado[1].nombre).toBe('Mauro Monzón');
  });

  it('debe retornar un arreglo vacío si la carrera no coincide con ningún estudiante', () => {
    const resultado = obtenerEstudiantes(mockData, 'Medicina');
    expect(resultado).toEqual([]);
  });
});

describe('Función crearEstudiante (TDD - Nuevo Endpoint POST)', () => {
  it('debe crear un nuevo estudiante con id autoincremental y agregarlo a la lista', () => {
    const lista = [...mockData];
    const nuevo = crearEstudiante(lista, { nombre: "Lucía Fernández", carrera: "Diseño" });

    expect(nuevo).toHaveProperty('id', 43);
    expect(nuevo.nombre).toBe("Lucía Fernández");
    expect(nuevo.carrera).toBe("Diseño");
    expect(lista).toHaveLength(4);
  });

  it('debe lanzar un error si falta el nombre o la carrera', () => {
    const lista = [...mockData];
    expect(() => crearEstudiante(lista, { nombre: "", carrera: "Diseño" })).toThrow('El nombre y la carrera son obligatorios');
    expect(() => crearEstudiante(lista, { nombre: "Lucía", carrera: "" })).toThrow('El nombre y la carrera son obligatorios');
  });
});