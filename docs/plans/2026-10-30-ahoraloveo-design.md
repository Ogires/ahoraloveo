# Ahora lo veo: diseño

> Nombre en clave: `ahoraloveo`. «Ahora lo veo» es el candidato a nombre definitivo. Lema: **«La guía que nos hubiera gustado tener»**.

Web de información sobre autismo para quien empieza, con el foco puesto en cómo se presenta en mujeres y niñas. La primera versión se centra en las niñas y sus familias.

## 1. Propósito y público

**Para quién:** familias con hijos e hijas de 0 a 12 años, con una sospecha de autismo o un diagnóstico reciente. Es el momento en que más falta hace una guía y menos se sabe qué buscar. Más adelante, también adolescentes y mujeres adultas que se reconocen en el espectro, a menudo con un diagnóstico tardío.

**Las cuatro necesidades que cubre a largo plazo:**

1. Saber qué pasos dar.
2. Poder fiarse de la información.
3. Entender a tu hija o hijo en el día a día.
4. Encontrar a otras familias y recursos cerca.

**Ámbito:** España. Lo local (trámites, asociaciones) empieza por la Comunitat Valenciana.

**Sello: el autismo en mujeres y niñas.** La web sirve a cualquier familia, pero cada página cuenta qué cambia en ellas. En las niñas y en las mujeres el diagnóstico suele llegar más tarde, el camuflaje lo esconde, y buena parte de la investigación y de las herramientas de diagnóstico se construyó con muestras mayoritariamente masculinas. Además, en español apenas hay contenido sobre el tema.

**Quién la hace:** una familia, no profesionales, y la web lo dice claramente. Está firmada con el nombre de su autor y no incluye ningún dato que identifique a menores.

## 2. Principios

1. **Confianza.** Toda afirmación lleva su fuente, y cada página su fecha de revisión. Se dice cuánto pesa cada fuente (no es lo mismo una guía clínica que un estudio pequeño). Y cuando no hay datos sobre niñas, se dice tal cual: «sin datos».
2. **Empezar pequeño e iterar.** Cada iteración se publica en cuanto está lista.
3. **Amable, no infantil.** Hay interactividad, pero sin puntos, rankings ni medallas. Como mucho, un indicador de progreso («has explorado 12 de 30 términos»).
4. **Cuidadosa con lo sensorial.** Sin reproducción automática, sin sonidos y sin animaciones bruscas. Se respeta `prefers-reduced-motion`, la paleta es tranquila y hay modo oscuro.
5. **Funciona sin JavaScript.** Cada pieza interactiva es una capa sobre un contenido que se lee igual sin ella, con teclado y con lector de pantalla.
6. **Privacidad desde el diseño.** Sin cuentas, sin cookies y sin enviar a ningún servidor nada de lo que la familia escribe.
7. **Explicar, no evaluar.** No hay tests para hacer en casa ni puntuaciones de riesgo. Las herramientas de diagnóstico se explican, no se pasan.

## 3. Primera versión: alcance

Tres secciones de contenido fijo, cada una con su pieza interactiva:

| Sección | Contenido | Interactividad |
|---|---|---|
| **Glosario** | 25-30 términos (alexitimia, crisis o *meltdown*, desconexión o *shutdown*, estereotipias, camuflaje, ecolalia, intereses especiales, teoría de la mente, coherencia central, funciones ejecutivas, interocepción, hiper e hiposensibilidad, burnout autista, doble empatía, niveles de apoyo, neurodiversidad, neurodivergente, neurotípico…) | Mazo de tarjetas y escenarios «¿Crisis o rabieta?» |
| **Señales** | Organizadas según los criterios del DSM-5: comunicación e interacción social por un lado, y patrones repetitivos, rutinas, intereses y aspectos sensoriales por otro. Cada señal compara «cómo se suele describir» con «cómo puede verse en niñas» | «Un día con Lucía» y el cuaderno de observaciones |
| **Herramientas de diagnóstico** | Cribado frente a diagnóstico. Candidatas: M-CHAT-R/F, SCQ, ADOS-2, ADI-R, SRS-2, pruebas de teoría de la mente y GQ-ASC. La lista se cierra al redactar, contrastando cada una con su fuente | Cronograma del proceso y tabla de herramientas por áreas |

