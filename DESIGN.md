---
name: "Ahora lo veo"
description: "Sistema visual editorial y de calma sensorial para la divulgación sobre autismo en mujeres y niñas."
colors:
  indigo-sereno: "#4F46A5"
  sobre-acento-claro: "#FFFFFF"
  lavanda-clara: "#B2ACF5"
  sobre-acento-oscuro: "#1A1827"
  papel-lavanda: "#F4F3F9"
  superficie-blanca: "#FFFFFF"
  tinta-ciruela: "#26223A"
  tinta-ciruela-suave: "#5A556F"
  linea-lila: "#DEDBEA"
  resaltado-calido: "#F5E2B1"
  noche-indigo: "#1A1827"
  superficie-nocturna: "#242134"
  tinta-niebla: "#ECEAF6"
  tinta-niebla-suave: "#ACA7C3"
  linea-nocturna: "#36324A"
  resaltado-tostado: "#605447"
  familia-sensorial: "#86C3C9"
  familia-emociones: "#EBA3AE"
  familia-social: "#EDCB72"
  familia-pensamiento: "#A9A6E8"
  familia-identidad: "#95CDA0"
  familia-clinico: "#C4BDB2"
typography:
  display:
    fontFamily: "'Lexend Variable', 'Trebuchet MS', sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.875rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Lexend Variable', 'Trebuchet MS', sans-serif"
    fontSize: "clamp(1.75rem, 3.2vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Lexend Variable', 'Trebuchet MS', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "'Lexend Variable', 'Trebuchet MS', sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "0em"
  body:
    fontFamily: "'Lexend Variable', 'Trebuchet MS', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "'Lexend Variable', 'Trebuchet MS', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0em"
rounded:
  mark: "4px"
  skip: "12px"
  callout: "14px"
  input: "16px"
  card: "20px"
  panel: "28px"
  pill: "999px"
spacing:
  xs: "0.375rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  2xl: "5.5rem"
components:
  button-primary:
    backgroundColor: "{colors.indigo-sereno}"
    textColor: "{colors.sobre-acento-claro}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.625rem"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.indigo-sereno}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.625rem"
    height: "48px"
  button-toggle:
    backgroundColor: "{colors.superficie-blanca}"
    textColor: "{colors.tinta-ciruela}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
    height: "44px"
  chip-family:
    backgroundColor: "{colors.familia-sensorial}"
    textColor: "{colors.tinta-ciruela}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.8rem"
  panel:
    backgroundColor: "{colors.superficie-blanca}"
    textColor: "{colors.tinta-ciruela}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.25rem, 3vw, 2.5rem)"
  card-compact:
    backgroundColor: "{colors.superficie-blanca}"
    textColor: "{colors.tinta-ciruela}"
    rounded: "{rounded.card}"
    padding: "1rem 1.25rem"
  callout-en-ninas:
    backgroundColor: "{colors.superficie-blanca}"
    textColor: "{colors.tinta-ciruela}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.25rem, 3vw, 2rem)"
  search-input:
    backgroundColor: "{colors.superficie-blanca}"
    textColor: "{colors.tinta-ciruela}"
    typography: "{typography.body}"
    rounded: "{rounded.input}"
---

# Design System: Ahora lo veo

## Overview

**Creative North Star: "El cuaderno sereno"**

El sistema visual de Ahora lo veo nace como un cuaderno editorial cálido, cercano y pausado: una guía en papel sin ruido que una familia puede consultar con calma cuando aparece la palabra «autismo». La lectura cómoda, el ritmo amplio entre bloques y la estabilidad visual prevalecen sobre cualquier adorno, evitando sobresaltos en momentos de incertidumbre o fatiga.

La calma sensorial rige cada decisión visual: las superficies reposan sobre fondos lavanda muy suaves de día y noche índigo de noche, sin sombras proyectadas, sin degradados ni animaciones llamativas. El sistema rechaza expresamente la estética clínica fría de hospital o blanco estéril, cualquier infantilización (colores estridentes, piezas de puzle, puntos o gamificación) y el ruido visual que dificulte la comprensión.

