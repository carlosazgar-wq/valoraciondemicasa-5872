import { useEffect, useState } from "react";

const GA_ID = "G-SN79MJNFGN";
const STORAGE_KEY = "cookie_consent"; // "accepted" | "rejected"

function cargarGoogleAnalytics() {
  if (document.getElementById("ga-script")) return;
  const s1 = document.createElement("script");
  s1.id = "ga-script";
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s1);

  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  function gtag(...args: any[]) { w.dataLayer.push(args); }
  w.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
}

// Antes, Google Analytics se cargaba en cuanto se abría la web, sin pedir
// permiso — no había ningún banner de cookies pese a que el footer
// prometía uno ("Cookies" enlazaba a "#"). Este componente pide
// consentimiento explícito antes de cargar cualquier cookie de analítica,
// tal como exige la normativa española (LSSI-CE / RGPD).
export function CookieConsent() {
  const [estado, setEstado] = useState<"pendiente" | "oculto">("oculto");

  useEffect(() => {
    let choice: string | null = null;
    try { choice = localStorage.getItem(STORAGE_KEY); } catch {}
    if (choice === "accepted") {
      cargarGoogleAnalytics();
      setEstado("oculto");
    } else if (choice === "rejected") {
      setEstado("oculto");
    } else {
      setEstado("pendiente");
    }
  }, []);

  const aceptar = () => {
    try { localStorage.setItem(STORAGE_KEY, "accepted"); } catch {}
    cargarGoogleAnalytics();
    setEstado("oculto");
  };

  const rechazar = () => {
    try { localStorage.setItem(STORAGE_KEY, "rejected"); } catch {}
    setEstado("oculto");
  };

  if (estado !== "pendiente") return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-5"
    >
      <div className="max-w-3xl mx-auto bg-[#111827] border border-[#1f2937] rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-gray-300 text-sm flex-1 text-center sm:text-left">
          Usamos cookies de analítica para entender cómo se usa la web y mejorarla. Puedes aceptarlas o
          rechazarlas — la web funciona igual en ambos casos.{" "}
          <a href="/cookies" className="text-[#10b981] hover:underline">Más información</a>.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={rechazar}
            className="px-4 py-2.5 rounded-xl border border-[#1f2937] text-gray-300 text-sm font-medium hover:border-[#10b981]/40 hover:text-white transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={aceptar}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white text-sm font-bold transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