Queda fuera de la primera versión todo lo de la sección 12 (Visión).

## 4. Modelo de contenido

Cada pieza de contenido es un fichero Markdown o YAML dentro de una colección de Astro, con su esquema validado en la compilación.

- **`fuentes`**: `id`, título, autoría, año, tipo (guía clínica, revisión, estudio, entidad, oficial, experiencia), nivel (sección 6), idioma, URL o DOI, licencia, fecha de la última comprobación y temas. En los estudios, además: diseño, tamaño de la muestra, edades, **porcentaje de niñas** y si da **resultados separados por sexo**.
- **`glosario`**: término, alias (también en inglés), familia (sensorial, emociones, social, pensamiento, identidad o clínico), qué es, cómo se ve, con qué no confundirlo, **en niñas** (texto o «sin datos»), qué hacer (opcional: qué puede hacer la familia con esto), términos relacionados, fuentes y fecha de revisión.
- **`senales`**: título, área del DSM-5, descripción, ejemplos cotidianos, cómo se suele describir, **cómo puede verse en niñas**, términos relacionados, fuentes y fecha de revisión.
- **`herramientas`**: nombre, tipo (cribado, diagnóstico o complementaria), edades, quién la pasa, formato (cuestionario, entrevista, observación o prueba), duración, áreas que mide, cómo funciona, limitaciones, **en niñas**, qué preguntar al profesional, fuentes y fecha de revisión.
- **`escenarios`**: situación, opciones, respuesta, explicación, términos y fuentes.
- **`dia-lucia`**: momentos del día (hora, escena, pictogramas y puntos que enlazan a una señal o a un término).
- **`proceso`**: los pasos del cronograma de diagnóstico.

**La compilación falla si:**

- falta un campo obligatorio;
- una ficha no tiene al menos una fuente o le falta la fecha de revisión;
- una ficha enlaza a un término, una señal, una herramienta o una fuente que no existe.

Esta es la red de seguridad del contenido.

## 5. Piezas interactivas

1. **Mazo del glosario.** Tarjetas que se giran: delante el término, detrás la explicación y el ejemplo. Se pueden filtrar por familia. *Sin JavaScript:* una lista de definiciones.
2. **Escenarios «¿Crisis o rabieta?» y similares.** Una situación corta, eliges una opción y se te explica el porqué. No hay fallos, solo explicaciones. *Sin JavaScript:* cada escenario es un `<details>` desplegable.
3. **«Un día con Lucía, 8 años».** Una línea temporal del día de una niña inventada: la ropa con etiquetas por la mañana, el recreo en la periferia del grupo, el camuflaje en clase, el derrumbe al llegar a casa, su interés intenso por la tarde y la hora de dormir. Cada momento tiene puntos que, al tocarlos, muestran la señal que hay detrás, con su enlace al glosario. Lucía es un personaje compuesto que no se basa en ninguna niña real identificable. Las escenas usan pictogramas de ARASAAC. *Sin JavaScript:* una lista ordenada con las señales visibles.
4. **Cuaderno de observaciones para el pediatra.** Al leer las señales, puedes marcar «esto lo he visto» y apuntar un ejemplo propio. Al final se genera un resumen para imprimir o guardar en PDF y llevarlo a la consulta.
   - **No suma ni puntúa.**
   - Se guarda en `localStorage`, con las lecturas y escrituras protegidas por `try/catch`.
   - Tiene un botón de «borrar todo» bien visible y un aviso para dispositivos compartidos.
   - El resumen se saca con la función de imprimir del navegador y una hoja de estilo `@media print`.
   - Nada sale del navegador.
5. **Cronograma del diagnóstico.** Sospecha → pediatra → cribado → derivación → evaluación → informe, con lo que pasa en cada paso. Cada herramienta tiene su carta de datos, y una tabla cruza herramientas con áreas para ver qué mide cada una. *Sin JavaScript:* `<ol>` y `<table>` semánticos.

