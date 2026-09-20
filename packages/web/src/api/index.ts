import { Hono } from 'hono';
import { cors } from "hono/cors";
import { db } from './database';
import * as schema from './database/schema';
import { eq, sql } from 'drizzle-orm';
import { Resend } from 'resend';
import { createHmac, timingSafeEqual } from 'node:crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

// ─────────────────────────────────────────────────────────────────────────
// Autenticación del panel de administración (/admin).
//
// El panel de leads contiene datos personales (nombre, teléfono, email,
// dirección) de cada visitante que ha usado el formulario. Antes, la
// "contraseña" solo se comprobaba en el navegador y los endpoints
// GET/PATCH/DELETE de /leads eran públicos: cualquiera que conociera la URL
// podía leer, modificar o borrar todos los leads sin autenticarse.
//
// Ahora la contraseña se valida en el servidor (nunca viaja en el bundle de
// JS) y, si es correcta, se emite un token firmado con HMAC-SHA256 que el
// panel debe enviar en la cabecera Authorization en cada petición protegida.
// ─────────────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? '';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24h

function signAdminToken(): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const sig = createHmac('sha256', ADMIN_SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}.${sig}`).toString('base64url');
}

function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token || !ADMIN_SESSION_SECRET) return false;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const [payload, sig] = decoded.split('.');
    if (!payload || !sig) return false;
    const expectedSig = createHmac('sha256', ADMIN_SESSION_SECRET).update(payload).digest('hex');
    const a = Buffer.from(sig, 'hex');
    const b = Buffer.from(expectedSig, 'hex');
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    return Date.now() < Number(payload);
  } catch {
    return false;
  }
}

function generarEmailHTML(data: {
  nombre: string;
  email: string;
  direccion: string;
  tipoInmueble: string;
  superficie: number;
  habitaciones: number | string;
  banos: number | string;
  estado: string;
  valorMin: number;
  valorMax: number;
  valorMedia: number;
  precioPorM2: number;
  precioPorM2Zona: number;
  historico: { mes: string; precio: number }[];
  cuotaHipoteca: number;
  entradaHipoteca: number;
  plazoHipoteca: number;
  interesHipoteca: number;
}): string {
  const fmt = (n: number) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(n) + ' €';
  const fmtNum = (n: number) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(n);
  const tipoLabels: Record<string, string> = {
    piso: 'Piso', casa: 'Casa', adosado: 'Adosado', chalet: 'Chalet',
    atico: 'Ático', duplex: 'Dúplex', estudio: 'Estudio', local: 'Local',
  };
  const estadoLabels: Record<string, string> = {
    excelente: 'Excelente', bueno: 'Buen estado', regular: 'Regular', reformar: 'A reformar',
  };

  // Build sparkline bars from historico (last 6 months)
  const hist = data.historico.slice(-6);
  const maxP = Math.max(...hist.map(h => h.precio));
  const minP = Math.min(...hist.map(h => h.precio));
  const range = maxP - minP || 1;
  const bars = hist.map(h => {
    const pct = Math.round(((h.precio - minP) / range) * 60 + 30); // 30-90%
    return `<td style="vertical-align:bottom;padding:0 2px;width:40px">
      <div style="background:#10b981;width:28px;height:${pct}px;border-radius:4px 4px 0 0;margin:0 auto"></div>
      <div style="color:#6b7280;font-size:10px;text-align:center;margin-top:4px;white-space:nowrap">${h.mes.slice(0, 3)}</div>
    </td>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tu valoración de vivienda — ValoracionDeMiCasa.es</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif">

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%">

  <!-- HEADER gradient -->
  <tr>
    <td style="background:linear-gradient(135deg,#0a0f1e 0%,#0d3d2e 50%,#0a1628 100%);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center">
      <!-- Logo text -->
      <div style="display:inline-block;margin-bottom:20px">
        <span style="font-size:22px;font-weight:900;color:#10b981;letter-spacing:-0.5px">valoracion</span><span style="font-size:22px;font-weight:900;color:white;letter-spacing:-0.5px">demicasa.es</span>
      </div>
      <div style="width:48px;height:2px;background:#10b981;margin:0 auto 20px"></div>
      <h1 style="color:white;font-size:26px;font-weight:900;margin:0 0 8px;letter-spacing:-0.5px">Tu valoración está lista, ${data.nombre.split(' ')[0]}</h1>
      <p style="color:#9ca3af;font-size:14px;margin:0">${tipoLabels[data.tipoInmueble] ?? data.tipoInmueble} · ${data.superficie} m² · ${data.direccion}</p>
    </td>
  </tr>

  <!-- VALORACIÓN HERO -->
  <tr>
    <td style="background:#111827;padding:32px 40px;text-align:center">
      <p style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Valor estimado de tu vivienda</p>
      <div style="color:#10b981;font-size:48px;font-weight:900;letter-spacing:-2px;line-height:1;margin-bottom:12px">${fmt(data.valorMedia)}</div>
      <div style="display:inline-block;background:#1f2937;border:1px solid #374151;border-radius:999px;padding:8px 20px">
        <span style="color:#9ca3af;font-size:13px">Rango orientativo: </span>
        <span style="color:#10b981;font-weight:700;font-size:13px">${fmt(data.valorMin)}</span>
        <span style="color:#6b7280;font-size:13px"> — </span>
        <span style="color:#10b981;font-weight:700;font-size:13px">${fmt(data.valorMax)}</span>
      </div>
    </td>
  </tr>

  <!-- DATOS INMUEBLE + PRECIO M2 -->
  <tr>
    <td style="background:#111827;padding:0 40px 24px">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="50%" style="padding-right:8px">
            <table width="100%" cellpadding="12" cellspacing="0" border="0" style="background:#1f2937;border-radius:12px">
              <tr><td style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px">Tu vivienda</td></tr>
              <tr><td style="color:white;font-size:13px;line-height:1.8;padding-top:0">
                <strong>${tipoLabels[data.tipoInmueble] ?? data.tipoInmueble}</strong><br>
                ${data.superficie} m² · ${data.habitaciones} hab · ${data.banos} baños<br>
                ${estadoLabels[data.estado] ?? data.estado}
              </td></tr>
            </table>
          </td>
          <td width="50%" style="padding-left:8px">
            <table width="100%" cellpadding="12" cellspacing="0" border="0" style="background:#1f2937;border-radius:12px">
              <tr><td style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px">Precio/m²</td></tr>
              <tr><td style="color:white;font-size:13px;line-height:1.8;padding-top:0">
                Tu inmueble: <strong style="color:#10b981">${fmtNum(data.precioPorM2)} €/m²</strong><br>
                Zona: <strong>${fmtNum(data.precioPorM2Zona)} €/m²</strong><br>
                Superficie: <strong>${data.superficie} m²</strong>
              </td></tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- GRÁFICO EVOLUCIÓN PRECIOS -->
  <tr>
    <td style="background:#111827;padding:0 40px 28px">
      <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background:#1f2937;border-radius:12px">
        <tr>
          <td>
            <p style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px">Evolución de precios en tu zona (€/m²)</p>
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
              <tr style="height:90px;vertical-align:bottom">
                ${bars}
              </tr>
            </table>
            <p style="color:#6b7280;font-size:11px;margin:8px 0 0;text-align:center">Últimos 6 meses · Datos orientativos</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- HIPOTECA -->
  <tr>
    <td style="background:#111827;padding:0 40px 28px">
      <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background:#1f2937;border-radius:12px">
        <tr>
          <td>
            <p style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px">Calculadora hipotecaria estimada</p>
            <table width="100%" cellpadding="8" cellspacing="0" border="0">
              <tr style="background:#111827;border-radius:8px">
                <td style="color:#6b7280;font-size:13px;border-radius:6px 0 0 6px;padding:10px 12px">Cuota mensual estimada</td>
                <td align="right" style="color:#10b981;font-size:20px;font-weight:900;border-radius:0 6px 6px 0;padding:10px 12px">${fmt(Math.round(data.cuotaHipoteca))}/mes</td>
              </tr>
              <tr>
                <td style="color:#9ca3af;font-size:12px;padding:6px 12px">Precio vivienda</td>
                <td align="right" style="color:white;font-size:12px;padding:6px 12px">${fmt(data.valorMedia)}</td>
              </tr>
              <tr>
                <td style="color:#9ca3af;font-size:12px;padding:6px 12px">Entrada (20%)</td>
                <td align="right" style="color:white;font-size:12px;padding:6px 12px">${fmt(data.entradaHipoteca)}</td>
              </tr>
              <tr>
                <td style="color:#9ca3af;font-size:12px;padding:6px 12px">Plazo / Interés</td>
                <td align="right" style="color:white;font-size:12px;padding:6px 12px">${data.plazoHipoteca} años · ${data.interesHipoteca}%</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- AVISO VALORACIÓN PROFESIONAL -->
  <tr>
    <td style="background:#111827;padding:0 40px 32px">
      <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background:linear-gradient(135deg,#0d3d2e,#0a1628);border:1px solid #10b981;border-radius:12px">
        <tr>
          <td>
            <p style="color:#10b981;font-size:14px;font-weight:700;margin:0 0 8px">⭐ Recomendación profesional</p>
            <p style="color:#d1fae5;font-size:13px;margin:0 0 12px;line-height:1.6">Esta valoración es <strong>orientativa</strong> y se basa en datos del mercado. Para conocer el precio real y vender al mejor precio, te recomendamos solicitar una <strong>valoración profesional gratuita</strong> con el agente inmobiliario mejor valorado de tu zona.</p>
            <p style="color:#6b7280;font-size:11px;margin:0">En breve recibirás una llamada para coordinar tu valoración profesional sin compromiso.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background:#0a0f1e;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center">
      <p style="color:#374151;font-size:11px;margin:0 0 6px">ValoracionDeMiCasa.es · Valoración inmobiliaria online</p>
      <p style="color:#374151;font-size:11px;margin:0">Esta valoración es meramente orientativa y no constituye una tasación oficial.</p>
    </td>
  </tr>

</table>
</td></tr>
</table>

</body>
</html>`;
}

const app = new Hono()
  .basePath('api')
  .use(cors({ origin: (origin) => origin ?? "*", credentials: true, exposeHeaders: ["set-auth-token"] }))
  .get('/health', (c) => c.json({ status: 'ok' }, 200))

  // Login del panel de administración: la contraseña se valida aquí, en el
  // servidor, y nunca se envía al navegador (a diferencia del esquema
  // anterior, que la comparaba en el propio JS del cliente).
  .post('/admin/login', async (c) => {
    try {
      const body = await c.req.json().catch(() => ({}));
      if (!ADMIN_PASSWORD) {
        return c.json({ success: false, error: 'ADMIN_PASSWORD no configurado en el servidor' }, 500);
      }
      if (typeof body.password !== 'string' || body.password !== ADMIN_PASSWORD) {
        return c.json({ success: false, error: 'Contraseña incorrecta' }, 401);
      }
      return c.json({ success: true, token: signAdminToken() }, 200);
    } catch {
      return c.json({ success: false, error: 'Error de login' }, 500);
    }
  })

  // Número total de valoraciones realizadas — endpoint público de solo
  // agregado (sin datos personales) para mostrar prueba social real en la
  // home en lugar de cifras inventadas.
  .get('/leads/count', async (c) => {
    try {
      const [row] = await db.select({ count: sql<number>`count(*)` }).from(schema.leads);
      return c.json({ count: Number(row?.count ?? 0) }, 200);
    } catch {
      return c.json({ count: 0 }, 200);
    }
  })

  // Proxy Geoapify Address Autocomplete — evita exponer la API key en el frontend
  // Sesgado hacia Madrid noroeste (Pozuelo/Aravaca/Las Rozas/Majadahonda/Boadilla/Alcobendas)
  // pero sin restringir a esa zona: cualquier dirección de España sigue apareciendo.
  .get('/places', async (c) => {
    try {
      const q = c.req.query('q');
      if (!q || q.length < 2) return c.json({ predictions: [] }, 200);
      const apiKey = process.env.GEOAPIFY_API_KEY;
      // Antes, si faltaba la clave, se devolvía { predictions: [] } — igual
      // que una búsqueda sin resultados. El usuario veía "Sin resultados"
      // sin forma de saber que el buscador estaba caído, no que su
      // dirección no existiera. Ahora se distingue con `serviceDown` para
      // que el formulario pueda mostrar un aviso honesto.
      if (!apiKey) return c.json({ predictions: [], serviceDown: true }, 200);
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(q)}&filter=countrycode:es&bias=proximity:-3.79,40.475&lang=es&format=json&limit=5&apiKey=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) return c.json({ predictions: [], serviceDown: true }, 200);
      const data = await res.json() as any;
      const predictions = (data.results ?? []).map((r: any) => {
        const mainText = [r.street, r.housenumber].filter(Boolean).join(' ') || r.address_line1 || r.formatted || '';
        const secondaryText = [r.postcode, r.city].filter(Boolean).join(' ') || r.address_line2 || '';
        return {
          place_id: Buffer.from(JSON.stringify({
            street: r.street ?? '', housenumber: r.housenumber ?? '', postcode: r.postcode ?? '',
            city: r.city ?? r.county ?? r.state ?? '', lat: r.lat ?? 0, lon: r.lon ?? 0,
          })).toString('base64'),
          description: r.formatted ?? [mainText, secondaryText].filter(Boolean).join(', '),
          structured_formatting: { main_text: mainText, secondary_text: secondaryText },
        };
      });
      return c.json({ predictions }, 200);
    } catch (e) {
      console.error('Places error:', e);
      return c.json({ predictions: [], serviceDown: true }, 200);
    }
  })

  // Decodifica el place_id (que ya contiene los datos completos de Geoapify, sin llamada extra)
  .get('/places/detail', async (c) => {
    try {
      const placeId = c.req.query('place_id');
      if (!placeId) return c.json({ result: null }, 200);
      const decoded = JSON.parse(Buffer.from(placeId, 'base64').toString('utf-8'));
      return c.json({ result: decoded }, 200);
    } catch (e) {
      console.error('Places detail error:', e);
      return c.json({ result: null }, 200);
    }
  })

  // Crear lead
  .post('/leads', async (c) => {
    try {
      const body = await c.req.json();
      const ip = c.req.header('x-forwarded-for') ?? 'unknown';
      const [lead] = await db.insert(schema.leads).values({
        nombre: body.nombre,
        telefono: body.telefono,
        email: body.email,
        direccion: body.direccion,
        codigoPostal: body.codigoPostal ?? null,
        ciudad: body.ciudad ?? null,
        tipoInmueble: body.tipoInmueble,
        superficie: body.superficie,
        habitaciones: body.habitaciones,
        banos: body.banos,
        planta: body.planta ?? null,
        puerta: body.puerta ?? null,
        estado: body.estado,
        extras: body.extras ? JSON.stringify(body.extras) : null,
        valorEstimadoMin: body.valorEstimadoMin ?? null,
        valorEstimadoMax: body.valorEstimadoMax ?? null,
        valorEstimado: body.valorEstimado ?? null,
        // Antes por defecto era `true`: si el campo llegaba vacío se asumía
        // consentimiento. El RGPD exige consentimiento expreso (checkbox
        // desmarcado por defecto), así que ahora el valor por defecto es
        // "no autorizado" si no se recibe explícitamente `true`.
        consentimientoCesion: body.consentimientoCesion === true,
        ip,
      }).returning();
      return c.json({ success: true, lead }, 201);
    } catch (e) {
      console.error(e);
      return c.json({ success: false, error: 'Error al guardar el lead' }, 500);
    }
  })

  // Endpoint público y acotado: el propio usuario, justo después de ver su
  // valoración, puede pedir que le llamen. Solo puede mover SU lead (por id,
  // guardado en su sessionStorage al crearlo) de "nuevo" a "contactado" —
  // a diferencia del PATCH genérico de abajo, no permite leer, borrar ni
  // escribir notas internas, así que no sirve para manipular otros leads
  // más allá de marcarlos como que alguien pidió que le llamaran.
  .post('/leads/:id/solicitar-llamada', async (c) => {
    try {
      const id = parseInt(c.req.param('id'));
      if (!Number.isFinite(id)) return c.json({ success: false }, 400);
      const [lead] = await db.update(schema.leads)
        .set({ estado_lead: 'contactado' })
        .where(eq(schema.leads.id, id))
        .returning();
      return c.json({ success: !!lead }, 200);
    } catch {
      return c.json({ success: false }, 500);
    }
  })

  // ── A partir de aquí, todo requiere sesión de administrador ──
  // (el panel /admin contiene nombre, teléfono, email y dirección de cada
  // visitante — antes estos tres endpoints eran públicos, sin ninguna
  // comprobación, y cualquiera que conociera la URL podía leer, editar o
  // borrar todos los leads. La comprobación se hace al principio de cada
  // handler, no vía middleware compartido, para que no dependa del orden
  // de registro de rutas.)

  // Listar leads (admin)
  .get('/leads', async (c) => {
    const auth = c.req.header('authorization') ?? '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!verifyAdminToken(token)) return c.json({ success: false, error: 'No autorizado' }, 401);
    try {
      const leads = await db.select().from(schema.leads).orderBy(schema.leads.id);
      return c.json({ leads: leads.reverse() }, 200);
    } catch (e) {
      return c.json({ leads: [] }, 200);
    }
  })

  // Actualizar estado lead / notas internas (admin)
  .patch('/leads/:id', async (c) => {
    const auth = c.req.header('authorization') ?? '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!verifyAdminToken(token)) return c.json({ success: false, error: 'No autorizado' }, 401);
    try {
      const id = parseInt(c.req.param('id'));
      const body = await c.req.json();
      const [lead] = await db.update(schema.leads)
        .set({ estado_lead: body.estado_lead, notas: body.notas })
        .where(eq(schema.leads.id, id))
        .returning();
      return c.json({ success: true, lead }, 200);
    } catch (e) {
      return c.json({ success: false }, 500);
    }
  })

  // Eliminar lead (admin)
  .delete('/leads/:id', async (c) => {
    const auth = c.req.header('authorization') ?? '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!verifyAdminToken(token)) return c.json({ success: false, error: 'No autorizado' }, 401);
    try {
      const id = parseInt(c.req.param('id'));
      await db.delete(schema.leads).where(eq(schema.leads.id, id));
      return c.json({ success: true }, 200);
    } catch (e) {
      return c.json({ success: false }, 500);
    }
  })

  // Enviar email de valoración al cliente
  .post('/send-valoracion-email', async (c) => {
    try {
      const body = await c.req.json();
      const { email, nombre, ...rest } = body;
      if (!email || !nombre) {
        return c.json({ success: false, error: 'Faltan datos' }, 400);
      }

      // Calcular cuota hipoteca estándar (20% entrada, 25 años, 3.5%)
      const precio = rest.valorMedia ?? 200000;
      const entrada = Math.round(precio * 0.2 / 1000) * 1000;
      const capital = precio - entrada;
      const tasaMensual = 3.5 / 100 / 12;
      const nMeses = 25 * 12;
      const cuotaHipoteca = capital > 0
        ? (capital * tasaMensual * Math.pow(1 + tasaMensual, nMeses)) / (Math.pow(1 + tasaMensual, nMeses) - 1)
        : 0;

      const html = generarEmailHTML({
        nombre,
        email,
        direccion: rest.direccion ?? '',
        tipoInmueble: rest.tipoInmueble ?? 'piso',
        superficie: rest.superficie ?? 0,
        habitaciones: rest.habitaciones ?? '-',
        banos: rest.banos ?? '-',
        estado: rest.estado ?? 'bueno',
        valorMin: rest.valorMin ?? 0,
        valorMax: rest.valorMax ?? 0,
        valorMedia: rest.valorMedia ?? 0,
        precioPorM2: rest.precioPorM2 ?? 0,
        precioPorM2Zona: rest.precioPorM2Zona ?? 0,
        historico: rest.historico ?? [],
        cuotaHipoteca,
        entradaHipoteca: entrada,
        plazoHipoteca: 25,
        interesHipoteca: 3.5,
      });

      // Enviar email via Resend
      await resend.emails.send({
        from: 'ValoracionDeMiCasa.es <info@valoraciondemicasa.es>',
        to: email,
        subject: 'Tu valoración de vivienda — ValoracionDeMiCasa.es',
        html,
        replyTo: 'info@valoraciondemicasa.es',
      });

      return c.json({ success: true }, 200);
    } catch (e) {
      console.error('Error enviando email:', e);
      return c.json({ success: false, error: 'Error al enviar email' }, 500);
    }
  });

export type AppType = typeof app;
export default app;
