# Mitos sobre el autismo

Un mito es algo que se suele oír sobre el autismo y no es así. Cada uno tiene su página en `/mitos/`: primero el mito, entre comillas, y justo debajo lo que sabemos. Sirve para que una familia sepa qué contestar, o pueda mandar el enlace, cuando alguien le suelta el mito en la consulta, en el cole o en una comida.

## Reglas

1. **Primero el mito, y el dato justo debajo.** El mito va entre comillas, con «Se suele oír» encima, para que nadie lo lea como una afirmación de la web. El dato es también la descripción de la página: al compartir el enlace, el mito nunca llega solo.
2. **El mito, como se dice en la calle.** «Es cosa de chicos», no «Existe la creencia de que el TEA afecta sobre todo a varones». En el YAML va sin comillas, porque las pone la página. Puede llevar hasta tres variantes, si se dice de varias formas.
3. **El dato, en una frase de 25 palabras como mucho,** que se entienda sin leer nada más. Dice lo que sí es, sin «falso» ni «mito».
4. **«Por qué no es así», con el peso de cada fuente.**
   - Un párrafo, de tres a seis frases, como los apartados del glosario.
   - Si las fuentes no coinciden, se dice: «entre 1 de cada 10 y 3 de cada 10, según cómo se mida».
   - Una cifra sacada de un libro de divulgación se comprueba en el estudio que cita.
5. **«De dónde viene», sin burlas.** Por qué tanta gente se lo cree: una película, un artículo retirado o una teoría antigua. Sin reírse de quien se lo cree ni de quien lo inventó, y sin culpar a ninguna familia.
6. **«Qué podéis hacer»: algo útil.** Qué contestar, qué preguntar en la consulta o qué ficha leer después. Nunca tratamientos, dietas ni medicación.
7. **No cambiar un mito por otro.** Desmentir «todos son genios» no puede dejar la idea de «todos tienen discapacidad intelectual». Desmentir «es cosa de chicos» no puede dejar «todas las niñas camuflan».
8. **Ni superpoderes ni dramatismo.** Nada de «el autismo es un don», y tampoco lo contrario.
9. **Lenguaje claro,** como el resto de la web: frases cortas, de vosotros a vosotros, e INFLESZ de 65 o más.

## En el YAML

```yaml
mito: Las vacunas causan autismo
variantes:
  - La triple vírica provoca autismo
dato: >
  Los estudios más grandes, con cientos de miles de niñas y niños, no encuentran
  ninguna relación entre las vacunas y el autismo.
por_que: >
  …
de_donde_viene: >
  …
que_hacer: >
  …
relacionados: []
fuentes: [escap-2021]
orden: 5
revisado: 2026-11-09
```

## Ejemplos que no valen

| Texto | Qué falla |
|---|---|
| «Mito: el autismo es cosa de chicos. Falso.» | El mito como titular, y el dato reducido a «falso» |
| «Es absurdo creer que las vacunas causan autismo.» | Se burla de quien se lo cree |
| «No son genios, pero todas las personas autistas tienen un don.» | Cambia un mito por otro |
| «Un 83 % del autismo es genético.» | Una cifra mal leída: la heredabilidad no dice eso |
| «No es una rabieta: probad con una dieta sin gluten.» | Recomienda un tratamiento |

## Lista de comprobación de cada mito

- [ ] El mito, como se dice, sin comillas en el YAML y con tres variantes como mucho.
- [ ] El dato, en una frase de 25 palabras como mucho, sin «falso» ni «mito».
- [ ] Cada cifra, con su fuente y su peso; si las fuentes no coinciden, se dice.
- [ ] Sin burlas, sin culpar a nadie y sin tratamientos.
- [ ] No deja un mito nuevo en lugar del viejo.
- [ ] Ninguna frase de más de 30 palabras, e INFLESZ de 55 o más (objetivo: 65).
- [ ] Las citas de sus fuentes están en `notas/dossieres/mitos-<id>.md` y pasan el comprobador.
- [ ] Revisado por una persona antes de publicarse.

## Lo que se comprueba solo

- **El esquema** rechaza un mito sin fuentes, con un dato de más de 25 palabras, con más de tres variantes, o con el mito o una variante entre comillas.
- **La compilación** se para si dos mitos tienen el mismo `orden`.
