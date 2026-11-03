"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import {
  COLECCIONES,
  ETIQUETAS_FILTRO,
  filtrarColecciones,
} from "@/lib/colecciones";
import type { FiltroColeccion } from "@/lib/colecciones";
import Revelar from "@/components/revelar";
import { rutaPublica } from "@/lib/base-ruta";

export default function Colecciones() {
  const [filtro, setFiltro] = useState<FiltroColeccion>("todas");
  const obras = filtrarColecciones(COLECCIONES, filtro);

  return (
    <section
      id="colecciones"
      className="scroll-mt-24 bg-marfil-hondo/60 py-20 lg:py-28"
      aria-labelledby="titulo-colecciones"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Revelar className="mx-auto max-w-2xl text-center">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.34em] text-dorado-hondo">
            Galería de colecciones
          </p>
          <h2
            id="titulo-colecciones"
            className="mt-3 font-serif text-4xl font-light leading-tight text-tinta sm:text-5xl"
          >
            Obras abiertas,{" "}
            <span className="italic text-dorado-hondo">como en un museo</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-tinta-media">
            Seis colecciones exclusivas. Pasá el cursor sobre cada obra para
            verla funcionando en vivo.
          </p>
        </Revelar>

        {/* Filtros dinámicos */}
        <Revelar retraso={120}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            <div
              className="flex flex-wrap justify-center gap-2.5"
              role="group"
              aria-label="Filtrar colecciones"
            >
              {ETIQUETAS_FILTRO.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFiltro(f.id)}
                  aria-pressed={filtro === f.id}
                  className={`rounded-full px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] transition-all ${
                    filtro === f.id
                      ? "bg-dorado text-[#241d10] shadow-[0_14px_30px_-12px_rgba(212,175,55,0.85)]"
                      : "border filete bg-white/70 text-tinta-media hover:border-dorado hover:text-dorado-hondo"
                  }`}
                >
                  {f.etiqueta}
                </button>
              ))}
            </div>
            <span
              className="ml-1 hidden text-[11px] uppercase tracking-[0.2em] text-tinta-suave sm:inline"
              aria-live="polite"
            >
              {obras.length} {obras.length === 1 ? "obra" : "obras"}
            </span>
          </div>
        </Revelar>

        {/* Grid de obras */}
        <div
          key={filtro}
          className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {obras.map((obra, indice) => (
            <figure
              key={obra.id}
              className="grupo-obra obra-entrante group"
              style={{ animationDelay: `${indice * 70}ms` }}
            >
              <div className="marco-obra">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                  <Image
                    src={rutaPublica(`/img/${obra.imagen}.jpg`)}
                    alt={`Obra ${obra.nombre} — ${obra.descripcion}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="foto-obra object-cover"
                  />
                  {/* velo + botón al hover (o al enfocar con teclado) */}
                  <div className="velo-obra absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#2b2620]/72 via-[#2b2620]/10 to-transparent">
                    <a
                      href={obra.urlVivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="boton-obra brillo inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#e6c96f] to-[#c39b2a] px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#241d10] shadow-[0_16px_34px_-12px_rgba(212,175,55,0.9)]"
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      Ver invitación en vivo
                    </a>
                  </div>
                </div>
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-serif text-[22px] italic leading-tight text-tinta">
                  {obra.nombre}
                </p>
                <p className="mt-1 text-[9.5px] uppercase tracking-[0.28em] text-tinta-suave">
                  {obra.etiquetaTipo}
                </p>
                <p className="mx-auto mt-1.5 max-w-[260px] text-[12px] leading-relaxed text-tinta-media">
                  {obra.descripcion}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-12 text-center text-[12px] leading-relaxed text-tinta-suave">
          Cada botón abre una invitación de demostración publicada en
          lumengala.site — este repositorio de prueba solo la enlaza.
        </p>
      </div>
    </section>
  );
}
