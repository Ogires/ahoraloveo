# Escenas de elegir

Una escena de elegir es una situación corta con una pregunta del tipo «¿Crisis o rabieta?» y dos o tres opciones, más «No lo sé». Cada opción abre su explicación. Sirve para aprender a distinguir dos cosas que se confunden, no para poner nota. Van en la ficha de su término, debajo de «No confundir con», y de vez en cuando como una tarjeta más en `/escenas/`.

## Reglas

1. **Solo para lo que la ficha ya dice que se confunde.** La pareja sale de «No confundir con» de la ficha: crisis o rabieta, desconexión o «no hace caso», camuflaje o timidez. Si la ficha no explica la diferencia, primero va a la ficha, con su fuente.
2. **La situación sigue las reglas de las escenas** ([escenas.md](escenas.md)): inventada, de 60 palabras como mucho, con edad y lugar, sin nombres propios, vista desde fuera, sin nombrar el término y sin repetir el ejemplo de «Cómo se ve» ni las escenas de la ficha.
3. **Se ve la pista.** La escena tiene que dejar ver lo que las distingue según la ficha: que no para aunque le den lo que pedía, que llega al final de una tarde larga, que para en cuanto sabe que lo tendrá.
4. **No siempre gana el término autista.** Alguna escena puede encajar mejor con lo que se confunde (una rabieta), y en alguna, con lo que se ve, no se puede saber. Si una escena encaja con una rabieta, la explicación lo dice sin más: eso no dice nada sobre si es autista o no.
5. **No es un examen.** Nada de «correcto», «incorrecto», «acierto», «fallo» ni «error». Cada explicación dice qué encaja mejor y por qué: «Encaja mejor con una crisis, porque…». Si eligen lo otro: «Desde fuera se parecen, pero…». Si eligen «No lo sé»: «Es lógico dudar. La pista está en…».
6. **Cada explicación se lee sola.** Quien abre una opción no ha leído las demás: cada una nombra la pista y lo que encaja mejor. 60 palabras como mucho.
7. **Solo fuentes de sus fichas.** Una escena de elegir no añade nada que sus fichas no digan con su fuente, y sus `fuentes` están en las de sus fichas (lo comprueba la compilación).
8. **«No lo sé», siempre la última.** Y se presenta como algo razonable, nunca como un fallo.
9. **Lenguaje claro y sin culpas.** Como en todo: sin «berrinche», «manipula» ni «se porta mal», y sin culpar a la familia ni a la niña.

## En el YAML

Cada escena de elegir es un fichero en `src/content/escenarios/`, con el nombre de la pareja y un número:

```yaml
pregunta: ¿Crisis o rabieta?
edad: 3 años
lugar: a la salida de la guardería
protagonista: nina # nina o nino
situacion: >
  Otra niña sale comiendo un bollo, y ella quiere uno. Llora, grita y se tira al
  suelo. Su abuelo le dice que en casa le espera uno de chocolate. Ella se
  levanta enseguida, le da la mano y le cuenta lo que ha pintado en clase.
opciones:
  - texto: Una crisis
    explicacion: >
      Desde fuera se parecen, pero esta escena encaja mejor con una rabieta: …
  - texto: Una rabieta
    explicacion: >
      Encaja mejor con una rabieta: quería algo y paró en cuanto supo que lo iba
      a tener. Eso no dice nada sobre si es autista o no. …
  - texto: No lo sé
    explicacion: >
      Es lógico dudar, porque desde fuera se parecen. La pista está en cómo acaba: …
terminos: [meltdown]
fuentes: [paula-ansiedad-2015]
revisado: 2026-11-16
```

Al crear una, hay que ponerla también en `ORDEN_ESCENAS` (`src/lib/tarjetas.ts`) como `elegir-<id>`, sin que quede junto a otra tarjeta de la misma familia.

## Lo que se comprueba solo

- **El esquema** rechaza una pregunta sin signos de interrogación, una situación o una explicación de más de 60 palabras, menos de dos opciones o más de tres (sin contar «No lo sé»), una última opción que no sea «No lo sé» y las palabras de examen.
- **La compilación** para si una escena de elegir cita una fuente que no está en sus fichas, si va en una ficha sin «No confundir con» o si no está en el orden de las tarjetas.

## Lista de comprobación

- [ ] La pareja está en «No confundir con» de la ficha, con su fuente.
- [ ] La situación cumple la lista de [escenas.md](escenas.md).
- [ ] Se ve la pista que las distingue, y la explicación la nombra.
- [ ] En el conjunto, no siempre gana el término autista.
- [ ] Ninguna explicación habla de acertar o fallar, y cada una se entiende sola.
- [ ] «No lo sé» es la última opción.
- [ ] Revisada por una persona antes de publicarse.
