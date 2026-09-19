// Metadatos SEO por ruta, usados por el servidor para inyectar title/description/canonical
// en el HTML antes de enviarlo a Google (sin depender de JavaScript).

export type MetaRuta = {
  title: string;
  description: string;
  canonical: string;
};

const BASE = "https://valoraciondemicasa.es";

const ZONAS_META: Record<string, MetaRuta> = {
  "valoracion-pozuelo-de-alarcon": {
    title: "Tasación y Valoración de Vivienda en Pozuelo de Alarcón Gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Tasación online gratis de tu vivienda en Pozuelo de Alarcón. Valoración en 2 minutos con precios actualizados por barrios: El Plantío, Somosaguas, Pozuelo Centro y más.",
    canonical: `${BASE}/zona/valoracion-pozuelo-de-alarcon`,
  },
  "valoracion-aravaca": {
    title: "Tasación y Valoración de Vivienda en Aravaca Gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Tasación online gratis de tu vivienda en Aravaca. Valoración en 2 minutos con precios actualizados de uno de los barrios más exclusivos de Madrid.",
    canonical: `${BASE}/zona/valoracion-aravaca`,
  },
  "valoracion-las-rozas": {
    title: "Tasación y Valoración de Vivienda en Las Rozas de Madrid Gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Tasación online gratis de tu vivienda en Las Rozas de Madrid. Valoración en 2 minutos con precios reales por urbanización: Las Matas, Molino de la Hoz y más.",
    canonical: `${BASE}/zona/valoracion-las-rozas`,
  },
  "valoracion-majadahonda": {
    title: "Tasación y Valoración de Vivienda en Majadahonda Gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Tasación online gratis de tu vivienda en Majadahonda. Valoración en 2 minutos con precios actualizados del mercado inmobiliario local.",
    canonical: `${BASE}/zona/valoracion-majadahonda`,
  },
  "valoracion-boadilla-del-monte": {
    title: "Tasación y Valoración de Vivienda en Boadilla del Monte Gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Tasación online gratis de tu vivienda en Boadilla del Monte. Valoración en 2 minutos con precios actualizados por zonas del municipio.",
    canonical: `${BASE}/zona/valoracion-boadilla-del-monte`,
  },
  "valoracion-alcobendas": {
    title: "Tasación y Valoración de Vivienda en Alcobendas Gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Tasación online gratis de tu vivienda en Alcobendas. Valoración en 2 minutos con precios actualizados del mercado inmobiliario local.",
    canonical: `${BASE}/zona/valoracion-alcobendas`,
  },
};

