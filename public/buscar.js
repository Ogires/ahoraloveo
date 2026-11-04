// Textos de la búsqueda de Pagefind en el tono de la web: de vosotros a vosotros y con el término
// entre comillas. Los demás («Buscar», «Limpiar», «Cargando»…) se quedan con su traducción al español.
// Va aparte y no en un <script> de Astro porque /pagefind/ se genera después de compilar la web.
// Se carga después de pagefind-component-ui.js, que crea window.PagefindComponents.
window.PagefindComponents?.getInstanceManager()
  .getInstance('default')
  .setTranslations({
    input_hint: 'Los resultados aparecerán mientras escribís',
    searching: 'Buscando «[SEARCH_TERM]»…',
    one_result: '[COUNT] resultado para «[SEARCH_TERM]»',
    many_results: '[COUNT] resultados para «[SEARCH_TERM]»',
    zero_results: 'No hemos encontrado nada para «[SEARCH_TERM]». Probad con otra palabra o mirad el glosario.',
    alt_search: 'No hemos encontrado nada para «[SEARCH_TERM]». Os mostramos lo que hay para «[DIFFERENT_TERM]».',
    search_suggestion: 'No hemos encontrado nada para «[SEARCH_TERM]». Probad con una de estas búsquedas:',
    error_search: 'La búsqueda no ha funcionado. Probad a recargar la página.',
  });
