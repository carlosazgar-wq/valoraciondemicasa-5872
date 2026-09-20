import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Logo } from "../components/Logo";
import { FormularioMultiPaso, type FormData } from "../components/FormularioMultiPaso";
import { calcularEstimacion } from "../lib/valoracion";
import { BARRIOS } from "./barrio";
import { TrendingUp, Clock, Shield, Star, ChevronDown, CheckCircle, MapPin } from "lucide-react";

// Añade ", Madrid" al nombre de la zona si aún no lo incluye, para reforzar la relevancia geográfica
function conMadrid(nombre: string): string {
  return nombre.includes("Madrid") ? nombre : `${nombre}, Madrid`;
}

const ZONAS: Record<string, {
  nombre: string;
  slug: string;
  descripcion: string;
  precioMin: number;
  precioMax: number;
  precioMedio: number;
  descripcionMercado: string;
  barrios: string[];
  keywords: string;
  metaDesc: string;
}> = {
  "valoracion-pozuelo-de-alarcon": {
    nombre: "Pozuelo de Alarcón",
    slug: "valoracion-pozuelo-de-alarcon",
    descripcion: "Pozuelo de Alarcón es uno de los municipios con mayor renta per cápita de España y cuenta con un mercado inmobiliario muy activo. Si tienes una vivienda en Pozuelo, conocer su valor real es el primer paso para tomar decisiones informadas.",
    precioMin: 3200,
    precioMax: 6500,
    precioMedio: 4800,
    descripcionMercado: "El mercado inmobiliario de Pozuelo de Alarcón se mantiene muy sólido, con precios entre 3.200 y 6.500 €/m² según la zona. Los barrios más exclusivos como El Plantío o Somosaguas alcanzan los precios más altos de la Comunidad de Madrid.",
    barrios: ["El Plantío", "Somosaguas", "La Finca", "Monteclaro", "Pozuelo Centro", "Ciudad de la Imagen", "Húmera"],
    keywords: "tasación piso Pozuelo de Alarcón, tasación vivienda Pozuelo, valoración vivienda Pozuelo de Alarcón, cuánto vale mi piso Pozuelo, precio vivienda Pozuelo, tasación online Pozuelo de Alarcón, valorar casa Pozuelo Madrid",
    metaDesc: "✓ Tasación online gratis de tu vivienda en Pozuelo de Alarcón. Valoración en 2 minutos con precios actualizados por barrios: El Plantío, Somosaguas, Pozuelo Centro y más.",
  },
  "valoracion-aravaca": {
    nombre: "Aravaca",
    slug: "valoracion-aravaca",
    descripcion: "Aravaca es uno de los barrios más cotizados de Madrid, situado en el distrito de Moncloa-Aravaca. Con excelentes comunicaciones y alto nivel de vida, sus propiedades mantienen una demanda constante y precios muy por encima de la media de Madrid.",
    precioMin: 3800,
    precioMax: 7200,
    precioMedio: 5500,
    descripcionMercado: "Aravaca es de los barrios con mayor precio por m² de Madrid, con valores entre 3.800 y 7.200 €/m². Su proximidad a la Casa de Campo, La Finca y zonas empresariales del noroeste lo convierten en una zona de alta demanda constante.",
    barrios: ["Aravaca Centro", "La Finca", "Valdemarín", "El Barrial", "Camino de Valdemarín"],
    keywords: "tasación piso Aravaca, tasación vivienda Aravaca, valoración vivienda Aravaca, cuánto vale mi piso Aravaca, precio vivienda Aravaca Madrid, tasación online Aravaca, valorar casa Aravaca",
    metaDesc: "✓ Tasación online gratis de tu vivienda en Aravaca. Valoración en 2 minutos con precios actualizados de uno de los barrios más exclusivos de Madrid.",
  },
  "valoracion-las-rozas": {
    nombre: "Las Rozas de Madrid",
    slug: "valoracion-las-rozas",
    descripcion: "Las Rozas de Madrid combina calidad de vida, buenas comunicaciones y un mercado inmobiliario dinámico. Es uno de los municipios del noroeste de Madrid con mayor crecimiento y demanda de vivienda.",
    precioMin: 2800,
    precioMax: 5200,
    precioMedio: 3900,
    descripcionMercado: "El precio de la vivienda en Las Rozas oscila entre 2.800 y 5.200 €/m² según la urbanización y la proximidad a servicios. Las zonas de Las Matas y Las Rozas Village destacan por su alta demanda.",
    barrios: ["Las Rozas Centro", "Las Matas", "El Monte", "Molino de la Hoz", "Prado Norte"],
    keywords: "tasación piso Las Rozas, tasación vivienda Las Rozas, valoración vivienda Las Rozas, cuánto vale mi piso Las Rozas de Madrid, precio vivienda Las Rozas, tasación online Las Rozas, valorar casa Las Rozas Madrid",
    metaDesc: "✓ Tasación online gratis de tu vivienda en Las Rozas de Madrid. Valoración en 2 minutos con precios por zonas: Las Matas, Las Rozas Centro, El Monte y más.",
  },
  "valoracion-majadahonda": {
    nombre: "Majadahonda",
    slug: "valoracion-majadahonda",
    descripcion: "Majadahonda es uno de los municipios más consolidados del noroeste de Madrid, conocido por su alta calidad de vida y su oferta de viviendas de lujo y obra nueva. El mercado inmobiliario de Majadahonda es muy estable y con alta demanda.",
    precioMin: 2900,
    precioMax: 5400,
    precioMedio: 4000,
    descripcionMercado: "Los precios en Majadahonda se sitúan entre 2.900 y 5.400 €/m², con una tendencia alcista sostenida. Las urbanizaciones del norte del municipio y las zonas próximas al Club de Golf son las más valoradas.",
    barrios: ["Majadahonda Centro", "El Prado", "Las Lomas", "Monte Rozas", "Cotorrillo"],
    keywords: "tasación piso Majadahonda, tasación vivienda Majadahonda, valoración vivienda Majadahonda, cuánto vale mi piso Majadahonda, precio vivienda Majadahonda, tasación online Majadahonda, valorar casa Majadahonda Madrid",
    metaDesc: "✓ Tasación online gratis de tu vivienda en Majadahonda. Valoración en 2 minutos con precios del mercado inmobiliario por zonas y urbanizaciones.",
  },
  "valoracion-boadilla-del-monte": {
    nombre: "Boadilla del Monte",
    slug: "valoracion-boadilla-del-monte",
    descripcion: "Boadilla del Monte es uno de los municipios de mayor crecimiento del noroeste de Madrid, con una combinación de urbanizaciones de chalets y nuevas promociones de obra nueva que atraen a familias jóvenes con alto poder adquisitivo.",
    precioMin: 2700,
    precioMax: 5000,
    precioMedio: 3700,
    descripcionMercado: "El precio de la vivienda en Boadilla del Monte oscila entre 2.700 y 5.000 €/m². Las zonas de nueva construcción y las urbanizaciones cercanas al Colegio Base y Montepríncipe presentan los valores más altos del municipio.",
    barrios: ["Boadilla Centro", "Montepríncipe", "El Encinar", "Siglo XXI", "Parque Boadilla"],
    keywords: "tasación piso Boadilla del Monte, tasación vivienda Boadilla, valoración vivienda Boadilla del Monte, cuánto vale mi piso Boadilla, precio vivienda Boadilla del Monte, tasación online Boadilla, valorar casa Boadilla Madrid",
    metaDesc: "✓ Tasación online gratis de tu vivienda en Boadilla del Monte. Valoración en 2 minutos con precios actualizados del mercado inmobiliario por zonas.",
  },
  "valoracion-alcobendas": {
    nombre: "Alcobendas",
    slug: "valoracion-alcobendas",
    descripcion: "Alcobendas es uno de los principales centros de negocios del norte de Madrid, con un mercado inmobiliario sólido que combina zonas residenciales consolidadas con nuevas áreas de expansión y alta demanda de alquiler y compra.",
    precioMin: 2600,
    precioMax: 4800,
    precioMedio: 3500,
    descripcionMercado: "Los precios en Alcobendas se mueven entre 2.600 y 4.800 €/m², con las zonas de Valdelasfuentes y La Moraleja liderando los precios más altos, esta última una de las urbanizaciones más exclusivas de toda España.",
    barrios: ["Alcobendas Centro", "Valdelasfuentes", "La Moraleja", "Fuente Lucha", "Marqués de la Valdavia"],
    keywords: "tasación piso Alcobendas, tasación vivienda Alcobendas, valoración vivienda Alcobendas, cuánto vale mi piso Alcobendas, precio vivienda Alcobendas, tasación online Alcobendas, valorar casa La Moraleja",
    metaDesc: "✓ Tasación online gratis de tu vivienda en Alcobendas. Valoración en 2 minutos con precios actualizados del mercado inmobiliario de Alcobendas y La Moraleja.",
  },
};