**Key Characteristics:**
- Lectura prioritaria con una sola familia tipográfica local (`Lexend Variable`), cuerpo amplio (`18px` / `1.125rem`) y medida contenida (`38em`).
- Profundidad plana por capas tonales (`--fondo` frente a `--superficie`) y bordes sólidos limpios, con cero sombras (`box-shadow: none`).
- Seis familias cromáticas de luminosidad equilibrada que forman la rueda de las familias del glosario, siempre acompañadas de etiqueta escrita y tinta oscura encima.
- Controles amables en forma de píldora y áreas táctiles amplias (`44–48px`) construidos sobre HTML semántico funcional sin JavaScript obligatorio.

## Colors

Una base neutra con matiz lavanda en modo claro e índigo profundo en modo oscuro, acompañada de un único acento interactivo y seis colores pastel de luminosidad equilibrada para las familias del glosario; todas las combinaciones de texto cumplen WCAG 2.2 AA.

### Primary
- **Índigo sereno** (`#4F46A5`): color de acento (`--acento`) en modo claro para enlaces, foco visible (`outline`), botones primarios, bordes de controles secundarios y filete de acento en notas sin familia. Contraste de 7,6:1 sobre blanco y con texto **Sobre acento claro** (`#FFFFFF`) encima.
- **Lavanda clara** (`#B2ACF5`): color de acento (`--acento`) en modo oscuro para enlaces, foco visible y acciones principales, con texto **Sobre acento oscuro** (`#1A1827`) encima (contraste de 8,4:1).

### Secondary
Los colores de las seis familias del glosario son idénticos en modo claro y oscuro, y llevan siempre texto **Tinta ciruela** (`#26223A`) encima:
- **Sensorial** (`#86C3C9`): chips, segmento de la rueda de las familias, bordes de «En niñas» y filetes en fichas sensoriales (contraste 7,8:1).
- **Emociones** (`#EBA3AE`): chips, segmento de la rueda y acentos estructurales en fichas emocionales (contraste 7,6:1).
- **Social** (`#EDCB72`): chips, segmento de la rueda y acentos estructurales en fichas sociales (contraste 9,8:1).
- **Pensamiento** (`#A9A6E8`): chips, segmento de la rueda y acentos estructurales en fichas cognitivas y de pensamiento (contraste 6,8:1).
- **Identidad** (`#95CDA0`): chips, segmento de la rueda y acentos estructurales en fichas de identidad y comunidad (contraste 8,4:1).
- **Clínico** (`#C4BDB2`): chips, segmento de la rueda y acentos estructurales en fichas clínicas y de apoyos (contraste 8,2:1).

### Neutral
- **Papel lavanda** (`#F4F3F9`) / **Noche índigo** (`#1A1827`): lienzo general de la página (`--fondo`) en modo claro y oscuro.
- **Superficie blanca** (`#FFFFFF`) / **Superficie nocturna** (`#242134`): fondo elevado de paneles, tarjetas, menú móvil y buscador (`--superficie`).
- **Tinta ciruela** (`#26223A`) / **Tinta niebla** (`#ECEAF6`): texto principal (`--tinta`, 13,9:1 y 14,7:1 sobre el lienzo) y color de texto obligatorio sobre cualquier chip o caja de familia en ambos modos.
- **Tinta ciruela suave** (`#5A556F`) / **Tinta niebla suave** (`#ACA7C3`): entradillas, metadatos de edad/lugar, fechas de comprobación y pie de página (`--tinta-suave`, 6,4:1 y 7,5:1).
- **Línea lila** (`#DEDBEA`) / **Línea nocturna** (`#36324A`): separadores horizontales, líneas de tabla y bordes sutiles de botones secundarios y tarjetas de directorio (`--linea`).
- **Resaltado cálido** (`#F5E2B1`) / **Resaltado tostado** (`#605447`): fondo para palabras resaltadas en los extractos de búsqueda de Pagefind y para el recuadro de dato clave en fichas de mitos (`--resaltado`).

