import { ordenarPorNumero } from './orden';

// Ordena los pasos del proceso por su número y para la compilación si dos lo comparten.
export const ordenarPasos = <T extends { id: string; data: { orden: number } }>(pasos: T[]): T[] =>
  ordenarPorNumero(pasos, 'Los pasos');
