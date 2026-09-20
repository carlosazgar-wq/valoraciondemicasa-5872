import { useState, useEffect, useRef } from "react";
import { MapPin, Home, Ruler, BedDouble, Bath, Star, CheckSquare, User, Phone, Mail, ChevronRight, ChevronLeft, Check, Building2 } from "lucide-react";

interface FormData {
  // Paso 1: Dirección
  calle: string;
  numero: string;
  codigoPostal: string;
  ciudad: string;
  direccion: string;
  lat: number | null;
  lng: number | null;
  // Paso 2: Tipo y superficie
  tipoInmueble: string;
  superficie: string;
  planta: string;
  puerta: string;
  // Paso 3: Características
  habitaciones: string;
  banos: string;
  extras: string[];
  // Paso 4: Estado
  estado: string;
  // Paso 5: Contacto
  nombre: string;
  telefono: string;
  email: string;
  consentimientoCesion: boolean;
}

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const EXTRAS = [
  { id: "garaje", label: "Garaje", icon: "🚗" },
  { id: "trastero", label: "Trastero", icon: "📦" },
  { id: "piscina", label: "Piscina", icon: "🏊" },
  { id: "terraza", label: "Terraza", icon: "🌿" },
  { id: "ascensor", label: "Ascensor", icon: "🛗" },
  { id: "jardin", label: "Jardín", icon: "🌳" },
  { id: "portero", label: "Portero", icon: "💂" },
  { id: "gym", label: "Gimnasio", icon: "💪" },
  { id: "padel", label: "Pádel", icon: "🎾" },
];

const TIPOS = [
  { id: "piso", label: "Piso", icon: "🏢" },
  { id: "casa", label: "Casa", icon: "🏡" },
  { id: "adosado", label: "Adosado", icon: "🏘️" },
  { id: "chalet", label: "Chalet", icon: "🏠" },
  { id: "atico", label: "Ático", icon: "🌇" },
  { id: "duplex", label: "Dúplex", icon: "🏗️" },
  { id: "estudio", label: "Estudio", icon: "🏙️" },
  { id: "local", label: "Local", icon: "🏪" },
];

const ESTADOS = [
  { id: "excelente", label: "Excelente", desc: "Reformado recientemente, todo nuevo", color: "#10b981" },
  { id: "bueno", label: "Buen estado", desc: "En buen estado, pocas actualizaciones", color: "#3b82f6" },
  { id: "regular", label: "Regular", desc: "Necesita algunas mejoras", color: "#f59e0b" },
  { id: "reformar", label: "A reformar", desc: "Requiere reforma integral", color: "#ef4444" },
];

const PLANTAS = [
  { label: "Bajo", value: "bajo" },
  { label: "Entresuelo", value: "entresuelo" },
  { label: "1ª planta", value: "primero" },
  { label: "2ª planta", value: "segundo" },
  { label: "3ª planta", value: "tercero" },
  { label: "4ª planta", value: "cuarto" },
  { label: "5ª planta", value: "quinto" },
  { label: "6ª o superior", value: "6+" },
  { label: "Ático", value: "ático" },
];

function safeExtras(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter(x => typeof x === 'string');
  return [];
}

function parseGoogleDetail(result: any): {
  road: string; numero: string; cp: string; ciudad: string; lat: number; lng: number;
} {
  // Formato Geoapify (decodificado desde place_id en el backend)
  return {
    road: result?.street ?? "",
    numero: result?.housenumber ?? "",
    cp: result?.postcode ?? "",
    ciudad: result?.city ?? "",
    lat: result?.lat ?? 0,
    lng: result?.lon ?? 0,
  };
}

function useDireccionSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // Antes, si el buscador de direcciones fallaba (p. ej. clave de API no
  // configurada en producción), se mostraba "Sin resultados" exactamente
  // igual que si la dirección no existiera — el usuario no podía distinguir
  // un fallo del sistema de un error suyo. Ahora se distingue con
  // `serviceDown` y se muestra un aviso honesto (ver más abajo).
  const [serviceDown, setServiceDown] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (query.length < 2) { setSuggestions([]); setLoading(false); setServiceDown(false); return; }
    setLoading(true);
    timerRef.current = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(query)}`, { signal: abortRef.current.signal });
        const data = await res.json();
        setSuggestions(data.predictions ?? []);
        setServiceDown(!!data.serviceDown);
      } catch (e: any) {
        if (e.name !== 'AbortError') { setSuggestions([]); setServiceDown(true); }
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query]);

  return { suggestions, loading, serviceDown };
}

function MiniMap({ lat, lng }: { lat: number; lng: number; direccion: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');
        const icon = L.divIcon({
          html: `<div style="width:22px;height:22px;background:linear-gradient(135deg,#34d399,#059669);border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 3px 12px rgba(16,185,129,0.5)"></div>`,
          className: '',
          iconSize: [22, 22],
          iconAnchor: [11, 22],
        });
        if (mapInstance.current) {
          mapInstance.current.flyTo([lat, lng], 16, { duration: 0.8 });
          if (markerRef.current) markerRef.current.setLatLng([lat, lng]);
          return;
        }
        const map = L.map(mapRef.current!, {
          center: [lat, lng], zoom: 16, zoomControl: false,
          scrollWheelZoom: false, dragging: false, doubleClickZoom: false,
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '' }).addTo(map);
        const marker = L.marker([lat, lng], { icon }).addTo(map);
        mapInstance.current = map;
        markerRef.current = marker;
      } catch (e) { console.error('Map error:', e); }
    };
    initMap();
  }, [lat, lng]);

  return (
    <div ref={mapRef} style={{ height: '200px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(16,185,129,0.3)' }} />
  );
}

const INITIAL_DATA: FormData = {
  calle: "", numero: "", codigoPostal: "", ciudad: "Madrid",
  direccion: "", lat: null, lng: null,
  tipoInmueble: "", superficie: "", planta: "", puerta: "",
  habitaciones: "", banos: "", extras: [],
  estado: "",
  // RGPD: el consentimiento tiene que ser una acción expresa del usuario,
  // nunca asumido por defecto (un checkbox premarcado no es un
  // consentimiento válido).
  nombre: "", telefono: "", email: "", consentimientoCesion: false,
};

export function FormularioMultiPaso({ onSubmit, isLoading }: Props) {
  const [paso, setPaso] = useState(1);
  const [calleQuery, setCalleQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [calleConfirmada, setCalleConfirmada] = useState(false);
  const calleInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { suggestions, loading: loadingSuggestions, serviceDown } = useDireccionSuggestions(calleQuery);

  const [data, setData] = useState<FormData>({ ...INITIAL_DATA });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper seguro para extras
  const getExtras = (): string[] => safeExtras(data.extras);

  const update = (field: keyof FormData, value: any) => {
    setData(d => ({ ...d, [field]: value }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const toggleExtra = (id: string) => {
    setData(d => {
      const current = safeExtras(d.extras);
      const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
      return { ...d, extras: next };
    });
  };

  const validate = (p: number): boolean => {
    const e: Record<string, string> = {};
    if (p === 1) {
      if (!data.calle.trim()) e.calle = "Introduce la calle";
      if (!data.numero.trim()) e.numero = "Indica el número de la casa o del portal";
      else if (!/\d/.test(data.numero)) e.numero = "El número debe contener alguna cifra";
      if (!data.codigoPostal.trim() || !/^\d{5}$/.test(data.codigoPostal.trim())) e.codigoPostal = "CP de 5 dígitos";
      if (!data.ciudad.trim()) e.ciudad = "Indica la ciudad";
    }
    if (p === 2) {
      if (!data.tipoInmueble) e.tipoInmueble = "Selecciona el tipo de inmueble";
      if (!data.superficie || parseInt(data.superficie) < 10) e.superficie = "Superficie mínima 10 m²";
      if (!['adosado','chalet','casa'].includes(data.tipoInmueble) && data.tipoInmueble && !data.planta) e.planta = "Selecciona la planta";
      if (data.tipoInmueble === 'piso' && !data.puerta.trim()) e.puerta = "Indica la puerta (A, B, Izquierda…)";
    }
    if (p === 3) {
      if (!data.habitaciones) e.habitaciones = "Indica el número de habitaciones";
      if (!data.banos) e.banos = "Indica el número de baños";
    }
    if (p === 4) {
      if (!data.estado) e.estado = "Selecciona el estado de la vivienda";
    }
    if (p === 5) {
      if (!data.nombre.trim()) e.nombre = "Introduce tu nombre";
      if (!data.telefono.trim() || !/^[6-9]\d{8}$/.test(data.telefono.replace(/\s/g, ''))) e.telefono = "Teléfono español no válido (6xx-9xx)";
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Email no válido";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextPaso = () => {
    if (!validate(paso)) return;
    setPaso(p => Math.min(p + 1, 5));
    // Scroll al top del formulario
    setTimeout(() => {
      document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };
  const prevPaso = () => {
    setPaso(p => Math.max(p - 1, 1));
    setTimeout(() => {
      document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleSubmit = () => {
    if (!validate(5)) return;
    onSubmit({ ...data, extras: getExtras() });
  };

  const buildDireccion = (calle: string, numero: string, ciudad: string) =>
    [calle, numero, ciudad].filter(Boolean).join(", ");

  const handleSelectDireccion = async (s: any) => {
    const mainText = s.structured_formatting?.main_text ?? s.description?.split(",")[0] ?? "";
    const secondaryText = s.structured_formatting?.secondary_text ?? "";
    setCalleQuery(mainText + (secondaryText ? ", " + secondaryText : ""));
    setCalleConfirmada(true);
    setShowSuggestions(false);
    calleInputRef.current?.blur();
    try {
      const res = await fetch(`/api/places/detail?place_id=${encodeURIComponent(s.place_id)}`);
      const detail = await res.json();
      if (detail.result) {
        const parsed = parseGoogleDetail(detail.result);
        const displayCalle = parsed.road || mainText;
        const displayQuery = [displayCalle, parsed.numero, parsed.ciudad].filter(Boolean).join(", ");
        setCalleQuery(displayQuery);
        setData(d => ({
          ...d,
          calle: displayCalle,
          numero: parsed.numero || d.numero,
          codigoPostal: parsed.cp || d.codigoPostal,
          ciudad: parsed.ciudad || d.ciudad,
          direccion: buildDireccion(displayCalle, parsed.numero || d.numero, parsed.ciudad || d.ciudad),
          lat: parsed.lat || null,
          lng: parsed.lng || null,
        }));
        setErrors(e => ({ ...e, calle: "", numero: "", codigoPostal: "", ciudad: "" }));
      }
    } catch {
      setData(d => ({
        ...d,
        calle: mainText,
        direccion: mainText + (secondaryText ? ", " + secondaryText : ""),
      }));
    }
  };

  const handleCalleChange = (val: string) => {
    setCalleQuery(val);
    setCalleConfirmada(false);
    setData(d => ({ ...d, calle: val, direccion: buildDireccion(val, d.numero, d.ciudad), lat: null, lng: null }));
    setErrors(e => ({ ...e, calle: "" }));
    setShowSuggestions(val.length >= 2);
  };

  const updateDireccionField = (field: 'numero' | 'codigoPostal' | 'ciudad', val: string) => {
    setData(d => {
      const next = { ...d, [field]: val };
      next.direccion = buildDireccion(next.calle, next.numero, next.ciudad);
      return next;
    });
    setErrors(e => ({ ...e, [field]: "" }));
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        calleInputRef.current && !calleInputRef.current.contains(e.target as Node) &&
        suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)
      ) { setShowSuggestions(false); }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const pasos = [
    { n: 1, label: "Ubicación", icon: MapPin },
    { n: 2, label: "Tipo", icon: Home },
    { n: 3, label: "Detalles", icon: Ruler },
    { n: 4, label: "Estado", icon: Star },
    { n: 5, label: "Contacto", icon: User },
  ];

  const extras = getExtras();

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {pasos.map((p) => {
            const Icon = p.icon;
            const activo = p.n === paso;
            const completado = p.n < paso;
            return (
              <div key={p.n} className="flex flex-col items-center gap-1 flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${completado ? 'bg-[#10b981]' : activo ? 'bg-[#10b981] ring-4 ring-[#10b981]/30' : 'bg-[#1f2937]'}
                `}>
                  {completado
                    ? <Check size={18} className="text-white" />
                    : <Icon size={18} className={activo ? 'text-white' : 'text-gray-500'} />
                  }
                </div>
                <span className={`text-xs font-medium ${activo ? 'text-[#10b981]' : completado ? 'text-[#10b981]/70' : 'text-gray-500'} hidden sm:block`}>
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="relative h-1 bg-[#1f2937] rounded-full mx-5">
          <div
            className="absolute h-1 bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full transition-all duration-500"
            style={{ width: `${((paso - 1) / 4) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 mx-5">
          <span className="text-xs text-gray-500">Paso {paso} de 5</span>
          <span className="text-xs text-[#10b981] font-semibold">{Math.round(((paso - 1) / 4) * 100)}%</span>
        </div>
      </div>

      <div key={paso} className="animate-fade-in-up">

        {/* ── PASO 1: DIRECCIÓN ── */}
        {paso === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">¿Dónde está tu vivienda?</h3>
              <p className="text-gray-400 text-sm">Empieza escribiendo la calle — te ayudamos a completarla</p>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#64748b' }}>
                Calle / Avenida / Vía
              </label>
              <div
                className="relative flex items-center rounded-2xl transition-all duration-200"
                style={{
                  background: calleConfirmada ? 'rgba(16,185,129,0.08)' : '#16213a',
                  border: calleConfirmada
                    ? '1.5px solid rgba(16,185,129,0.6)'
                    : errors.calle
                      ? '1.5px solid rgba(248,113,113,0.5)'
                      : '1.5px solid #1e3a5f',
                  boxShadow: calleConfirmada
                    ? '0 0 0 3px rgba(16,185,129,0.1)'
                    : showSuggestions
                      ? '0 0 0 3px rgba(99,179,237,0.12)'
                      : 'none',
                }}
              >
                <div className="pl-4 pr-3 shrink-0">
                  {loadingSuggestions
                    ? <div className="w-5 h-5 border-2 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin" />
                    : calleConfirmada
                      ? <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center"><Check size={12} className="text-white" strokeWidth={3} /></div>
                      : <MapPin size={18} style={{ color: showSuggestions ? '#60a5fa' : '#475569' }} />
                  }
                </div>
                <input
                  ref={calleInputRef}
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  className="flex-1 bg-transparent text-white py-4 pr-2 outline-none text-[15px] font-medium placeholder-[#3d5270]"
                  placeholder="Gran Vía, Calle Mayor, Paseo de la Castellana…"
                  value={calleQuery}
                  onChange={e => handleCalleChange(e.target.value)}
                  onFocus={() => { if (calleQuery.length >= 2) setShowSuggestions(true); }}
                />
                {calleQuery.length > 0 && (
                  <button
                    type="button"
                    tabIndex={-1}
                    className="pr-4 pl-1 shrink-0 transition-opacity hover:opacity-100 opacity-60"
                    onClick={() => {
                      setCalleQuery("");
                      setCalleConfirmada(false);
                      setData(d => ({ ...d, calle: "", numero: "", codigoPostal: "", ciudad: "", direccion: "", lat: null, lng: null }));
                      setShowSuggestions(false);
                      setTimeout(() => calleInputRef.current?.focus(), 50);
                    }}
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#1e3a5f' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 2l6 6M8 2l-6 6" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </button>
                )}
              </div>
              {errors.calle && !calleConfirmada && (
                <p className="text-xs mt-1.5 flex items-center gap-1.5" style={{ color: '#f87171' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="#f87171"/><path d="M6 3.5v3M6 8h.01" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {errors.calle}
                </p>
              )}

              {showSuggestions && (loadingSuggestions || suggestions.length > 0 || calleQuery.length >= 3 || serviceDown) && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-50 left-0 right-0 mt-2 rounded-2xl overflow-hidden"
                  style={{ background: '#0f1f35', border: '1px solid #1e3a5f', boxShadow: '0 32px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(16,185,129,0.15)' }}
                >
                  {loadingSuggestions && suggestions.length === 0 && (
                    <div className="px-5 py-4 flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin shrink-0" />
                      <span className="text-sm" style={{ color: '#64748b' }}>Buscando en toda España…</span>
                    </div>
                  )}
                  {suggestions.map((s: any, i: number) => {
                    const main = s.structured_formatting?.main_text ?? s.description?.split(",")[0] ?? "";
                    const secondary = s.structured_formatting?.secondary_text ?? "";
                    return (
                      <button
                        key={s.place_id ?? i}
                        type="button"
                        className="w-full text-left px-4 py-3.5 flex items-center gap-3 transition-all duration-100"
                        style={{ borderBottom: i < suggestions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.1)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        onMouseDown={e => { e.preventDefault(); handleSelectDireccion(s); }}
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(16,185,129,0.12)' }}>
                          <MapPin size={16} className="text-[#10b981]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: '#f1f5f9' }}>{main}</p>
                          {secondary && <p className="text-xs truncate mt-0.5" style={{ color: '#475569' }}>{secondary}</p>}
                        </div>
                        <ChevronRight size={15} style={{ color: '#1e3a5f', flexShrink: 0 }} />
                      </button>
                    );
                  })}
                  {!loadingSuggestions && suggestions.length === 0 && serviceDown && calleQuery.length >= 2 && (
                    <div className="px-5 py-5 text-center">
                      <p className="text-sm font-medium" style={{ color: '#fbbf24' }}>
                        El buscador de direcciones no está disponible ahora mismo
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#475569' }}>
                        No es un error tuyo — puedes seguir escribiendo la calle, el número y el código postal a mano justo debajo, sin problema.
                      </p>
                    </div>
                  )}
                  {!loadingSuggestions && suggestions.length === 0 && !serviceDown && calleQuery.length >= 3 && (
                    <div className="px-5 py-5 text-center">
                      <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>
                        Sin resultados para "<span style={{ color: '#f1f5f9' }}>{calleQuery}</span>"
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#475569' }}>Prueba: nombre de calle + ciudad (ej: "Paseo Castellana Madrid")</p>
                    </div>
                  )}
                  {suggestions.length > 0 && (
                    // Atribución honesta: el buscador usa Geoapify, no Google
                    // (antes se mostraba el logo de Google aquí, dando a
                    // entender un origen de datos que no era el real).
                    <div className="px-4 py-2 flex items-center justify-end gap-1.5" style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <span className="text-xs" style={{ color: '#475569' }}>Direcciones por Geoapify</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#64748b' }}>Número</label>
                <input
                  type="text" autoComplete="off"
                  className="w-full rounded-xl text-white text-sm px-4 py-3.5 outline-none transition-all duration-200 placeholder-[#3d5270]"
                  style={{ background: '#16213a', border: errors.numero ? '1.5px solid rgba(248,113,113,0.5)' : '1.5px solid #1e3a5f' }}
                  onFocus={e => (e.currentTarget.style.border = '1.5px solid rgba(99,179,237,0.4)')}
                  onBlur={e => (e.currentTarget.style.border = errors.numero ? '1.5px solid rgba(248,113,113,0.5)' : '1.5px solid #1e3a5f')}
                  placeholder="45, 3ºB…"
                  value={data.numero}
                  onChange={e => updateDireccionField('numero', e.target.value)}
                />
                {errors.numero && <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>{errors.numero}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#64748b' }}>Código postal</label>
                <input
                  type="text" autoComplete="off" maxLength={5}
                  className="w-full rounded-xl text-white text-sm px-4 py-3.5 outline-none transition-all duration-200 placeholder-[#3d5270]"
                  style={{ background: '#16213a', border: errors.codigoPostal ? '1.5px solid rgba(248,113,113,0.5)' : '1.5px solid #1e3a5f' }}
                  onFocus={e => (e.currentTarget.style.border = '1.5px solid rgba(99,179,237,0.4)')}
                  onBlur={e => (e.currentTarget.style.border = errors.codigoPostal ? '1.5px solid rgba(248,113,113,0.5)' : '1.5px solid #1e3a5f')}
                  placeholder="28001"
                  value={data.codigoPostal}
                  onChange={e => updateDireccionField('codigoPostal', e.target.value.replace(/\D/g, ''))}
                />
                {errors.codigoPostal && <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>{errors.codigoPostal}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#64748b' }}>Ciudad / Municipio</label>
              <input
                type="text" autoComplete="off"
                className="w-full rounded-xl text-white text-sm px-4 py-3.5 outline-none transition-all duration-200 placeholder-[#3d5270]"
                style={{ background: '#16213a', border: errors.ciudad ? '1.5px solid rgba(248,113,113,0.5)' : '1.5px solid #1e3a5f' }}
                onFocus={e => (e.currentTarget.style.border = '1.5px solid rgba(99,179,237,0.4)')}
                onBlur={e => (e.currentTarget.style.border = errors.ciudad ? '1.5px solid rgba(248,113,113,0.5)' : '1.5px solid #1e3a5f')}
                placeholder="Madrid"
                value={data.ciudad}
                onChange={e => updateDireccionField('ciudad', e.target.value)}
              />
              {errors.ciudad && <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>{errors.ciudad}</p>}
            </div>

            {data.lat && data.lng && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: '#10b981' }}>
                  <div className="w-5 h-5 rounded-full bg-[#10b981]/20 flex items-center justify-center">
                    <Check size={11} className="text-[#10b981]" strokeWidth={3} />
                  </div>
                  Dirección localizada correctamente
                </div>
                <MiniMap lat={data.lat} lng={data.lng} direccion={data.direccion} />
              </div>
            )}
          </div>
        )}

        {/* ── PASO 2: TIPO Y SUPERFICIE ── */}
        {paso === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Tipo de inmueble</h3>
              <p className="text-gray-400 text-sm">¿Qué tipo de propiedad tienes?</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de inmueble</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIPOS.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => update('tipoInmueble', t.id)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 text-center
                      ${data.tipoInmueble === t.id
                        ? 'border-[#10b981] bg-[#10b981]/15 text-[#10b981]'
                        : 'border-[#1f2937] bg-[#1f2937]/50 text-gray-300 hover:border-[#10b981]/40'
                      }`}
                  >
                    <div className="text-2xl mb-1">{t.icon}</div>
                    {t.label}
                  </button>
                ))}
              </div>
              {errors.tipoInmueble && <p className="text-red-400 text-xs mt-1">{errors.tipoInmueble}</p>}
            </div>
            <div className={`grid gap-4 ${['adosado','chalet','casa'].includes(data.tipoInmueble) ? 'grid-cols-1' : 'grid-cols-2'}`}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Ruler size={14} className="inline mr-1 text-[#10b981]" />
                  Superficie (m²)
                </label>
                <input
                  type="number" className="form-input"
                  placeholder="Ej: 85" min={10} max={2000}
                  value={data.superficie}
                  onChange={e => update('superficie', e.target.value)}
                />
                {errors.superficie && <p className="text-red-400 text-xs mt-1">{errors.superficie}</p>}
              </div>
              {!['adosado','chalet','casa'].includes(data.tipoInmueble) && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Building2 size={14} className="inline mr-1 text-[#10b981]" />
                    Planta
                  </label>
                  <select className="form-input" value={data.planta} onChange={e => update('planta', e.target.value)}>
                    <option value="">Selecciona la planta…</option>
                    {PLANTAS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                  {errors.planta && <p className="text-red-400 text-xs mt-1">{errors.planta}</p>}
                </div>
              )}
            </div>
            {data.tipoInmueble === 'piso' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Home size={14} className="inline mr-1 text-[#10b981]" />
                  Puerta
                </label>
                <input
                  type="text" className="form-input"
                  placeholder="Ej: A, B, Izquierda, 3…"
                  value={data.puerta}
                  onChange={e => update('puerta', e.target.value)}
                />
                {errors.puerta && <p className="text-red-400 text-xs mt-1">{errors.puerta}</p>}
              </div>
            )}
          </div>
        )}

        {/* ── PASO 3: CARACTERÍSTICAS ── */}
        {paso === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Características</h3>
              <p className="text-gray-400 text-sm">Cuéntanos más sobre tu vivienda</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <BedDouble size={14} className="inline mr-1 text-[#10b981]" />
                  Habitaciones
                </label>
                <div className="grid grid-cols-5 gap-1">
                  {[1,2,3,4,"5+"].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => update('habitaciones', String(n))}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all
                        ${data.habitaciones === String(n)
                          ? 'bg-[#10b981] text-white'
                          : 'bg-[#1f2937] text-gray-300 hover:bg-[#10b981]/20'
                        }`}
                    >{n}</button>
                  ))}
                </div>
                {errors.habitaciones && <p className="text-red-400 text-xs mt-1">{errors.habitaciones}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Bath size={14} className="inline mr-1 text-[#10b981]" />
                  Baños
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {[1,2,3,"4+"].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => update('banos', String(n))}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all
                        ${data.banos === String(n)
                          ? 'bg-[#10b981] text-white'
                          : 'bg-[#1f2937] text-gray-300 hover:bg-[#10b981]/20'
                        }`}
                    >{n}</button>
                  ))}
                </div>
                {errors.banos && <p className="text-red-400 text-xs mt-1">{errors.banos}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <CheckSquare size={14} className="inline mr-1 text-[#10b981]" />
                Extras — selecciona todos los que apliquen
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {EXTRAS.map(ex => {
                  const seleccionado = extras.includes(ex.id);
                  return (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => toggleExtra(ex.id)}
                      className="relative px-3 py-3 rounded-xl border text-xs font-semibold transition-all duration-150 flex flex-col items-center gap-1.5 select-none"
                      style={{
                        border: seleccionado ? '1.5px solid #10b981' : '1.5px solid #1f2937',
                        background: seleccionado ? 'rgba(16,185,129,0.12)' : 'rgba(31,41,55,0.5)',
                        color: seleccionado ? '#10b981' : '#9ca3af',
                      }}
                    >
                      {seleccionado && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#10b981] flex items-center justify-center">
                          <Check size={9} className="text-white" strokeWidth={3} />
                        </div>
                      )}
                      <span className="text-lg">{ex.icon}</span>
                      {ex.label}
                    </button>
                  );
                })}
              </div>
              {extras.length > 0 && (
                <p className="text-xs text-[#10b981] mt-2 font-medium">
                  {extras.length} extra{extras.length > 1 ? 's' : ''} seleccionado{extras.length > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── PASO 4: ESTADO ── */}
        {paso === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Estado de la vivienda</h3>
              <p className="text-gray-400 text-sm">El estado de conservación influye directamente en el valor</p>
            </div>
            <div className="space-y-3">
              {ESTADOS.map(e => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => update('estado', e.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all
                    ${data.estado === e.id
                      ? 'border-[#10b981] bg-[#10b981]/10'
                      : 'border-[#1f2937] bg-[#1f2937]/40 hover:border-[#10b981]/40'
                    }`}
                >
                  <div
                    className="w-4 h-4 rounded-full shrink-0 transition-all"
                    style={{ backgroundColor: data.estado === e.id ? e.color : '#374151', boxShadow: data.estado === e.id ? `0 0 10px ${e.color}40` : 'none' }}
                  />
                  <div className="text-left flex-1">
                    <div className="font-semibold text-white text-sm">{e.label}</div>
                    <div className="text-gray-400 text-xs">{e.desc}</div>
                  </div>
                  {data.estado === e.id && <Check size={18} className="text-[#10b981]" />}
                </button>
              ))}
            </div>
            {errors.estado && <p className="text-red-400 text-xs">{errors.estado}</p>}
          </div>
        )}

        {/* ── PASO 5: CONTACTO ── */}
        {paso === 5 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Recibe tu valoración</h3>
              <p className="text-gray-400 text-sm">Introduce tus datos para ver el resultado completo</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <User size={14} className="inline mr-1 text-[#10b981]" />
                  Nombre completo
                </label>
                <input
                  type="text" className="form-input"
                  placeholder="Tu nombre y apellidos"
                  value={data.nombre}
                  onChange={e => update('nombre', e.target.value)}
                />
                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone size={14} className="inline mr-1 text-[#10b981]" />
                  Teléfono móvil
                </label>
                <input
                  type="tel" className="form-input"
                  placeholder="600 000 000"
                  value={data.telefono}
                  onChange={e => update('telefono', e.target.value)}
                />
                {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail size={14} className="inline mr-1 text-[#10b981]" />
                  Email
                </label>
                <input
                  type="email" className="form-input"
                  placeholder="tu@email.com"
                  value={data.email}
                  onChange={e => update('email', e.target.value)}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* RGPD */}
              <div className="bg-[#0d1a12] border border-[#10b981]/20 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative mt-0.5 shrink-0">
                    <div
                      onClick={() => update('consentimientoCesion', !data.consentimientoCesion)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all
                        ${data.consentimientoCesion ? 'bg-[#10b981] border-[#10b981]' : 'border-[#374151] bg-transparent'}`}
                    >
                      {data.consentimientoCesion && <Check size={12} className="text-white" />}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 leading-relaxed">
                    Autorizo que mis datos sean cedidos a la <strong className="text-gray-300">inmobiliaria mejor valorada de tu distrito en Madrid</strong> para que me contacten y realicen una valoración profesional gratuita y sin compromiso. La estimación online es orientativa; para conocer el valor exacto de tu vivienda te recomendamos una tasación profesional con el agente inmobiliario de mayor reputación en tu zona de Madrid.
                  </span>
                </label>
              </div>

              <p className="text-xs text-gray-500">
                Al enviar aceptas nuestra{" "}
                <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">Política de Privacidad</a>.
                Tus datos están protegidos conforme al RGPD.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botones navegación */}
      <div className="flex gap-3 mt-8">
        {paso > 1 && (
          <button
            type="button"
            onClick={prevPaso}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#1f2937] text-gray-300 hover:border-[#10b981]/40 hover:text-white transition-all font-medium"
          >
            <ChevronLeft size={18} /> Atrás
          </button>
        )}
        <button
          type="button"
          onClick={paso === 5 ? handleSubmit : nextPaso}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-base hover:from-[#059669] hover:to-[#047857] transition-all disabled:opacity-60 shadow-lg shadow-[#10b981]/25"
        >
          {isLoading ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Calculando...</>
          ) : paso === 5 ? (
            <>Ver mi valoración <Check size={18} /></>
          ) : (
            <>Siguiente <ChevronRight size={18} /></>
          )}
        </button>
      </div>
    </div>
  );
}

export type { FormData };
