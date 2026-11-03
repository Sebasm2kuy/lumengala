"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

/* Canal real de contacto de Lumen Gala (el mismo WhatsApp del sitio en
   producción); solo se enlaza, nunca se modifica producción. */
const WHATSAPP =
  "https://wa.me/59895239386?text=" +
  encodeURIComponent(
    "Hola Lumen Gala 💛 Quiero encargar mi invitación digital.",
  );

/* Botón flotante "Encargar": fijo en la esquina inferior derecha, aparece
   con una transición suave cuando la página ya se desplazó más allá del
   hero. */
export default function BotonEncargar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > 520);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      aria-label="Encargar mi invitación (abre WhatsApp)"
      className={`fixed bottom-5 right-5 z-50 transition-all duration-500 sm:bottom-7 sm:right-7 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <span className="brillo flex items-center gap-2 rounded-full bg-gradient-to-b from-[#e6c96f] to-[#c39b2a] px-6 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[#241d10] shadow-[0_20px_44px_-14px_rgba(212,175,55,0.75),0_4px_10px_rgba(43,38,32,0.12)] ring-1 ring-[#fff6d8]/60 transition-transform hover:scale-[1.04]">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        Encargar
      </span>
    </a>
  );
}
