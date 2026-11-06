# Escenas del día a día

Una escena es una situación cotidiana corta que muestra un término del glosario sin nombrarlo. Sirve para que una familia reconozca a su hija o a su hijo antes de leer el nombre técnico. En la ficha van en el apartado «En el día a día»; más adelante, también en las tarjetas «¿Lo habéis visto?».

## Reglas

1. **Inventadas.** Ninguna escena sale de una niña o un niño reales. Si una familia cuenta algo, se usa solo como idea general, sin ningún detalle que permita reconocer a nadie.
2. **Solo lo que la ficha ya dice, con su fuente.** La escena ilustra; no añade rasgos nuevos. Si quieres mostrar algo que la ficha no dice, primero va a la ficha, con su fuente. Tampoco vale un rasgo de otra ficha: no mirar a los ojos está en *Masking*, no en *Doble empatía*. Y si la ficha da una lista de ejemplos (aletear, balancearse, tararear), la escena se queda en esa lista.
3. **No repite el ejemplo de «Cómo se ve», ni sus elementos.** Si la ficha habla de alguien masticando, la escena no usa masticar. El mismo rasgo sí puede salir en otra situación, otro sitio u otra edad.
4. **Corta.** Dos o tres frases: unas 50 palabras, y 60 como mucho. Un solo momento, o dos muy seguidos; no un resumen de varios días.
5. **Con edad y lugar.** Edad de 0 a 12 años, escrita como se dice: «18 meses», «4 años». Lugar con su preposición: «en el comedor del cole», «de camino a casa». En la web se ven juntos: «7 años · en el parque».
6. **Sin nombres propios.** «Ella», «la niña», «su hermano».
7. **Mostrar, no nombrar.** La escena no dice el término ni lo explica: nada de «tiene un meltdown». Cuenta qué se ve, qué se oye y qué hace. Tampoco hay un adulto que explique el sentido («su madre explica que es su forma de decir que sí»): que lo muestren los gestos, como señalar la pegatina mientras repite la pregunta. Sí vale un patrón que la familia ha visto repetirse («lo hace siempre que…»).
8. **Sin diagnosticar.** Ninguna escena dice «es autismo» ni «está camuflando». En las tarjetas, lo que hay detrás se presenta como «Detrás puede haber».
9. **Desde fuera y con respeto.** Lo que ve un adulto cercano que está ahí. Nada que no pueda ver: lo que la niña piensa, un «sin darse cuenta» o un sitio donde no hay ningún adulto, como el baño del cole. Sin burlas, sin dramatizar y sin culpar a la familia ni a la niña. Nada de «berrinche», «manipula» ni «se porta mal».
10. **Variedad en el conjunto, sin crear un estereotipo nuevo.**
    - Edades de 0 a 12 años, también de infantil.
    - Lugares distintos: casa, cole, parque, consulta, tiendas, coche, cumpleaños…
    - Formas de ser distintas: tímidas, habladoras, desinhibidas, que discuten, que no esconden nada.
    - Algunas escenas con niños.
    - Pocas del tipo «aguanta fuera y se hunde en casa»: una de cada cinco como mucho, salvo donde la ficha lo describe así (el burnout).
    - Nada del camuflaje «de manual»: mirar a los ojos, sonreír sin parar y caer rendida después. No todas las niñas camuflan, y las que lo hacen no lo hacen igual.
    - Finales distintos: que no acaben varias igual («se queda dormida»).
11. **Nunca «son nervios»** para explicar un dolor.
12. **Lenguaje claro.** Frases cortas, palabras de casa y sin exclamaciones. La única excepción son las palabras literales de la niña, entre comillas latinas, si son la clave de la escena.
13. **Que se vea la diferencia.** Si la ficha explica con qué se confunde el término, la escena muestra esa diferencia y no lo que comparten. Un meltdown se puede leer como una rabieta: que se vea que no para aunque consiga lo que quería.

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
| «La profesora cuenta que no la mira cuando le explica algo.» (en *Doble empatía*) | Rasgo de otra ficha: el contacto visual está en *Masking* |
| «Su madre explica que es su forma de decir que sí.» | Un adulto explica la escena en vez de mostrarla |
| «En el baño del cole se queda aleteando, sin darse cuenta.» | Nadie la ve ahí, y «sin darse cuenta» no se ve desde fuera |
| «Mira a los ojos a todo el mundo, sonríe sin parar y a la vuelta se queda dormida.» | El camuflaje «de manual»: un tópico |

## Lista de comprobación de cada escena

- [ ] 60 palabras como mucho, en dos o tres frases, y un solo momento.
- [ ] Edad (de 0 a 12 años) y lugar.
- [ ] Sin nombres propios, sin el nombre del término y sin diagnóstico.
- [ ] Todo lo que muestra está en su ficha, con su fuente; nada de otras fichas.
- [ ] No usa los elementos del ejemplo de «Cómo se ve».
- [ ] Lo ve un adulto que está ahí, y ningún adulto explica la escena.
- [ ] Sin culpas, burlas ni dramatismo, y sin «son nervios».
- [ ] El final no repite el de otra escena, y el conjunto no dibuja siempre a la misma niña.
- [ ] Revisada por una persona antes de publicarse.

## Lo que se comprueba solo

- **El esquema** rechaza una escena sin edad o sin lugar, con una edad fuera de 0 a 12 años, con más de 60 palabras o con un protagonista que no sea `nina` o `nino`, y una ficha con más de tres escenas.
- **Una prueba** (`npm test`) avisa cuando hay seis escenas o más y más de un tercio comparte edad o lugar, o ninguna tiene a un niño de protagonista.
