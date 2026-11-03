import { Mail } from "lucide-react";

export default function Pie() {
  return (
    <footer className="border-t filete bg-marfil">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-5 py-9 text-center sm:px-8 md:flex-row md:text-left">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
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
          <p className="text-[12.5px] leading-relaxed text-tinta-media">
            <span className="font-serif text-[15px] italic text-tinta">
              Lumen Gala Studio
            </span>
            <br />
            Invitaciones web para bodas y XV años · Montevideo, Uruguay
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-end">
          <a
            href="mailto:lumengala.studio@gmail.com"
            className="inline-flex items-center gap-2 text-[12.5px] text-tinta-media transition-colors hover:text-dorado-hondo"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            lumengala.studio@gmail.com
          </a>
          <p className="max-w-[320px] text-[10.5px] leading-relaxed text-tinta-suave">
            Propuesta de diseño en repositorio de prueba — no afecta a
            lumengala.site.
          </p>
        </div>
      </div>
    </footer>
  );
}