### Named Rules
**The Color-Plus-Label Rule.** El color de una familia nunca es la única pista visual; siempre va acompañado de su nombre escrito porque varios tonos comparten luminosidad parecida.
**The Dark-Ink-On-Family Rule.** Sobre cualquier superficie tintada con un color de familia, el texto va siempre en Tinta ciruela (`#26223A`), incluso en modo oscuro; los enlaces dentro de esas cajas van en tinta y subrayados porque el acento claro nocturno no alcanza 4,5:1.
**The Screen-Only Dark Mode Rule.** El modo oscuro se aplica únicamente dentro de `@media screen` para que la impresión en papel conserve fondo claro y tinta oscura legible; además, en modo oscuro las ilustraciones atenúan su brillo (`brightness(0.9)`) para no deslumbrar.

## Typography

**Display Font:** `'Lexend Variable'` (con respaldo `'Trebuchet MS', sans-serif`)
**Body Font:** `'Lexend Variable'` (con respaldo `'Trebuchet MS', sans-serif`)
**Label/Mono Font:** `'Lexend Variable'` (sin familia monoespaciada aparte)

**Character:** Tipografía humanista de una sola familia servida íntegramente en local (`@fontsource-variable/lexend`), elegida por su espaciado abierto y menor esfuerzo de lectura; diferencia jerarquías mediante escala clara y pesos del 300 al 600 sin cargar fuentes externas.

### Hierarchy
- **Display** (`600`, `clamp(2.25rem, 5vw, 3.875rem)`, interlineado `1.15`, tracking `-0.02em`): `h1` de portada y páginas principales, con `text-wrap: balance` e `hyphens: auto`.
- **Headline** (`600`, `clamp(1.75rem, 3.2vw, 2.25rem)`, interlineado `1.15`, tracking `-0.01em`): `h2` de sección principal en portada, glosario y texto corrido.
- **Title** (`600`, `1.5rem`, interlineado `1.15`–`1.25`, tracking `-0.01em`): `h3`, encabezados de apartado dentro de fichas (`.ficha h2`), títulos de paso en diagnóstico y nombre del término al girar una escena.
- **Lead** (`300`–`500`, `1.3125rem`, interlineado `1.6`): entradillas en peso `300`, nombres equivalentes y texto principal de tarjetas de escena en `400`, títulos de términos en el glosario en `600` y dato destacado en mitos en `500`.
- **Body** (`400`, `1.125rem` / `18px`, interlineado `1.6`): texto corrido, listas, botones primarios y buscador, limitado a `max-width: 38em` y `text-wrap: pretty`.
- **Label** (`400`–`500`, `0.9375rem` / `15px`, interlineado `1.6`): chips de familia (`500`), metadatos de edad/lugar (`500`), navegación de escritorio y selector de tema (`500`), fechas de comprobación y pie de página (`400`).

### Named Rules
**The Single Local Face Rule.** Toda la interfaz utiliza exclusivamente `Lexend Variable` servida desde el propio sitio (nunca desde Google Fonts ni CDNs externos); la jerarquía se resuelve con tamaño, peso e interlineado.
**The 320px Reflow Rule.** El cuerpo aplica `overflow-wrap: break-word`, los párrafos limitan su línea a `38em` y ningún texto auxiliar —incluidos los controles e ítems de Pagefind— baja de `0.9375rem` (`15px`), garantizando reflujo limpio a `320px`.

## Layout

El contenido vive dentro de un contenedor centrado `.contenedor` (`max-width: 70rem`, relleno lateral fluido `clamp(1rem, 4vw, 2.5rem)`). Las páginas de lectura, fichas, escenas y búsqueda restringen su columna a `44rem` para proteger el ancho de lectura, mientras que la página de diagnóstico se amplía a `52rem` para dar cabida a la tabla comparativa de herramientas (que envuelve un bloque `.desplazable` con `overflow-x: auto`, `min-width: 36rem` y `tabindex="0"` para teclado).

