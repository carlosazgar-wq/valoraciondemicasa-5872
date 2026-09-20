// Precios base por m2 en distintas zonas de España (€/m2)
// Datos orientativos basados en precios medios reales
const PRECIOS_ZONA: Record<string, number> = {
  // Madrid capital
  "28001": 5800, "28002": 5200, "28003": 4800, "28004": 6500, "28005": 5000,
  "28006": 6000, "28007": 4200, "28008": 5500, "28009": 4800, "28010": 6200,
  "28011": 3800, "28012": 5200, "28013": 5400, "28014": 5800, "28015": 4500,
  "28016": 4600, "28017": 3200, "28018": 3000, "28019": 2800, "28020": 3800,
  "28021": 2600, "28022": 3400, "28023": 3800, "28024": 2800, "28025": 2900,
  "28026": 2700, "28027": 3100, "28028": 3600, "28029": 3300, "28030": 2900,
  "28031": 2800, "28032": 3000, "28033": 4200, "28034": 4000, "28035": 3500,
  "28036": 4800, "28037": 3200, "28038": 2600, "28039": 3100, "28040": 3400,
  "28041": 2600, "28042": 2900, "28043": 3600, "28044": 2700, "28045": 2800,
  "28046": 5500, "28047": 2900, "28048": 2900, "28049": 3800, "28050": 3400,
  // Madrid municipios
  "28100": 3200, "28108": 3500, "28109": 3300, "28223": 4200, "28224": 4500,
  "28230": 3800, "28231": 4000, "28232": 4200, "28233": 4500, "28250": 3600,
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

  // Margen del ±12%
  const margen = 0.12;
  const min = Math.round(valorBase * (1 - margen) / 1000) * 1000;
  const max = Math.round(valorBase * (1 + margen) / 1000) * 1000;
  const media = Math.round(valorBase / 1000) * 1000;

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
