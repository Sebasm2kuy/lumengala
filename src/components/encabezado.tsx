"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const ENLACES = [
  { href: "#experiencia", texto: "Experiencia" },
  { href: "#colecciones", texto: "Colecciones" },
  { href: "#por-que-digital", texto: "Por qué digital" },
  { href: "#cierre", texto: "Contacto" },
];

export default function Encabezado() {
  const [desplazado, setDesplazado] = useState(false);

  useEffect(() => {
    const alScroll = () => setDesplazado(window.scrollY > 24);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        desplazado
          ? "vidrio py-2.5"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#inicio"
          className="group flex items-center gap-2.5"
          aria-label="Lumen Gala Studio — ir al inicio"
        >
          <svg
            viewBox="0 0 48 48"
            className="h-9 w-9"
            aria-hidden="true"
            role="img"
          >
            <rect
              x="11"
              y="11"
              width="26"
              height="26"
              rx="3"
              transform="rotate(45 24 24)"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1.6"
            />
            <text
              x="24"
              y="28.6"
              textAnchor="middle"
              fontSize="12.5"
              fill="#a9832b"
              fontStyle="italic"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              LG
            </text>
          </svg>
          <span className="leading-none">
            <span className="block font-serif text-[19px] font-medium tracking-wide text-tinta">
              Lumen Gala
            </span>
            <span className="block text-[8.5px] uppercase tracking-[0.42em] text-tinta-suave">
              Studio
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Secciones de la página"
        >
          {ENLACES.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="text-[12.5px] font-medium tracking-[0.14em] text-tinta-media transition-colors hover:text-dorado-hondo"
            >
              {enlace.texto}
            </a>
          ))}
        </nav>

        <a
          href="#cierre"
          className="brillo inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#e3c566] to-[#c39b2a] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#241d10] shadow-[0_14px_30px_-12px_rgba(212,175,55,0.7)] transition-transform hover:scale-[1.03] sm:px-5"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Encargar
        </a>
      </div>
    </header>
  );
}
