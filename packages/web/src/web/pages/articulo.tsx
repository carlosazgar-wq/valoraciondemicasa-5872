import { useRoute, useLocation } from "wouter";
import { Logo } from "../components/Logo";
import { ARTICULOS } from "./blog";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

function inline(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#10b981] font-semibold underline underline-offset-2 hover:text-[#34d399]">$1</a>');
}

function renderMarkdown(text: string) {
  const lines = text.trim().split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl sm:text-3xl font-black text-white mt-10 mb-4">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={i} className="text-lg font-bold text-[#10b981] mt-6 mb-2">
          {line.replace('#### ', '')}
        </h4>
      );
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].replace('- ', ''));
        i++;
      }
      elements.push(
        <ul key={i} className="list-none space-y-2 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-gray-300">
              <span className="text-[#10b981] mt-1">•</span>
              <span dangerouslySetInnerHTML={{ __html: inline(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (/^\d+\./.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\./.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s*/, ''));
        i++;
      }
      elements.push(
        <ol key={i} className="list-none space-y-3 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-300">
              <span className="text-[#10b981] font-black min-w-[24px]">{j + 1}.</span>
              <span dangerouslySetInnerHTML={{ __html: inline(item) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line.trim() === '') {
      // skip empty
    } else {
      elements.push(
        <p key={i} className="text-gray-300 leading-relaxed my-3"
          dangerouslySetInnerHTML={{ __html: inline(line) }}
        />
      );
    }
    i++;
  }

  return elements;
}

export default function ArticuloPage() {
  const [, params] = useRoute("/blog/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "";
  const articulo = ARTICULOS.find(a => a.slug === slug);

  if (!articulo) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-4">Artículo no encontrado</h1>
          <a href="/blog" className="text-[#10b981]">Ver todos los artículos</a>
        </div>
      </div>
    );
  }

  const otrosArticulos = ARTICULOS.filter(a => a.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* SEO */}
      {typeof document !== 'undefined' && (() => {
        document.title = `${articulo.titulo} — ValoracionDeMiCasa.es`;
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', articulo.metaDesc);
        const canon = document.querySelector('link[rel="canonical"]');
        if (canon) canon.setAttribute('href', `https://valoraciondemicasa.es/blog/${articulo.slug}`);
        return null;
      })()}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/80 backdrop-blur-md border-b border-[#1f2937]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/"><Logo size={36} /></a>
          <button onClick={() => setLocation('/blog')} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Blog
          </button>
          <a href="/#formulario" className="px-4 py-2 rounded-xl bg-[#10b981] text-white text-sm font-bold hover:bg-[#059669] transition-colors">
            Valorar mi casa
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header artículo */}
        <div className="mb-10">
          <span className="inline-block px-3 py-1 bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-semibold rounded-full mb-4">
            {articulo.categoria}
          </span>
          <div className="text-6xl mb-6">{articulo.imagen}</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            {articulo.titulo}
          </h1>
          <p className="text-gray-400 text-lg mb-6">{articulo.resumen}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 pb-8 border-b border-[#1f2937]">
            <span className="flex items-center gap-1"><Calendar size={14} />{articulo.fecha}</span>
            <span className="flex items-center gap-1"><Clock size={14} />{articulo.lectura} de lectura</span>
          </div>
        </div>

        {/* Contenido */}
        <div className="prose-custom">
          {renderMarkdown(articulo.contenido)}
        </div>

        {/* CTA dentro del artículo */}
        <div className="mt-12 bg-gradient-to-br from-[#0d2419] to-[#0a1628] border border-[#10b981]/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-3">
            ¿Quieres saber cuánto vale tu vivienda?
          </h3>
          <p className="text-gray-400 mb-6">Valoración gratuita en menos de 2 minutos</p>
          
            href="/#formulario"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-black text-lg shadow-xl shadow-[#10b981]/30 hover:from-[#059669] hover:to-[#047857] transition-all"
          >
            Calcular valor gratis
            <ArrowRight size={20} />
          </a>
        </div>

        {/* Enlace a valoración de zona */}
        <p className="text-gray-500 text-sm text-center mt-10 mb-3">Valora tu vivienda en Madrid por zona</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="/zona/valoracion-pozuelo-de-alarcon" className="px-4 py-2 bg-[#111827] border border-[#1f2937] rounded-xl text-gray-300 text-sm hover:border-[#10b981]/40 hover:text-[#10b981] transition-colors">Pozuelo de Alarcón</a>
          <a href="/zona/valoracion-aravaca" className="px-4 py-2 bg-[#111827] border border-[#1f2937] rounded-xl text-gray-300 text-sm hover:border-[#10b981]/40 hover:text-[#10b981] transition-colors">Aravaca</a>
          <a href="/zona/valoracion-las-rozas" className="px-4 py-2 bg-[#111827] border border-[#1f2937] rounded-xl text-gray-300 text-sm hover:border-[#10b981]/40 hover:text-[#10b981] transition-colors">Las Rozas</a>
          <a href="/zona/valoracion-majadahonda" className="px-4 py-2 bg-[#111827] border border-[#1f2937] rounded-xl text-gray-300 text-sm hover:border-[#10b981]/40 hover:text-[#10b981] transition-colors">Majadahonda</a>
        </div>

        {/* Otros artículos */}
        {otrosArticulos.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-black text-white mb-6">Otros artículos que pueden interesarte</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {otrosArticulos.map(art => (
                <article
                  key={art.slug}
                  onClick={() => setLocation(`/blog/${art.slug}`)}
                  className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 cursor-pointer hover:-translate-y-1 transition-transform duration-300 group"
                >
                  <div className="text-3xl mb-3">{art.imagen}</div>
                  <h4 className="font-bold text-white text-sm group-hover:text-[#10b981] transition-colors mb-2">{art.titulo}</h4>
                  <span className="text-[#10b981] text-xs flex items-center gap-1">Leer <ArrowRight size={12} /></span>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="border-t border-[#1f2937] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="/"><Logo size={32} /></a>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="/privacidad" className="hover:text-[#10b981] transition-colors">Política de Privacidad</a>
              <a href="/aviso-legal" className="hover:text-[#10b981] transition-colors">Aviso Legal</a>
            </div>
            <p className="text-gray-600 text-xs">© 2026 valoraciondemicasa.es · Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
