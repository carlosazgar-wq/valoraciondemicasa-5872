import { Logo } from "../components/Logo";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

// AVISO PARA QUIEN PUBLIQUE ESTA PÁGINA:
// Los datos entre [CORCHETES] son obligatorios por el RGPD/LOPDGDD y hay
// que rellenarlos con los datos reales del responsable del tratamiento
// antes de publicar. No se han inventado porque una identidad falsa en una
// política de privacidad es tan mal problema como no tener política.
export default function PrivacidadPage() {
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
        <h1 className="text-3xl font-black text-white mb-2">Política de Privacidad</h1>
        <p className="text-gray-500 text-sm mb-8">Última actualización: [FECHA]</p>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">1. Responsable del tratamiento</h2>
            <p>
              <strong className="text-white">[RAZÓN SOCIAL O NOMBRE Y APELLIDOS DEL TITULAR]</strong>, con NIF/CIF{" "}
              <strong className="text-white">[NIF/CIF]</strong> y domicilio en{" "}
              <strong className="text-white">[DIRECCIÓN COMPLETA]</strong>, es el responsable del tratamiento de
              los datos personales que se recogen a través del sitio web valoraciondemicasa.es (en adelante, "el
              Sitio"). Puedes contactar con nosotros en{" "}
              <strong className="text-white">[EMAIL DE CONTACTO]</strong>.
            </p>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">2. Qué datos recogemos</h2>
            <p className="mb-2">Cuando utilizas el formulario de valoración recogemos:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Datos de contacto: nombre, teléfono y correo electrónico.</li>
              <li>Datos del inmueble: dirección, tipo, superficie, habitaciones, baños, planta, estado y extras.</li>
              <li>Datos técnicos: dirección IP, con fines de seguridad y prevención de fraude.</li>
            </ul>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">3. Con qué finalidad y legitimación tratamos tus datos</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>
                <strong className="text-gray-300">Calcular y enviarte tu valoración orientativa</strong> — base
                legal: ejecución de la solicitud que realizas voluntariamente al rellenar el formulario (art. 6.1.b
                RGPD).
              </li>
              <li>
                <strong className="text-gray-300">Ponerte en contacto con un agente inmobiliario de tu zona</strong>{" "}
                — base legal: tu consentimiento expreso, marcado libremente mediante la casilla del formulario, que
                puedes retirar en cualquier momento sin que afecte a la valoración ya recibida (art. 6.1.a RGPD). Si
                no marcas esa casilla, tus datos no se ceden a terceros.
              </li>
              <li>
                <strong className="text-gray-300">Analítica web</strong> — base legal: tu consentimiento a las
                cookies de analítica, que puedes gestionar en cualquier momento (ver{" "}
                <a href="/cookies" className="text-[#10b981] hover:underline">Política de Cookies</a>).
              </li>
            </ul>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">4. A quién cedemos tus datos</h2>
            <p>
              Únicamente si has marcado expresamente la casilla de consentimiento del formulario, compartimos tu
              nombre, teléfono, email y los datos del inmueble con{" "}
              <strong className="text-white">[NOMBRE DE LA INMOBILIARIA / AGENTE COLABORADOR, O "el agente
              inmobiliario colaborador de tu zona"]</strong>, para que pueda ofrecerte una tasación profesional. No
              vendemos ni cedemos tus datos a ningún otro tercero con fines comerciales. Podemos compartir datos con
              proveedores que nos prestan servicios técnicos (alojamiento del sitio, envío de emails, base de
              datos), siempre bajo contrato de encargado de tratamiento.
            </p>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">5. Cuánto tiempo conservamos tus datos</h2>
            <p>
              Conservamos tus datos mientras exista una relación con nosotros o con el agente inmobiliario
              colaborador y, una vez finalizada, durante los plazos legalmente exigibles. Puedes solicitar su
              eliminación en cualquier momento (ver sección 7).
            </p>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">6. La valoración no es una tasación oficial</h2>
            <p>
              El valor mostrado en el Sitio es una estimación orientativa calculada mediante un algoritmo interno
              basado en precios medios de mercado por zona. No constituye una tasación oficial ni tiene validez
              para trámites hipotecarios, herencias u otros procedimientos que exijan tasación homologada por el
              Banco de España.
            </p>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">7. Tus derechos</h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del
              tratamiento y portabilidad escribiendo a{" "}
              <strong className="text-white">[EMAIL DE CONTACTO]</strong>, indicando el derecho que deseas ejercer
              y adjuntando copia de un documento que acredite tu identidad. También tienes derecho a presentar una
              reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si consideras que el
              tratamiento no se ajusta a la normativa vigente.
            </p>
          </section>

          <section className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">8. Seguridad</h2>
            <p>
              Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos no
              autorizados, pérdida o alteración, incluyendo cifrado en tránsito (HTTPS) y control de acceso al
              panel de administración.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