## 6. Fuentes y calidad del contenido

**Niveles de fuente:**

| Nivel | Qué entra | Para qué se puede usar |
|---|---|---|
| 1. Consenso | Guías de práctica clínica (NICE, SIGN, Ministerio de Sanidad), revisiones sistemáticas y metaanálisis, OMS | Afirmaciones clínicas |
| 2. Estudios | Estudios revisados por pares, con su diseño y su muestra a la vista | «Un estudio con N niñas sugiere…», nunca como verdad cerrada |
| 3. Entidades | Autismo España, Confederación Asperger España, AETAPI, Autistica, National Autistic Society | Orientación práctica |
| Oficial | BOE, DOGV, Generalitat, Seguridad Social, Agencia Tributaria | Trámites, y solo para trámites |
| Experiencia | Textos del autor y relatos en primera persona de mujeres autistas | Siempre marcada como vivencia |

**Quedan fuera:** las webs que venden terapias, los textos sin autoría ni fecha y los foros.

**Flujo de cada ficha:**

1. Borrador con fuentes.
2. Comprobación de que cada fuente dice de verdad lo que se le atribuye.
3. Revisión del autor, que aporta su experiencia.
4. Publicación con fecha.

**Lista de comprobación antes de publicar:**

- ¿Cada afirmación tiene su fuente?
- ¿Se respeta el peso de cada fuente?
- ¿El apartado de niñas tiene fuente o dice «sin datos»?
- ¿El lenguaje sigue la guía de estilo?

**Derechos de autor.** Las fuentes se enlazan y se resumen con palabras propias, nunca se copian. De los tests no se reproduce ningún ítem: se explica qué miden y cómo.

**Correcciones.** Cada ficha tiene un enlace «esto está mal o desactualizado» que abre un correo con la página ya indicada.

## 7. Guía de estilo

- **«Autista» o «autismo»** como forma principal: «niñas autistas», «mujeres autistas», «el autismo en mujeres y niñas».
- **«Autismo femenino»** puede aparecer una vez por página, porque es como lo busca mucha gente, pero no como forma habitual: sugiere un tipo distinto de autismo.
- **«En el espectro»** en tono cercano, sobre todo en los textos de experiencia.
- **«TEA»** para lo clínico y los trámites, explicado la primera vez que aparece.
- **«Con autismo»** se acepta si sale de forma natural.
- **«Neurodivergente»** solo como término paraguas o al hablar de varias condiciones a la vez (por ejemplo, autismo y TDAH). Nunca como sustituto de «autista». Una persona es *neurodivergente*; un grupo es *neurodiverso*.
- **Nunca** «sufre» o «padece» autismo, ni «enfermedad», ni «normal» como contrario de autista (se dice «neurotípico»).
- **Tono:** frases cortas, la jerga explicada siempre, de vosotros a vosotros y «vuestro hijo o hija» en lugar del masculino genérico. Nada de alarmismo ni de positividad forzada.
- Una entrada del glosario explica estas opciones y termina recordando que la forma que importa es la que prefiera cada persona.

## 8. Identidad visual

**La idea: el espectro es una rueda, no una línea.** No va de «menos» a «más» autista: cada persona tiene su propia combinación. La rueda reúne las seis familias del glosario, y cada familia tiene un color que se repite por toda la web: en las tarjetas, en las señales y en el día de Lucía.

**Tipografía:** Lexend, una sola familia para todo, diseñada para que leer cueste menos esfuerzo.

- Pesos: 300 en entradillas, 400 en el texto, 500 en botones y etiquetas, 600 en títulos.
- Texto a 18 px con interlineado de 1,6. Escala: 15, 18, 21, 24, 28, 36 y 62 px.
- La fuente se sirve desde la propia web, no desde Google Fonts, para no enviar a terceros la IP de quien la visita.

**Paleta base** (todas las combinaciones de texto cumplen WCAG AA):

