// Aplica el tema guardado antes de pintar. Misma regla que temaGuardado() en src/lib/tema.ts.
try {
  var t = localStorage.getItem('tema');
  if (t === 'claro' || t === 'oscuro') document.documentElement.setAttribute('data-tema', t);
} catch (e) {}
