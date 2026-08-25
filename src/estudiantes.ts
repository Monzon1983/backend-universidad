export interface Estudiante {
  id: number;
  nombre: string;
  carrera: string;
}

export function obtenerEstudiantes(lista: Estudiante[], carrera?: string): Estudiante[] {
  if (!carrera) {
    return lista;
  }
  return lista.filter(e => e.carrera.toLowerCase() === carrera.toLowerCase());
}

export function crearEstudiante(
  lista: Estudiante[], 
  datos: { nombre?: string; carrera?: string }
): Estudiante {
  if (!datos.nombre || !datos.carrera || datos.nombre.trim() === '' || datos.carrera.trim() === '') {
    throw new Error('El nombre y la carrera son obligatorios');
  }

  const nuevoId = lista.length > 0 ? Math.max(...lista.map(e => e.id)) + 1 : 1;
  const nuevoEstudiante: Estudiante = {
    id: nuevoId,
    nombre: datos.nombre.trim(),
    carrera: datos.carrera.trim()
  };

  lista.push(nuevoEstudiante);
  return nuevoEstudiante;
}