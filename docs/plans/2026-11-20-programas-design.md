# Programas estudiados y apoyos del día a día: diseño

Idea del 2026-11-20, al revisar la ficha de funciones ejecutivas: el glosario describe bien cada término, pero las familias también quieren saber qué se hace para ayudar. Se decidió añadir dos cosas, separadas:

1. **Apoyos del día a día:** lo que una familia o el colegio pueden hacer sin un programa formal, documentado por guías y entidades. Van en el «Qué hacer» de cada ficha.
2. **Programas estudiados:** programas e intervenciones que se han probado en estudios, descritos con todo el detalle que permitan las fuentes y con el peso de las pruebas. Tienen su propia sección.

Se empieza solo con **funciones ejecutivas**, como prueba del formato. Si convence, se extiende a las demás fichas (las primeras candidatas: meltdown, rigidez y rutinas, hiper e hiposensibilidad y atención conjunta). Es el primer paso hacia el «semáforo de terapias» de la visión a largo plazo.

Se descartaron otras dos formas: meterlo todo en la ficha (se haría muy larga y un programa que sirve para varias fichas habría que repetirlo) y una guía por tema (se solapaba con el «Qué hacer» de la ficha).

## 1. La sección «Programas»

`/programas/`, con una portada y una página por programa (`/programas/unstuck-and-on-target/`). La portada los agrupa por ficha del glosario.

Cuenta como programa tanto uno con nombre propio como un tipo de intervención estudiado como tal («entrenamiento de la memoria de trabajo con ordenador»). Los apoyos sueltos, como un temporizador, van en la ficha.

Cada página sigue el modelo de las fichas de herramientas de `/diagnostico/`:

- **Carta de datos:** para qué se usa (con enlace a su ficha), edades, quién lo aplica, formato (individual o en grupo; en el colegio, en consulta o en casa), duración (sesiones y semanas) y si hay versión o uso documentado en España.
- **Qué es.**
- **Cómo es:** qué se hace en una sesión, con ejemplos propios. Nunca se copia el material del manual.
- **Qué encontraron los estudios:** con cuántas niñas y niños, de qué edades y con qué peso.
- **En niñas:** con datos, o «Sin datos sobre niñas».
- **Limitaciones** y **qué preguntar en consulta.**
- **Fuentes** y fecha de revisión.

### El peso de las pruebas

Un dato fijo de una lista corta, que en la página se dice con palabras:

| Valor | Cómo se dice |
|---|---|
| `revisiones` | Varias revisiones coinciden en que ayuda |
| `ensayo` | Al menos un ensayo controlado encontró mejoras |
| `pequenos` | Solo hay estudios pequeños o sin grupo de comparación |
| `sin-estudios` | No hay estudios controlados |
| `sin-beneficio` | Los estudios no encuentran beneficio |

Más adelante, esta lista será la base del semáforo de terapias.

### Las edades

Como texto («de 8 a 11 años») y como dos números en años, `edad_desde` y `edad_hasta`, para poder ordenar y agrupar.

## 2. Qué cambia en la ficha del glosario

- **«Qué hacer»** sigue igual de nombre y de sitio, pero se amplía con más apoyos del día a día documentados, cada uno con su fuente. Texto corrido, de unas 150 palabras como mucho. Cuando las fuentes distinguen por edad, se dice (una agenda con dibujos o fotos para las más pequeñas, una lista escrita cuando ya leen).
- **«Programas estudiados»**, un apartado nuevo justo después de «Qué hacer». Sale solo de los programas que dicen estar relacionados con la ficha, como «Mitos sobre esto». Se agrupa por edades: hasta los 6 años, de 6 a 12 años y a partir de 12 (este grupo, solo si hay algo). Cada programa sale en el grupo de la edad en que empieza, con sus edades exactas a la vista. Dentro de cada grupo, primero los que tienen más pruebas a favor. Cada uno, en una línea: el nombre enlazado, para qué sirve en pocas palabras y el peso de las pruebas. El apartado termina con una frase fija: «Que existan no quiere decir que haya que hacerlos. Si os interesa alguno, preguntad por él a quien la atiende». Si no hay programas, no sale.

## 3. Las reglas

En una guía nueva de la skill de lenguaje claro, `references/programas.md`:

- **Informar, no recomendar.** Qué es, qué se sabe y qué preguntar; nunca «haced este programa», y nunca para un caso concreto.
- **El peso, con palabras y sin inflarlo.** «Un ensayo con 67 niñas y niños encontró…», nunca «está demostrado». Los resultados nulos se dicen igual de claro.
- **El objetivo, dicho con respeto.** Lo que se busca es el bienestar, la autonomía o lo que a ella le cuesta, no que «parezca menos autista». Si un programa busca eso, se dice.
- **Sin copiar materiales.** Se describe una sesión con ejemplos propios, sin reproducir manuales, fichas ni guiones con derechos.
- **Sin vender.** Ni enlaces a quien vende el programa ni precios. Si el material es abierto o gratuito, se puede decir.
- **«En niñas» siempre**, con cuántas niñas había en los estudios.
- **Fecha de revisión**, como en todo.

## 4. Cómo se busca y se comprueba

1. **El mismo prompt a GLM y a Gemini**, en su modo de investigación a fondo: `propuestas/programas/prompt-funciones-ejecutivas.md`. Piden un mapa, no textos: programas con sus estudios (DOI o PMID, diseño, participantes, niñas, edades, medidas y resultados), revisiones, guías, uso en España y apoyos del día a día con su frase literal. Se les prohíbe inventar referencias y se les pide marcar lo que no hayan comprobado. Sus respuestas van a `propuestas/programas/glm.md` y `gemini.md`, sin versionar.
2. **Se cruzan y se comprueba todo:** cada referencia, en PubMed, Europe PMC o Crossref, por su API. Se descarga el texto completo si está en abierto, y si no, el resumen, y se dice. Además se buscan las guías por cuenta propia: NICE CG170, ESCAP y la SEPEAP. Lo que no esté en una fuente que podamos leer no se usa.
3. **Un dossier con citas literales**, `notas/dossieres/programas-funciones-ejecutivas.md`, comprobado con `comprobar-citas.mjs`.
4. **Se redacta**, se pasa el script de legibilidad y se revisa en local antes de publicar.

## 5. Cómo se construye y se prueba

- **Datos:** una colección `programas` con su esquema. La compilación para si un programa enlaza a una ficha que no existe o si le falta «En niñas».
- **Páginas:** `/programas/`, `/programas/<id>/` y el apartado «Programas estudiados» en la ficha. La sección no va en el menú hasta que haya programas de varias fichas; mientras, se llega desde las fichas y desde la búsqueda.
- **Pruebas unitarias:** el esquema, la agrupación por edades y los enlaces internos a `/programas/`.
- **Pruebas de navegador:** la carta de datos, los programas de la ficha agrupados por edades, que todo quepa en 320 px y la accesibilidad con axe en las páginas nuevas.
