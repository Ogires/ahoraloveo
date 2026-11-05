// La letra con la que se agrupa un término en la vista de la A a la Z.
// Las tildes no cuentan («Ánimo» va con la A), pero la ñ es una letra propia, como en el diccionario.
function letra(texto: string): string {
  const primera = texto.trim().charAt(0).toLocaleUpperCase('es');
  return primera === 'Ñ' ? 'Ñ' : primera.normalize('NFD').replace(/\p{M}/gu, '');
}

const orden = new Intl.Collator('es');

export function agruparPorLetra<T>(elementos: T[], nombre: (e: T) => string) {
  const ordenados = [...elementos].sort((a, b) => orden.compare(nombre(a), nombre(b)));
  const grupos: { letra: string; elementos: T[] }[] = [];
  for (const e of ordenados) {
    const l = letra(nombre(e));
    const ultimo = grupos.at(-1);
    if (ultimo?.letra === l) ultimo.elementos.push(e);
    else grupos.push({ letra: l, elementos: [e] });
  }
  return grupos;
}