export default function ZonaPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/zona/:slug");
  const slug = params?.slug || "";
  const zona = ZONAS[slug];

  const crearLead = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.leads.$post({ json: data });
      return res.json();
    },
  });

  if (!zona) {
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

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* SEO dinámico */}
      {typeof document !== 'undefined' && (() => {
        document.title = `Tasación y Valoración de Vivienda en ${conMadrid(zona.nombre)} Gratis — ValoracionDeMiCasa.es`;
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', zona.metaDesc);
        const canon = document.querySelector('link[rel="canonical"]');
        if (canon) canon.setAttribute('href', `https://valoraciondemicasa.es/zona/${zona.slug}`);
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-sm font-semibold mb-6">
                <MapPin size={16} />
                {zona.nombre.includes("Madrid") ? zona.nombre : `${zona.nombre} · Madrid`}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                ¿Cuánto vale tu<br />
                <span className="gradient-text">vivienda en {conMadrid(zona.nombre)}?</span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {zona.descripcion}
              </p>

              {/* Precio zona */}
              <div className="bg-[#111827]/80 border border-[#1f2937] rounded-2xl p-6 mb-8">
                <p className="text-gray-400 text-sm mb-3 font-medium">Precio medio del m² en {zona.nombre}</p>
                <div className="flex items-end gap-4">
                  <div className="text-4xl font-black gradient-text">{zona.precioMedio.toLocaleString('es-ES')} €/m²</div>
                </div>
                <div className="flex gap-4 mt-3">
                  <div className="text-sm text-gray-500">Mín: <span className="text-gray-300 font-semibold">{zona.precioMin.toLocaleString('es-ES')} €</span></div>
                  <div className="text-sm text-gray-500">Máx: <span className="text-gray-300 font-semibold">{zona.precioMax.toLocaleString('es-ES')} €</span></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">*Datos orientativos del mercado actual</p>
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
            El mercado inmobiliario en {zona.nombre}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed text-center mb-12">
            {zona.descripcionMercado}
          </p>

          {/* Barrios */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-8">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <MapPin size={18} className="text-[#10b981]" />
              Zonas y barrios de {zona.nombre}
            </h3>
            <div className="flex flex-wrap gap-3">
              {zona.barrios.map((b, i) => {
                const conPagina = Object.values(BARRIOS).find(x => x.nombre === b);
                return conPagina ? (
                  <a
                    key={i}
                    href={`/barrio/${conPagina.slug}`}
                    className="px-4 py-2 bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] rounded-xl text-sm font-semibold hover:bg-[#10b981]/25 transition-colors"
                  >
                    {b} →
                  </a>
                ) : (
                  <span key={i} className="px-4 py-2 bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] rounded-xl text-sm font-medium">
                    {b}
                  </span>
                );
              })}
            </div>
            {Object.values(BARRIOS).some(b => b.zonaSlug === zona.slug) && (
              <p className="text-gray-500 text-sm mt-5">
                Las urbanizaciones marcadas tienen página propia con precios y datos específicos de la zona.
              </p>
            )}
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
              { icon: TrendingUp, title: "Datos reales de Madrid", desc: "Precios actualizados del mercado inmobiliario en " + zona.nombre + " y toda la Comunidad de Madrid" },
              { icon: Clock, title: "Resultado en 2 minutos", desc: "Obtén tu estimación de forma inmediata, sin esperas ni citas" },
              { icon: Shield, title: "100% gratuito", desc: "Sin coste, sin compromiso. Solo necesitas los datos de tu vivienda" },
              { icon: Star, title: "Expertos locales", desc: "Te conectamos con el mejor agente inmobiliario de " + zona.nombre },
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
      <section className="py-20 bg-[#080d19]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Valora tu vivienda en {zona.nombre}<br />
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

      {/* Enlaces internos */}
      <section className="py-12 bg-[#080d19] border-t border-[#1f2937]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-sm mb-4">Valora tu vivienda en otras zonas de Madrid</p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {Object.values(ZONAS).filter(z => z.slug !== zona.slug).map((z, i) => (
              <a key={i} href={`/zona/${z.slug}`} className="px-4 py-2 bg-[#111827] border border-[#1f2937] rounded-xl text-gray-300 text-sm hover:border-[#10b981]/40 hover:text-[#10b981] transition-colors">
                {z.nombre}
              </a>
            ))}
          </div>
          <a href="/blog" className="text-[#10b981] text-sm font-semibold hover:underline">
            Ver guías y consejos del mercado inmobiliario →
          </a>
        </div>
      </section>

      {/* Schema.org RealEstateListing/Place */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Valoración de vivienda",
        "provider": { "@type": "RealEstateAgent", "name": "ValoracionDeMiCasa.es", "url": "https://valoraciondemicasa.es" },
        "areaServed": { "@type": "Place", "name": zona.nombre },
        "description": zona.metaDesc
      }) }} />

      {/* SEO invisible */}
      <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}>
        <p>{zona.keywords}</p>
      </div>
    </div>
  );
}
