import { Logo } from "../components/Logo";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

// AVISO PARA QUIEN PUBLIQUE ESTA PÁGINA: rellena los [CORCHETES] con los
// datos reales antes de publicar — son obligatorios según la LSSI-CE
// (Ley de Servicios de la Sociedad de la Información).
export default function AvisoLegalPage() {
  const [, setLocation] = useLocation();
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
        <h1 className="text-3xl font-black text-white mb-2">Aviso Legal</h1>
        <p className="text-gray-500 text-sm mb-8">Última actualización: [FECHA]</p>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">1. Datos identificativos</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y
              de Comercio Electrónico (LSSI-CE), se informa de que el titular de valoraciondemicasa.es es:
            </p>
            <ul className="mt-3 space-y-1 text-gray-400">
              <li><strong className="text-white">Titular:</strong> [RAZÓN SOCIAL O NOMBRE Y APELLIDOS]</li>
              <li><strong className="text-white">NIF/CIF:</strong> [NIF/CIF]</li>
              <li><strong className="text-white">Domicilio:</strong> [DIRECCIÓN COMPLETA]</li>
              <li><strong className="text-white">Email:</strong> [EMAIL DE CONTACTO]</li>
              <li><strong className="text-white">[Nº de inscripción en el Registro Mercantil, si aplica]</strong></li>
            </ul>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">2. Objeto</h2>
            <p>
              valoraciondemicasa.es ofrece un servicio gratuito de estimación orientativa del valor de inmuebles en
              Madrid y su zona noroeste, basado en un algoritmo interno que analiza precios medios de mercado. El
              resultado mostrado es meramente informativo y orientativo; no constituye una tasación oficial ni
              vinculante, ni sustituye a los servicios de un profesional inmobiliario colegiado o una sociedad de
              tasación homologada por el Banco de España.
            </p>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">3. Condiciones de uso</h2>
            <p>
              El acceso y uso del Sitio atribuye la condición de usuario y supone la aceptación plena de las
              condiciones incluidas en este Aviso Legal. El usuario se compromete a utilizar el Sitio de conformidad
              con la ley, la buena fe y el orden público, y a no realizar ningún acto que pudiera dañar, inutilizar
              o sobrecargar el Sitio, ni impedir su normal utilización por otros usuarios.
            </p>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">4. Propiedad intelectual e industrial</h2>
            <p>
              Los contenidos del Sitio (textos, diseño, logotipos, algoritmo de valoración) son propiedad de{" "}
              [RAZÓN SOCIAL O NOMBRE Y APELLIDOS] o de terceros que han autorizado su uso, y están protegidos por la
              normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o
              transformación sin autorización expresa.
            </p>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">5. Limitación de responsabilidad</h2>
            <p>
              La valoración ofrecida se calcula a partir de datos estadísticos de mercado y puede no reflejar el
              valor real de un inmueble concreto, que depende de factores que el algoritmo no puede evaluar (estado
              real de conservación, orientación, vistas, ruido, reformas específicas, etc.). No nos hacemos
              responsables de las decisiones que el usuario tome basándose exclusivamente en esta estimación.
            </p>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">6. Legislación aplicable y jurisdicción</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para cualquier controversia derivada
              del uso del Sitio, las partes se someten a los juzgados y tribunales de [CIUDAD], salvo que la
              normativa de consumidores y usuarios determine otro fuero.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
