import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Logo } from "../components/Logo";
import { FormularioMultiPaso, type FormData } from "../components/FormularioMultiPaso";
import { calcularEstimacion } from "../lib/valoracion";
import { Shield, TrendingUp, Clock, Star, ChevronDown, CheckCircle } from "lucide-react";

export default function IndexPage() {
  const [, setLocation] = useLocation();

  const crearLead = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.leads.$post({ json: data });
      return res.json();
    },
  });

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
      ciudad: formData.ciudad,
      direccion: formData.direccion,
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

    // Guardar resultado en sessionStorage para la página resultado
    sessionStorage.setItem('valoracion_result', JSON.stringify({
      formData,
      estimacion,
    }));
    setLocation('/resultado');
  };

  // Antes estas dos cifras estaban escritas a mano ("+8.500 viviendas
  // valoradas", "98% satisfacción") sin ningún dato real detrás — en una
  // web nueva, sin reseñas ni histórico, eso es publicidad engañosa. Ahora
  // solo se muestran afirmaciones que son ciertas siempre, y la cifra real
  // de valoraciones (leadsCountQuery) se añade como prueba social adicional
  // en cuanto hay una cantidad significativa, sin inventar nada mientras
  // tanto.
  const leadsCountQuery = useQuery({
    queryKey: ["leads-count"],
    queryFn: async () => {
      const res = await fetch('/api/leads/count');
      return res.json() as Promise<{ count: number }>;
    },
    staleTime: 5 * 60 * 1000,
  });
  const leadsCount = leadsCountQuery.data?.count ?? 0;

  const stats = [
    { n: "100%", label: "Datos de mercado reales" },
    { n: "RGPD ✓", label: "Datos 100% protegidos" },
    { n: "< 2 min", label: "Tiempo estimado" },
    { n: "Gratis", label: "Sin coste ni compromiso" },
  ];

  const features = [
    { icon: TrendingUp, title: "Tasación con datos reales de Madrid", desc: "Precios del mercado inmobiliario actual por distritos y barrios de Madrid, actualizados mensualmente" },
    { icon: Clock, title: "Resultado inmediato", desc: "Obtén tu tasación y valoración en menos de 2 minutos sin esperas" },
    { icon: Shield, title: "Datos protegidos (RGPD)", desc: "Tratamos tus datos conforme al RGPD. Solo se ceden a profesionales inmobiliarios con tu autorización expresa." },
    { icon: Star, title: "Expertos en Madrid", desc: "Te conectamos con el agente inmobiliario mejor valorado de tu distrito en Madrid" },
  ];

  const faqs = [
    { q: "¿Cuánto cuesta valorar mi vivienda en valoraciondemicasa.es?", a: "Nada. El servicio de valoración es 100% gratuito y sin ningún tipo de compromiso. Solo necesitas rellenar el formulario con los datos de tu vivienda." },
    { q: "¿Es una valoración oficial o vinculante?", a: "Es una estimación orientativa basada en datos reales del mercado inmobiliario de Madrid. Para trámites oficiales (hipoteca, herencia) recomendamos una tasación profesional homologada." },
    { q: "¿Funciona para cualquier zona de Madrid?", a: "Sí. Cubrimos todos los distritos de Madrid capital y municipios de la Comunidad de Madrid como Pozuelo de Alarcón (Madrid), Aravaca (Madrid), Las Rozas (Madrid) y Majadahonda (Madrid), entre otros." },
    { q: "¿Qué pasa con mis datos después de valorar mi vivienda?", a: "Tratamos tus datos conforme al RGPD. Con tu autorización expresa, te ponemos en contacto con el agente inmobiliario mejor valorado de tu zona para ofrecerte una tasación profesional y asesoramiento en la venta." },
    { q: "¿Cuánto tarda el proceso de valoración?", a: "Menos de 2 minutos. Solo tienes que indicar el tipo de vivienda, superficie, ubicación y estado de conservación para obtener tu estimación al instante." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/80 backdrop-blur-md border-b border-[#1f2937]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo size={36} />
          <div className="hidden md:flex items-center gap-6">
            <a href="#como-funciona" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
              Cómo funciona
            </a>
            <a href="#ventajas" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
              Ventajas
            </a>
            <a href="/blog" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
              Blog
            </a>
          </div>
          
            href="#formulario"
            className="px-4 py-2 rounded-xl bg-[#10b981] text-white text-sm font-bold hover:bg-[#059669] transition-colors"
          >
            Valorar mi casa
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero-bg.png)' }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/90 via-[#0a0f1e]/75 to-[#0d2419]/85" />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#10b981]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#10b981]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: texto */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-sm font-semibold mb-6 animate-fade-in-up">
                <TrendingUp size={16} />
                Tasación y valoración gratuita e inmediata
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 animate-fade-in-up delay-100">
                Descubre el valor real<br />
                <span className="gradient-text">de tu vivienda en Madrid</span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 animate-fade-in-up delay-200">
                Obtén una tasación y valoración precisa basada en el mercado inmobiliario actual de Madrid. En menos de 2 minutos sabrás cuánto vale tu casa y te conectaremos con el mejor agente de tu distrito.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in-up delay-300">
                {stats.map((s, i) => (
                  <div key={i} className="bg-[#111827]/60 backdrop-blur border border-[#1f2937] rounded-xl p-4 text-center">
                    <div className="text-2xl font-black gradient-text">{s.n}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Prueba social real — solo aparece cuando el número es
                  significativo; no se inventa nada mientras tanto. */}
              {leadsCount >= 20 && (
                <p className="text-sm text-[#10b981] font-medium mb-8 -mt-4 animate-fade-in-up delay-300">
                  +{leadsCount} propietarios ya han valorado su vivienda con nosotros
                </p>
              )}

              {/* CTA mobile */}
              <div className="lg:hidden animate-fade-in-up delay-400">
                
                  href="#formulario"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-black text-lg shadow-xl shadow-[#10b981]/30 hover:from-[#059669] hover:to-[#047857] transition-all"
                >
                  Calcular valor gratis
                  <ChevronDown size={20} />
                </a>
              </div>
            </div>

            {/* Right: Formulario */}
            <div id="formulario" className="animate-fade-in-up delay-200">
              <div className="bg-[#111827]/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 card-glow border border-[#1f2937]">
                <FormularioMultiPaso
                  onSubmit={handleSubmit}
                  isLoading={crearLead.isPending}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-[#10b981]/60" />
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1a0f]/30 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tres pasos simples para conocer el valor de tu vivienda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Introduce los datos", desc: "Dirección en Madrid, tipo de inmueble, superficie, habitaciones y estado de conservación.", icon: "📍" },
              { n: "02", title: "Estimación automática", desc: "Nuestro algoritmo analiza precios reales del mercado inmobiliario en tu distrito y calcula el valor orientativo.", icon: "📊" },
              { n: "03", title: "Contacto con el experto", desc: "Te ponemos en contacto con el agente inmobiliario mejor valorado de tu distrito en Madrid para una tasación profesional.", icon: "🏆" },
            ].map((s, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-gradient-to-r from-[#10b981]/50 to-transparent translate-x-1/2 z-10" />
                )}
                <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-8 card-glow h-full">
                  <div className="text-5xl mb-4">{s.icon}</div>
                  <div className="text-[#10b981] font-black text-sm mb-2">{s.n}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section id="ventajas" className="py-20 bg-[#080d19]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              ¿Por qué usar valoraciondemicasa.es en Madrid?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6 card-glow group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#10b981]/15 flex items-center justify-center mb-4 group-hover:bg-[#10b981]/25 transition-colors">
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

      {/* CTA FINAL */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f16] to-[#0a0f1e] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
            ¿Cuánto vale tu casa en Madrid?<br />
            <span className="gradient-text">Descúbrelo ahora</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Miles de propietarios madrileños ya han valorado su vivienda gratis. Únete y toma decisiones informadas.
          </p>
          
            href="#formulario"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-black text-xl shadow-2xl shadow-[#10b981]/30 hover:from-[#059669] hover:to-[#047857] transition-all animate-pulse-glow"
          >
            Calcular valor de mi casa
            <CheckCircle size={24} />
          </a>
          <p className="text-gray-500 text-sm mt-4">Gratis · Sin compromiso · Resultado en 2 minutos</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#080d19]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-12 text-center">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6 group">
                <summary className="font-bold text-white cursor-pointer list-none flex items-center justify-between">
                  {f.q}
                  <ChevronDown size={18} className="text-[#10b981] group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-4">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ENLACES INTERNOS — zonas y blog */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Valora tu vivienda por zona en Madrid</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { slug: "valoracion-pozuelo-de-alarcon", n: "Pozuelo de Alarcón" },
              { slug: "valoracion-aravaca", n: "Aravaca" },
              { slug: "valoracion-las-rozas", n: "Las Rozas" },
              { slug: "valoracion-majadahonda", n: "Majadahonda" },
              { slug: "valoracion-boadilla-del-monte", n: "Boadilla del Monte" },
              { slug: "valoracion-alcobendas", n: "Alcobendas" },
            ].map((z, i) => (
              <a key={i} href={`/zona/${z.slug}`} className="px-5 py-2.5 bg-[#111827] border border-[#1f2937] rounded-xl text-gray-300 text-sm font-medium hover:border-[#10b981]/40 hover:text-[#10b981] transition-colors">
                {z.n}
              </a>
            ))}
          </div>
          <div className="text-center">
            <a href="/blog" className="text-[#10b981] text-sm font-semibold hover:underline">
              Ver guías y consejos sobre el mercado inmobiliario de Madrid →
            </a>
          </div>
        </div>
      </section>

      {/* Nota: aquí había un bloque de texto oculto (opacidad 0, 1x1 px)
          relleno de palabras clave para SEO. Google considera el texto
          oculto una técnica de spam y puede penalizar la página por usarlo,
          así que se ha eliminado en lugar de dejarlo — no ayudaba al
          posicionamiento, lo arriesgaba. Si se quiere posicionar para
          Getafe o Alcalá de Henares, la vía correcta es crear una página
          de zona real para cada una, como las que ya existen. */}

      {/* Schema.org FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }) }} />

      {/* FOOTER */}
      <footer className="border-t border-[#1f2937] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size={32} />
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="/privacidad" className="hover:text-[#10b981] transition-colors">Política de Privacidad</a>
              <a href="/aviso-legal" className="hover:text-[#10b981] transition-colors">Aviso Legal</a>
              <a href="/cookies" className="hover:text-[#10b981] transition-colors">Cookies</a>
            </div>
            <p className="text-gray-600 text-xs">
              © 2026 valoraciondemicasa.es · Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
