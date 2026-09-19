// Precios base por m2 en distintas zonas de España (€/m2)
// Datos orientativos basados en precios medios reales
const PRECIOS_ZONA: Record<string, number> = {
  // Madrid capital
  "28001": 6300, "28002": 5600, "28003": 5200, "28004": 7000, "28005": 5400,
  "28006": 6500, "28007": 4600, "28008": 6000, "28009": 5200, "28010": 6700,
  "28011": 4100, "28012": 5600, "28013": 5800, "28014": 6300, "28015": 4900,
  "28016": 5000, "28017": 3500, "28018": 3300, "28019": 3100, "28020": 4100,
  "28021": 2900, "28022": 3700, "28023": 4100, "28024": 3100, "28025": 3200,
  "28026": 3000, "28027": 3400, "28028": 3900, "28029": 3600, "28030": 3200,
  "28031": 3100, "28032": 3300, "28033": 4600, "28034": 4400, "28035": 3800,
  "28036": 5200, "28037": 3500, "28038": 2900, "28039": 3400, "28040": 3700,
  "28041": 2900, "28042": 3200, "28043": 3900, "28044": 3000, "28045": 3100,
  "28046": 6000, "28047": 3200, "28048": 3200, "28049": 4100, "28050": 3700,
  // Madrid municipios
  "28100": 3500, "28108": 3800, "28109": 3600, "28223": 4600, "28224": 4900,
  "28230": 4100, "28231": 4400, "28232": 4600, "28233": 4900, "28250": 3900,
  // Barcelona
  "08001": 6800, "08002": 6500, "08003": 5800, "08004": 5200, "08005": 4800,
  "08006": 6200, "08007": 6400, "08008": 6000, "08009": 5600, "08010": 6200,
  // Valencia
  "46001": 3200, "46002": 3000, "46003": 3400, "46004": 3600, "46005": 3100,
  // Sevilla
  "41001": 2800, "41002": 3000, "41003": 2600, "41004": 2400, "41005": 2600,
  // Málaga
  "29001": 3400, "29002": 3200, "29003": 3600, "29004": 3100, "29005": 3000,
};

const PRECIO_BASE_DEFAULT = 3000; // €/m2 fallback

export interface DatosVivienda {
  tipoInmueble: string;
  superficie: number;
  habitaciones: number;
  banos: number;
  planta?: string;
  estado: string;
  extras: string[];
  codigoPostal?: string;
  ciudad?: string;
}

export interface Estimacion {
  min: number;
  max: number;
  media: number;
  precioPorM2: number;
  precioPorM2Zona: number;
  historico: { mes: string; precio: number }[];
}

function getPrecioBaseM2(cp: string): number {
  const prefijo = cp?.substring(0, 5);
  return PRECIOS_ZONA[prefijo] ?? PRECIO_BASE_DEFAULT;
}

function getMultiplicadorTipo(tipo: string): number {
  const m: Record<string, number> = {
    piso: 1.0,
    casa: 1.15,
    adosado: 1.1,
    chalet: 1.25,
    local: 0.85,
    garaje: 0.4,
    atico: 1.2,
    duplex: 1.1,
    estudio: 0.95,
  };
  return m[tipo] ?? 1.0;
}

function getMultiplicadorEstado(estado: string): number {
  const m: Record<string, number> = {
    excelente: 1.15,
    bueno: 1.0,
    regular: 0.88,
    reformar: 0.72,
  };
  return m[estado] ?? 1.0;
}

function getMultiplicadorPlanta(planta: string): number {
  const m: Record<string, number> = {
    bajo: 0.92,
    entresuelo: 0.94,
    primero: 0.97,
    segundo: 1.0,
    tercero: 1.02,
    cuarto: 1.04,
    quinto: 1.05,
    "6+": 1.06,
    ático: 1.12,
  };
  return m[planta] ?? 1.0;
}

function getBonoExtras(extras: string[]): number {
  let bono = 0;
  if (extras.includes("garaje")) bono += 0.04;
  if (extras.includes("trastero")) bono += 0.015;
  if (extras.includes("piscina")) bono += 0.05;
  if (extras.includes("terraza")) bono += 0.03;
  if (extras.includes("ascensor")) bono += 0.02;
  if (extras.includes("jardin")) bono += 0.04;
  if (extras.includes("portero")) bono += 0.01;
  if (extras.includes("gym")) bono += 0.015;
  return bono;
}

export function calcularEstimacion(datos: DatosVivienda): Estimacion {
  const precioBaseM2 = getPrecioBaseM2(datos.codigoPostal ?? "");
  const mult = getMultiplicadorTipo(datos.tipoInmueble)
    * getMultiplicadorEstado(datos.estado)
    * getMultiplicadorPlanta(datos.planta ?? "segundo")
    * (1 + getBonoExtras(datos.extras));

  const precioPorM2 = Math.round(precioBaseM2 * mult);
  const valorBase = datos.superficie * precioPorM2;

  // Margen: -8% abajo, +12% arriba, media +2% sobre mercado
  const min = Math.round(valorBase * 0.92 / 1000) * 1000;
  const max = Math.round(valorBase * 1.12 / 1000) * 1000;
  const media = Math.round(valorBase * 1.02 / 1000) * 1000;

  // Histórico de precios últimos 13 meses (dinámico desde la fecha actual)
  const mesesNombres = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const ahora = new Date();
  const meses: string[] = [];
  for (let i = 12; i >= 0; i--) {
    const d = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
    meses.push(`${mesesNombres[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`);
  }
  const tendencia = 1.045; // +4.5% anual España
  const historico = meses.map((mes, i) => {
    const factor = Math.pow(tendencia, (i - 12) / 12);
    const variacion = 1 + (Math.sin(i * 0.8) * 0.015);
    return {
      mes,
      precio: Math.round(precioPorM2 * factor * variacion),
    };
  });

  return { min, max, media, precioPorM2, precioPorM2Zona: precioBaseM2, historico };
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('es-ES').format(n);
}