La portada articula texto (`flex: 1 1 30rem`) y rueda de las familias (`flex: 0 1 25rem`, máximo `380px`) mediante `flex-wrap` sin rupturas rígidas. Las cartas de metadatos técnicos usan rejilla fluida (`grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr))` en herramientas y `minmax(16rem, 1fr)` en programas, con `.ancha` ocupando todo el ancho). El ritmo vertical es pausado: `2.5rem` entre secciones de una ficha, `3rem` entre grupos del glosario y `5.5rem` antes del pie de página.

Breakpoints observados:
- Hasta `22.99rem`: el menú móvil abierto pasa a ocupar toda la fila (`flex-basis: 100%`).
- De `23rem` a `63.99rem`: cabecera en rejilla de 3 columnas (`minmax(0, 1fr) auto 6.75rem`), con el selector de tema reducido a botón cuadrado de icono (`44×44px`) y su etiqueta oculta visualmente.
- Desde `48rem`: las ilustraciones de escenas y fichas usan el tamaño de lectura (`40rem`–`42rem`).
- Desde `64rem`: desaparece el menú móvil `<details>`, aparece la navegación horizontal de escritorio en una sola fila y el selector de tema muestra su texto («Modo oscuro»).
- Desde `72rem`: aumenta la separación entre enlaces de cabecera (`1.25rem`) y bloques (`1.5rem`).

## Elevation & Depth

El sistema es completamente plano y se construye mediante capas tonales sin sombras (`box-shadow: none`, anulando también `--pf-shadow-sm`, `--pf-shadow-md` y `--pf-shadow-lg` en Pagefind) ni degradados. La separación espacial entre elementos se consigue exclusivamente contrastando el lienzo (`--fondo`) con las superficies (`--superficie`) y apoyándose en bordes sólidos con jerarquía funcional:

- `1px`–`1.5px` (`--linea`): separadores de pie, líneas de tabla, tarjetas de directorio de organizaciones y panel del menú móvil.
- `2px` (`--linea` o `--acento`): contorno de botones secundarios, selector de tema, botón «Esto lo hemos visto» y disparadores `<details>`.
- `3px` (`--familia` o `--acento`): marco completo del recuadro «En niñas» y del reverso desplegado en escenas.
- `4px` en borde izquierdo (`--familia` o `--acento`): citas de explicación («Por qué es un ejemplo», explicaciones de escenas de elegir y recuadros de la Comunitat Valenciana).

El foco de teclado nunca usa sombras: emplea `outline: 3px solid var(--acento)` con `outline-offset: 3px` (`4px` en la tabla desplazable). El movimiento queda reducido a un fundido de opacidad (`0.2s ease-out`) y un giro de flecha (`180deg`, `0.2s ease-out`) al abrir desplegables, suprimidos a `0.01ms` bajo `prefers-reduced-motion: reduce`.

### Named Rules
**The Zero-Shadow Tonal Layering Rule.** Ninguna tarjeta, botón, panel ni buscador usa `box-shadow` ni gradientes; la profundidad se expresa únicamente por contraste tonal entre fondo y superficie junto con bordes limpios.

## Shapes

Geometría blanda y continua pensada para transmitir cercanía sin aspecto infantil:
- **Píldora completa (`999px`):** botones primarios y secundarios, selector de tema, menú móvil cerrado, chips de familia, botones de marcado/borrado, pestañas de vista del glosario y botones `<summary>` de desplegables interactivos.
- **Panel amplio (`28px`):** paneles editoriales (`.panel`), tarjetas del glosario (`.entrada`), tarjetas principales de `/escenas/`, bloque «Lo que habéis reconocido» y recuadro «En niñas».
- **Tarjeta compacta (`20px`):** tarjetas de listados (mitos, programas, organizaciones, ejemplos de escena en ficha), panel desplegado del menú móvil, reverso de tarjetas en `/escenas/` e ilustraciones en `/escenas/`.
- **Contenedor de entrada (`16px`):** campo y resultados del buscador Pagefind (`--pf-border-radius`).
- **Caja auxiliar e ilustración de ficha (`14px`):** dato clave en fichas de mitos, ilustraciones dentro de fichas de término y cajas de explicación con esquinas redondeadas solo a la derecha (`0 14px 14px 0`).
- **Utilidades (`12px` y `4px`):** enlace de salto al contenido (`12px`) y resaltados `<mark>` de búsqueda (`4px`).

