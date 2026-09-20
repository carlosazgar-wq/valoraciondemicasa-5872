import { useLocation, useRoute } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Logo } from "../components/Logo";
import { FormularioMultiPaso, type FormData } from "../components/FormularioMultiPaso";
import { calcularEstimacion } from "../lib/valoracion";
import { TrendingUp, Clock, Shield, Star, ChevronDown, CheckCircle, MapPin, Home, ArrowUpRight, ArrowDownRight, Users, CalendarClock } from "lucide-react";

export const BARRIOS: Record<string, {
  nombre: string;
  slug: string;
  municipio: string;
  zonaSlug: string;
  h1: string;
  descripcion: string;
  precioMin: number;
  precioMax: number;
  precioMedio: number;
  precioChalet: string;
  descripcionMercado: string;
  tipologia: string;
  calles: string[];
  factores: { f: string; impacto: string; sube: boolean }[];
  tiempoVenta: string;
  perfilComprador: string;
  faq: { p: string; r: string }[];
  keywords: string;
  metaDesc: string;
  metaTitle: string;
}> = {
  "valoracion-el-plantio": {
    nombre: "El Plantío",
    slug: "valoracion-el-plantio",
    municipio: "Pozuelo de Alarcón",
    zonaSlug: "valoracion-pozuelo-de-alarcon",
    h1: "vivienda en El Plantío",
    metaTitle: "Cuánto vale una casa en El Plantío — Valoración y tasación gratis",
    descripcion:
      "El Plantío es una de las urbanizaciones residenciales más exclusivas del noroeste de Madrid, formada casi en su totalidad por chalets independientes con parcela. Es una zona de oferta muy limitada: se venden pocas casas al año, y eso hace que ponerle precio requiera datos concretos de la urbanización, no medias del municipio.",
    precioMin: 4200,
    precioMax: 6800,
    precioMedio: 5600,
    precioChalet: "1,2 M€ – 3,5 M€",
    descripcionMercado:
      "En El Plantío el precio se mueve entre 4.200 y 6.800 €/m² construido, con chalets que habitualmente se cierran entre 1,2 y 3,5 millones de euros según parcela, superficie y estado. Al tratarse de vivienda unifamiliar, el valor del suelo pesa tanto como el de la construcción: dos casas con los mismos metros pueden separarse 600.000 € solo por el tamaño y la orientación de la parcela. Los simuladores genéricos fallan aquí precisamente por eso.",
    tipologia: "Chalets independientes y pareados con parcela de 800 a 3.000 m²",
    calles: ["Avenida de la Vega", "Camino de las Huertas", "Urbanización El Plantío", "Zona Club de Campo", "Carretera de La Coruña km 12"],
    factores: [
      { f: "Parcela de más de 1.500 m² con posibilidad de ampliar", impacto: "+10% a +18%", sube: true },
      { f: "Reforma integral reciente y cocina de gama alta", impacto: "+12% a +20%", sube: true },
      { f: "Piscina, pista deportiva y zona de invitados independiente", impacto: "+5% a +10%", sube: true },
      { f: "Casa original de los 80 sin actualizar", impacto: "-15% a -25%", sube: false },
      { f: "Ruido de la A-6 en las parcelas más próximas a la autovía", impacto: "-8% a -12%", sube: false },
      { f: "Distribución en más de tres alturas sin ascensor", impacto: "-5% a -8%", sube: false },
    ],
    tiempoVenta: "6 a 12 meses",
    perfilComprador: "Familias españolas de renta alta que buscan colegio internacional cerca y salida rápida a la A-6. Muy poca compra de inversión: aquí se compra para vivir.",
    faq: [
      {
        p: "¿Cuánto vale un chalet en El Plantío?",
        r: "La mayoría de operaciones en El Plantío se cierran entre 1,2 y 3,5 millones de euros. El precio por metro cuadrado construido se mueve entre 4.200 y 6.800 €/m², pero en vivienda unifamiliar el factor decisivo es la parcela: su superficie, su forma y si permite ampliación.",
      },
      {
        p: "¿Por qué las valoraciones online no funcionan bien en El Plantío?",
        r: "Porque casi todas usan medias del municipio, que mezclan pisos de Húmera con chalets de El Plantío. Al haber pocas ventas al año en la urbanización, los algoritmos automáticos tienen muy pocos datos comparables y devuelven cifras muy alejadas de la realidad.",
      },
      {
        p: "¿Cuánto tarda en venderse una casa en El Plantío?",
        r: "El tiempo medio de venta en producto unifamiliar de esta franja de precio va de 6 a 12 meses. Un precio de salida bien ajustado desde el principio es lo que más acorta ese plazo: las casas que salen por encima de mercado suelen acabar vendiéndose por debajo tras varias bajadas.",
      },
    ],
    keywords:
      "cuánto vale mi casa El Plantío, valoración chalet El Plantío, tasación casa El Plantío, precio m2 El Plantío, tasación chalet El Plantío Pozuelo, valorar casa El Plantío Madrid, precio vivienda El Plantío",
    metaDesc:
      "✓ Cuánto vale tu casa en El Plantío: precios reales por m² y por chalet en 2026. Valoración gratis en 2 minutos, adaptada a vivienda unifamiliar con parcela.",
  },
  "valoracion-somosaguas": {
    nombre: "Somosaguas",
    slug: "valoracion-somosaguas",
    municipio: "Pozuelo de Alarcón",
    zonaSlug: "valoracion-pozuelo-de-alarcon",
    h1: "vivienda en Somosaguas",
    metaTitle: "Cuánto vale una casa en Somosaguas — Valoración y tasación gratis",
    descripcion:
      "Somosaguas es la zona más consolidada de vivienda unifamiliar de lujo de Pozuelo de Alarcón, con Somosaguas Norte y Somosaguas Sur como submercados claramente diferenciados. Aquí el precio depende menos de los metros y más de la calle concreta y del estado de la casa.",
    precioMin: 4500,
    precioMax: 7000,
    precioMedio: 5800,
    precioChalet: "1,4 M€ – 4 M€",
    descripcionMercado:
      "El precio en Somosaguas se sitúa entre 4.500 y 7.000 €/m², con chalets que se cierran habitualmente entre 1,4 y 4 millones. Somosaguas Norte, con parcelas más grandes y construcciones de los años 70-80, suele exigir reforma integral: eso descuenta entre 300.000 y 600.000 € del precio de salida frente a una casa reformada equivalente. Somosaguas Sur tiene producto más moderno y rota algo más rápido.",
    tipologia: "Chalets independientes con parcela de 1.000 a 4.000 m², algunas promociones de pareados",
    calles: ["Somosaguas Norte", "Somosaguas Sur", "Avenida de Somosaguas", "Camino de la Zarzuela", "Entorno Campus UCM"],
    factores: [
      { f: "Parcela llana de más de 2.000 m² en Somosaguas Norte", impacto: "+12% a +20%", sube: true },
      { f: "Obra nueva o reforma integral con domótica y aislamiento actual", impacto: "+15% a +25%", sube: true },
      { f: "Orientación sur con jardín despejado y piscina", impacto: "+6% a +10%", sube: true },
      { f: "Vivienda de los 70-80 pendiente de reforma integral", impacto: "-20% a -30%", sube: false },
      { f: "Parcela en pendiente pronunciada difícil de aprovechar", impacto: "-10% a -15%", sube: false },
      { f: "Calefacción de gasóleo y ventanas originales", impacto: "-5% a -10%", sube: false },
    ],
    tiempoVenta: "7 a 14 meses",
    perfilComprador: "Directivos y profesionales con hijos en el Colegio Europeo, Zola o el campus de la Complutense. Buscan parcela grande a 15 minutos del centro de Madrid.",
    faq: [
      {
        p: "¿Cuánto vale un chalet en Somosaguas?",
        r: "Entre 1,4 y 4 millones de euros según parcela, superficie construida y estado. El precio por m² construido va de 4.500 a 7.000 €/m². Las casas sin reformar de Somosaguas Norte se mueven en la parte baja de esa horquilla.",
      },
      {
        p: "¿Qué diferencia hay entre Somosaguas Norte y Somosaguas Sur en precio?",
        r: "Somosaguas Norte tiene parcelas mayores pero construcción más antigua, por lo que el precio por metro es más bajo y el valor está en el suelo. Somosaguas Sur tiene vivienda más moderna y lista para entrar, con precio por metro más alto y menor descuento por reforma.",
      },
      {
        p: "¿Cuánto suma una reforma integral al valor de la casa?",
        r: "En esta zona, una reforma integral bien ejecutada se recupera casi siempre, y en muchos casos añade más valor del que cuesta, porque el comprador de este segmento paga prima por entrar a vivir sin obras. Lo que no se recupera es la reforma de gusto muy personal.",
      },
    ],
    keywords:
      "cuánto vale mi casa Somosaguas, valoración chalet Somosaguas, tasación casa Somosaguas, precio m2 Somosaguas, tasación chalet Somosaguas Norte, valorar casa Somosaguas Sur, precio vivienda Somosaguas Pozuelo",
    metaDesc:
      "✓ Cuánto vale tu casa en Somosaguas: precios reales por m² y por chalet, diferencias entre Norte y Sur. Valoración gratis en 2 minutos.",
  },
  "valoracion-la-finca": {
    nombre: "La Finca",
    slug: "valoracion-la-finca",
    municipio: "Pozuelo de Alarcón",
    zonaSlug: "valoracion-pozuelo-de-alarcon",
    h1: "vivienda en La Finca",
    metaTitle: "Cuánto vale una casa en La Finca (Pozuelo) — Valoración gratis",
    descripcion:
      "La Finca es la urbanización cerrada más exclusiva de España y el mercado inmobiliario más atípico del noroeste de Madrid: pocas viviendas, seguridad privada, y compradores de perfil internacional. Su mercado funciona con reglas propias y no se parece en nada al del resto de Pozuelo.",
    precioMin: 6500,
    precioMax: 12000,
    precioMedio: 8500,
    precioChalet: "3 M€ – 15 M€",
    descripcionMercado:
      "En La Finca el precio por metro cuadrado va de 6.500 a más de 12.000 €/m², con operaciones que van desde los 3 millones hasta cifras de dos dígitos en millones. Es un mercado de altísimo importe y muy baja rotación: hay años con apenas un puñado de transacciones. Por eso ninguna valoración automática es fiable aquí, y el precio se fija comparando con las pocas operaciones reales cerradas y con la oferta activa del momento.",
    tipologia: "Villas y chalets de alto standing en urbanización cerrada con seguridad privada",
    calles: ["La Finca", "Parque Empresarial La Finca", "Entorno Camino de Valdemarín", "Acceso Ctra. de Húmera"],
    factores: [
      { f: "Villa de arquitecto con proyecto firmado y materiales de lujo", impacto: "+20% a +35%", sube: true },
      { f: "Parcela en primera línea de golf o con vistas despejadas", impacto: "+15% a +25%", sube: true },
      { f: "Domótica integral, spa, gimnasio y garaje para 4+ coches", impacto: "+10% a +15%", sube: true },
      { f: "Villa construida en los primeros años de la urbanización sin actualizar", impacto: "-15% a -25%", sube: false },
      { f: "Distribución muy personalizada y difícil de revender", impacto: "-10% a -20%", sube: false },
      { f: "Salir al mercado con precio por encima de las últimas operaciones cerradas", impacto: "-12% a -18% final", sube: false },
    ],
    tiempoVenta: "12 a 24 meses",
    perfilComprador: "Alto patrimonio nacional e internacional, deportistas y directivos. Mucha operación discreta que nunca se publica en portales: el comprador llega por agente, no por anuncio.",
    faq: [
      {
        p: "¿Cuánto vale una casa en La Finca?",
        r: "El rango habitual va de 3 a 15 millones de euros, con precio por metro entre 6.500 y más de 12.000 €/m². Es el metro cuadrado residencial más caro de España junto con determinadas calles del barrio de Salamanca y de La Moraleja.",
      },
      {
        p: "¿Se puede valorar online una vivienda en La Finca?",
        r: "Una valoración online sirve como primera referencia, pero en La Finca hay tan pocas operaciones al año que ningún algoritmo tiene datos suficientes. Aquí lo que marca el precio es el análisis de las operaciones reales cerradas y de la oferta activa, y eso requiere criterio humano.",
      },
      {
        p: "¿Qué perfil de comprador hay en La Finca?",
        r: "Perfil de altísimo poder adquisitivo, con presencia relevante de compradores internacionales y de operaciones discretas que no se publican en portales. Buena parte del mercado se mueve fuera de los canales públicos.",
      },
    ],
    keywords:
      "cuánto vale mi casa La Finca, valoración chalet La Finca Pozuelo, tasación vivienda La Finca, precio m2 La Finca Pozuelo, valorar villa La Finca Madrid, precio casas La Finca",
    metaDesc:
      "✓ Cuánto vale tu vivienda en La Finca (Pozuelo de Alarcón): precios reales por m² y por operación. Valoración gratuita adaptada a vivienda de lujo.",
  },
  "valoracion-la-moraleja": {
    nombre: "La Moraleja",
    slug: "valoracion-la-moraleja",
    municipio: "Alcobendas",
    zonaSlug: "valoracion-alcobendas",
    h1: "vivienda en La Moraleja",
    metaTitle: "Cuánto vale una casa en La Moraleja — Valoración y tasación gratis",
    descripcion:
      "La Moraleja, en Alcobendas, es la urbanización de vivienda unifamiliar de lujo más conocida de España. Parcelas grandes, calles arboladas y un mercado con demanda internacional constante. Su precio no tiene nada que ver con la media de Alcobendas, y valorar aquí con datos del municipio es el error más común.",
    precioMin: 5000,
    precioMax: 9500,
    precioMedio: 6800,
    precioChalet: "1,8 M€ – 8 M€",
    descripcionMercado:
      "El precio en La Moraleja se mueve entre 5.000 y 9.500 €/m² construido, con chalets que se cierran habitualmente entre 1,8 y 8 millones de euros. La parcela manda: en esta urbanización las parcelas van de 2.000 a más de 5.000 m², y ese suelo puede representar más de la mitad del valor total. La obra nueva y las casas reformadas con criterio actual se sitúan en la parte alta del rango; las construcciones originales sin actualizar, en la baja.",
    tipologia: "Chalets independientes con parcela de 2.000 a 5.000 m², algunos conjuntos cerrados de pareados",
    calles: ["Avenida de Europa", "Paseo del Conde de los Gaitanes", "Camino Ancho", "Avenida del Golf", "Entorno Club de Golf La Moraleja"],
    factores: [
      { f: "Parcela de más de 3.000 m² con jardín maduro", impacto: "+15% a +25%", sube: true },
      { f: "Casa reformada íntegramente en los últimos 5 años", impacto: "+15% a +22%", sube: true },
      { f: "Ubicación en primera línea del Club de Golf o Camino Ancho", impacto: "+10% a +18%", sube: true },
      { f: "Construcción original de los 60-70 sin reformar", impacto: "-20% a -30%", sube: false },
      { f: "Parcela pequeña para el estándar de la zona (menos de 1.500 m²)", impacto: "-10% a -15%", sube: false },
      { f: "Cercanía a la M-40 o a la Avenida de Europa en su tramo más transitado", impacto: "-8% a -12%", sube: false },
    ],
    tiempoVenta: "8 a 16 meses",
    perfilComprador: "Directivos de multinacionales del corredor norte, familias con hijos en el Colegio Base o SEK, y comprador internacional (latinoamericano y europeo) con presencia constante.",
    faq: [
      {
        p: "¿Cuánto vale un chalet en La Moraleja?",
        r: "Lo habitual es entre 1,8 y 8 millones de euros, con precio por metro construido entre 5.000 y 9.500 €/m². La horquilla es tan amplia porque el tamaño de la parcela y el estado de la casa pesan más que los metros construidos.",
      },
      {
        p: "¿Cuánto influye la parcela en el precio en La Moraleja?",
        r: "Muchísimo. En parcelas de 2.000 a 5.000 m², el suelo puede suponer más de la mitad del valor total de la operación. Dos casas con idénticos metros construidos pueden diferenciarse en más de un millón de euros solo por la parcela.",
      },
      {
        p: "¿Es buen momento para vender en La Moraleja?",
        r: "La demanda en el segmento alto del noroeste y norte de Madrid se mantiene sólida, con presencia continua de comprador internacional. Lo determinante no es tanto el momento como el precio de salida: en este segmento, una casa mal tasada puede estar más de un año en el mercado.",
      },
    ],
    keywords:
      "cuánto vale mi casa La Moraleja, valoración chalet La Moraleja, tasación casa La Moraleja, precio m2 La Moraleja, valorar chalet La Moraleja Alcobendas, precio vivienda La Moraleja, tasación vivienda lujo La Moraleja",
    metaDesc:
      "✓ Cuánto vale tu casa en La Moraleja (Alcobendas): precios reales por m² y por chalet en 2026. Valoración gratis en 2 minutos, adaptada a unifamiliar.",
  },
  "valoracion-valdemarin": {
    nombre: "Valdemarín",
    slug: "valoracion-valdemarin",
    municipio: "Aravaca",
    zonaSlug: "valoracion-aravaca",
    h1: "vivienda en Valdemarín",
    metaTitle: "Cuánto vale una casa en Valdemarín (Aravaca) — Valoración gratis",
    descripcion:
      "Valdemarín es la zona de vivienda unifamiliar más consolidada de Aravaca: chalets independientes y pareados en calles tranquilas, a diez minutos de la Moncloa. Es uno de los pocos sitios de Madrid capital donde se puede vivir en casa con jardín sin salir del municipio, y eso sostiene su precio de forma muy estable.",
    precioMin: 4300,
    precioMax: 7500,
    precioMedio: 5700,
    precioChalet: "900.000 € – 2,8 M€",
    descripcionMercado:
      "En Valdemarín el precio se mueve entre 4.300 y 7.500 €/m² construido, con operaciones que van de 900.000 € en pareados de menor superficie hasta cerca de 3 millones en chalets independientes con buena parcela. Al pertenecer a Madrid capital y no a un municipio del alfoz, la vivienda aquí tiene una demanda añadida: compradores que quieren casa con jardín pero necesitan seguir dentro de la ciudad por trabajo o por colegio. Eso hace que la rotación sea más rápida que en urbanizaciones equivalentes de Pozuelo.",
    tipologia: "Chalets independientes y pareados con parcela de 500 a 2.000 m², más algún conjunto cerrado",
    calles: ["Camino de Valdemarín", "Valdemarín Alto", "Entorno Colegio Santa María", "Zona Osa Mayor", "Acceso Carretera de Húmera"],
    factores: [
      { f: "Chalet independiente con parcela superior a 1.000 m²", impacto: "+12% a +20%", sube: true },
      { f: "Reforma reciente con cocina abierta y baños actualizados", impacto: "+10% a +18%", sube: true },
      { f: "Piscina privada y jardín con orientación sur", impacto: "+6% a +10%", sube: true },
      { f: "Pareado de los 80-90 sin actualizar", impacto: "-15% a -22%", sube: false },
      { f: "Parcela con mucha pendiente o jardín poco aprovechable", impacto: "-8% a -12%", sube: false },
      { f: "Proximidad al tráfico de la carretera de Húmera", impacto: "-5% a -10%", sube: false },
    ],
    tiempoVenta: "5 a 10 meses",
    perfilComprador: "Familias madrileñas que suben de piso a casa sin salir de la capital, y padres con hijos en los colegios de Aravaca y Valdemarín. Demanda muy constante durante todo el año.",
    faq: [
      {
        p: "¿Cuánto vale un chalet en Valdemarín?",
        r: "El rango habitual va de 900.000 € en pareados de menor tamaño hasta 2,8 millones en chalets independientes con buena parcela. El precio por metro construido se sitúa entre 4.300 y 7.500 €/m² según tipología y estado.",
      },
      {
        p: "¿Es más caro Valdemarín que Pozuelo de Alarcón?",
        r: "En producto comparable, Valdemarín suele estar por encima de la media de Pozuelo, porque pertenece al municipio de Madrid y eso añade demanda de compradores que no quieren salir de la capital. Frente a urbanizaciones premium concretas como La Finca o El Plantío, sin embargo, se queda por debajo.",
      },
      {
        p: "¿Se vende rápido una casa en Valdemarín?",
        r: "Es una de las zonas de unifamiliar con mejor rotación del noroeste: entre 5 y 10 meses con un precio bien ajustado. La oferta es limitada y la demanda de casa con jardín dentro de Madrid capital es alta y constante.",
      },
    ],
    keywords:
      "cuánto vale mi casa Valdemarín, valoración chalet Valdemarín, tasación casa Valdemarín Aravaca, precio m2 Valdemarín, valorar chalet Valdemarín Madrid, precio vivienda Valdemarín, tasación pareado Valdemarín",
    metaDesc:
      "✓ Cuánto vale tu casa en Valdemarín (Aravaca): precios reales por m² y por chalet en 2026. Valoración gratis en 2 minutos, adaptada a unifamiliar con parcela.",
  },
  "valoracion-aravaca-centro": {
    nombre: "Aravaca Centro",
    slug: "valoracion-aravaca-centro",
    municipio: "Aravaca",
    zonaSlug: "valoracion-aravaca",
    h1: "piso en Aravaca Centro",
    metaTitle: "Cuánto vale un piso en Aravaca Centro — Valoración y tasación gratis",
    descripcion:
      "Aravaca Centro es el corazón urbano del barrio: pisos y áticos en edificios de altura contenida, con comercio de proximidad, Cercanías y salida directa a la A-6. Es la zona de Aravaca con más operaciones al año, y también donde más se equivocan las valoraciones automáticas, porque mezclan pisos del centro con chalets de Valdemarín y La Finca.",
    precioMin: 4000,
    precioMax: 6200,
    precioMedio: 5000,
    precioChalet: "420.000 € – 1,1 M€",
    descripcionMercado:
      "El precio del piso en Aravaca Centro se mueve entre 4.000 y 6.200 €/m², con operaciones habituales de 420.000 € en dos dormitorios hasta 1,1 millones en áticos y viviendas grandes reformadas. Es un submercado de piso, no de chalet: aquí manda la superficie útil real, la planta, el ascensor y la plaza de garaje. La cercanía a la estación de Cercanías y al comercio de la calle Osa Mayor es un factor de precio claro, y la vivienda con terraza amplia se ha revalorizado de forma notable en los últimos años.",
    tipologia: "Pisos y áticos de 2 a 4 dormitorios en edificios de baja y media altura",
    calles: ["Calle Osa Mayor", "Avenida de la Osa Mayor", "Entorno estación de Cercanías Aravaca", "Calle Golfo de Salónica", "Plaza de la Corona Boreal"],
    factores: [
      { f: "Ático con terraza amplia y vistas despejadas", impacto: "+15% a +25%", sube: true },
      { f: "Plaza de garaje incluida en el precio", impacto: "+20.000 € a +45.000 €", sube: true },
      { f: "Reforma integral reciente lista para entrar a vivir", impacto: "+10% a +18%", sube: true },
      { f: "Piso sin ascensor en tercera planta o superior", impacto: "-12% a -20%", sube: false },
      { f: "Vivienda interior sin luz directa", impacto: "-10% a -15%", sube: false },
      { f: "Comunidad con derrama pendiente o ITE desfavorable", impacto: "-5% a -10%", sube: false },
    ],
    tiempoVenta: "3 a 7 meses",
    perfilComprador: "Primera y segunda vivienda de familias jóvenes con buen nivel de renta que quieren Aravaca pero no pueden asumir un chalet, más inversión en alquiler por la demanda de expatriados de la zona.",
    faq: [
      {
        p: "¿Cuánto vale un piso en Aravaca Centro?",
        r: "Entre 4.000 y 6.200 €/m², lo que sitúa las operaciones habituales entre 420.000 € en pisos de dos dormitorios y 1,1 millones en áticos o viviendas grandes reformadas. La plaza de garaje puede sumar entre 20.000 y 45.000 € al precio final.",
      },
      {
        p: "¿Por qué mi piso de Aravaca sale con un valor tan raro en los simuladores?",
        r: "Porque casi todos los simuladores calculan la media de Aravaca mezclando pisos del centro con chalets de Valdemarín y villas de La Finca. Esa media no representa a ningún piso real: infravalora los áticos reformados y sobrevalora los pisos antiguos sin ascensor.",
      },
      {
        p: "¿Cuánto tarda en venderse un piso en Aravaca Centro?",
        r: "Entre 3 y 7 meses con precio de mercado, bastante más rápido que el unifamiliar de la zona. Es el producto con más rotación de todo Aravaca porque el rango de precio es accesible para más compradores.",
      },
    ],
    keywords:
      "cuánto vale mi piso Aravaca Centro, tasación piso Aravaca, valoración piso Aravaca Centro, precio m2 Aravaca Centro, tasación ático Aravaca, valorar piso Aravaca Madrid, precio piso Aravaca",
    metaDesc:
      "✓ Cuánto vale tu piso en Aravaca Centro: precio real por m², ático y garaje en 2026. Valoración gratis en 2 minutos, sin medias que mezclan pisos y chalets.",
  },
  "valoracion-pozuelo-centro": {
    nombre: "Pozuelo Centro",
    slug: "valoracion-pozuelo-centro",
    municipio: "Pozuelo de Alarcón",
    zonaSlug: "valoracion-pozuelo-de-alarcon",
    h1: "piso en Pozuelo Centro",
    metaTitle: "Cuánto vale un piso en Pozuelo Centro — Valoración y tasación gratis",
    descripcion:
      "Pozuelo Centro es donde se concentra la vivienda en altura del municipio: pisos y áticos junto al Ayuntamiento, la estación de Cercanías y el comercio de la Avenida de Europa. Es el submercado con más operaciones al año de todo Pozuelo de Alarcón y el que peor reflejan las medias municipales, infladas por los chalets de Somosaguas y El Plantío.",
    precioMin: 3600,
    precioMax: 5400,
    precioMedio: 4400,
    precioChalet: "350.000 € – 950.000 €",
    descripcionMercado:
      "El piso en Pozuelo Centro se mueve entre 3.600 y 5.400 €/m², con operaciones habituales entre 350.000 € en dos dormitorios y 950.000 € en viviendas amplias reformadas o áticos con terraza. Es un mercado de rotación alta y con mucha demanda de familias que quieren los servicios y los colegios de Pozuelo sin el desembolso de un chalet. La proximidad a la estación de Cercanías y a la Avenida de Europa es el factor de precio más claro de la zona.",
    tipologia: "Pisos, áticos y dúplex de 2 a 4 dormitorios, con bastante obra de los 90 y 2000",
    calles: ["Avenida de Europa", "Calle San Juan de la Cruz", "Entorno Ayuntamiento de Pozuelo", "Estación de Cercanías Pozuelo", "Calle Benigno Granizo"],
    factores: [
      { f: "Ático con terraza y buenas vistas", impacto: "+15% a +25%", sube: true },
      { f: "Garaje y trastero incluidos", impacto: "+25.000 € a +50.000 €", sube: true },
      { f: "Urbanización con piscina y zonas comunes cuidadas", impacto: "+8% a +14%", sube: true },
      { f: "Vivienda de los 70-80 sin reformar", impacto: "-15% a -25%", sube: false },
      { f: "Bajo sin jardín o primera planta a nivel de calle", impacto: "-10% a -15%", sube: false },
      { f: "Edificio sin ascensor o con ITE pendiente", impacto: "-12% a -18%", sube: false },
    ],
    tiempoVenta: "3 a 6 meses",
    perfilComprador: "Familias que buscan los colegios y servicios de Pozuelo con presupuesto de piso, vecinos del propio municipio que cambian de vivienda, e inversores por la solidez del alquiler en la zona.",
    faq: [
      {
        p: "¿Cuánto vale un piso en Pozuelo Centro?",
        r: "Entre 3.600 y 5.400 €/m², es decir, operaciones habituales de 350.000 € en dos dormitorios y hasta 950.000 € en pisos grandes reformados o áticos con terraza. El garaje y el trastero pueden sumar entre 25.000 y 50.000 €.",
      },
      {
        p: "¿Por qué el precio medio de Pozuelo que veo en internet es mucho más alto?",
        r: "Porque la media del municipio incluye los chalets de Somosaguas, El Plantío y La Finca, que superan con holgura los 5.000 €/m². Si tienes un piso en el centro, esa media te da una cifra irreal: tu referencia es el mercado de vivienda en altura del casco, no la del municipio entero.",
      },
      {
        p: "¿Se vende rápido un piso en Pozuelo Centro?",
        r: "Sí, es el producto con más rotación del municipio: entre 3 y 6 meses con precio de mercado. La demanda de familias que quieren Pozuelo con presupuesto de piso es alta y sostenida durante todo el año.",
      },
    ],
    keywords:
      "cuánto vale mi piso Pozuelo Centro, tasación piso Pozuelo de Alarcón, valoración piso Pozuelo Centro, precio m2 Pozuelo Centro, tasación ático Pozuelo, valorar piso Pozuelo Madrid, precio piso Pozuelo Centro",
    metaDesc:
      "✓ Cuánto vale tu piso en Pozuelo Centro: precio real por m², ático y garaje en 2026. Valoración gratis en 2 minutos, sin medias infladas por los chalets.",
  },
  "valoracion-monteclaro": {
    nombre: "Monteclaro",
    slug: "valoracion-monteclaro",
    municipio: "Pozuelo de Alarcón",
    zonaSlug: "valoracion-pozuelo-de-alarcon",
    h1: "vivienda en Monteclaro",
    metaTitle: "Cuánto vale una casa en Monteclaro (Pozuelo) — Valoración gratis",
    descripcion:
      "Monteclaro es una urbanización cerrada de Pozuelo de Alarcón con club social, piscinas y pistas deportivas, formada por chalets y pareados en un entorno muy arbolado. Funciona casi como un mercado propio: quien vende en Monteclaro compite con las otras casas de Monteclaro, no con el resto del municipio.",
    precioMin: 3400,
    precioMax: 5200,
    precioMedio: 4300,
    precioChalet: "700.000 € – 1,8 M€",
    descripcionMercado:
      "En Monteclaro el precio se mueve entre 3.400 y 5.200 €/m² construido, con operaciones que suelen cerrarse entre 700.000 € y 1,8 millones según tipología, parcela y estado. La urbanización tiene mucho producto de los años 70 y 80, por lo que el estado de conservación es el factor que más separa unas casas de otras: entre una casa reformada y otra original de la misma tipología puede haber más de un 25% de diferencia. El club social y las zonas comunes son un argumento de venta real para familias con hijos pequeños.",
    tipologia: "Chalets independientes y pareados en urbanización cerrada con club social y zonas deportivas",
    calles: ["Urbanización Monteclaro", "Club Monteclaro", "Entorno Colegio Sagrado Corazón", "Acceso Carretera de Húmera", "Zona pareados Monteclaro"],
    factores: [
      { f: "Casa reformada integralmente en los últimos años", impacto: "+15% a +25%", sube: true },
      { f: "Parcela amplia y llana con jardín soleado", impacto: "+10% a +15%", sube: true },
      { f: "Cercanía al club social y a las pistas deportivas", impacto: "+5% a +8%", sube: true },
      { f: "Vivienda original de los 70-80 sin actualizar", impacto: "-20% a -28%", sube: false },
      { f: "Pareado con parcela pequeña y poca privacidad", impacto: "-10% a -15%", sube: false },
      { f: "Cuotas de comunidad elevadas mal explicadas al comprador", impacto: "-5% a -8%", sube: false },
    ],
    tiempoVenta: "6 a 12 meses",
    perfilComprador: "Familias con hijos pequeños que buscan urbanización cerrada, zonas comunes y colegios cerca, con presupuesto por debajo del de Somosaguas o El Plantío. Mucha venta entre vecinos de la propia zona.",
    faq: [
      {
        p: "¿Cuánto vale una casa en Monteclaro?",
        r: "Entre 700.000 € y 1,8 millones de euros según tipología, parcela y estado, con precio por metro construido de 3.400 a 5.200 €/m². Es una de las urbanizaciones de unifamiliar más accesibles de Pozuelo de Alarcón.",
      },
      {
        p: "¿Cuánto resta que la casa esté sin reformar?",
        r: "En Monteclaro es el factor decisivo. Hay mucho producto original de los años 70 y 80, y entre una casa reformada y otra sin actualizar de la misma tipología la diferencia supera con frecuencia el 25% del precio.",
      },
      {
        p: "¿Las zonas comunes y el club influyen en el precio?",
        r: "Sí, y bastante. El club social, las piscinas y las pistas son un argumento de venta claro para familias con hijos, y sostienen el precio de la urbanización frente a unifamiliares equivalentes sin zonas comunes. La contrapartida es la cuota de comunidad, que conviene presentar bien desde el principio.",
      },
    ],
    keywords:
      "cuánto vale mi casa Monteclaro, valoración chalet Monteclaro, tasación casa Monteclaro Pozuelo, precio m2 Monteclaro, valorar pareado Monteclaro, precio vivienda Monteclaro Pozuelo de Alarcón",
    metaDesc:
      "✓ Cuánto vale tu casa en Monteclaro (Pozuelo de Alarcón): precios reales por m² y por operación en 2026. Valoración gratis en 2 minutos.",
  },
};