const ARTICULOS_META: Record<string, MetaRuta> = {
  "cuanto-vale-chalet-madrid-valoracion-unifamiliar": {
    title: "Cuánto vale un chalet en Madrid: por qué los simuladores fallan con la vivienda unifamiliar — ValoracionDeMiCasa.es",
    description:
      "Cómo se valora un chalet en Madrid: peso de la parcela, descuento por reforma y por qué los simuladores fallan en vivienda unifamiliar. Guía práctica 2026.",
    canonical: `${BASE}/blog/cuanto-vale-chalet-madrid-valoracion-unifamiliar`,
  },
  "diferencia-tasacion-valoracion-vivienda": {
    title: "Tasación o valoración: en qué se diferencian y cuál necesitas realmente — ValoracionDeMiCasa.es",
    description:
      "Diferencia entre tasación oficial y valoración de mercado: quién las firma, cuánto cuestan y cuál necesitas para vender, para la hipoteca o para una herencia.",
    canonical: `${BASE}/blog/diferencia-tasacion-valoracion-vivienda`,
  },
  "precio-metro-cuadrado-noroeste-madrid-2026": {
    title: "Precio del m² en el noroeste de Madrid 2026: Pozuelo, Aravaca, Las Rozas, Majadahonda, Boadilla y Alcobendas — ValoracionDeMiCasa.es",
    description:
      "Precio del m² en 2026 en Pozuelo, Aravaca, Las Rozas, Majadahonda, Boadilla y Alcobendas. Comparativa por municipio y urbanización, con rangos reales.",
    canonical: `${BASE}/blog/precio-metro-cuadrado-noroeste-madrid-2026`,
  },
  "cuanto-vale-piso-pozuelo-alarcon-2026": {
    title: "¿Cuánto vale un piso en Pozuelo de Alarcón, Madrid en 2026? — ValoracionDeMiCasa.es",
    description:
      "Precios del m² en Pozuelo de Alarcón, Madrid en 2026 por barrios: El Plantío, Somosaguas, Pozuelo Centro. Descubre cuánto vale tu piso en Pozuelo ahora.",
    canonical: `${BASE}/blog/cuanto-vale-piso-pozuelo-alarcon-2026`,
  },
  "precio-metro-cuadrado-aravaca-madrid": {
    title: "Precio del m² en Aravaca, Madrid: el barrio más exclusivo del noroeste — ValoracionDeMiCasa.es",
    description:
      "Precio real del metro cuadrado en Aravaca, Madrid en 2026: La Finca, Valdemarín, Aravaca Centro. Descubre cuánto vale tu vivienda en Aravaca.",
    canonical: `${BASE}/blog/precio-metro-cuadrado-aravaca-madrid`,
  },
  "como-saber-valor-real-vivienda-madrid": {
    title: "Cómo saber el valor real de tu vivienda en Madrid en 2026 — ValoracionDeMiCasa.es",
    description:
      "Guía práctica para conocer el valor real de tu vivienda en Madrid: métodos de tasación, factores que influyen y errores que te hacen perder dinero.",
    canonical: `${BASE}/blog/como-saber-valor-real-vivienda-madrid`,
  },
  "mejor-momento-vender-piso-madrid-2026": {
    title: "¿Cuándo es el mejor momento para vender un piso en Madrid? — ValoracionDeMiCasa.es",
    description:
      "Análisis del mejor momento para vender tu piso en Madrid en 2026: estacionalidad, tipos de interés, demanda y cómo afecta al precio final.",
    canonical: `${BASE}/blog/mejor-momento-vender-piso-madrid-2026`,
  },
  "impuestos-plusvalia-vender-piso-madrid": {
    title: "Impuestos al vender un piso en Madrid: qué vas a pagar en 2026 — ValoracionDeMiCasa.es",
    description:
      "Impuestos al vender una vivienda en Madrid en 2026: IRPF por ganancia patrimonial, plusvalía municipal, IBI y gastos. Con ejemplos de cálculo.",
    canonical: `${BASE}/blog/impuestos-plusvalia-vender-piso-madrid`,
  },
  "errores-comunes-vender-piso-madrid": {
    title: "7 errores comunes al vender un piso en Madrid (y cómo evitarlos) — ValoracionDeMiCasa.es",
    description:
      "Los 7 errores que más dinero cuestan al vender un piso en Madrid: precio mal fijado, fotos, negociación y documentación. Aprende a evitarlos.",
    canonical: `${BASE}/blog/errores-comunes-vender-piso-madrid`,
  },
};


