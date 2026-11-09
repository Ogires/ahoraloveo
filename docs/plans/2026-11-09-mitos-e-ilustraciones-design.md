# Mitos sobre el autismo e ilustraciones de las escenas: diseño

Dos ideas nuevas del 2026-11-08, pensadas juntas el 2026-11-08 y el 2026-11-09:

1. Una sección de mitos sobre el autismo: cada mito, con la explicación de por qué no es así.
2. Ilustraciones para las escenas «En el día a día» del glosario.

## 1. Mitos sobre el autismo

### Qué es

Una sección propia, `/mitos/`, con una portada y una página para cada mito. Se eligió una página por mito (y no una sola página larga con anclas) porque lo normal será mandar a un familiar el mito concreto que acaba de soltar, y así la vista previa del enlace lleva su propio título y su propia descripción.

### Qué tiene cada mito

Primero el mito y luego el dato: se decidió así frente a la propuesta de empezar por el dato. Para que el mito nunca llegue solo, el dato va justo debajo y también en la descripción de la página, que es lo que se ve en la vista previa al compartirlo.

1. **El mito, como título, entre comillas latinas,** con «Se suele oír» encima para que nadie lo lea como una afirmación de la web. Debajo, en pequeño, de cero a tres variantes («como en Rain Man», «se saben cientos de decimales de pi»).
2. **El dato,** en una sola frase destacada, de 25 palabras como mucho.
3. **«Por qué no es así»:** un párrafo, como los apartados del glosario, con el peso de cada fuente dicho con palabras. Si las fuentes no coinciden, se dice.
4. **«De dónde viene»** (opcional): por qué tanta gente se lo cree, sin burlarse de nadie y sin culpar a las familias.
5. **«Qué podéis hacer»:** qué contestar, qué preguntar en la consulta o qué ficha leer después. Nunca tratamientos.
6. **Términos relacionados y fuentes,** como en el glosario, y el pie con la fecha de revisión.

### Dónde aparece

- **Menú:** «Mitos», entre «Diagnóstico» y «Buscar». Son cinco entradas: hay que comprobar que caben en el móvil.
- **Portada:** un enlace «Mitos sobre el autismo» junto a los otros dos, y el párrafo «Esta web está empezando» actualizado.
- **Portada de `/mitos/`:** en cada fila, el mito entre comillas y debajo el dato en una línea, con el enlace a su página. El orden lo fija el campo `orden`.
- **Fichas del glosario:** un apartado «Mitos sobre esto», antes de «Términos relacionados». Sale solo de los `relacionados` de cada mito: no hay enlaces inversos a mano.
- **Buscador:** Pagefind indexa las páginas nuevas sin hacer nada más.

### Los datos

Una colección nueva, `src/content/mitos/<id>.yaml`, con su esquema en `src/lib/esquemas.ts`:

| Campo | Qué es | Reglas |
|---|---|---|
| `mito` | Lo que se suele oír | Texto obligatorio, sin comillas (las pone la página) |
| `variantes` | Otras formas de decirlo | De 0 a 3 |
| `dato` | Lo que sabemos, en una frase | 25 palabras como mucho |
| `por_que` | «Por qué no es así» | Obligatorio |
| `de_donde_viene` | «De dónde viene» | Opcional |
| `que_hacer` | «Qué podéis hacer» | Obligatorio |
| `relacionados` | Términos del glosario | Referencias a `glosario` |
| `fuentes` | Fuentes del catálogo | Al menos una |
| `orden` | Posición en la portada | Entero, sin repetir |
| `revisado` | Fecha de revisión | Obligatoria |

Páginas: `src/pages/mitos/index.astro` y `src/pages/mitos/[id].astro`. Reaprovechan `ListaFuentes`, `PieRevision` y `TextoEnlazado`. El título de la página es el mito entre comillas, y la descripción, el dato.

### La primera tanda

Ocho mitos, de dos en dos y enseñándolos en local antes de subirlos:

1. «Las personas autistas tienen una memoria prodigiosa» (con el ejemplo de los decimales de pi) y «Todas las niñas autistas son calladas y camuflan». Con esta pareja va la parte técnica: la colección, las páginas y las pruebas.
2. «El autismo es cosa de chicos» y «No parece autista» (mira a los ojos, tiene amigas, habla mucho, va bien en el cole).
3. «Las vacunas causan autismo» y «¿Qué hicimos mal?» (la crianza fría, el embarazo, el paracetamol, la cesárea).
4. «No tienen empatía» o «no sienten», y «Es una rabieta» o «se porta mal».

Para una segunda tanda: la epidemia de autismo, «se le pasará», las estereotipias como manías, la ecolalia, «todos somos un poco autistas» y «se cura».

