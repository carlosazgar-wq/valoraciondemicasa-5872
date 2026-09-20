import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { Logo } from "../components/Logo";
import { formatCurrency, formatNumber, type Estimacion } from "../lib/valoracion";
import { Home, TrendingUp, Calculator, Phone, Star, ArrowLeft, CheckCircle, Info } from "lucide-react";

interface ResultData {
  formData: any;
  estimacion: Estimacion;
}

// Animated counter
function AnimatedNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{formatNumber(current)}{suffix}</span>;
}

// Calculadora hipotecaria
function CalculadoraHipoteca({ valorVivienda }: { valorVivienda: number }) {
  const [precio, setPrecio] = useState(Math.round(valorVivienda / 1000) * 1000);
  const [entrada, setEntrada] = useState(Math.round(valorVivienda * 0.2 / 1000) * 1000);
  const [plazo, setPlazo] = useState(25);
  const [interes, setInteres] = useState(3.5);

  const capital = precio - entrada;
  const tasaMensual = interes / 100 / 12;
  const nMeses = plazo * 12;
  const cuota = capital > 0 && tasaMensual > 0
    ? (capital * tasaMensual * Math.pow(1 + tasaMensual, nMeses)) / (Math.pow(1 + tasaMensual, nMeses) - 1)
    : 0;
  const totalPagado = cuota * nMeses;
  const totalIntereses = totalPagado - capital;
  const porcentajeEntrada = Math.round((entrada / precio) * 100);

  return (
    <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6 sm:p-8 card-glow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 flex items-center justify-center">
          <Calculator size={20} className="text-[#10b981]" />
        </div>
        <div>
          <h3 className="font-bold text-white">Calculadora hipotecaria</h3>
          <p className="text-gray-400 text-xs">Calcula tu cuota mensual aproximada</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">
            Precio de compra: <span className="text-white font-bold">{formatCurrency(precio)}</span>
          </label>
          <input
            type="range"
            min={50000} max={2000000} step={5000}
            value={precio}
            onChange={e => setPrecio(Number(e.target.value))}
            className="w-full accent-[#10b981]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">
            Entrada ({porcentajeEntrada}%): <span className="text-white font-bold">{formatCurrency(entrada)}</span>
          </label>
          <input
            type="range"
            min={0} max={precio * 0.5} step={1000}
            value={entrada}
            onChange={e => setEntrada(Number(e.target.value))}
            className="w-full accent-[#10b981]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">
            Plazo: <span className="text-white font-bold">{plazo} años</span>
          </label>
          <input
            type="range"
            min={5} max={40} step={1}
            value={plazo}
            onChange={e => setPlazo(Number(e.target.value))}
            className="w-full accent-[#10b981]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">
            Tipo de interés: <span className="text-white font-bold">{interes}%</span>
          </label>
          <input
            type="range"
            min={1} max={8} step={0.1}
            value={interes}
            onChange={e => setInteres(Number(e.target.value))}
            className="w-full accent-[#10b981]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#0a0f1e] rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-[#10b981]">{formatCurrency(Math.round(cuota))}</div>
          <div className="text-xs text-gray-400 mt-1">Cuota mensual</div>
        </div>
        <div className="bg-[#0a0f1e] rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-white">{formatCurrency(Math.round(capital))}</div>
          <div className="text-xs text-gray-400 mt-1">Capital prestado</div>
        </div>
        <div className="bg-[#0a0f1e] rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-amber-400">{formatCurrency(Math.round(totalIntereses))}</div>
          <div className="text-xs text-gray-400 mt-1">Total intereses</div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 flex items-center gap-1">
        <Info size={11} /> Cálculo orientativo. Consulta con tu banco para condiciones reales.
      </p>
    </div>
  );
}

