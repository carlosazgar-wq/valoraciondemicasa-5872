import { Logo } from "../components/Logo";
import { ArrowLeft, Check } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function CookiesPage() {
  const [, setLocation] = useLocation();
  const [reset, setReset] = useState(false);

  const olvidarPreferencia = () => {
    try { localStorage.removeItem('cookie_consent'); } catch {}
    setReset(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] pb-20">
      <nav className="sticky top-0 z-50 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-[#1f2937]/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo size={34} />
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> Volver
          </button>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        <h1 className="text-3xl font-black text-white mb-2">Política de Cookies</h1>
        <p className="text-gray-500 text-sm mb-8">Última actualización: [FECHA]</p>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">¿Qué cookies usamos?</h2>
            <p className="mb-4">
              valoraciondemicasa.es solo utiliza cookies de analítica (Google Analytics) para entender cómo se usa
              el Sitio y mejorarlo. Estas cookies solo se activan si das tu consentimiento en el aviso que aparece
              al entrar al Sitio.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-gray-500 border-b border-[#1f2937]">
                    <th className="py-2 pr-4">Cookie</th>
                    <th className="py-2 pr-4">Finalidad</th>
                    <th className="py-2 pr-4">Duración</th>
                    <th className="py-2">Tipo</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-[#1f2937]/50">
                    <td className="py-2 pr-4">_ga, _ga_*</td>
                    <td className="py-2 pr-4">Analítica de uso del Sitio (Google Analytics)</td>
                    <td className="py-2 pr-4">Hasta 2 años</td>
                    <td className="py-2">Analítica / terceros</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">cookie_consent</td>
                    <td className="py-2 pr-4">Recordar tu elección sobre cookies</td>
                    <td className="py-2 pr-4">1 año</td>
                    <td className="py-2">Técnica / propia</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">Gestionar tu preferencia</h2>
            <p className="mb-4">
              Puedes cambiar tu decisión sobre las cookies de analítica en cualquier momento. Al pulsar el botón de
              abajo, olvidamos tu elección actual y la próxima vez que visites el Sitio volverá a aparecerte el
              aviso de cookies para que elijas de nuevo.
            </p>
            {reset ? (
              <div className="inline-flex items-center gap-2 text-[#10b981] text-sm font-medium">
                <Check size={16} /> Preferencia olvidada. Recarga la página para ver el aviso de cookies de nuevo.
              </div>
            ) : (
              <button
                onClick={olvidarPreferencia}
                className="px-5 py-2.5 rounded-xl bg-[#1f2937] text-gray-200 text-sm font-medium hover:bg-[#10b981]/20 hover:text-[#10b981] transition-colors"
              >
                Olvidar mi preferencia de cookies
              </button>
            )}
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">Más información</h2>
            <p>
              Puedes consultar cómo Google trata los datos de Google Analytics en su propia política de privacidad.
              Para cualquier duda sobre esta política de cookies, escríbenos a{" "}
              <strong className="text-white">[EMAIL DE CONTACTO]</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
