# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Público principal:** familias en España con hijos e hijas de 0 a 12 años ante una sospecha de autismo o un diagnóstico reciente, con foco específico en cómo se presenta en mujeres y niñas.
- **Público secundario:** el entorno cotidiano de las niñas y niños —abuelas y abuelos, profesorado, personal de comedor y extraescolares, y familias de compañeras y compañeros—.
- **Público futuro (sin fecha):** adolescentes y mujeres adultas (diagnóstico tardío, camuflaje y agotamiento).

## Product Purpose

Web divulgativa sobre autismo para quien empieza («Para cuando aparece la palabra "autismo"»), orientada a visibilizar cómo se presenta en mujeres y niñas frente al sesgo histórico masculino en la investigación y las herramientas diagnósticas, y ante la escasez de información rigurosa en español.

Hace posible entender la terminología clave, reconocer situaciones del día a día, comprender el proceso y las herramientas de diagnóstico, desmontar mitos frecuentes, consultar programas estudiados y orientarse sobre a quién acudir con calma y rigor.

**Prioridad activa confirmada:** consolidar y mejorar las secciones ya publicadas (`Glosario`, `Escenas`, `Diagnóstico`, `Mitos`, `Programas estudiados` y `A quién acudir`).

## Positioning

- **Foco transversal en mujeres y niñas:** cada ficha y guía explica qué cambia en ellas; cuando no existe evidencia publicada sobre niñas, lo declara explícitamente como «sin datos».
- **Rigor verificable con red de seguridad en compilación:** toda afirmación enlaza a fuentes clasificadas en 6 niveles de peso (*Consenso*, *Estudios* —indicando diseño, muestra, edades y porcentaje de niñas—, *Entidades*, *Divulgación*, *Oficial* y *Experiencia*) y lleva fecha de revisión; la compilación falla si falta una fuente, una fecha o una referencia válida.
- **Explicar, nunca evaluar ni comercializar:** no ofrece tests caseros ni puntuaciones de riesgo, no vende ni recomienda terapias concretas, y declara con transparencia la autoría (una persona que no es profesional de la salud).
- **Privacidad por diseño y mejora progresiva real:** sin cuentas, sin cookies, sin enviar al servidor lo que la familia marca o consulta, y plenamente legible sin JavaScript.

## Operating Context

- Sitio web 100 % estático construido con Astro, ya publicado en `https://ahoraloveo.es` (abierto a buscadores desde el 2026-11-26) y servido en Cloudflare Workers (con Worker `redirecciones/` 301 desde `www` y el antiguo subdominio).
- Búsqueda local en el navegador mediante Pagefind (`/buscar/`), estadísticas sin cookies con Cloudflare Web Analytics y buzón editorial `hola@ahoraloveo.es` (además del enlace «esto está mal o desactualizado» en las fichas).
- Ámbito estatal (España); la guía territorial (`/a-quien-acudir/`) cubre actualmente el camino público y las asociaciones de la Comunitat Valenciana (Alicante, Castellón y Valencia), junto a directorios estatales para el resto de España.
- Contexto de uso habitual: familias que consultan desde el móvil o en dispositivos compartidos, a menudo en momentos de incertidumbre tras aparecer la sospecha o preparando una consulta pediátrica.

## Capabilities and Constraints

### Capacidades publicadas

- **Glosario (`/glosario/`):** fichas ordenadas por familias y alfabéticamente, con el término más habitual en español (o inglés si es el de uso común), su equivalente en el otro idioma, otros nombres, definición, cómo se ve, con qué no confundirlo, apartado específico *En niñas*, orientación práctica opcional, programas estudiados, mitos vinculados, términos relacionados, enlaces automáticos a entidades en cada apartado y escenas cotidianas.
- **Escenas «¿Lo habéis visto?» (`/escenas/`):** entrada ligera al glosario mediante tarjetas de una en una, con marcado local en `localStorage` protegido con `try/catch`, aviso explícito para dispositivos compartidos, botón visible de «Borrar lo marcado» y lista de «Lo que habéis reconocido», además de escenas de elegir («¿Crisis o rabieta?» y parejas similares) siempre con la opción «No lo sé» y sin juicios de «correcto» o «fallo». Funciona íntegro sin JavaScript mediante listas y `<details>`.
- **Diagnóstico (`/diagnostico/`):** cronograma del proceso diagnóstico y fichas de herramientas (qué miden, limitaciones, qué cambia en niñas y qué preguntar al profesional).
- **Mitos (`/mitos/`), Programas estudiados (`/programas/`), A quién acudir (`/a-quien-acudir/`) y Buscador (`/buscar/`):** secciones públicas completas con fuentes verificadas y selector manual de tema claro/oscuro que respeta la preferencia del sistema.

### Restricciones técnicas obligatorias

- Salida 100 % estática en Astro con validación estricta de colecciones y referencias en compilación.
- Sin JavaScript obligatorio: toda interacción es una capa progresiva sobre HTML semántico accesible sin scripts.
- Política de Seguridad de Contenidos (CSP) estricta en `astro.config.ts` y `public/_headers`: sin estilos ni scripts inline añadidos a mano, `font-src 'self'`, `object-src 'none'` y `frame-ancestors 'none'`.
- Tipografía exclusivamente local (`Lexend Variable` servida desde la propia web, sin fuentes externas).
- Privacidad local sin cuentas ni cookies; ningún dato marcado por la familia sale del navegador.
- Red de pruebas automatizadas: Vitest, `astro check && astro build`, Pagefind, `linkinator` y Playwright + axe en modo claro y oscuro, reflujo a 320 px, navegación por teclado y CSP.

### Guía de estilo editorial y licencias

