import { ordenarPorNumero } from './orden';

type Mito = { id: string; data: { orden: number; relacionados: { id: string }[] } };

export const ordenarMitos = <T extends Mito>(mitos: T[]): T[] => ordenarPorNumero(mitos, 'Los mitos');

// Los mitos que nombran un término en «relacionados», en su orden. Así la ficha muestra
// «Mitos sobre esto» sin tener que poner el enlace inverso a mano.
export const mitosDe = <T extends Mito>(termino: string, mitos: T[]): T[] =>
  ordenarMitos(mitos).filter((m) => m.data.relacionados.some((r) => r.id === termino));