| Color | Claro | Oscuro | Uso |
|---|---|---|---|
| Fondo | `#F4F3F9` | `#1A1827` | Fondo de la página |
| Superficie | `#FFFFFF` | `#242134` | Paneles y reversos de tarjeta |
| Tinta | `#26223A` | `#ECEAF6` | Texto: 13,9:1 y 14,7:1 sobre el fondo |
| Tinta suave | `#5A556F` | `#ACA7C3` | Texto secundario: 6,4:1 y 7,5:1 |
| Violeta | `#4F46A5` | `#B2ACF5` | Enlaces y botones: 6,9:1 y 8,4:1 |
| Línea | `#DEDBEA` | `#36324A` | Separadores (decorativo) |

**Colores de familia**, iguales en los dos modos y siempre con texto `#26223A` encima:

| Familia | Color | Contraste del texto |
|---|---|---|
| Sensorial | `#86C3C9` | 7,8:1 |
| Emociones | `#EBA3AE` | 7,6:1 |
| Social | `#EDCB72` | 9,8:1 |
| Pensamiento | `#A9A6E8` | 6,8:1 |
| Identidad | `#95CDA0` | 8,4:1 |
| Clínico | `#C4BDB2` | 8,2:1 |

**Reglas de uso:**

- El color de una familia siempre va acompañado de su nombre escrito. Nunca es la única pista, porque varios tonos tienen una luminosidad parecida.
- Sobre un color de familia, el texto va siempre en tinta oscura, también en modo oscuro.
- Dentro de una caja tintada con el color de una familia, los enlaces van en color tinta y subrayados. El violeta del modo oscuro no llega a 4,5:1 sobre esas cajas.
- Formas: esquinas redondeadas (28 px en tarjetas y paneles, botones en forma de píldora), sin sombras ni degradados.
- El modo oscuro sigue la preferencia del sistema y tiene además un selector manual.
- Las escenas de Lucía usan pictogramas de ARASAAC dentro de un círculo del color de su familia.
- Movimiento: el giro de una tarjeta es, como mucho, un fundido corto, y desaparece con `prefers-reduced-motion`.

**Pendiente:** el sello visual del apartado «En niñas» y el logotipo, que depende del nombre.

## 9. Arquitectura técnica

- **Generador:** Astro con salida 100 % estática y colecciones de contenido con esquema. Las islas de interactividad se escriben en TypeScript sin framework.
- **Buscador:** Pagefind, con el índice creado al compilar y la búsqueda en el navegador. No necesita servidor.
- **Alojamiento:** Cloudflare Workers, solo con assets, en un subdominio de `webninja.fyi` (`custom_domain`) y con `workers_dev: true`. Cuando llegue el RAG se añadirá el script del Worker sin mudarse. Al estrenar dominio propio, redirecciones 301 y URL canónicas.
- **Estadísticas:** Cloudflare Web Analytics, que no usa cookies.
- **Contacto:** un correo en el propio dominio, redirigido con Cloudflare Email Routing.
- **Licencias:**
  - código, MIT;
  - textos, CC BY-SA 4.0;
  - pictogramas de ARASAAC, con su propia licencia (CC BY-NC-SA) y su atribución en cada página que los use. Por eso la web no tiene fines comerciales ni anuncios.

**Pruebas y CI** (GitHub Actions):

- **Job de pruebas:**
  - Vitest para la lógica del cuaderno y de los escenarios;
  - compilación de Astro, que valida esquemas y referencias;
  - comprobación de enlaces rotos;
  - axe con Playwright sobre las páginas compiladas.
- **Job de despliegue:** solo desde `main`, con `npx wrangler deploy` después de `npm ci`.
- **Revisión manual** en cada pieza interactiva: navegación con teclado y con NVDA.

## 10. Privacidad, aspectos legales y accesibilidad

