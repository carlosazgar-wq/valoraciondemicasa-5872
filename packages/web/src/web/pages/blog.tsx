import { useLocation } from "wouter";
import { Logo } from "../components/Logo";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const ARTICULOS = [
  {
    slug: "cuanto-vale-chalet-madrid-valoracion-unifamiliar",
    titulo: "Cuánto vale un chalet en Madrid: por qué los simuladores fallan con la vivienda unifamiliar",
    resumen: "Valorar un chalet no es valorar un piso con más metros. La parcela, el estado y la escasez de comparables cambian las reglas. Te explico cómo se calcula de verdad el precio de una vivienda unifamiliar en el noroeste de Madrid.",
    fecha: "20 de agosto de 2026",
    lectura: "7 min",
    categoria: "Guías",
    imagen: "🏘️",
    metaDesc: "Cómo se valora un chalet en Madrid: peso de la parcela, descuento por reforma y por qué los simuladores fallan en vivienda unifamiliar. Guía práctica 2026.",
    contenido: `
## Cuánto vale un chalet en Madrid: por qué los simuladores fallan con la vivienda unifamiliar

Si tienes un chalet en Pozuelo de Alarcón, Aravaca o Alcobendas y has probado un simulador online, es muy probable que la cifra que te ha dado no se parezca a la realidad. No es mala suerte: es que casi todas esas herramientas están diseñadas para pisos, y un chalet se valora con otras reglas.

### El problema: la media del municipio no te representa

Un simulador estándar coge el precio medio por metro cuadrado del municipio y lo multiplica por tus metros. En un piso funciona razonablemente. En una vivienda unifamiliar, no.

El precio medio de Pozuelo de Alarcón mezcla pisos de Húmera de 3.200 €/m² con villas de [La Finca](/barrio/valoracion-la-finca) que superan los 10.000 €/m². Esa media no describe a ninguna vivienda real: infravalora las casas buenas y sobrevalora las que están sin reformar.

### Los tres factores que de verdad mandan en un chalet

#### 1. La parcela puede ser la mitad del valor

En urbanizaciones como [La Moraleja](/barrio/valoracion-la-moraleja) o [Somosaguas](/barrio/valoracion-somosaguas), con parcelas de 2.000 a 5.000 m², el suelo llega a representar más de la mitad del precio total de la operación.

Y no solo cuentan los metros de parcela. Cuenta:

- **La forma y la pendiente.** Una parcela llana y regular vale bastante más que una en cuesta con la misma superficie.
- **La orientación del jardín.** Sur y suroeste, con sol de tarde, son las más valoradas.
- **La edificabilidad restante.** Si la normativa permite ampliar la casa, eso es dinero directo.
- **La privacidad.** Estar rodeado de arbolado maduro no es un detalle estético: es precio.

Dos casas con los mismos metros construidos pueden separarse 600.000 € solo por la parcela.

#### 2. El estado marca diferencias de hasta el 30%

Es el factor que más se subestima. En zonas con mucho producto de los años 70 y 80, como [Somosaguas](/barrio/valoracion-somosaguas) Norte o [Monteclaro](/barrio/valoracion-monteclaro), la diferencia entre una casa reformada y una original de la misma tipología supera con frecuencia el 25%.

La razón es sencilla: el comprador de este segmento suele preferir pagar más y entrar a vivir, antes que meterse en una obra de 400.000 € con año y medio de plazo. Una reforma integral bien ejecutada casi siempre se recupera en la venta. Una reforma de gusto muy personal, no.

#### 3. Hay muy pocas ventas al año

Este es el punto que rompe cualquier algoritmo. En un barrio de pisos hay cientos de operaciones al año y el sistema tiene datos de sobra. En una urbanización de chalets puede haber quince ventas al año. En La Finca, apenas un puñado.

Con tan pocos comparables, el algoritmo se queda sin base y devuelve una cifra genérica. Ahí es donde hace falta criterio humano: mirar qué se ha cerrado de verdad en la urbanización y qué hay hoy compitiendo contigo en el mercado.

### Cómo se valora bien un chalet, paso a paso

1. **Separar suelo y construcción.** Valorar la parcela por comparación con suelo vendido en la zona, y la construcción por su coste actualizado menos la depreciación por antigüedad y estado.
2. **Buscar comparables reales de la propia urbanización**, no del municipio. Y si no hay suficientes, ampliar a urbanizaciones de perfil equivalente, no a la media general.
3. **Ajustar por estado**, con un descuento explícito si hay reforma pendiente. Pedir presupuesto orientativo de la obra ayuda a defender el precio con el comprador.
4. **Contrastar con la oferta activa.** Tu competencia real son las casas que están hoy a la venta en tu zona, y a qué precio llevan cuánto tiempo.
5. **Fijar precio de salida, no precio de deseo.** En unifamiliar de alto importe, una casa mal tasada puede pasarse un año en el mercado y acabar vendiéndose por debajo de lo que habría conseguido saliendo bien desde el principio.

### El error más caro: salir alto "por probar"

En vivienda unifamiliar, salir un 15% por encima de mercado no significa vender un 15% más caro más tarde. Significa, casi siempre, no recibir visitas durante los primeros meses —que son los de mayor exposición—, quemar el anuncio, y acabar bajando en escalones hasta cerrar por debajo del precio que habrías obtenido saliendo ajustado.

El mercado tiene memoria: los compradores de la zona ven cuánto tiempo llevas publicado y usan ese dato para negociar.

### Conclusión

Un chalet no es un piso grande. Su precio depende de la parcela, del estado y de un mercado con muy pocas operaciones donde las medias no sirven. Usa el simulador como primera referencia, pero contrasta siempre con datos de tu urbanización concreta.

Si quieres una estimación adaptada a vivienda unifamiliar, puedes empezar por la página de tu zona: [El Plantío](/barrio/valoracion-el-plantio), [Somosaguas](/barrio/valoracion-somosaguas), [La Finca](/barrio/valoracion-la-finca), [Monteclaro](/barrio/valoracion-monteclaro), [Valdemarín](/barrio/valoracion-valdemarin) o [La Moraleja](/barrio/valoracion-la-moraleja).
`,
  },
  {
    slug: "diferencia-tasacion-valoracion-vivienda",
    titulo: "Tasación o valoración: en qué se diferencian y cuál necesitas realmente",
    resumen: "Se usan como sinónimos, pero no son lo mismo ni cuestan lo mismo. Una la firma un tasador homologado y sirve para el banco; la otra te dice a qué precio puedes vender. Te explico cuándo necesitas cada una.",
    fecha: "24 de agosto de 2026",
    lectura: "5 min",
    categoria: "Guías",
    imagen: "⚖️",
    metaDesc: "Diferencia entre tasación oficial y valoración de mercado: quién las firma, cuánto cuestan y cuál necesitas para vender, para la hipoteca o para una herencia.",
    contenido: `
## Tasación o valoración: en qué se diferencian y cuál necesitas

Mucha gente busca "tasación de mi piso" cuando lo que necesita es una valoración de mercado, y al revés. Son cosas distintas, las hacen personas distintas y sirven para trámites distintos. Aclararlo te puede ahorrar tiempo y unos cuantos cientos de euros.

### La tasación oficial (u homologada)

Es un informe firmado por un **tasador homologado** de una sociedad de tasación registrada en el Banco de España, redactado según la normativa que regula las valoraciones de inmuebles para determinadas finalidades financieras.

- **Quién la hace:** un técnico (arquitecto, aparejador o ingeniero) de una sociedad homologada.
- **Qué incluye:** visita física, comprobación registral y catastral, comparables, y un valor con validez temporal limitada.
- **Cuánto cuesta:** normalmente entre 300 y 600 € en vivienda, según superficie y tipología. En chalets grandes puede subir bastante.
- **Para qué sirve:** para que el banco conceda una hipoteca, para procedimientos judiciales, para repartos de herencia con efectos legales, para determinados trámites fiscales y contables.

Es el documento con valor formal. Si el banco te lo pide, ninguna otra cosa lo sustituye.

### La valoración de mercado (o valoración comercial)

Es un análisis del precio al que razonablemente puedes vender tu vivienda hoy, hecho a partir de comparables, oferta activa y conocimiento de la zona.

- **Quién la hace:** un profesional inmobiliario, o una herramienta online como primera aproximación.
- **Qué incluye:** precio recomendado de salida, rango probable de cierre y, si está bien hecha, plazo estimado de venta.
- **Cuánto cuesta:** habitualmente es gratuita, porque el profesional la ofrece esperando gestionar la venta.
- **Para qué sirve:** para decidir a qué precio publicas, para saber si una oferta que te han hecho es razonable, o simplemente para saber cuánto tienes.

No tiene valor legal, pero es la que de verdad te dice a cuánto se vende tu casa.

### Y no dan el mismo número

Este es el punto que más confunde. La tasación oficial suele ser **más conservadora** que el precio real de venta, porque está pensada para proteger al banco: es la garantía que ejecutará si dejas de pagar.

Es habitual que una tasación hipotecaria quede por debajo del precio al que se cierra la operación, sobre todo en mercados con demanda fuerte como el noroeste de Madrid. Que tu casa "tase" en 700.000 € no significa que no puedas venderla en 760.000 €.

### Entonces, ¿cuál necesitas?

#### Quiero vender y no sé a qué precio publicar
**Valoración de mercado.** No pagues una tasación oficial: no te va a decir a qué precio vender, y además te dará una cifra probablemente más baja.

#### Voy a pedir una hipoteca (o el comprador la necesita)
**Tasación oficial**, sí o sí, y del listado de sociedades que acepte esa entidad.

#### Estamos repartiendo una herencia entre hermanos
Depende. Si hay acuerdo, con una valoración de mercado bien argumentada suele bastar para negociar. Si hay desacuerdo o intervención judicial, hará falta tasación oficial.

#### Me separo y hay que adjudicar la vivienda
Igual que en la herencia: si hay acuerdo, valoración; si hay pleito, tasación oficial.

#### Solo tengo curiosidad por saber cuánto vale mi casa
**Valoración online.** Gratis, en dos minutos y sin compromiso.

### Cuidado con la valoración online mal usada

Una valoración online es una primera referencia, no un veredicto. Su fiabilidad depende de cuántas operaciones parecidas a la tuya haya en la zona.

En pisos de zonas con mucha rotación —como [Pozuelo Centro](/barrio/valoracion-pozuelo-centro) o [Aravaca Centro](/barrio/valoracion-aravaca-centro)— acierta bastante. En vivienda unifamiliar en urbanizaciones con pocas ventas al año se desvía mucho, porque no hay comparables suficientes.

### Resumen rápido

- **Tasación oficial**: la firma un tasador homologado, cuesta dinero, tiene valor legal y es más conservadora. La necesitas para el banco o para un juzgado.
- **Valoración de mercado**: te dice a cuánto vender de verdad, suele ser gratuita y no tiene valor legal.
- Para **vender**, empieza siempre por la valoración de mercado. La tasación llega después, y la pide el banco del comprador.

¿Quieres saber a cuánto podrías vender? Haz tu [valoración gratuita](/) en dos minutos.
`,
  },
  {
    slug: "precio-metro-cuadrado-noroeste-madrid-2026",
    titulo: "Precio del m² en el noroeste de Madrid 2026: Pozuelo, Aravaca, Las Rozas, Majadahonda, Boadilla y Alcobendas",
    resumen: "Comparativa actualizada del precio por metro cuadrado en los seis municipios y barrios más demandados del noroeste y norte, con las diferencias entre urbanizaciones y qué significa cada cifra para tu vivienda.",
    fecha: "28 de agosto de 2026",
    lectura: "8 min",
    categoria: "Precios por zona",
    imagen: "📍",
    metaDesc: "Precio del m² en 2026 en Pozuelo, Aravaca, Las Rozas, Majadahonda, Boadilla y Alcobendas. Comparativa por municipio y urbanización, con rangos reales.",
    contenido: `
## Precio del m² en el noroeste de Madrid en 2026

El noroeste concentra buena parte de la vivienda de mayor precio de la Comunidad de Madrid. Pero hablar de "el noroeste" como un bloque no sirve de nada: entre una urbanización y otra del mismo municipio hay diferencias de más del doble.

Esta es la comparativa por municipio, y después el detalle por urbanización, que es donde de verdad está la información útil.

### Comparativa por municipio

#### Pozuelo de Alarcón — 3.200 a 6.500 €/m²
El municipio con mayor renta per cápita de España. Su rango es enorme porque incluye desde pisos en Húmera hasta villas en La Finca. La media, en torno a 4.800 €/m², no representa bien a casi ninguna vivienda concreta. Ver [valoración en Pozuelo de Alarcón](/zona/valoracion-pozuelo-de-alarcon).

#### Aravaca — 3.800 a 7.200 €/m²
Es barrio de Madrid capital, no municipio independiente, y eso le da una demanda extra: gente que quiere casa con jardín sin salir de la ciudad. Media en torno a 5.500 €/m². Ver [valoración en Aravaca](/zona/valoracion-aravaca).

#### Alcobendas — con La Moraleja aparte
El casco urbano de Alcobendas se mueve en cifras muy inferiores a las de [La Moraleja](/barrio/valoracion-la-moraleja), que llega a 9.500 €/m². Mezclar ambos en una media es el error más común al valorar en este municipio. Ver [valoración en Alcobendas](/zona/valoracion-alcobendas).

#### Majadahonda — 2.900 a 5.000 €/m²
Mercado equilibrado, con buena mezcla de piso y unifamiliar y demanda muy estable de familias. Ver [valoración en Majadahonda](/zona/valoracion-majadahonda).

#### Las Rozas de Madrid — 2.800 a 5.200 €/m²
Mucho producto en urbanización, con diferencias claras entre el centro, Las Matas y las zonas de mayor superficie de parcela. Ver [valoración en Las Rozas](/zona/valoracion-las-rozas).

#### Boadilla del Monte — 2.600 a 4.800 €/m²
La opción con mejor relación superficie-precio del noroeste. Ha crecido mucho en la última década y sigue atrayendo a familias que buscan más metros por el mismo dinero. Ver [valoración en Boadilla del Monte](/zona/valoracion-boadilla-del-monte).

### El detalle que importa: por urbanización

Aquí es donde se ve por qué la media municipal es inútil para el propietario concreto.

- **[La Finca](/barrio/valoracion-la-finca)** (Pozuelo): 6.500 a más de 12.000 €/m². El metro cuadrado residencial más caro de España.
- **[La Moraleja](/barrio/valoracion-la-moraleja)** (Alcobendas): 5.000 a 9.500 €/m².
- **[Somosaguas](/barrio/valoracion-somosaguas)** (Pozuelo): 4.500 a 7.000 €/m².
- **[Valdemarín](/barrio/valoracion-valdemarin)** (Aravaca): 4.300 a 7.500 €/m².
- **[El Plantío](/barrio/valoracion-el-plantio)** (Pozuelo): 4.200 a 6.800 €/m².
- **[Aravaca Centro](/barrio/valoracion-aravaca-centro)**: 4.000 a 6.200 €/m², producto de piso.
- **[Pozuelo Centro](/barrio/valoracion-pozuelo-centro)**: 3.600 a 5.400 €/m², producto de piso.
- **[Monteclaro](/barrio/valoracion-monteclaro)** (Pozuelo): 3.400 a 5.200 €/m².

Fíjate en el salto: dentro de Pozuelo de Alarcón, La Finca puede triplicar el precio por metro de Monteclaro. Son el mismo municipio y aparecen bajo la misma media.

### Piso y chalet no se valoran igual

Otra distinción que las medias se comen. En el mismo municipio conviven dos mercados con lógicas distintas:

- **Piso**: manda la superficie útil, la planta, el ascensor, la terraza y el garaje. Rotación alta, plazos de venta de 3 a 7 meses.
- **Unifamiliar**: manda la parcela y el estado de la casa. Rotación baja, plazos de 6 a 24 meses según el importe.

Aplicar el precio medio del municipio a un chalet es el error de valoración más frecuente y más caro del noroeste.

### Qué mueve el precio en esta zona

- **Colegios.** La proximidad a colegios internacionales y concertados de referencia sostiene la demanda mejor que casi cualquier otro factor.
- **Accesos.** A-6, M-40 y M-50 marcan diferencias reales entre urbanizaciones vecinas. También el ruido: estar pegado a la autovía descuenta precio.
- **Escasez de suelo.** Apenas hay obra nueva de unifamiliar en las urbanizaciones consolidadas, y eso sostiene los precios del producto existente.
- **Comprador internacional.** Muy presente en el segmento alto de La Moraleja y La Finca, con menos sensibilidad al ciclo local.

### Cómo usar estos datos con tu vivienda

Estos rangos son una referencia de zona, no una valoración. Para pasar de la referencia a un precio concreto necesitas ajustar por superficie real, estado, planta u orientación, parcela si es unifamiliar, y extras como garaje, piscina o terraza.

Lo más práctico es empezar por la página de tu zona o urbanización, que ya parte del rango correcto en lugar de la media del municipio, y hacer la [valoración gratuita](/) desde ahí.
`,
  },
  {
    slug: "cuanto-vale-piso-pozuelo-alarcon-2026",
    titulo: "¿Cuánto vale un piso en Pozuelo de Alarcón, Madrid en 2026?",
    resumen: "Pozuelo de Alarcón, en la Comunidad de Madrid, es el municipio con mayor renta per cápita de España. Descubre los precios reales del m² por barrios y qué factores influyen en el valor de tu vivienda.",
    fecha: "20 de junio de 2026",
    lectura: "5 min",
    categoria: "Precios por zona",
    imagen: "🏡",
    metaDesc: "Precios del m² en Pozuelo de Alarcón, Madrid en 2026 por barrios: El Plantío, Somosaguas, Pozuelo Centro. Descubre cuánto vale tu piso en Pozuelo ahora.",
    contenido: `
## ¿Cuánto vale un piso en Pozuelo de Alarcón, Madrid en 2026?

Pozuelo de Alarcón es, año tras año, el municipio con mayor renta per cápita de toda España. Esta realidad socioeconómica se refleja directamente en su mercado inmobiliario, donde los precios se mantienen muy por encima de la media de la Comunidad de Madrid.

### Precio medio del m² en Pozuelo de Alarcón

En 2026, el precio medio del metro cuadrado en Pozuelo de Alarcón se sitúa en torno a los **4.800 €/m²**, aunque con importantes variaciones según la zona:

- **Somosaguas y El Plantío**: entre 5.500 y 6.500 €/m². Son las zonas más exclusivas del municipio, con grandes chalets y urbanizaciones de lujo.
- **Pozuelo Centro**: entre 4.000 y 5.000 €/m². Zona consolidada con buena oferta de pisos y buenas comunicaciones.
- **Ciudad de la Imagen**: entre 3.500 y 4.500 €/m². Zona más accesible con buena relación calidad-precio.
- **Húmera**: entre 3.200 y 4.000 €/m². La zona más asequible del municipio.

### ¿Qué factores influyen en el precio de tu vivienda en Pozuelo?

El precio de una vivienda en Pozuelo depende de varios factores clave:

1. **Ubicación dentro del municipio**: No es lo mismo Somosaguas que Húmera. La diferencia puede ser de más de 2.000 €/m².
2. **Tipo de vivienda**: Los chalets independientes tienen una prima de precio respecto a los pisos. Una vivienda unifamiliar en El Plantío puede superar los 2 millones de euros.
3. **Estado de conservación**: Una vivienda reformada puede valer entre un 15% y un 25% más que una sin reformar de características similares.
4. **Planta y orientación**: Los pisos altos con vistas y buena orientación sur tienen mayor valor.
5. **Extras**: Piscina comunitaria, jardín, garaje o trastero pueden incrementar el precio entre un 5% y un 15%.

### Tendencia del mercado en 2026

El mercado inmobiliario de Pozuelo de Alarcón sigue una tendencia alcista moderada. La escasez de suelo disponible para nuevas construcciones y la alta demanda de familias con alto poder adquisitivo mantienen la presión sobre los precios.

En el último año, los precios han subido aproximadamente un **4-6%**, una tendencia que se espera continúe en los próximos meses.

### ¿Quieres saber cuánto vale tu vivienda en Pozuelo?

La mejor forma de conocer el valor real de tu propiedad es obtener una valoración personalizada que tenga en cuenta todos los factores específicos de tu vivienda. Nuestro servicio de valoración gratuita analiza los datos reales del mercado de Pozuelo para darte una estimación precisa en menos de 2 minutos.
    `,
  },
  {
    slug: "precio-metro-cuadrado-aravaca-madrid",
    titulo: "Precio del m² en Aravaca, Madrid: el barrio más exclusivo del noroeste",
    resumen: "Aravaca se ha consolidado como uno de los barrios con mayor precio por m² de toda la Comunidad de Madrid. Te contamos por qué y cuánto vale realmente una vivienda aquí.",
    fecha: "15 de junio de 2026",
    lectura: "4 min",
    categoria: "Precios por zona",
    imagen: "🏙️",
    metaDesc: "Precio del m² en Aravaca en 2026. Descubre cuánto vale tu piso o chalet en Aravaca, uno de los barrios más exclusivos de Madrid, y qué factores determinan su valor.",
    contenido: `
## Precio del m² en Aravaca en 2026

Aravaca, integrada en el distrito de Moncloa-Aravaca de Madrid, es hoy uno de los barrios con mayor precio por metro cuadrado de toda la Comunidad de Madrid. Su combinación de tranquilidad residencial, excelentes comunicaciones y cercanía al centro de Madrid la convierten en una zona muy demandada.

### Precios actuales en Aravaca

El precio medio en Aravaca se sitúa en torno a los **5.500 €/m²**, con una horquilla que va desde los 3.800 hasta los 7.200 €/m² dependiendo de la zona y el tipo de vivienda:

- **La Finca**: la urbanización más exclusiva, con precios de 6.000 a 7.200 €/m². Chalets de lujo con seguridad privada, piscinas y grandes jardines.
- **Valdemarín**: entre 5.000 y 6.500 €/m². Zona residencial premium con chalets y casas unifamiliares.
- **Aravaca Centro**: entre 4.500 y 5.500 €/m². Pisos y chalets en zona consolidada.
- **El Barrial y Camino de Valdemarín**: entre 3.800 y 4.800 €/m². Zonas algo más accesibles dentro del barrio.

### ¿Por qué Aravaca tiene precios tan altos?

Varios factores explican la alta valoración inmobiliaria de Aravaca:

1. **Ubicación estratégica**: A 12 km del centro de Madrid, con acceso directo a la A-6 y la M-30.
2. **Exclusividad residencial**: Predominio de viviendas unifamiliares y baja densidad de población.
3. **Proximidad a zonas empresariales**: Cerca de los principales centros de negocios del noroeste (Las Tablas, Alcobendas, Pozuelo).
4. **Demanda internacional**: Muy popular entre ejecutivos y familias de alto poder adquisitivo, incluyendo extranjeros.
5. **Escasa oferta**: Pocos nuevos desarrollos, lo que mantiene la presión al alza sobre los precios.

### Tendencia 2026

Aravaca ha registrado una subida de precios del **5-7%** en el último año, una de las más altas de la Comunidad de Madrid. Las perspectivas para los próximos meses apuntan a una estabilización, aunque sin caídas significativas dada la robustez de la demanda.

### Valora tu vivienda en Aravaca

Si tienes una propiedad en Aravaca y estás pensando en vender o simplemente quieres conocer su valor actual, nuestra herramienta de valoración gratuita te da una estimación personalizada en menos de 2 minutos, basada en datos reales del mercado.
    `,
  },
  {
    slug: "como-saber-valor-real-vivienda-madrid",
    titulo: "Cómo saber el valor real de tu vivienda en Madrid en 2026",
    resumen: "Existen varios métodos para conocer el valor de tu propiedad. Te explicamos cuáles son, cuál es más fiable y cómo obtener una estimación precisa sin gastar dinero.",
    fecha: "10 de junio de 2026",
    lectura: "6 min",
    categoria: "Guías",
    imagen: "📊",
    metaDesc: "Cómo saber cuánto vale tu vivienda en Madrid en 2026. Métodos para valorar tu piso: tasación oficial, valoración online gratuita, comparativa de mercado. Guía completa.",
    contenido: `
## Cómo saber el valor real de tu vivienda en Madrid en 2026

Una de las preguntas más frecuentes entre los propietarios que se plantean vender es: **¿cuánto vale realmente mi casa?** La respuesta no siempre es sencilla, porque el valor de una vivienda depende de muchos factores y varía constantemente con el mercado.

En esta guía te explicamos los principales métodos para valorar tu vivienda en Madrid, sus ventajas e inconvenientes.

### Métodos para valorar tu vivienda

#### 1. Valoración online gratuita

Es el método más rápido y accesible. Herramientas como la de ValoracionDeMiCasa.es analizan datos del mercado inmobiliario en tu zona para darte una estimación orientativa en minutos.

**Ventajas**: Inmediato, gratuito, disponible 24h.  
**Inconvenientes**: Es una estimación orientativa, no tiene en cuenta el estado exacto del interior.

**Cuándo usarla**: Para tener una primera referencia antes de contactar con un profesional.

#### 2. Comparativa de mercado (CMA)

Consiste en comparar tu vivienda con propiedades similares vendidas recientemente en tu zona. Es el método que usan los agentes inmobiliarios.

**Ventajas**: Refleja el mercado real, no el teórico.  
**Inconvenientes**: Requiere acceso a datos de ventas reales, no solo de anuncios.

#### 3. Tasación oficial

La realiza un tasador homologado y tiene validez legal para hipotecas y trámites oficiales. Suele costar entre 250 y 500 euros.

**Ventajas**: Máxima precisión y validez legal.  
**Inconvenientes**: Coste económico y tiempo de espera (varios días).

**Cuándo usarla**: Para solicitar una hipoteca o en procesos de herencia, divorcio o venta formal.

### Factores que determinan el valor de tu vivienda en Madrid

Independientemente del método que uses, estos son los factores que más influyen en el precio:

1. **Ubicación y distrito**: El factor más determinante. La diferencia entre distritos como Salamanca (8.000-10.000 €/m²) y otros más alejados puede ser enorme.
2. **Superficie**: El precio por m² varía según el tamaño — los pisos pequeños suelen tener un precio/m² más alto.
3. **Estado de conservación**: Reformado vs sin reformar puede suponer un 15-25% de diferencia.
4. **Planta y ascensor**: Los pisos altos con ascensor valen más. Un bajo sin ascensor puede perder un 10-15% de valor.
5. **Extras**: Terraza, garaje, trastero, piscina. Cada extra suma entre un 3% y un 10%.
6. **Orientación**: Sur o este suma valor; norte lo resta ligeramente.

### El mercado de Madrid en 2026

El mercado inmobiliario de Madrid mantiene una tendencia alcista moderada, con subidas medias del 4-6% anual. La falta de oferta nueva en zonas céntricas y la alta demanda de compra —tanto nacional como internacional— sostienen los precios.

Los distritos con mayor crecimiento de precio en el último año han sido: Chamberí, Retiro, Salamanca y las zonas del noroeste (Pozuelo, Aravaca, Las Rozas).

### ¿Listo para valorar tu vivienda?

Obtén tu estimación gratuita ahora mismo. Solo necesitas los datos básicos de tu propiedad y en menos de 2 minutos tendrás una valoración orientativa basada en el mercado actual de Madrid.
    `,
  },
  {
    slug: "mejor-momento-vender-piso-madrid-2026",
    titulo: "¿Cuándo es el mejor momento para vender un piso en Madrid?",
    resumen: "El timing importa al vender. Te explicamos cuándo se venden más rápido los pisos en Madrid, qué épocas evitar y cómo preparar tu vivienda para conseguir el mejor precio.",
    fecha: "5 de junio de 2026",
    lectura: "5 min",
    categoria: "Consejos para vender",
    imagen: "📅",
    metaDesc: "¿Cuándo vender tu piso en Madrid? Mejor época del año para vender, consejos para conseguir el mejor precio y cómo preparar tu vivienda. Guía 2026.",
    contenido: `
## ¿Cuándo es el mejor momento para vender un piso en Madrid en 2026?

Vender un piso no es una decisión que se tome de la noche a la mañana. El momento en que pones tu vivienda en el mercado puede influir significativamente en el tiempo que tarda en venderse y en el precio final que obtienes.

### La estacionalidad del mercado inmobiliario en Madrid

El mercado inmobiliario madrileño tiene ciclos claros a lo largo del año:

#### Primavera (marzo - junio): la mejor época
Es, con diferencia, la temporada con mayor actividad compradora. Las familias quieren cerrar operaciones antes del verano para organizar mudanzas y cambios de colegio. Más compradores activos significa más competencia entre ellos y, en consecuencia, mejores precios para el vendedor.

**Recomendación**: Si puedes elegir, pon tu piso a la venta entre marzo y mayo.

#### Verano (julio - agosto): actividad reducida
Julio y agosto son los meses de menor actividad. Las familias están de vacaciones y las decisiones importantes se posponen. Las visitas bajan significativamente, aunque los compradores que visitan en verano suelen estar muy motivados.

**Recomendación**: Evita sacar al mercado una vivienda nueva en agosto. Si ya está publicada, mantenla pero con expectativas ajustadas.

#### Otoño (septiembre - noviembre): segunda mejor época
Septiembre reactiva el mercado tras el parón veraniego. Hay buena demanda y los compradores llegan con las ideas más claras tras haber investigado durante el verano. Es la segunda mejor época del año para vender.

#### Invierno (diciembre - febrero): actividad moderada
Diciembre es otro mes de baja actividad por las fiestas. Enero y febrero se recuperan gradualmente. No es mal momento si el precio es competitivo.

### Factores más importantes que el momento del año

Aunque la estacionalidad importa, hay factores que pesan más:

1. **El precio**: Un piso bien valorado se vende en cualquier época. Uno sobrevalorado no se vende nunca.
2. **El estado de la vivienda**: Una vivienda limpia, ordenada y con buenas fotos recibe más visitas independientemente del mes.
3. **La situación del mercado**: En un mercado alcista como el de Madrid en 2026, las viviendas bien ubicadas se venden rápido durante todo el año.

### Cómo preparar tu vivienda para vender al mejor precio

- **Home staging**: Pequeñas mejoras de presentación pueden aumentar el precio percibido entre un 5% y un 10%.
- **Fotos profesionales**: El 90% de los compradores buscan online. Las fotos son tu primera impresión.
- **Precio correcto desde el inicio**: Las viviendas que salen al mercado con precio adecuado se venden 3 veces más rápido que las sobrevaloradas.
- **Documentación en orden**: Certificado energético, nota simple, últimos recibos del IBI. Tenerlo listo acelera el cierre.

### El primer paso: conocer el valor real de tu vivienda

Antes de decidir cuándo vender, necesitas saber cuánto vale tu propiedad. Una valoración gratuita te da la referencia de mercado que necesitas para fijar un precio competitivo y vender en el menor tiempo posible.
    `,
  },
  {
    slug: "impuestos-plusvalia-vender-piso-madrid",
    titulo: "Impuestos al vender un piso en Madrid: qué vas a pagar en 2026",
    resumen: "Vender una vivienda tiene implicaciones fiscales que muchos propietarios desconocen hasta el último momento. Te explicamos qué impuestos pagarás y cómo calcularlos.",
    fecha: "28 de junio de 2026",
    lectura: "6 min",
    categoria: "Fiscalidad",
    imagen: "🧾",
    metaDesc: "Impuestos al vender un piso en Madrid en 2026: IRPF por ganancia patrimonial, plusvalía municipal, IBI. Guía completa con ejemplos de cálculo.",
    contenido: `
## Impuestos al vender un piso en Madrid: qué vas a pagar en 2026

Vender una vivienda no solo implica encontrar comprador y negociar el precio. También conlleva una serie de obligaciones fiscales que es importante conocer de antemano para no llevarte sorpresas después de la firma.

### 1. IRPF por la ganancia patrimonial

Es el impuesto más importante. Si vendes tu vivienda por más de lo que pagaste al comprarla, Hacienda considera que has obtenido una ganancia patrimonial y debes tributar por ella en la declaración de la renta del año siguiente.

**Cómo se calcula:**

Ganancia = Precio de venta − (Precio de compra + gastos e impuestos de la compra + mejoras realizadas)

**Los tramos en 2026 son:**

- Hasta 6.000 €: 19%
- De 6.000 a 50.000 €: 21%
- De 50.000 a 200.000 €: 23%
- Más de 200.000 €: 27%

**Ejemplo práctico:** Si compraste un piso por 250.000 € y lo vendes por 400.000 €, tu ganancia patrimonial sería de 150.000 € (menos gastos deducibles). Sobre esa cantidad se aplicarían los tramos progresivos.

**Exención por reinversión en vivienda habitual:** Si vendes tu vivienda habitual y reinviertes todo el importe en comprar otra vivienda habitual en un plazo de 2 años, puedes quedar exento de este impuesto.

**Exención para mayores de 65 años:** Si eres mayor de 65 años y vendes tu vivienda habitual, estás exento de tributar por la ganancia patrimonial, reinviertas o no en otra vivienda.

### 2. Plusvalía municipal (IIVTNU)

Es un impuesto municipal que grava el incremento del valor del terreno desde que lo compraste hasta que lo vendes. Lo cobra el Ayuntamiento de Madrid (o el municipio correspondiente: Pozuelo, Aravaca pertenece a Madrid capital, Las Rozas, Majadahonda, etc.).

**Cómo se calcula:** Desde 2021 existen dos métodos y se aplica el que resulte más favorable para el contribuyente:

- **Método objetivo**: Se basa en el valor catastral del suelo y unos coeficientes que fija cada ayuntamiento según los años de tenencia.
- **Método real**: Se calcula sobre la plusvalía real obtenida (diferencia entre precio de venta y compra).

**Importante:** Si vendes con pérdidas (por menos de lo que pagaste), estás exento de este impuesto, pero debes demostrarlo con las escrituras.

### 3. IBI del año de la venta

El Impuesto de Bienes Inmuebles se paga por quien sea propietario a fecha 1 de enero del año en curso. Si vendes a mitad de año, es habitual (aunque no obligatorio legalmente) pactar con el comprador el reparto proporcional del recibo.

### 4. Gastos adicionales a tener en cuenta

- **Certificado energético**: obligatorio para vender, entre 60 y 150 €.
- **Cancelación de hipoteca** (si la hay): gastos de gestoría y registro, entre 300 y 600 €.
- **Comisión de la inmobiliaria** (si usas una): habitualmente entre el 3% y el 5% del precio de venta.

### Resumen de lo que debes reservar

Como regla general, conviene reservar entre un **3% y un 5%** del precio de venta para cubrir plusvalía municipal, gastos de gestión y certificados, sin contar el IRPF (que depende de la ganancia real obtenida y se paga el año siguiente).

### Antes de vender, conoce el valor real de tu vivienda

Calcular correctamente tu ganancia patrimonial empieza por saber cuánto vale realmente tu vivienda hoy. Obtén una valoración gratuita en menos de 2 minutos y ten una referencia clara antes de dar el paso.
    `,
  },
  {
    slug: "errores-comunes-vender-piso-madrid",
    titulo: "7 errores comunes al vender un piso en Madrid (y cómo evitarlos)",
    resumen: "Muchos propietarios cometen los mismos errores al vender su vivienda, alargando el proceso y perdiendo dinero. Te contamos cuáles son y cómo evitarlos.",
    fecha: "1 de julio de 2026",
    lectura: "6 min",
    categoria: "Consejos para vender",
    imagen: "⚠️",
    metaDesc: "7 errores comunes al vender un piso en Madrid: precio incorrecto, malas fotos, documentación incompleta. Descubre cómo evitarlos y vender más rápido y mejor.",
    contenido: `
## 7 errores comunes al vender un piso en Madrid (y cómo evitarlos)

Vender una vivienda es una de las decisiones económicas más importantes que se toman en la vida. Sin embargo, muchos propietarios cometen errores evitables que alargan el proceso de venta o hacen perder dinero. Aquí repasamos los más frecuentes.

### 1. Poner un precio incorrecto desde el principio

Es, con diferencia, el error más común y el más costoso. Un precio demasiado alto ahuyenta a los compradores serios y hace que tu anuncio "se queme" (pierda visibilidad con el tiempo). Un precio demasiado bajo te hace perder dinero directamente.

**Cómo evitarlo:** Basa el precio en datos reales del mercado de tu zona, no en lo que "necesitas sacar" o en lo que pagaste hace años. Una valoración objetiva es el primer paso.

### 2. Fotos de mala calidad

El 90% de los compradores empiezan su búsqueda online. Si las fotos son oscuras, borrosas o están desordenadas, muchos ni siquiera solicitarán visita.

**Cómo evitarlo:** Invierte en fotos profesionales o, como mínimo, haz fotos con buena luz natural, la vivienda ordenada y sin objetos personales excesivos.

### 3. No preparar la vivienda antes de las visitas (home staging)

Un piso con exceso de muebles, desorden o mal olor genera una impresión negativa que es difícil de revertir, aunque la vivienda tenga buenas características.

**Cómo evitarlo:** Despersonaliza los espacios, ordena, ventila y considera pequeñas mejoras de decoración antes de las visitas.

### 4. No tener la documentación lista

Descubrir a mitad del proceso que falta el certificado energético, hay cargas no canceladas o discrepancias en el registro puede retrasar la venta semanas o incluso hacer que el comprador se eche atrás.

**Cómo evitarlo:** Reúne desde el principio: nota simple actualizada, certificado energético, últimos recibos de IBI y comunidad, y certificado de la hipoteca si la hay.

### 5. Elegir mal el momento de vender

Vender en pleno agosto o en Navidad, cuando la actividad del mercado es más baja, puede alargar innecesariamente el proceso.

**Cómo evitarlo:** Si tienes flexibilidad, prioriza primavera y otoño, las épocas de mayor actividad compradora en Madrid.

### 6. No negociar con margen

Publicar el precio mínimo que aceptarías no deja margen de negociación, lo que puede hacer que pierdas compradores que simplemente esperan poder negociar un poco.

**Cómo evitarlo:** Fija un precio de salida con un pequeño margen de negociación (entre un 3% y un 5%), basado en datos reales, no en intuición.

### 7. Ignorar la fiscalidad de la venta

Muchos propietarios no calculan de antemano cuánto tendrán que pagar de IRPF por la ganancia patrimonial o de plusvalía municipal, y se llevan sorpresas desagradables después de cerrar la venta.

**Cómo evitarlo:** Infórmate antes de la fiscalidad aplicable a tu caso concreto y ten reservada una parte del importe de la venta para estos gastos.

### El primer paso para vender bien: conocer el valor real de tu vivienda

Evitar estos errores empieza por tener una base sólida: saber cuánto vale realmente tu vivienda en el mercado actual. Obtén tu valoración gratuita en menos de 2 minutos y evita el error número uno de la lista.
    `,
  },
];