### Las fuentes

El punto de partida es la investigación de ZCode (`propuestas/mitos/zcode.md`, sin versionar). Sirve de mapa para saber dónde buscar, no de fuente: es una búsqueda en internet, con citas traducidas y sin copia local. La revisión del 2026-11-08 comprobó en PubMed que las referencias existen, pero encontró resúmenes mal hechos. Lo que hay que tener en cuenta al redactar:

- **Memoria prodigiosa:** las cifras no coinciden y hay que decirlo. Treffert habla de 1 de cada 10, y Howlin, de un 28,5 % (39 de 137 personas). Howlin también encontró estos talentos en un tercio de los hombres y en un 19 % de las mujeres. Eso explica que Prizant diga «hasta un 15 %» y Alonso «del 10 al 30 %». Daniel Tammet sale en Prizant como la excepción que es.
- **«No parece autista»:** el estudio de Burrows (2025) es con niñas y niños de 20 a 40 meses, no con mujeres. Rea (2023) no puede distinguir si la prueba capta peor a las niñas o si ellas muestran menos señales.
- **Camuflaje:** se usa la revisión de Cook, que ya cita la ficha de *Masking* («de pequeña a moderada»), y no la cifra de un solo estudio de 60 personas.
- **«¿Qué hicimos mal?»:** la heredabilidad (83 %) se lee fácilmente mal, así que se explica o no se pone. Las pantallas quedan fuera salvo que una fuente lo diga claramente: que no aparezcan en las listas de la OMS y del NHS no prueba nada.
- **Rabieta:** las fuentes principales son la NAS y Ambitious about Autism. El capítulo de Isabel Paula trata la rabieta como manipulación y recomienda la extinción (está avisado en su índice), así que de ella solo se usa que la crisis y la rabieta se distinguen y que lo que ayuda en una puede empeorar la otra.
- **Ecolalia (segunda tanda):** las 14 funciones de Prizant y Rydell (1984) salen de 3 niños.

Cuatro mitos se pueden escribir casi solo con el catálogo: «todas calladas» (AETAPI, línea 41, y Cook), «no parece autista» (AETAPI, Cook y Hull), empatía (Crompton y Kinnaird) y rabieta (NAS y Ambitious). Los otros necesitan fuentes nuevas: Treffert y Howlin; Hviid y la nota de la OMS; la NAS y el NHS sobre las causas; Fyfe y Loomes. El libro de Alonso ya está en `comun.md`, pero hay que darlo de alta en el catálogo de la web.

**Proceso de cada fuente nueva (lo hace Claude):**

1. Descargar el texto a `notas/fuentes/`. Si es de pago, solo el resumen, y entonces solo se usa lo que dice el resumen.
2. Darla de alta en `src/content/fuentes/`, con su nivel y la fecha de comprobación.
3. Añadirla a `notas/agentes/comun.md` para que el comprobador la acepte.

Las citas de cada mito van en una tabla con las columnas id, Línea y Cita, en `notas/dossieres/mitos-<id>.md`, y pasan `notas/herramientas/comprobar-citas.mjs`.

### La redacción

Con la skill `lenguaje-claro` y una guía nueva, `references/mitos.md`, con las normas de esta sección:
- el mito entre comillas;
- el dato en una frase;
- sin burlas, ni hacia quien se lo cree ni hacia quien lo inventó;
- decir cuándo las fuentes no coinciden;
- nunca tratamientos;
- «De dónde viene» sin culpar a las familias.

Además, el script de legibilidad pasa por cada mito, con el mismo objetivo que el glosario: INFLESZ de 65 o más, y nunca menos de 55.

### Pruebas

- **Esquema:** rechaza un mito sin fuentes, con un dato de más de 25 palabras, con más de tres variantes o con un `orden` repetido.
- **En el navegador** (`tests/e2e/mitos.spec.ts`):
  - la portada lista los mitos en orden;
  - cada página tiene el mito y el dato;
  - la descripción de la página es el dato;
  - una ficha del glosario muestra «Mitos sobre esto».
- **Las páginas nuevas entran en `tests/e2e/rutas.ts`,** para las pruebas de accesibilidad, teclado, pantallas estrechas y sin JavaScript.

## 2. Ilustraciones de las escenas

### Qué muestran

La niña o el niño de la escena, en dibujo sencillo, haciendo lo que cuenta el texto en un momento tranquilo. Se eligió frente a dibujar solo el sitio, sin la niña, porque mostrar la conducta ayuda a reconocerla, que es la idea de la web.

### Cómo se hacen

