# «A quién acudir»: diseño

Idea del 2026-11-27: después de entender qué pasa, la siguiente pregunta de una familia es a quién acudir. La sección reúne el camino público y las asociaciones sin ánimo de lucro, y destaca lo que hay sobre mujeres y niñas. Se empieza **solo por la Comunitat Valenciana**, sin preparar nada para otras comunidades.

Material de partida:
- La investigación de Gemini: `propuestas/entidades/entidades-cv-gemini.md`, con el encargo `prompt-entidades-cv.md`.
- La comprobación de esa investigación: `propuestas/entidades/comprobacion-entidades-cv.md`. Manda sobre la de Gemini.
- Los borradores de fuentes: `propuestas/entidades/fuentes-recursos-cv-borrador.md`.
- Las copias de las fuentes oficiales: `notas/fuentes/recursos-cv-*`.

Los archivos de `propuestas/` y `notas/` no se versionan.

## 1. Criterios

- Solo autismo, no la neurodivergencia en general.
- Solo entidades sin ánimo de lucro (de familias, de personas autistas, fundaciones y confederaciones) y recursos públicos. **Ni gabinetes ni clínicas privadas.**
- Solo entidades **con web propia activa**: sin web no se puede comprobar qué ofrecen. No se pide una fecha mínima de actividad.
- Entran las que cobran cuota o algunos servicios. No se ponen precios ni se valoran sus terapias.
- No llevan teléfonos, correos ni nombres de personas: solo el nombre de la entidad, la localidad, qué ofrece según su web, el enlace y la fecha en que se comprobó.
- Quedan fuera:
  - La Nostra Veu, porque su web tiene un enlace oculto a casinos y su programa de autismo es privado.
  - Las entidades que dicen trabajar solo con personas adultas: CASATEA, PingüiCEA y Fundació TEA. CASATEA y PingüiCEA van en un bloque aparte para personas adultas.
  - APNAC y Mentes Divergentes sí entran. No dicen que trabajen solo con adultos, así que se cuenta lo que ofrecen según su web.
- Si alguna web ofrece terapias sin pruebas, se señala y decide Sergio. En la comprobación no apareció ninguna.

## 2. La página

Una sola página: `/a-quien-acudir/`. En el menú, «A quién acudir», detrás de Programas. Se enlaza también desde la portada y desde el recuadro valenciano del paso de derivación del diagnóstico.

Bloques, en este orden:

1. **Cabecera.** Título «A quién acudir» y una entradilla: dónde pedir información, apoyo y servicios en la Comunitat Valenciana. Debajo, una línea que diga que por ahora solo está la Comunitat Valenciana, con un enlace al bloque 6 para el resto de España.
2. **El camino público,** en cuatro apartados:
   - sanidad: pediatría y la unidad de salud mental infantil (USMIA);
   - atención temprana;
   - el colegio: la orientación, las aulas específicas y cómo se pide plaza;
   - discapacidad y dependencia, incluido que, si no responden, la solicitud se entiende denegada (silencio negativo).

   Cada apartado lleva sus fuentes oficiales y la fecha de comprobación. Lo que ya cuenta la guía del diagnóstico se enlaza, sin repetirlo.
3. **Asociaciones y fundaciones,** por provincia (Alicante, Castellón y Valencia) y en orden alfabético. Antes de la lista va un aviso con varias cosas:
   - son entidades sin ánimo de lucro;
   - algunas cobran cuota o algunos servicios;
   - no valoramos sus terapias;
   - no incluimos clínicas privadas;
   - las que no tienen web no aparecen, y se pueden buscar en los directorios del bloque 6.

   Cada tarjeta lleva el nombre, enlazado a su web, la localidad, qué ofrece en una línea y la fecha en que se comprobó.
4. **Mujeres y niñas.** Primero, el hueco: en la Comunitat Valenciana no hemos encontrado ningún programa para niñas autistas, con la fecha. Después, lo estatal que la comprobación confirma: CEPAMA, los materiales de Autismo España para niñas y adolescentes y la guía de la Federación Andaluza de Síndrome de Asperger.
5. **Si sois personas adultas:** PingüiCEA y CASATEA.
6. **Para el resto de España:** los directorios de Autismo España (se puede filtrar por provincia), FESPAU y Asperger España.
7. **«¿Falta alguna entidad o algo ha cambiado?».** El enlace para avisarnos y la fecha de revisión de la página, con el componente `PieRevision`.

Si algún día entra otra comunidad, lo valenciano pasa a `/a-quien-acudir/comunitat-valenciana/`, y esta página se convierte en la portada de la sección.

## 3. Datos

- **Colección `organizaciones`:** un YAML por entidad en `src/content/organizaciones/`. Cada uno lleva:
  - `nombre` y `siglas`, opcional;
  - `bloque`: entidades, mujeres-ninas, adultas o confederaciones;
  - `provincia`: alicante, castellon, valencia o estatal;
  - `localidad` (obligatoria en el bloque de entidades);
  - `que_ofrece`, una frase;
  - `web`, una URL completa;
  - `comprobado`, una fecha.
- **Colección `acudir`:** un único YAML, `comunitat-valenciana.yaml`, con los textos de la página:
  - la entradilla;
  - los cuatro apartados del camino público, cada uno con su título, sus párrafos, sus fuentes y su fecha de comprobación;
  - el texto del hueco de mujeres y niñas, con su fecha;
  - el aviso previo a la lista;
  - la fecha de revisión.
- Las fuentes oficiales y las guías entran en el catálogo `src/content/fuentes/`, a partir del borrador.

## 4. Textos

Siguen la skill `lenguaje-claro`: español de España, de vosotros a vosotros, frases de 30 palabras como mucho y nada de recomendar. «Qué ofrece» describe lo que dice la web de la entidad, sin valorarlo. Lo de mujeres y niñas no exagera: lo que hay en la Comunitat son acciones puntuales, no programas.

## 5. Pruebas

- El esquema rechaza:
  - una organización sin web, sin fecha o con un bloque o una provincia que no están en la lista;
  - una entidad del bloque de entidades sin localidad.
- Una prueba unitaria comprueba que las webs empiezan por `https://` y que ninguna fecha está en el futuro.
- La ruta `/a-quien-acudir/` entra en `tests/e2e/rutas.ts`, para las pruebas de accesibilidad, de CSP y sin JavaScript.

La implementación la hace Gemini con el plan `docs/plans/2026-11-27-a-quien-acudir-plan.md`. Claude revisa su diff antes de subirlo.