- **Privacidad:** sin cuentas, sin cookies y sin formularios que guarden datos. El cuaderno vive solo en el navegador. La política de privacidad cabe en un párrafo.
- **Aviso:** «Información divulgativa. No sustituye un diagnóstico ni el consejo profesional». Va en el pie de todas las páginas y destacado en señales, cuaderno y herramientas.
- **Aviso legal mínimo:** quién está detrás y cómo contactar.
- **Accesibilidad:** objetivo WCAG 2.2 AA, con modo oscuro, respeto a la opción de reducir movimiento y texto ampliable sin que se rompa la página.

## 11. Iteraciones

| # | Iteración | Qué incluye |
|---|---|---|
| 0 | Cimientos | Repo, Astro con esquemas, guía de estilo, portada mínima, «Sobre esta web», aviso legal y privacidad, CI completo, despliegue en el subdominio, Pagefind, Web Analytics y correo de contacto. Con 3 o 4 términos de prueba para validar el circuito |
| 1 | Glosario (**primer lanzamiento**) | 25-30 términos, el mazo y 6-8 escenarios |
| 2 | Señales y cuaderno | Las señales por áreas, con su apartado de niñas, y el cuaderno para el pediatra |
| 3 | Un día con Lucía | La línea temporal interactiva con pictogramas |
| 4 | Herramientas de diagnóstico | Las fichas, el cronograma y la tabla de herramientas por áreas |

## 12. Visión a largo plazo (sin fecha)

- **Ruta por etapas:** tengo una sospecha → proceso de diagnóstico → acabamos de recibir el diagnóstico → los primeros meses → el colegio. Con una segunda entrada igual de visible: «¿Y si es una niña?».
- **Adolescentes y mujeres adultas:** la pubertad, el diagnóstico en la edad adulta, el camuflaje y el agotamiento, con su propio recorrido.
- **Fichas de trámites** de la Comunitat Valenciana y estatales, con un formato fijo y una fecha de comprobación que caduca a los 6 meses.
- **Guías del día a día:** comunicación (pictogramas, sistemas alternativos), sensorialidad, sueño, comida, rutinas, amistad, pubertad y cuidar a quien cuida.
- **Semáforo de terapias** según su evidencia, con una columna de «evidencia en niñas».
- **Directorio** de asociaciones y recursos públicos.
- **Catálogo de fuentes** ampliado, con propuestas semiautomáticas (las API de Europe PMC y PubMed sugieren y una persona revisa y aprueba) y una tarea semanal que detecta enlaces rotos y cambios en las páginas oficiales.
- **RAG para responder preguntas concretas** con el mismo catálogo:
  - una pregunta, una respuesta, y la pregunta no se guarda;
  - filtros previos sin IA (ante una crisis o un riesgo, 112, 024 y Fundación ANAR);
  - búsqueda híbrida (vectores multilingües y FTS5) que tiene en cuenta el nivel de la fuente;
  - «citar o callar»;
  - en el servidor, se comprueba que cada cita existe y que cada cifra aparece en el fragmento citado;
  - las tarjetas del semáforo las añade el servidor, no el modelo;
  - modo de emergencia que muestra los fragmentos con sus fuentes si no hay modelo disponible;
  - preguntas frecuentes con respuestas revisadas y guardadas en caché;
  - el proveedor del modelo, detrás de una capa propia y configurable.
- **Versión en valenciano.**
- **Dominio propio.**
- Un sello de **«revisado por»** si en algún momento colabora un profesional o una entidad.

## 13. Decisiones abiertas

- **Nombre definitivo y subdominio.** El candidato es «Ahora lo veo», con el subtítulo «Autismo en mujeres y niñas». Falta comprobar las marcas registradas y probarlo con familias. Criterios:
  - que no coincida con marcas, libros, cuentas o dominios que ya existan;
  - evitar «Asperger», que ya no es un diagnóstico y parte de la comunidad rechaza;
  - evitar la familia de «mirar», que ya usan varias asociaciones de autismo (Mírame, Mira'm, Miradas);
  - nada de siglas ni de juegos de palabras con «TEA», que abundan en el sector.

  Hasta decidirlo, el nombre en clave es `ahoraloveo`.
- **Listas definitivas** de términos, señales y herramientas. Se cierran al redactar cada iteración, contrastándolas con las fuentes.
