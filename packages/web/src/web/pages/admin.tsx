import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Logo } from "../components/Logo";
import { formatCurrency } from "../lib/valoracion";
import {
  Users, TrendingUp, Phone, Mail, MapPin, Home,
  Download, Search, Filter, Trash2, Edit3, Check, X, ChevronDown, Eye, CheckSquare
} from "lucide-react";

type Lead = {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string | null;
  tipoInmueble: string;
  superficie: number;
  habitaciones: number;
  banos: number;
  estado: string;
  valorEstimado: number | null;
  consentimientoCesion: number | boolean | null;
  estado_lead: string | null;
  notas: string | null;
  createdAt: string | number | null;
};

const ESTADO_LEAD_OPTIONS = [
  { value: "nuevo", label: "Nuevo", color: "#10b981" },
  { value: "contactado", label: "Contactado", color: "#3b82f6" },
  { value: "vendido", label: "Vendido", color: "#f59e0b" },
  { value: "descartado", label: "Descartado", color: "#6b7280" },
];

function getEstadoConfig(estado: string | null) {
  return ESTADO_LEAD_OPTIONS.find(e => e.value === estado) ?? ESTADO_LEAD_OPTIONS[0];
}

function LeadRow({ lead, onUpdate, onDelete }: {
  lead: Lead;
  onUpdate: (id: number, data: any) => void;
  onDelete: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editingNota, setEditingNota] = useState(false);
  const [nota, setNota] = useState(lead.notas ?? "");
  const [editingEstado, setEditingEstado] = useState(false);

  const estadoConfig = getEstadoConfig(lead.estado_lead);
  const fecha = (() => {
    if (!lead.createdAt) return '-';
    let d: Date;
    if (typeof lead.createdAt === 'number') {
      // Si es unix timestamp en segundos (< año 3000 en ms = 32503680000)
      d = lead.createdAt < 32503680000
        ? new Date(lead.createdAt * 1000)
        : new Date(lead.createdAt);
    } else {
      d = new Date(lead.createdAt);
    }
    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
  })();

  return (
    <div className="bg-[#111827] border border-[#1f2937] rounded-2xl overflow-hidden mb-3 hover:border-[#10b981]/20 transition-colors">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 flex items-center justify-center shrink-0">
              <Users size={18} className="text-[#10b981]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white">{lead.nombre}</span>
                {/* Estado badge */}
                <div className="relative">
                  <button
                    onClick={() => setEditingEstado(!editingEstado)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${estadoConfig.color}20`, color: estadoConfig.color }}
                  >
                    {estadoConfig.label}
                    <ChevronDown size={10} />
                  </button>
                  {editingEstado && (
                    <div className="absolute left-0 top-7 z-20 bg-[#1a2337] border border-[#1f2937] rounded-xl shadow-2xl overflow-hidden min-w-[140px]">
                      {ESTADO_LEAD_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          className="w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-[#10b981]/10 transition-colors flex items-center gap-2"
                          style={{ color: opt.color }}
                          onClick={() => {
                            onUpdate(lead.id, { estado_lead: opt.value, notas: lead.notas });
                            setEditingEstado(false);
                          }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ background: opt.color }} />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-gray-500 text-xs">{fecha}</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-1">
                <a href={`tel:${lead.telefono}`} className="flex items-center gap-1 text-sm text-gray-300 hover:text-[#10b981] transition-colors">
                  <Phone size={13} /> {lead.telefono}
                </a>
                <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-sm text-gray-300 hover:text-[#10b981] transition-colors">
                  <Mail size={13} /> {lead.email}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {lead.valorEstimado && (
              <div className="text-right hidden sm:block">
                <div className="text-lg font-black text-[#10b981]">{formatCurrency(lead.valorEstimado)}</div>
                <div className="text-xs text-gray-500">Estimación</div>
              </div>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-9 h-9 rounded-xl bg-[#1f2937] flex items-center justify-center hover:bg-[#10b981]/20 transition-colors"
            >
              <Eye size={15} className="text-gray-400" />
            </button>
            <button
              onClick={() => onDelete(lead.id)}
              className="w-9 h-9 rounded-xl bg-[#1f2937] flex items-center justify-center hover:bg-red-500/20 transition-colors"
            >
              <Trash2 size={15} className="text-gray-400 hover:text-red-400" />
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-[#1f2937] animate-fade-in">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {[
                { icon: MapPin, label: "Dirección", value: lead.direccion },
                { icon: Home, label: "Inmueble", value: `${lead.tipoInmueble} · ${lead.superficie}m² · ${lead.habitaciones}hab · ${lead.banos}baños` },
                { icon: TrendingUp, label: "Estado", value: lead.estado },
                ...(lead.planta ? [{ icon: Home, label: "Planta", value: lead.planta }] : []),
                ...(lead.puerta ? [{ icon: Home, label: "Puerta", value: lead.puerta }] : []),
                ...(lead.extras ? [{ icon: CheckSquare, label: "Extras", value: (() => { try { return JSON.parse(lead.extras).join(", ") || "Ninguno"; } catch { return "Ninguno"; } })() }] : []),
              ].map(row => (
                <div key={row.label} className="bg-[#0a0f1e] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <row.icon size={12} className="text-[#10b981]" />
                    <span className="text-xs text-gray-400">{row.label}</span>
                  </div>
                  <span className="text-sm text-white font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            {lead.valorEstimado && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-[#0a0f1e] rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-[#10b981]">{formatCurrency(lead.valorEstimado)}</div>
                  <div className="text-xs text-gray-400">Estimación media</div>
                </div>
                <div className="bg-[#0a0f1e] rounded-xl p-3 text-center col-span-2">
                  <div className="text-sm text-gray-300">
                    Consentimiento cesión: {lead.consentimientoCesion ? "✅ Autorizado" : "❌ No autorizado"}
                  </div>
                </div>
              </div>
            )}

            {/* Notas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-medium">Notas internas</span>
                <button
                  onClick={() => setEditingNota(!editingNota)}
                  className="text-xs text-[#10b981] flex items-center gap-1 hover:text-[#34d399]"
                >
                  <Edit3 size={11} /> Editar
                </button>
              </div>
              {editingNota ? (
                <div className="flex gap-2">
                  <textarea
                    className="form-input flex-1 text-sm min-h-[60px] resize-none"
                    value={nota}
                    onChange={e => setNota(e.target.value)}
                    placeholder="Añade notas sobre este lead..."
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      className="w-9 h-9 rounded-xl bg-[#10b981] flex items-center justify-center hover:bg-[#059669]"
                      onClick={() => {
                        onUpdate(lead.id, { estado_lead: lead.estado_lead, notas: nota });
                        setEditingNota(false);
                      }}
                    >
                      <Check size={15} className="text-white" />
                    </button>
                    <button
                      className="w-9 h-9 rounded-xl bg-[#1f2937] flex items-center justify-center hover:bg-red-500/20"
                      onClick={() => { setNota(lead.notas ?? ""); setEditingNota(false); }}
                    >
                      <X size={15} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-300 bg-[#0a0f1e] rounded-xl p-3 min-h-[44px]">
                  {lead.notas || <span className="text-gray-600 italic">Sin notas</span>}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// La contraseña ya NO vive aquí ni en ningún archivo del frontend: se
// valida en el servidor contra ADMIN_PASSWORD (variable de entorno) y, si
// es correcta, el servidor devuelve un token firmado que este panel guarda
// en sessionStorage y envía en cada petición protegida. Antes la
// contraseña estaba escrita en texto plano en este mismo bundle de JS —
// visible para cualquiera que abriera las herramientas de desarrollador —
// y además no protegía nada, porque los endpoints de la API no la
// comprobaban en absoluto.
function authHeaders(): Record<string, string> {
  const token = sessionStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [autenticado, setAutenticado] = useState(() => !!sessionStorage.getItem('admin_token'));
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const intentarLogin = async () => {
    setLoggingIn(true);
    setPassError(false);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passInput }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        sessionStorage.setItem('admin_token', data.token);
        setAutenticado(true);
      } else {
        setPassError(true);
      }
    } catch {
      setPassError(true);
    } finally {
      setLoggingIn(false);
    }
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem('admin_token');
    setAutenticado(false);
  };

  // Importante: los hooks de React tienen que llamarse siempre, en el mismo
  // orden, en cada renderizado. Antes, estas tres llamadas (useQuery +
  // 2×useMutation) estaban DESPUÉS de un `return` condicional para cuando
  // no había sesión — es decir, en el primer render (sin autenticar) no se
  // llamaban, y justo al iniciar sesión correctamente, en el render
  // siguiente, sí. Eso rompe las reglas de los Hooks de React y provoca un
  // error ("Rendered more hooks than during the previous render") justo en
  // el momento de entrar con la contraseña correcta. Ahora se llaman
  // siempre, y `enabled: autenticado` evita que se disparen peticiones
  // antes de tener sesión.
  const leadsQuery = useQuery({
    queryKey: ["leads"],
    enabled: autenticado,
    queryFn: async () => {
      const res = await fetch('/api/leads', { headers: authHeaders() });
      if (res.status === 401) { cerrarSesion(); return { leads: [] }; }
      return res.json();
    },
  });

  const updateLead = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data),
      });
      if (res.status === 401) cerrarSesion();
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });

  const deleteLead = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE', headers: authHeaders() });
      if (res.status === 401) cerrarSesion();
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4">
        <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-8 w-full max-w-sm card-glow text-center">
          <Logo size={38} />
          <h2 className="text-xl font-black text-white mt-6 mb-1">Panel de administración</h2>
          <p className="text-gray-400 text-sm mb-6">Introduce la contraseña para acceder</p>
          <input
            type="password"
            className="form-input mb-3"
            placeholder="Contraseña"
            value={passInput}
            onChange={e => { setPassInput(e.target.value); setPassError(false); }}
            onKeyDown={e => { if (e.key === 'Enter') intentarLogin(); }}
          />
          {passError && <p className="text-red-400 text-xs mb-3">Contraseña incorrecta</p>}
          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold disabled:opacity-60"
            disabled={loggingIn}
            onClick={intentarLogin}
          >
            {loggingIn ? "Comprobando..." : "Acceder"}
          </button>
        </div>
      </div>
    );
  }

  const leads: Lead[] = (leadsQuery.data as any)?.leads ?? [];

  const filtered = leads.filter(l => {
    const matchSearch = !search || [l.nombre, l.telefono, l.email, l.direccion, l.ciudad ?? ""]
      .join(" ").toLowerCase().includes(search.toLowerCase());
    const matchEstado = filtroEstado === "todos" || l.estado_lead === filtroEstado;
    return matchSearch && matchEstado;
  });

  const stats = {
    total: leads.length,
    nuevos: leads.filter(l => l.estado_lead === 'nuevo').length,
    contactados: leads.filter(l => l.estado_lead === 'contactado').length,
    vendidos: leads.filter(l => l.estado_lead === 'vendido').length,
  };

  const exportCSV = () => {
    const headers = ['ID', 'Nombre', 'Teléfono', 'Email', 'Dirección', 'Tipo', 'M²', 'Hab', 'Baños', 'Estado Inmueble', 'Estimación', 'Consentimiento', 'Estado Lead', 'Fecha'];
    const rows = filtered.map(l => [
      l.id, l.nombre, l.telefono, l.email, l.direccion,
      l.tipoInmueble, l.superficie, l.habitaciones, l.banos, l.estado,
      l.valorEstimado ?? '', l.consentimientoCesion ? 'Sí' : 'No',
      l.estado_lead ?? 'nuevo',
      l.createdAt ? new Date(typeof l.createdAt === 'number' ? l.createdAt * 1000 : l.createdAt).toLocaleDateString('es-ES') : ''
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] pb-20">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-[#1f2937]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo size={34} />
          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10b981]/15 text-[#10b981] text-sm font-medium hover:bg-[#10b981]/25 transition-colors"
            >
              <Download size={15} /> Exportar CSV
            </button><a href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1f2937] text-gray-300 text-sm font-medium hover:text-white transition-colors"
            >
              Ver web
            </a>
            <button
              onClick={cerrarSesion}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1f2937] text-gray-300 text-sm font-medium hover:text-white transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Panel de leads</h1>
          <p className="text-gray-400 mt-1">Gestiona todos los contactos recibidos</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total leads", value: stats.total, color: "#10b981" },
            { label: "Nuevos", value: stats.nuevos, color: "#10b981" },
            { label: "Contactados", value: stats.contactados, color: "#3b82f6" },
            { label: "Vendidos", value: stats.vendidos, color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-5">
              <div className="text-3xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              className="form-input pl-10"
              placeholder="Buscar por nombre, teléfono, email o dirección..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[{ value: "todos", label: "Todos" }, ...ESTADO_LEAD_OPTIONS].map(opt => (
              <button
                key={opt.value}
                onClick={() => setFiltroEstado(opt.value)}
                className={`
                  px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${filtroEstado === opt.value
                    ? 'bg-[#10b981] text-white'
                    : 'bg-[#1f2937] text-gray-400 hover:text-white'
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista leads */}
        {leadsQuery.isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {leads.length === 0 ? "Aún no hay leads" : "No se encontraron resultados"}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              {leads.length === 0 ? "Los leads aparecerán aquí cuando alguien complete el formulario" : "Prueba con otros filtros"}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-400 text-sm mb-4">
              Mostrando {filtered.length} de {leads.length} leads
            </p>
            {filtered.map(lead => (
              <LeadRow
                key={lead.id}
                lead={lead}
                onUpdate={(id, data) => updateLead.mutate({ id, data })}
                onDelete={(id) => {
                  if (confirm('¿Eliminar este lead?')) deleteLead.mutate(id);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