export default function BlogPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/80 backdrop-blur-md border-b border-[#1f2937]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/"><Logo size={36} /></a>
          <a href="#" onClick={() => setLocation('/')} className="text-gray-400 hover:text-white text-sm transition-colors">← Volver al inicio</a>
          <a href="/#formulario" className="px-4 py-2 rounded-xl bg-[#10b981] text-white text-sm font-bold hover:bg-[#059669] transition-colors">
            Valorar mi casa
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-sm font-semibold mb-6">
            Guías y consejos inmobiliarios
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Blog inmobiliario Madrid
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Precios por zonas, consejos para vender y todo lo que necesitas saber sobre el mercado inmobiliario de Madrid.
          </p>
        </div>

        {/* Grid artículos */}
        <div className="grid md:grid-cols-2 gap-8">
          {ARTICULOS.map((art) => (
            <article
              key={art.slug}
              onClick={() => setLocation(`/blog/${art.slug}`)}
              className="bg-[#111827] border border-[#1f2937] rounded-2xl p-8 card-glow cursor-pointer hover:-translate-y-1 transition-transform duration-300 group"
            >
              <div className="text-5xl mb-4">{art.imagen}</div>
              <span className="inline-block px-3 py-1 bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-semibold rounded-full mb-4">
                {art.categoria}
              </span>
              <h2 className="text-xl font-black text-white mb-3 group-hover:text-[#10b981] transition-colors">
                {art.titulo}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {art.resumen}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={12} />{art.fecha}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{art.lectura}</span>
                </div>
                <span className="flex items-center gap-1 text-[#10b981] text-sm font-semibold">
                  Leer <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-[#0d2419] to-[#0a0f1e] border border-[#10b981]/20 rounded-2xl p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            ¿Quieres saber cuánto vale tu vivienda?
          </h2>
          <p className="text-gray-400 mb-8">Valoración gratuita en menos de 2 minutos</p>
          <a
            href="/#formulario"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-black text-lg shadow-xl shadow-[#10b981]/30 hover:from-[#059669] hover:to-[#047857] transition-all"
          >
            Calcular valor gratis
            <ArrowRight size={20} />
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-[#1f2937] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="/"><Logo size={32} /></a>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="/privacidad" className="hover:text-[#10b981] transition-colors">Política de Privacidad</a>
              <a href="/aviso-legal" className="hover:text-[#10b981] transition-colors">Aviso Legal</a>
            </div>
            <p className="text-gray-600 text-xs">© 2026 valoraciondemicasa.es · Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
