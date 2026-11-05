# Iteración 1: herramientas de diagnóstico

Diseño aprobado el 5 de noviembre de 2026. Desarrolla la fila «Herramientas de diagnóstico» de la sección 3 y la pieza 5 («Cronograma del diagnóstico») de la sección 5 del [diseño general](2026-10-30-ahoraloveo-design.md).

## 1. Qué incluye

- Una página, **Diagnóstico** (`/diagnostico/`), que cuenta el proceso paso a paso. Es el hilo de la sección: en cada paso aparecen las herramientas que se usan en ese momento.
- **Siete fichas de herramientas** (`/diagnostico/<id>/`).
- Una **tabla** que compara qué mide cada herramienta.

## 2. La página «Diagnóstico»

Empieza con una entrada breve («Cómo se llega a un diagnóstico de autismo, paso a paso, y qué pruebas os podéis encontrar. Aquí se explican; no se hacen») y el aviso destacado de que la información es divulgativa.

El proceso es general, válido en toda España, y sigue lo que comparten PrevInfad, la guía de ESCAP y la guía NICE:

1. **Os surge una duda.** Qué suele preocupar y a qué edad. La preocupación de la familia cuenta.
2. **Lo habláis con pediatría.** El seguimiento del desarrollo de 0 a 36 meses.
3. **Cribado.** Cuestionarios que orientan, no diagnostican. Un resultado positivo no es un diagnóstico.
4. **Derivación.** Adónde se deriva y para qué.
5. **Evaluación.** Un equipo de varios profesionales que cuenta con la familia. Nunca se diagnostica con una sola prueba, y en niñas puede hacer falta más de una sesión.
6. **Informe y después.** El informe escrito, la cita de seguimiento y qué pasa si el resultado no está claro.

Cada paso dice qué pasa, quién interviene, qué puede hacer la familia, qué herramientas se usan (con enlace a su ficha) y sus fuentes.

**En la Comunitat Valenciana.** No hay un protocolo autonómico específico del autismo. Los pasos en los que algo cambia llevan un recuadro con lo que dicen las normas valencianas (por ejemplo, la atención temprana y sus unidades de valoración), cada dato con su fuente y su fecha de comprobación. Lo que no esté documentado no se pone.

Se lee igual sin JavaScript: es una lista numerada.

## 3. Las fichas de herramientas

| Tipo | Herramientas |
|---|---|
| Cribado | M-CHAT-R/F, CAST, Escala Autónoma y SCQ |
| Diagnóstico | ADOS-2 y ADI-R |
| Complementarias | Pruebas de desarrollo e inteligencia (Bayley, WPPSI/WISC y Vineland), en una sola ficha |

Entran las que una familia se va a encontrar en España y tienen fuente que las respalde. El GQ-ASC, un cuestionario pensado para niñas, no está validado en español: se menciona en el apartado «En niñas» de las fichas de diagnóstico, si hay una fuente que lo respalde.

Cada ficha empieza con una **carta de datos**: tipo, edades, quién la pasa o la responde, formato (cuestionario, entrevista, observación o prueba) y duración aproximada. Después vienen los apartados: qué es y cómo funciona, qué mide, cómo se interpreta, limitaciones, **en niñas** (o «Sin datos sobre niñas»), qué preguntar al profesional, términos relacionados del glosario, fuentes y fecha de revisión.

**Ítems y puntos de corte.** Se explica en qué consiste cada prueba, qué mide y cómo se interpreta, con ejemplos contados con palabras propias. En el cribado se dan los puntos de corte que publica una fuente abierta, siempre con lo que pasa después y con lo que significa el resultado: un riesgo alto quiere decir que hay que mirarlo con más calma, no que sea autismo. En las pruebas de diagnóstico, las categorías y escalas del resultado, no los algoritmos del manual. No se copian ítems ni se da la lista completa, aunque sea con otras palabras: tienen derechos de autor, y la web explica las pruebas, no las pasa.

## 4. La tabla «Qué mide cada herramienta»

Va al final de la página del diagnóstico. Las filas son las herramientas, agrupadas por tipo, con sus edades y el enlace a la ficha. Las columnas son cuatro áreas:

- comunicación e interacción social;
- conductas repetitivas, intereses y lo sensorial;
- desarrollo e inteligencia;
- vida diaria.

Las dos primeras siguen los dos grandes bloques del DSM-5; las otras dos son lo que miden las pruebas complementarias.

Las casillas se generan desde el campo `areas` de cada ficha: la tabla y las fichas no pueden contradecirse. Dicen «Sí» o «—» con texto, no con iconos. Los matices van en el apartado «Qué mide» de cada ficha.

Es una tabla semántica, con encabezados de fila y de columna. En pantallas estrechas se desplaza dentro de su propio recuadro, que se puede recorrer con el teclado, y la página no se mueve de lado.

## 5. Datos

**Colección `herramientas`:** nombre, nombre completo, tipo (`cribado`, `diagnostico` o `complementaria`), edades, quién la pasa, formato (uno o varios), duración, áreas (al menos una), qué es, qué mide, cómo se interpreta, limitaciones, en niñas, qué preguntar, términos relacionados, fuentes (al menos una) y fecha de revisión.

**Colección `proceso`:** un fichero por paso con su orden (único), título, qué pasa, quién interviene, qué podéis hacer, herramientas, el recuadro valenciano (opcional: texto, fuentes y fecha de comprobación), fuentes y fecha de revisión.

Si un paso enlaza una herramienta que no existe, o una ficha enlaza un término o una fuente que no existe, la compilación falla.

## 6. Fuentes

Entran en el catálogo:
- la guía práctica de ESCAP (consenso), en su traducción española;
- PrevInfad, sobre el cribado del autismo (consenso);
- la guía NICE CG128 (consenso);
- la documentación de TEA Ediciones, la editorial que publica en España el ADOS-2, el ADI-R y el SCQ.

Para TEA Ediciones se crea un tipo de fuente nuevo, **editorial**, con nivel «entidades», que solo se usa para datos técnicos de una prueba. En «Sobre esta web», la explicación del nivel pasa a decir: «Asociaciones como AETAPI o la National Autistic Society, y las editoriales de las pruebas. Las usamos para los consejos prácticos y para los datos técnicos de cada prueba».

## 7. Cómo encaja con el resto

- «Diagnóstico» entra en el menú y en la portada.
- El buscador indexa la página del proceso y las fichas.
- Las fichas pueden enlazar términos del glosario.
- Los textos siguen la guía de lenguaje claro, con el índice de legibilidad de 55 o más. Los nombres de las pruebas lo bajan; si una ficha queda por debajo del objetivo de 65, se explica por qué.

## 8. Pruebas

- **Esquemas:** una ficha sin fuentes o sin «En niñas» no pasa; un tipo de herramienta o un área que no existen no pasan; el orden de los pasos no se repite.
- **Navegador:** los seis pasos salen en orden; cada herramienta del proceso enlaza a su ficha; cada ficha muestra su carta de datos; la tabla tiene encabezados de fila y de columna y su recuadro se alcanza con el teclado; las páginas cumplen la política de seguridad de contenidos.
- **Las de siempre:** legibilidad de los textos y enlaces rotos.

## 9. Fuera de esta iteración

- Los trámites posteriores al diagnóstico (certificado de discapacidad, dependencia) y los plazos de espera: cambian a menudo y necesitan fuentes oficiales con fecha.
- Fichas propias para el GQ-ASC, el SRS-2, las pruebas de teoría de la mente y los cribados que no se usan en España.
- Las escenas.

Se pueden añadir más adelante sin cambiar la estructura.