export default function ResultadoPage() {
  const [, setLocation] = useLocation();
  const [result, setResult] = useState<ResultData | null>(null);
  const [show, setShow] = useState(false);
  const [llamadaSolicitada, setLlamadaSolicitada] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const emailSentRef = useRef(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('valoracion_result');
    if (!raw) { setLocation('/'); return; }
    try {
      const data = JSON.parse(raw);
      setResult(data);
      setTimeout(() => setShow(true), 100);

      // Enviar email si el lead proporcionó email y no se ha enviado ya
      if (!emailSentRef.current && data.formData?.email) {
        emailSentRef.current = true;
        const { formData, estimacion } = data;
        fetch('/api/send-valoracion-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            nombre: formData.nombre,
            direccion: formData.direccion ?? '',
            tipoInmueble: formData.tipoInmueble,
            superficie: formData.superficie,
            habitaciones: formData.habitaciones,
            banos: formData.banos,
            estado: formData.estado,
            valorMin: estimacion.min,
            valorMax: estimacion.max,
            valorMedia: estimacion.media,
            precioPorM2: estimacion.precioPorM2,
            precioPorM2Zona: estimacion.precioPorM2Zona,
            historico: estimacion.historico,
          }),
        })
          .then(r => r.json())
          .then(res => { if (res.success) setEmailEnviado(true); })
          .catch(() => {});
      }
    } catch { setLocation('/'); }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin" />
      </div>
    );
  }

  const { formData, estimacion } = result;
  const tipoLabels: Record<string, string> = {
    piso: "Piso", casa: "Casa", adosado: "Adosado", chalet: "Chalet",
    atico: "Ático", duplex: "Dúplex", estudio: "Estudio", local: "Local",
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] pb-20">
      {/* Glow background */}
      <div className="fixed top-0 left-0 right-0 h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#10b981]/4 rounded-full blur-2xl" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-[#1f2937]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo size={34} />
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} /> Nueva valoración
          </button>
        </div>
      </nav>

      <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-sm font-semibold mb-4">
            <CheckCircle size={16} /> Valoración completada
          </div>
          {emailEnviado && formData.email && (
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-2">
              <CheckCircle size={14} /> Informe enviado a {formData.email}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Tu valoración está lista, {formData.nombre?.split(' ')[0]}
          </h1>
          <p className="text-gray-400">
            {tipoLabels[formData.tipoInmueble] ?? formData.tipoInmueble} · {formData.superficie} m² · {formData.direccion?.split(',').slice(-2).join(',').trim()}
          </p>
        </div>

        {/* TARJETA PRINCIPAL ESTIMACIÓN */}
        <div className="bg-gradient-to-br from-[#0d1f16] to-[#111827] border border-[#10b981]/30 rounded-3xl p-8 sm:p-12 card-glow mb-8 text-center relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-gradient-radial from-[#10b981]/8 to-transparent rounded-3xl pointer-events-none" />

          <p className="text-gray-400 text-sm mb-2">Valor estimado de tu vivienda</p>
          <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-2">
            {show && <AnimatedNumber target={estimacion.media} suffix=" €" />}
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Rango orientativo: <span className="text-[#10b981] font-semibold">{formatCurrency(estimacion.min)}</span> — <span className="text-[#10b981] font-semibold">{formatCurrency(estimacion.max)}</span>
          </p>

          {/* Range bar */}
          <div className="relative h-3 bg-[#1f2937] rounded-full max-w-lg mx-auto mb-2 overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-[#10b981]/40 via-[#10b981] to-[#10b981]/40 rounded-full transition-all duration-1000"
              style={{
                left: '0%',
                width: '100%',
              }}
            />
            {/* Indicador media */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-3 border-[#10b981] shadow-lg"
              style={{ left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
            />
          </div>

          <div className="flex justify-between max-w-lg mx-auto text-xs text-gray-500 mb-8">
            <span>Mínimo</span>
            <span>Valor estimado</span>
            <span>Máximo</span>
          </div>

          {/* Price/m2 chips */}
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="px-4 py-2 rounded-xl bg-[#111827] border border-[#1f2937]">
              <span className="text-gray-400 text-xs">Precio/m²: </span>
              <span className="text-white font-bold text-sm">{formatCurrency(estimacion.precioPorM2)}/m²</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#111827] border border-[#1f2937]">
              <span className="text-gray-400 text-xs">Media zona: </span>
              <span className="text-white font-bold text-sm">{formatCurrency(estimacion.precioPorM2Zona)}/m²</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#111827] border border-[#1f2937]">
              <span className="text-gray-400 text-xs">Superficie: </span>
              <span className="text-white font-bold text-sm">{formData.superficie} m²</span>
            </div>
          </div>
        </div>

        {/* DETALLES + GRÁFICO */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Resumen inmueble */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6 card-glow">
            <div className="flex items-center gap-2 mb-5">
              <Home size={18} className="text-[#10b981]" />
              <h3 className="font-bold text-white">Tu inmueble</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Tipo", value: tipoLabels[formData.tipoInmueble] ?? formData.tipoInmueble },
                { label: "Superficie", value: `${formData.superficie} m²` },
                { label: "Habitaciones", value: formData.habitaciones },
                { label: "Baños", value: formData.banos },
                { label: "Planta", value: formData.planta ?? "-" },
                { label: "Estado", value: { excelente: "Excelente", bueno: "Buen estado", regular: "Regular", reformar: "A reformar" }[formData.estado] ?? formData.estado },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center py-2 border-b border-[#1f2937] last:border-0">
                  <span className="text-gray-400 text-sm">{row.label}</span>
                  <span className="text-white text-sm font-medium">{row.value}</span>
                </div>
              ))}
              {formData.extras?.length > 0 && (
                <div className="pt-2">
                  <span className="text-gray-400 text-xs">Extras:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {formData.extras.map((e: string) => (
                      <span key={e} className="px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981] text-xs">{e}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gráfico precios zona */}
          <div className="lg:col-span-2 bg-[#111827] border border-[#1f2937] rounded-2xl p-6 card-glow">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={18} className="text-[#10b981]" />
              <div>
                <h3 className="font-bold text-white">Evolución precios en tu zona</h3>
                <p className="text-gray-400 text-xs">€/m² · últimos 13 meses</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={estimacion.historico} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="colorPrecio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                  dataKey="mes"
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  interval={2}
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}€`}
                />
                <Tooltip
                  contentStyle={{ background: '#1a2337', border: '1px solid #1f2937', borderRadius: '8px', color: 'white', fontSize: '12px' }}
                  formatter={(v: any) => [`${formatNumber(v)} €/m²`, 'Precio']}
                />
                <Area
                  type="monotone"
                  dataKey="precio"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#colorPrecio)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#10b981' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CALCULADORA HIPOTECARIA */}
        <div className="mb-8">
          <CalculadoraHipoteca valorVivienda={estimacion.media} />
        </div>

        {/* CTA — AGENTE */}
        <div className="bg-gradient-to-br from-[#0d2419] to-[#111827] border border-[#10b981]/40 rounded-3xl p-8 sm:p-10 card-glow text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#10b981]/20 flex items-center justify-center mx-auto mb-5">
              <Star size={28} className="text-[#10b981]" fill="currentColor" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              ¿Quieres una tasación profesional?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Esta estimación es orientativa. Para conocer el valor exacto de tu vivienda y venderla al mejor precio, te conectamos con el <strong className="text-white">agente inmobiliario mejor valorado de tu zona</strong>, totalmente gratis y sin compromiso.
            </p>
            {!llamadaSolicitada ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={async () => {
                    setLlamadaSolicitada(true);
                    try {
                      const leadId = sessionStorage.getItem('valoracion_lead_id');
                      if (leadId) {
                        // Endpoint público y acotado: solo marca ESTE lead
                        // como "contactado", no permite leer ni editar nada
                        // más (a diferencia del PATCH genérico, que ahora
                        // requiere sesión de administrador).
                        await fetch(`/api/leads/${leadId}/solicitar-llamada`, { method: 'POST' });
                      }
                    } catch {}
                  }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-black text-base shadow-xl shadow-[#10b981]/30 hover:from-[#059669] hover:to-[#047857] transition-all"
                >
                  <Phone size={20} /> Quiero que me llamen
                </button>
                <button
                  onClick={() => setLocation('/')}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-[#1f2937] text-gray-300 font-semibold hover:border-[#10b981]/40 hover:text-white transition-all"
                >
                  <ArrowLeft size={18} /> Nueva valoración
                </button>
              </div>
            ) : (
              <div className="bg-[#0d2419] border border-[#10b981]/40 rounded-2xl px-8 py-6 max-w-md mx-auto animate-fade-in">
                <CheckCircle size={36} className="text-[#10b981] mx-auto mb-3" />
                <p className="text-white font-bold text-lg mb-1">¡Solicitud recibida!</p>
                <p className="text-gray-300 text-sm">
                  Nos pondremos en contacto contigo en el número <strong className="text-white">{formData.telefono}</strong> en las próximas horas.
                </p>
              </div>
            )}
            {!llamadaSolicitada && (
              <p className="text-gray-500 text-xs mt-5">
                Al solicitar contacto, {formData.nombre} autoriza la cesión de sus datos al agente inmobiliario mejor valorado de la zona.
              </p>
            )}
          </div>
        </div>

        {/* Disclaimer legal */}
        <div className="mt-8 bg-[#111827]/50 border border-[#1f2937] rounded-xl p-5">
          <p className="text-gray-500 text-xs leading-relaxed">
            <strong className="text-gray-400">Aviso importante:</strong> La valoración ofrecida es meramente orientativa y se calcula mediante un algoritmo que analiza datos estadísticos del mercado inmobiliario. No constituye en ningún caso una tasación oficial ni vinculante. Para obtener el valor exacto de tu inmueble, recomendamos contratar los servicios de un profesional inmobiliario colegiado o una sociedad de tasación homologada por el Banco de España.
          </p>
        </div>
      </div>
    </div>
  );
}