export default function BarrioPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/barrio/:slug");
  const slug = params?.slug || "";
  const barrio = BARRIOS[slug];

  const crearLead = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.leads.$post({ json: data });
      return res.json();
    },
  });

  if (!barrio) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-4">Zona no encontrada</h1>
          <a href="/" className="text-[#10b981]">Volver al inicio</a>
        </div>
      </div>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    const sup = parseInt(formData.superficie) || 0;
    const hab = parseInt(formData.habitaciones) || 1;
    const ban = parseInt(formData.banos) || 1;
    const extras = Array.isArray(formData.extras) ? formData.extras : [];

    const estimacion = calcularEstimacion({
      tipoInmueble: formData.tipoInmueble,
      superficie: sup,
      habitaciones: hab,
      banos: ban,
      planta: formData.planta,
      estado: formData.estado,
      extras,
      codigoPostal: formData.codigoPostal,
      ciudad: formData.ciudad, direccion: formData.direccion,
    });

    try {
      const lead = await crearLead.mutateAsync({
        ...formData,
        habitaciones: hab,
        banos: ban,
        superficie: sup,
        extras,
        valorEstimadoMin: estimacion.min,
        valorEstimadoMax: estimacion.max,
        valorEstimado: estimacion.media,
      });
      if (lead?.id) sessionStorage.setItem('valoracion_lead_id', String(lead.id));
    } catch {}

    sessionStorage.setItem('valoracion_result', JSON.stringify({ formData, estimacion }));
    setLocation('/resultado');
  };

  const otrosBarrios = Object.values(BARRIOS).filter(b => b.slug !== barrio.slug);

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* SEO dinámico */}
      {typeof document !== 'undefined' && (() => {
        document.title = `${barrio.metaTitle} — ValoracionDeMiCasa.es`;
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', barrio.metaDesc);
        const canon = document.querySelector('link[rel="canonical"]');
        if (canon) canon.setAttribute('href', `https://valoraciondemicasa.es/barrio/${barrio.slug}`);
        return null;
      })()}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/80 backdrop-blur-md border-b border-[#1f2937]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/"><Logo size={36} /></a>
          <a
            href="#formulario"
            className="px-4 py-2 rounded-xl bg-[#10b981] text-white text-sm font-bold hover:bg-[#059669] transition-colors"
          >
            Valorar mi casa
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/hero-bg.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/90 via-[#0a0f1e]/75 to-[#0d2419]/85" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#10b981]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full py-16">
          {/* Migas de pan */}
          <nav aria-label="Ruta" className="mb-6 text-sm text-gray-400 flex items-center gap-2 justify-center lg:justify-start">
            <a href="/" className="hover:text-[#10b981] transition-colors">Inicio</a>
            <span className="text-gray-600">/</span>
            <a href={`/zona/${barrio.zonaSlug}`} className="hover:text-[#10b981] transition-colors">{barrio.municipio}</a>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">{barrio.nombre}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-sm font-semibold mb-6">
                <MapPin size={16} />
                {barrio.nombre} · {barrio.municipio}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                ¿Cuánto vale tu<br />
                <span className="gradient-text">{barrio.h1}?</span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {barrio.descripcion}
              </p>

              {/* Precio barrio */}
              <div className="bg-[#111827]/80 border border-[#1f2937] rounded-2xl p-6 mb-8">
                <p className="text-gray-400 text-sm mb-3 font-medium">Precio del m² en {barrio.nombre}</p>
                <div className="flex items-end gap-4">
                  <div className="text-4xl font-black gradient-text">{barrio.precioMedio.toLocaleString('es-ES')} €/m²</div>
                </div>
                <div className="flex gap-4 mt-3">
                  <div className="text-sm text-gray-500">Mín: <span className="text-gray-300 font-semibold">{barrio.precioMin.toLocaleString('es-ES')} €</span></div>
                  <div className="text-sm text-gray-500">Máx: <span className="text-gray-300 font-semibold">{barrio.precioMax.toLocaleString('es-ES')} €</span></div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#1f2937] flex items-center gap-2">
                  <Home size={16} className="text-[#10b981]" />
                  <p className="text-sm text-gray-400">
                    Operación habitual: <span className="text-white font-semibold">{barrio.precioChalet}</span>
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-3">*Datos orientativos del mercado actual</p>
              </div>

              <div className="lg:hidden">
                <a href="#formulario" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-black text-lg shadow-xl shadow-[#10b981]/30 hover:from-[#059669] hover:to-[#047857] transition-all">
                  Calcular valor gratis
                  <ChevronDown size={20} />
                </a>
              </div>
            </div>

            {/* Right: Formulario */}
            <div id="formulario">
              <div className="bg-[#111827]/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 card-glow border border-[#1f2937]">
                <FormularioMultiPaso onSubmit={handleSubmit} isLoading={crearLead.isPending} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-[#10b981]/60" />
        </div>
      </section>

      {/* MERCADO */}
      <section className="py-20 bg-[#080d19]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 text-center">
            El mercado inmobiliario en {barrio.nombre}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed text-center mb-12">
            {barrio.descripcionMercado}
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Home size={18} className="text-[#10b981]" />
                Tipo de vivienda
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{barrio.tipologia}</p>
            </div>
            <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <TrendingUp size={18} className="text-[#10b981]" />
                Precio de operación
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Rango habitual de cierre: <span className="text-white font-semibold">{barrio.precioChalet}</span>. El valor final depende de parcela, superficie y estado.
              </p>
            </div>
          </div>

          {/* Calles / subzonas */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-8">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <MapPin size={18} className="text-[#10b981]" />
              Zonas y calles principales de {barrio.nombre}
            </h3>
            <div className="flex flex-wrap gap-3">
              {barrio.calles.map((c, i) => (
                <span key={i} className="px-4 py-2 bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] rounded-xl text-sm font-medium">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ SUMA Y QUÉ RESTA VALOR */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 text-center">
            Qué suma y qué resta valor en {barrio.nombre}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Estos son los factores que más mueven el precio final en esta zona concreta, con su impacto aproximado sobre el valor de la vivienda.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Suman */}
            <div className="bg-[#111827] border border-[#10b981]/30 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                <ArrowUpRight size={20} className="text-[#10b981]" />
                Suman valor
              </h3>
              <ul className="space-y-4">
                {barrio.factores.filter(f => f.sube).map((f, i) => (
                  <li key={i} className="flex items-start justify-between gap-4 pb-4 border-b border-[#1f2937] last:border-0 last:pb-0">
                    <span className="text-gray-300 text-sm leading-relaxed">{f.f}</span>
                    <span className="text-[#10b981] font-bold text-sm whitespace-nowrap">{f.impacto}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Restan */}
            <div className="bg-[#111827] border border-[#ef4444]/25 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                <ArrowDownRight size={20} className="text-[#f87171]" />
                Restan valor
              </h3>
              <ul className="space-y-4">
                {barrio.factores.filter(f => !f.sube).map((f, i) => (
                  <li key={i} className="flex items-start justify-between gap-4 pb-4 border-b border-[#1f2937] last:border-0 last:pb-0">
                    <span className="text-gray-300 text-sm leading-relaxed">{f.f}</span>
                    <span className="text-[#f87171] font-bold text-sm whitespace-nowrap">{f.impacto}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tiempo de venta + comprador */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <CalendarClock size={18} className="text-[#10b981]" />
                Tiempo medio de venta
              </h3>
              <p className="text-3xl font-black gradient-text mb-2">{barrio.tiempoVenta}</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Con un precio de salida ajustado al mercado. Salir por encima alarga el plazo y acaba bajando el precio final.
              </p>
            </div>
            <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Users size={18} className="text-[#10b981]" />
                Quién compra en {barrio.nombre}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{barrio.perfilComprador}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#080d19]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-white text-center mb-12">
            Preguntas frecuentes sobre el precio en {barrio.nombre}
          </h2>
          <div className="space-y-4">
            {barrio.faq.map((f, i) => (
              <details key={i} className="group bg-[#111827] border border-[#1f2937] rounded-2xl p-6 open:border-[#10b981]/40 transition-colors">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-white font-bold pr-4">{f.p}</h3>
                  <ChevronDown size={20} className="text-[#10b981] flex-shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-gray-400 leading-relaxed mt-4">{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-12">
            ¿Por qué valorar tu vivienda con nosotros?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: "Datos de la zona", desc: `Precios reales de ${barrio.nombre}, no medias de todo el municipio` },
              { icon: Clock, title: "Resultado en 2 minutos", desc: "Obtén tu estimación de forma inmediata, sin esperas ni citas" },
              { icon: Shield, title: "100% gratuito", desc: "Sin coste, sin compromiso. Solo necesitas los datos de tu vivienda" },
              { icon: Star, title: "Expertos locales", desc: `Te conectamos con el mejor agente inmobiliario de ${barrio.municipio}` },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6 card-glow">
                  <div className="w-12 h-12 rounded-xl bg-[#10b981]/15 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#10b981]" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Valora tu {barrio.h1}<br />
            <span className="gradient-text">gratis y en 2 minutos</span>
          </h2>
          <a
            href="#formulario"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-black text-xl shadow-2xl shadow-[#10b981]/30 hover:from-[#059669] hover:to-[#047857] transition-all"
          >
            Calcular valor de mi casa
            <CheckCircle size={24} />
          </a>
          <p className="text-gray-500 text-sm mt-4">Gratis · Sin compromiso · Resultado inmediato</p>
        </div>
      </section>

      {/* Enlaces internos */}
      <section className="py-12 bg-[#080d19] border-t border-[#1f2937]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Valora tu vivienda en {barrio.municipio} o en otras urbanizaciones de Madrid
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <a href={`/zona/${barrio.zonaSlug}`} className="px-4 py-2 bg-[#111827] border border-[#10b981]/30 rounded-xl text-[#10b981] text-sm hover:border-[#10b981]/60 transition-colors">
              {barrio.municipio}
            </a>
            {otrosBarrios.map((b, i) => (
              <a key={i} href={`/barrio/${b.slug}`} className="px-4 py-2 bg-[#111827] border border-[#1f2937] rounded-xl text-gray-300 text-sm hover:border-[#10b981]/40 hover:text-[#10b981] transition-colors">
                {b.nombre}
              </a>
            ))}
          </div>
          <a href="/blog" className="text-[#10b981] text-sm font-semibold hover:underline">
            Ver guías y consejos del mercado inmobiliario →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1f2937] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="/"><Logo size={32} /></a>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="/privacidad" className="hover:text-[#10b981] transition-colors">Política de Privacidad</a>
              <a href="/aviso-legal" className="hover:text-[#10b981] transition-colors">Aviso Legal</a>
              <a href="/cookies" className="hover:text-[#10b981] transition-colors">Cookies</a>
            </div>
            <p className="text-gray-600 text-xs">© 2026 valoraciondemicasa.es · Todos los derechos reservados</p>
          </div>
        </div>
      </footer>

      {/* Schema.org Service + FAQPage + Breadcrumb */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Valoración de vivienda",
        "provider": { "@type": "RealEstateAgent", "name": "ValoracionDeMiCasa.es", "url": "https://valoraciondemicasa.es" },
        "areaServed": { "@type": "Place", "name": `${barrio.nombre}, ${barrio.municipio}` },
        "description": barrio.metaDesc
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": barrio.faq.map(f => ({
          "@type": "Question",
          "name": f.p,
          "acceptedAnswer": { "@type": "Answer", "text": f.r }
        }))
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://valoraciondemicasa.es" },
          { "@type": "ListItem", "position": 2, "name": barrio.municipio, "item": `https://valoraciondemicasa.es/zona/${barrio.zonaSlug}` },
          { "@type": "ListItem", "position": 3, "name": barrio.nombre, "item": `https://valoraciondemicasa.es/barrio/${barrio.slug}` }
        ]
      }) }} />

      {/* SEO invisible */}
      <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}>
        <p>{barrio.keywords}</p>
      </div>
    </div>
  );
}