const BARRIOS_META: Record<string, MetaRuta> = {
  "valoracion-el-plantio": {
    title: "Cuánto vale una casa en El Plantío — Valoración y tasación gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Cuánto vale tu casa en El Plantío: precios reales por m² y por chalet en 2026. Valoración gratis en 2 minutos, adaptada a vivienda unifamiliar con parcela.",
    canonical: `${BASE}/barrio/valoracion-el-plantio`,
  },
  "valoracion-somosaguas": {
    title: "Cuánto vale una casa en Somosaguas — Valoración y tasación gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Cuánto vale tu casa en Somosaguas: precios reales por m² y por chalet, diferencias entre Norte y Sur. Valoración gratis en 2 minutos.",
    canonical: `${BASE}/barrio/valoracion-somosaguas`,
  },
  "valoracion-la-finca": {
    title: "Cuánto vale una casa en La Finca (Pozuelo) — Valoración gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Cuánto vale tu vivienda en La Finca (Pozuelo de Alarcón): precios reales por m² y por operación. Valoración gratuita adaptada a vivienda de lujo.",
    canonical: `${BASE}/barrio/valoracion-la-finca`,
  },
  "valoracion-valdemarin": {
    title: "Cuánto vale una casa en Valdemarín (Aravaca) — Valoración gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Cuánto vale tu casa en Valdemarín (Aravaca): precios reales por m² y por chalet en 2026. Valoración gratis en 2 minutos, adaptada a unifamiliar con parcela.",
    canonical: `${BASE}/barrio/valoracion-valdemarin`,
  },
  "valoracion-aravaca-centro": {
    title: "Cuánto vale un piso en Aravaca Centro — Valoración y tasación gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Cuánto vale tu piso en Aravaca Centro: precio real por m², ático y garaje en 2026. Valoración gratis en 2 minutos, sin medias que mezclan pisos y chalets.",
    canonical: `${BASE}/barrio/valoracion-aravaca-centro`,
  },
  "valoracion-pozuelo-centro": {
    title: "Cuánto vale un piso en Pozuelo Centro — Valoración y tasación gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Cuánto vale tu piso en Pozuelo Centro: precio real por m², ático y garaje en 2026. Valoración gratis en 2 minutos, sin medias infladas por los chalets.",
    canonical: `${BASE}/barrio/valoracion-pozuelo-centro`,
  },
  "valoracion-monteclaro": {
    title: "Cuánto vale una casa en Monteclaro (Pozuelo) — Valoración gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Cuánto vale tu casa en Monteclaro (Pozuelo de Alarcón): precios reales por m² y por operación en 2026. Valoración gratis en 2 minutos.",
    canonical: `${BASE}/barrio/valoracion-monteclaro`,
  },
  "valoracion-la-moraleja": {
    title: "Cuánto vale una casa en La Moraleja — Valoración y tasación gratis — ValoracionDeMiCasa.es",
    description:
      "✓ Cuánto vale tu casa en La Moraleja (Alcobendas): precios reales por m² y por chalet en 2026. Valoración gratis en 2 minutos, adaptada a unifamiliar.",
    canonical: `${BASE}/barrio/valoracion-la-moraleja`,
  },
};

const RUTAS_FIJAS: Record<string, MetaRuta> = {
  "/": {
    title:
      "Tasación y Valoración de Vivienda Gratis en Madrid — Pozuelo, Aravaca | ValoracionDeMiCasa.es",
    description:
      "✓ Tasación online gratuita de tu piso o casa en Madrid en 2 minutos. Valoración real basada en datos de mercado. Pozuelo de Alarcón, Aravaca, Las Rozas y toda la Comunidad de Madrid.",
    canonical: `${BASE}/`,
  },
  "/blog": {
    title: "Blog de valoración y venta de vivienda en Madrid — ValoracionDeMiCasa.es",
    description:
      "Artículos sobre precios de la vivienda en Madrid, tasación, impuestos al vender y consejos prácticos para vender tu piso al mejor precio.",
    canonical: `${BASE}/blog`,
  },
};

/** Devuelve los metadatos SEO de una ruta, o null si la ruta no es indexable. */
export function metaParaRuta(pathname: string): MetaRuta | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  if (RUTAS_FIJAS[path || "/"]) return RUTAS_FIJAS[path || "/"];

  const zona = path.match(/^\/zona\/([a-z0-9-]+)$/);
  if (zona) return ZONAS_META[zona[1]] ?? null;

  const barrio = path.match(/^\/barrio\/([a-z0-9-]+)$/);
  if (barrio) return BARRIOS_META[barrio[1]] ?? null;

  const articulo = path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (articulo) return ARTICULOS_META[articulo[1]] ?? null;

  return null;
}

/** Rutas conocidas de la SPA (todo lo demás debe responder 404). */
export function esRutaConocida(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (path === "/" || path === "" || path === "/resultado" || path === "/admin") return true;
  if (metaParaRuta(path)) return true;
  return false;
}

/** Inyecta title, description y canonical en el HTML del index. */
export function inyectarMeta(html: string, meta: MetaRuta): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[\s\S]*?">/,
      `<meta name="description" content="${esc(meta.description)}">`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[\s\S]*?">/,
      `<link rel="canonical" href="${esc(meta.canonical)}">`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[\s\S]*?">/,
      `<meta property="og:title" content="${esc(meta.title)}">`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?">/,
      `<meta property="og:description" content="${esc(meta.description)}">`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[\s\S]*?">/,
      `<meta property="og:url" content="${esc(meta.canonical)}">`,
    );
}