La silueta propia del sitio es la rueda circular dividida en seis sectores iguales (`Rueda.astro`): las seis familias del glosario (sensorial, emociones, social, pensamiento, identidad y clínico), cada una con su color, que acompaña a la familia por toda la web.

## Components

Los componentes responden a una filosofía amable, clara y contenida: formas redondeadas generosas, áreas táctiles amplias (`44–48px`) y estados evidentes (relleno, borde, subrayado o `Highlight` en colores forzados) sin gestos bruscos ni florituras decorativas.

### Buttons
- **Shape:** píldora completa (`999px`) con altura mínima de `48px` en acciones principales/navegación y `44px` en controles compactos.
- **Primary:** fondo acento (`#4F46A5` en claro / `#B2ACF5` en oscuro), texto sobre-acento (`#FFFFFF` / `#1A1827`), peso `500`, relleno `0.75rem 1.625rem`; en `:hover` mantiene el color y añade subrayado.
- **Secondary / Outline:** fondo transparente, borde `2px solid var(--acento)` y texto `--acento`; en estado `:disabled` baja a `opacity: 0.4` con cursor por defecto y sin subrayado.
- **Toggle / Action Pills:** selector de tema, «Esto lo hemos visto» y «Borrar lo marcado» usan fondo transparente o `--superficie`, borde `2px solid var(--linea)` (o `--tinta` en borrar). Al activarse (`aria-pressed="true"`), el botón de tema engrosa su borde a `--tinta` y el de marcado pasa a relleno `--acento` con icono de verificación visible; bajo `@media (forced-colors: active)`, ambos adoptan `Highlight` / `HighlightText`.

### Chips
- **Style:** píldora (`999px`), relleno `0.2rem 0.8rem`, tipografía `0.9375rem` en peso `500`, fondo del color de la familia (`.f-<id>`) y texto fijo **Tinta ciruela** (`#26223A`).
- **State:** informativos, no interactivos; siempre muestran el nombre completo de la familia.

### Cards / Containers
- **Corner Style:** `28px` en `.panel`, tarjetas de glosario y visor de escenas; `20px` en listados secundarios (`.escena`, `.mito`, `.programa`, `.organizacion`).
- **Background:** `--superficie` sobre el lienzo `--fondo`, sin sombra.
- **Shadow Strategy:** nula (`box-shadow: none`).
- **Border:** sin borde en paneles y tarjetas principales; `1px solid var(--linea)` en `.organizacion`; borde izquierdo de `4px solid var(--acento)` en `.cv` y `.apartado` (con relleno izquierdo `1rem`).
- **Internal Padding:** `clamp(1.25rem, 3vw, 2.5rem)` en `.panel`, `1.25rem 1.5rem` en entradas del glosario y `1rem 1.25rem` en tarjetas compactas.

### Inputs / Fields
- **Style:** Pagefind tematizado vía variables `--pf-*`: fondo `--superficie`, texto `--tinta`, borde `--linea`, radio `16px`, fuente `Lexend Variable` a `1.125rem` (`18px`) y sombras anuladas (`none`).
- **Focus:** anillo exterior de `3px` con `--pf-outline-focus: var(--acento)`.
- **Results / Highlights:** los extractos evitan el truncado a una línea (`white-space: normal`), ningún texto auxiliar baja de `0.9375rem` y las coincidencias `<mark>` usan `--resaltado` con radio `4px`.