**Con el modelo de imágenes de Gemini.** Ogires genera las imágenes, y Claude prepara los prompts, las revisa y las integra. Se descartaron dos opciones: que Claude las dibujara en SVG, porque podían quedar rígidas, más cerca de un pictograma que de una ilustración, y una ilustradora, por su coste y su lentitud (queda como opción para más adelante).

Lo que hay que tener en cuenta:
- **Las imágenes de Gemini llevan una marca invisible que dice que son de IA.** El aviso obligatorio de imágenes generadas (artículo 50 del Reglamento de IA) es para las que parecen reales, y unas ilustraciones sin caras realistas no lo son. La web sigue sin mencionar la IA.
- **En algunos planes, Gemini añade una marca visible en una esquina.** Se verá en la prueba de estilo.
- **Nunca se sube como referencia una foto real,** de ninguna niña ni de nadie.

### Estilo

- Ilustración plana, de formas redondeadas, como un álbum ilustrado sencillo. Caras simples, con ojos de punto y expresiones suaves.
- El tono que domina es el de la familia del término:

  | Familia | Color |
  |---|---|
  | Sensorial | `#86C3C9` |
  | Emociones | `#EBA3AE` |
  | Social | `#EDCB72` |
  | Pensamiento | `#A9A6E8` |
  | Identidad | `#95CDA0` |
  | Clínico | `#C4BDB2` |

- Los trazos van en la tinta de la web, `#26223A`.
- El fondo es claro y liso, con el sitio solo sugerido.
- Formato horizontal 4:3.

### Normas

Se añaden a `.claude/skills/lenguaje-claro/references/escenas.md`:

1. Solo lo que dice el texto de la escena: ningún gesto ni objeto que no mencione.
2. Nunca el momento más fuerte de una crisis. En el meltdown y el shutdown se dibuja el antes, o un gesto contenido.
3. Sin caras realistas ni dramatismo: nada de llanto exagerado ni de gestos de sufrimiento.
4. Variedad en el conjunto: tonos de piel, pelo, cuerpos, gafas y ropa distintos. No todo en rosa para las niñas. La edad se tiene que notar.
5. Los adultos, solo si están en la escena, y en segundo plano.
6. Sin texto, logos, marcas ni sitios reconocibles.
7. Nunca una foto real como referencia.
8. Cada imagen la revisan Claude, con una lista de comprobación, y Ogires, mirándola, antes de publicarla.

### Proceso

1. **Prueba de estilo.**
   - Claude prepara un prompt para la escena de la terraza del bar (*Estereotipias*).
   - Ogires pide tres versiones y elige una. Esa versión es la imagen de referencia: `propuestas/imagenes/referencia.png`.
2. **Un prompt por escena,** generado desde los YAML por un script, como el del prompt de las escenas. Cada uno lleva:
   - el bloque de estilo;
   - la edad, el sitio y el protagonista;
   - el color de la familia;
   - lo que se ve y lo que no debe salir.

   Salen todos en `propuestas/imagenes/prompts.md`.
3. **Ogires las genera en una sola conversación de Gemini, con la referencia adjunta,** y las guarda como `propuestas/imagenes/<término>-<n>.png`.
4. **Claude las revisa contra las normas.** Si algo falla, prepara una frase para corregirla en Gemini sin rehacerla.
5. **Claude las integra y Ogires las ve en local** antes de subirlas.

`propuestas/` no se versiona: las imágenes publicadas viven en `src/assets/escenas/`.

### En la web

- **Un campo opcional `imagen` en el esquema de la escena,** con el ayudante `image()` de Astro. La compilación falla si el fichero no existe.
- **Astro las optimiza:** formatos ligeros, varios tamaños y carga diferida, sin saltos al cargar. Cada una ocuparía unos 30–60 KB.
- **Texto alternativo vacío, a propósito:** la norma 1 hace que la imagen no muestre nada que no diga el texto de al lado, así que el lector de pantalla no lo lee dos veces.
- **Modo oscuro:** la ilustración va en su tarjeta, con su fondo claro, esquinas redondeadas y algo menos de brillo.
- **La CSP no cambia:** las imágenes son locales.
- **Pruebas:**
  - el esquema rechaza una imagen que no existe;
  - una prueba en el navegador comprueba que se ven y que su texto alternativo está vacío;
  - las pruebas de accesibilidad y de pantallas estrechas pasan con ellas.

Más adelante, las tarjetas «¿Lo habéis visto?» podrán reutilizar las mismas imágenes.

## 3. Fuera de este diseño

- La segunda tanda de mitos.
- Las escenas de *Interocepción*, que aún no tiene ninguna (*Neurodiversidad* se queda sin escenas).
- Las tarjetas «¿Lo habéis visto?» y las escenas de elegir.