- Forma principal: «autista» o «autismo» («niñas autistas», «mujeres autistas», «el autismo en mujeres y niñas»); «autismo femenino» como máximo una vez por página solo para facilitar búsquedas; «TEA» para lo clínico y trámites (explicado la primera vez); «neurodivergente» únicamente como término paraguas para varias condiciones, nunca como sustituto de «autista» (una persona es *neurodivergente*; un grupo es *neurodiverso*).
- Prohibido usar «sufre» o «padece» autismo, «enfermedad», ni «normal» como opuesto a autista (usar «neurotípico»).
- Tono de vosotros a vosotros, «vuestro hijo o hija» sin masculino genérico, frases cortas, jerga siempre explicada, sin alarmismo ni positividad forzada.
- Licencias: código bajo MIT (`LICENSE`), textos bajo CC BY-SA 4.0 (`LICENCIA-TEXTOS.md`), tipografía Lexend bajo SIL Open Font License; web sin fines comerciales ni publicidad.

### Decisiones abiertas y elementos sin fecha (no dar por decididos ni implementar sin confirmación)

- **Señales y Cuaderno de observaciones para el pediatra** (planificados en el diseño fundacional, aún no creados en el código).
- **Adolescentes y mujeres adultas**, ampliación de guías locales y trámites a otras comunidades autónomas, y **versión en valenciano**.
- **Sello «revisado por»** (si en algún momento colabora un profesional o entidad).
- **Logotipo definitivo y sello visual del apartado «En niñas»**.
- **Sección «Un día con Lucía»** (aparcada; implicaría reabrir la licencia no comercial de pictogramas ARASAAC) y **futuro asistente RAG**.

## Brand Commitments

- **Nombre definitivo:** Ahora lo veo (`ahoraloveo.es`), subtítulo **Autismo en mujeres y niñas**, lema **«Para cuando aparece la palabra "autismo"»**.
- **Autoría visible:** **Sergio Bonet**, con enlace a su perfil profesional.
- **Tono vinculante:** cálido, editorial y sereno; nunca infantil (sin puntos, rankings ni medallas) ni clínico-frío.
- **Restricciones visuales vinculantes:** calma sensorial (sin sombras pesadas, sin gradientes estridentes, sin animaciones llamativas, respetando `prefers-reduced-motion` y `forced-colors`); únicamente `Lexend Variable` servida en local; sistema de seis familias del glosario (*Sensorial*, *Emociones*, *Social*, *Pensamiento*, *Identidad* y *Clínico*) en el que el color siempre va acompañado de su nombre escrito.
- **Aviso editorial obligatorio en el pie de todas las páginas:** «Información divulgativa. No sustituye un diagnóstico ni el consejo profesional».

## Evidence on Hand

- `docs/plans/2026-10-30-ahoraloveo-design.md`: documento fundacional de propósito, principios, modelo de contenido, guía de estilo e identidad visual.
- Colecciones de contenido validadas en `src/content/`:
  - `glosario/` (21 fichas con escenas e ilustraciones)
  - `escenarios/` (7 escenas de elegir)
  - `herramientas/` (7 herramientas de diagnóstico) y `proceso/` (6 pasos del proceso diagnóstico)
  - `mitos/` (23 fichas)
  - `programas/` (27 programas estudiados)
  - `acudir/` (1 guía de la Comunitat Valenciana) y `organizaciones/` (29 organizaciones comprobadas)
  - `fuentes/` (268 fuentes clasificadas por nivel de evidencia) y `entidades/` (12 entidades con enlazado automático)
- `src/lib/tokens.ts` y `src/styles/global.css`: implementación vigente de los tokens y estilos del sitio.
- **Ausencias que nunca deben fabricarse:** no existen testimonios de familias inventados, avales profesionales ni sello «revisado por», métricas clínicas propias ni ítems reproducidos de pruebas diagnósticas; cuando falte evidencia sobre niñas, debe figurar «sin datos».

## Product Principles

1. **Confianza y trazabilidad:** toda afirmación enlaza a una fuente clasificada por nivel y lleva fecha de revisión; cuando no hay evidencia en niñas, se indica «sin datos».
2. **Explicar, no evaluar ni vender:** acompañar con rigor sin tests caseros, puntuaciones de riesgo ni promoción de terapias.
3. **Calma sensorial y cercanía adulta:** experiencia serena, editorial y respetuosa, nunca infantilizada, gamificada ni clínico-fría.
4. **Accesibilidad universal sin JavaScript obligatorio:** contenido y herramientas plenamente utilizables con teclado, lector de pantalla, modo claro u oscuro, colores forzados y reflujo a 320 px.
5. **Privacidad desde el diseño:** sin cuentas, sin cookies y sin enviar al servidor nada de lo que la familia marca o anota.

## Accessibility & Inclusion

- Cumplimiento estricto de **WCAG 2.2 AA** en modo claro y modo oscuro, verificado automáticamente con axe y Playwright en cada cambio.
- Reflujo completo a **320 px** de ancho y texto ampliable sin romper la maquetación ni provocar desplazamiento horizontal.
- Respeto obligatorio a `prefers-reduced-motion`, `prefers-color-scheme` y `forced-colors: active`.
- Funcionamiento completo sin JavaScript obligatorio, navegación íntegra por teclado (foco visible y gestión explícita del foco al abrir o cambiar tarjetas) y compatibilidad con lectores de pantalla (atributo `lang="en"` en anglicismos, regiones `aria-live` educadas y revisión manual con NVDA).
- El color nunca actúa como único indicador de significado: siempre va acompañado de etiqueta textual.
- Lenguaje inclusivo y neuroafirmativo: perspectiva de género sin masculino genérico y rechazo de términos patologizantes.