### Navigation
- **Desktop (`>= 64rem`):** lista horizontal en una fila (`0.9375rem`), enlaces en `--tinta`, elemento activo `aria-current="page"` en peso `600` y subrayado más grueso (`0.15em`).
- **Mobile (`< 64rem`):** componente `<details class="nav-movil">` nativo sin JS obligatorio; botón píldora (`44px` mínimo, borde `2px solid var(--linea)` que pasa a `--tinta` al abrirse, o `Highlight` en colores forzados), panel desplegado con radio `20px` y cierre con tecla `Escape` como mejora progresiva.
- **Glossary View Switcher:** enlaces en píldora (`0.4rem 1rem`, borde `2px solid var(--acento)`), donde la vista activa (`aria-current="page"`) rellena el fondo en `--acento`.
- **Skip Link:** `.saltar` posicionado arriba a la izquierda (`12px` radio, fondo `--superficie`), oculto mediante `transform` hasta recibir foco.

### Interactive Disclosures
- Los desplegables nativos `<details>` («¿Qué hay detrás?», opciones de escenas de elegir y «Por qué es un ejemplo») funcionan íntegramente sin JavaScript: disparador en píldora (`min-height: 44px`, borde `2px solid var(--acento)` o flecha rotatoria `0.2s ease-out`) que revela el contenido dentro de un marco de familia (`3px solid var(--familia)`) o caja explicativa con filete izquierdo de `4px` y fundido breve (`0.2s ease-out`). En `/escenas/`, un script progresivo convierte la lista en visor de una tarjeta con gestión explícita del foco y región `aria-live="polite"`.

### Signature Components: Rueda de las familias & Recuadro «En niñas»
- **Rueda de las familias (`Rueda.astro`):** SVG de 6 sectores iguales con colores de familia (`--familia`), mostrado a `34px` como emblema junto al nombre en cabecera (decorativo `aria-hidden="true"`) y a `360px` en portada con etiquetas de texto en `14px` peso `500` y descripción accesible completa.
- **Recuadro «En niñas» (`.en-ninas`):** contenedor destacado presente en fichas del glosario, herramientas y programas; usa fondo `--superficie`, radio `28px`, relleno `clamp(1.25rem, 3vw, 2rem)` y borde completo de `3px` en el color de la familia de la ficha (o `--acento` en herramientas y programas que no tienen familia).

## Do's and Don'ts

### Do:
- **Do** respeta **The Zero-Shadow Tonal Layering Rule** diferenciando contenedores mediante `--fondo`, `--superficie` y bordes limpios de `1px`–`4px`.
- **Do** aplica **The Color-Plus-Label Rule** y **The Dark-Ink-On-Family Rule**: acompaña siempre cada color de familia con su nombre escrito y usa **Tinta ciruela** (`#26223A`) sobre él en ambos modos.
- **Do** mantén áreas interactivas de al menos `44px` de alto (`48px` en botones primarios) y un contorno de foco visible de `3px` (`outline-offset: 3px`).
- **Do** garantiza que toda pieza interactiva funcione primero en HTML semántico sin JavaScript (como `<details>` y enlaces entre vistas) y soporte `prefers-reduced-motion` y `forced-colors: active`.
- **Do** cumple **The Single Local Face Rule** y **The 320px Reflow Rule** usando solo `Lexend Variable` local, cuerpo mínimo de `18px` (`15px` en etiquetas) y contenedores seguros con `min-width: 0` y `overflow-wrap: break-word`.

### Don't:
- **Don't** añadas `box-shadow`, brillos difusos, degradados ni animaciones llamativas o continuas en ningún componente.
- **Don't** cargues fuentes externas (Google Fonts, Typekit) ni introduzcas una segunda familia tipográfica.
- **Don't** escribas atributos `style="..."` ni scripts inline añadidos a mano que rompan la política CSP estricta (`astro.config.ts`).
- **Don't** uses el acento de modo oscuro (`#B2ACF5`) sobre cajas tintadas de familia, ni representes información únicamente por color.
- **Don't** recurras a códigos visuales infantiles (piezas de puzle, insignias, puntos, mascotas caricaturescas) ni a estética clínico-fría estéril.
