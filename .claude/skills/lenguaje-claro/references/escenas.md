# Escenas del día a día

Una escena es una situación cotidiana corta que muestra un término del glosario sin nombrarlo. Sirve para que una familia reconozca a su hija o a su hijo antes de leer el nombre técnico. En la ficha van en el apartado «En el día a día»; más adelante, también en las tarjetas «¿Lo habéis visto?».

## Reglas

1. **Inventadas.** Ninguna escena sale de una niña o un niño reales. Si una familia cuenta algo, se usa solo como idea general, sin ningún detalle que permita reconocer a nadie.
2. **Solo lo que la ficha ya dice, con su fuente.** La escena ilustra; no añade rasgos nuevos. Si quieres mostrar algo que la ficha no dice, primero va a la ficha, con su fuente.
3. **No repite el ejemplo de «Cómo se ve».** Busca otra situación, otro sitio u otra edad.
4. **Corta.** Dos o tres frases: unas 50 palabras, y 60 como mucho.
5. **Con edad y lugar.** Edad de 0 a 12 años, escrita como se dice: «18 meses», «4 años». Lugar con su preposición: «en el comedor del cole», «de camino a casa». En la web se ven juntos: «7 años · en el parque».
6. **Sin nombres propios.** «Ella», «la niña», «su hermano».
7. **Mostrar, no nombrar.** La escena no dice el término ni lo explica: nada de «tiene un meltdown». Cuenta qué se ve, qué se oye y qué hace.
8. **Sin diagnosticar.** Ninguna escena dice «es autismo» ni «está camuflando». En las tarjetas, lo que hay detrás se presenta como «Detrás puede haber».
9. **Desde fuera y con respeto.** Lo que ve un adulto cercano. Sin burlas, sin dramatizar y sin culpar a la familia ni a la niña. Nada de «berrinche», «manipula» ni «se porta mal».
10. **Variedad en el conjunto.**
    - Edades de 0 a 12 años, también de infantil.
    - Lugares distintos: casa, cole, parque, consulta, tiendas, coche, cumpleaños…
    - Formas de ser distintas: tímidas, habladoras, desinhibidas.
    - Algunas escenas con niños.
    - Pocas del tipo «estalla al llegar a casa»: una de cada cinco como mucho.
11. **Nunca «son nervios»** para explicar un dolor.
12. **Lenguaje claro.** Frases cortas, palabras de casa y sin exclamaciones. La única excepción son las palabras literales de la niña, entre comillas latinas, si son la clave de la escena.

## En el YAML

Cada ficha del glosario puede tener de una a tres escenas:

```yaml
escenas:
  - edad: 8 años
    lugar: en la sala de espera del dentista
    protagonista: nina # nina o nino
    texto: >
      Viene de una mañana larga en el cole, y en la sala de espera se oye el torno
      sin parar. Deja de contestar a su padre, se queda muy quieta en la silla y
      mira al suelo. Cuando la llaman, tarda mucho en levantarse.
```

## Ejemplos

**Bien.** Para *Shutdown*, la escena de arriba: edad y lugar, sin nombres, muestra lo que la ficha dice (el estrés que se acumula, un ruido que termina de desbordarla, quedarse quieta y sin responder), no nombra el término y no repite el cumpleaños de «Cómo se ve».

**Mal:**

| Escena | Qué falla |
|---|---|
| «Lucía tiene un shutdown en el dentista porque no soporta el ruido.» | Nombre propio, nombra el término y explica la causa en vez de mostrarla |
| «Como su madre no la sacó a tiempo, acabó en el suelo gritando.» | Culpa a la familia |
| «Tiene un berrinche en el súper y no hay quien la calme.» | «Berrinche» y tono de queja |
| «Le duele la tripa todas las mañanas antes del cole; son los nervios.» | «Son nervios» para un dolor |

## Lista de comprobación de cada escena

- [ ] 60 palabras como mucho, en dos o tres frases.
- [ ] Edad (de 0 a 12 años) y lugar.
- [ ] Sin nombres propios, sin el nombre del término y sin diagnóstico.
- [ ] Todo lo que muestra está en la ficha, con su fuente.
- [ ] No repite el ejemplo de «Cómo se ve».
- [ ] Sin culpas, burlas ni dramatismo, y sin «son nervios».
- [ ] Revisada por una persona antes de publicarse.

## Lo que se comprueba solo

- **El esquema** rechaza una escena sin edad o sin lugar, con una edad fuera de 0 a 12 años, con más de 60 palabras o con un protagonista que no sea `nina` o `nino`, y una ficha con más de tres escenas.
- **Una prueba** (`npm test`) avisa cuando hay seis escenas o más y más de un tercio comparte edad o lugar, o ninguna tiene a un niño de protagonista.
