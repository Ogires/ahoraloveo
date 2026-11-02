// Aplica el tema guardado antes de pintar. Mismas reglas que temaGuardado() y mediaBarra()
// en src/lib/tema.ts: el modo elegido también decide el color de la barra del móvil.
try {
  var t = localStorage.getItem('tema');
  if (t === 'claro' || t === 'oscuro') {
    document.documentElement.setAttribute('data-tema', t);
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('media', m.getAttribute('data-tema') === t ? 'all' : 'not all');
    });
  }
} catch (e) {}
