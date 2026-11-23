# Escenas del día a día

Una escena es una situación cotidiana corta que muestra un término del glosario sin nombrarlo. Sirve para que una familia reconozca a su hija o a su hijo antes de leer el nombre técnico. En la ficha van en el apartado «En el día a día», y también en las tarjetas «¿Lo habéis visto?» (`/escenas/`). Cada una lleva una explicación corta, «Por qué es un ejemplo», para quien no la reconozca a la primera.

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
    por_que: >
      Tras una mañana larga, el ruido del torno puede terminar de desbordarla.
      En vez de estallar, se apaga: deja de contestar y se queda quieta. No está
      ignorando a su padre: puede que no consiga responder.
```

## Por qué es un ejemplo

La escena no nombra el término, y a veces no se reconoce a la primera. Por eso cada escena lleva una explicación corta (`por_que`). Sale en el reverso de la tarjeta, debajo de la definición, y en la ficha, en un desplegable cerrado bajo la escena: así no se le quita a nadie el ejercicio de reconocerla.

1. **Obligatoria y corta.** Dos o tres frases, 40 palabras como mucho.
2. **Señala lo que se ve.** Nombra los detalles concretos de la escena (la pregunta repetida, la camiseta que falta) y los une con lo que dice la ficha. Sin hablar en abstracto.
3. **Solo lo que la ficha ya dice.** Sin datos ni fuentes nuevas, y sin rasgos de otras fichas.
4. **Con «puede», sin diagnosticar.** «Puede costarle cambiar de plan», nunca «tiene problemas de flexibilidad» ni «es autista».
5. **La diferencia con lo que se confunde**, si la ficha la explica y la escena la muestra: «no para aunque ya pueden ir al parque: una rabieta suele parar cuando se consigue lo que se quería».
6. **Se lee suelta.** En la tarjeta no se ve la ficha: nada de «como dice la ficha». El término puede nombrarse, pero no hace falta, porque está justo encima.
7. **Sin culpas ni etiquetas,** como la escena: nada de «se porta mal» ni «es un capricho» como explicación. Sí vale negarlo («no es un capricho») si la ficha lo dice en «No confundir con».

Ejemplo, para la escena de la puerta de *Teoría de la mente*: «Se toma la pregunta al pie de la letra: contesta que sí puede. Pero su madre, con las manos llenas, quiere que abra. Cuando se lo pide claro, abre enseguida. Puede costarle deducir lo que el otro espera».

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
- [ ] Lleva «Por qué es un ejemplo»: 40 palabras como mucho, con los detalles de la escena, solo lo que dice la ficha y con «puede».
- [ ] Si lleva ilustración, cumple las normas de «Ilustraciones».
- [ ] Revisada por una persona antes de publicarse.

## Ilustraciones

Una escena puede llevar una ilustración: la niña o el niño, en dibujo sencillo, haciendo lo que cuenta el texto en un momento tranquilo. Se generan con Gemini a partir de un prompt por escena, con una imagen de referencia para que todas tengan el mismo estilo.

**Estilo.** Ilustración plana, de formas redondeadas, como un álbum ilustrado sencillo. Caras simples, con ojos de punto y expresiones suaves; nada realista. Domina el color de la familia del término, los trazos van en la tinta de la web (`#26223A`) y el fondo es claro y liso, con el sitio solo sugerido. Formato horizontal 4:3.

**Normas:**

1. Solo lo que dice el texto de la escena: ningún gesto ni objeto que no mencione.
2. Nunca el momento más fuerte de una crisis. En el meltdown y el shutdown se dibuja el antes, o un gesto contenido.
3. Sin caras realistas ni dramatismo: nada de llanto exagerado ni de gestos de angustia.
4. Variedad en el conjunto: tonos de piel, pelo, cuerpos, gafas y ropa distintos. No todo en rosa para las niñas. La edad se tiene que notar.
5. Los adultos, solo si están en la escena, y en segundo plano.
6. Sin texto, logos, marcas ni sitios reconocibles.
7. Nunca una foto real como referencia, ni de una niña ni de nadie.
8. La revisan dos personas antes de publicarse: quien la integra, con esta lista, y quien lleva la web, mirándola.

**En la web** el texto alternativo va vacío a propósito: por la norma 1, la imagen no cuenta nada que no diga el texto de al lado.

## Lo que se comprueba solo

- **El esquema** rechaza una escena sin edad o sin lugar, con una edad fuera de 0 a 12 años, con más de 60 palabras, sin «Por qué es un ejemplo» o con uno de más de 40, o con un protagonista que no sea `nina` o `nino`, y una ficha con más de tres escenas.
- **Una prueba** (`npm test`) avisa cuando hay seis escenas o más y más de un tercio comparte edad o lugar, o ninguna tiene a un niño de protagonista.
