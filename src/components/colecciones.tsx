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
      className="scroll-mt-24 bg-marfil-hondo/60 py-20 lg:py-32"
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
          className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-y-16"
        >
          {obras.map((obra, indice) => (
            <figure
              key={obra.id}
              className="grupo-obra obra-entrante group"
              style={{ animationDelay: `${indice * 70}ms` }}
            >
              {/* Toda la obra es un enlace: un click en cualquier parte de
                  la tarjeta abre la invitación en vivo (el botón queda como
                  etiqueta visual del mismo enlace). El hover y el foco siguen
                  viviendo en .grupo-obra (veo globals.css). */}
              <a
                href={obra.urlVivo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver la invitación ${obra.nombre} en vivo (abre en una pestaña nueva)`}
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
                    {/* velo + etiqueta al hover (o al enfocar con teclado) */}
                    <div className="velo-obra absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#2b2620]/72 via-[#2b2620]/10 to-transparent">
                      <span className="boton-obra brillo inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#e6c96f] to-[#c39b2a] px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#241d10] shadow-[0_16px_34px_-12px_rgba(212,175,55,0.9)]">
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        Ver invitación en vivo
                      </span>
                    </div>
                  </div>
                </div>
              </a>
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

          {/* Acceso al prototipo de arquitectura (044f), pedido como acceso
              en la sección Bodas: una "obra" extra solo en la vista [Bodas].
              Está FUERA del catálogo COLECCIONES a propósito — el museo
              publica 6 colecciones que enlazan demos de producción (los
              tests lo fijan); el prototipo vive en public/ de este repo de
              prueba y no es una colección. Portada de "primera plana" con la
              identidad editorial de la pieza (tinta, papel, terracota):
              masthead oscuro + dateline + capitular con la apertura real +
              corrida de capítulos. Sin fotos ni relojes. */}
          {filtro === "boda" && (
            <figure
              className="grupo-obra obra-entrante group"
              style={{ animationDelay: `${obras.length * 70}ms` }}
            >
              <a
                href={rutaPublica("/edicion-cronica.html")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir el prototipo Edición Crónica: invitación narrativa por capítulos (abre en una pestaña nueva)"
              >
                <div className="marco-obra">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#211B13]">
                    {/* Portada de primera plana, sin foto (el prototipo aún
                        no tiene shoot propio): banda masthead de tinta con el
                        título, dateline del evento, capitular con la apertura
                        real del capítulo I (texto citado de la pieza) y
                        corrida de capítulos al pie. Marca de agua "01" como
                        sello editorial. */}
                    <div className="flex h-full flex-col">
                      {/* masthead */}
                      <div className="bg-[#211B13] px-5 pb-3.5 pt-3 text-center sm:px-6">
                        <div className="flex items-baseline justify-between text-[7.5px] font-semibold uppercase tracking-[0.28em] text-[#F3EAD8]/75">
                          <span>Prototipo</span>
                          <span className="text-[#D08A5C]">Núm. 01</span>
                        </div>
                        <div
                          className="mx-auto mt-1.5 h-px w-12 bg-[#A4502A]"
                          aria-hidden="true"
                        />
                        <p className="mt-2 font-serif text-[27px] italic leading-none text-[#F3EAD8] sm:text-[31px]">
                          Edición Crónica
                        </p>
                        <p className="mt-1.5 text-[7.5px] uppercase tracking-[0.32em] text-[#F3EAD8]/60">
                          La invitación, contada por capítulos
                        </p>
                      </div>
                      {/* cuerpo de la primera plana */}
                      <div className="relative flex flex-1 flex-col bg-gradient-to-b from-[#F9F4EA] to-[#EFE7D6] px-5 sm:px-6">
                        <p className="border-b border-[#211B13]/15 pb-2 pt-3 text-center text-[7.5px] uppercase tracking-[0.24em] text-[#211B13]/75">
                          Comala, Colima — Sábado 8 de mayo de 2027
                        </p>
                        <div className="flex flex-1 items-center">
                          <p className="font-serif text-[11.5px] leading-[1.5] text-[#211B13]/85">
                            <span
                              aria-hidden="true"
                              className="float-left mr-1.5 mt-[3px] font-serif text-[36px] leading-[0.8] text-[#A4502A]"
                            >
                              H
                            </span>
                            <span className="sr-only">H</span>
                            ay historias que no empiezan con un golpe de
                            suerte, sino con una pregunta que se queda
                            rondando: ¿y si nos quedamos?
                          </p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -bottom-5 right-2 font-serif text-[96px] italic leading-none text-[#A4502A]/10"
                        >
                          01
                        </span>
                        <p className="border-t border-[#211B13]/15 py-2.5 text-center text-[8.5px] uppercase tracking-[0.26em] text-[#211B13]/70">
                          Capítulos{" "}
                          <span className="font-medium text-[#A4502A]">I</span>{" "}
                          ·{" "}
                          <span className="font-medium text-[#A4502A]">II</span>{" "}
                          ·{" "}
                          <span className="font-medium text-[#A4502A]">III</span>{" "}
                          ·{" "}
                          <span className="font-medium text-[#A4502A]">IV</span>{" "}
                          ·{" "}
                          <span className="font-medium text-[#A4502A]">V</span> ·
                          RSVP
                        </p>
                      </div>
                    </div>
                    {/* velo + etiqueta al hover (o al enfocar con teclado),
                        igual que las obras */}
                    <div className="velo-obra absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#2b2620]/72 via-[#2b2620]/10 to-transparent">
                      <span className="boton-obra brillo inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#e6c96f] to-[#c39b2a] px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#241d10] shadow-[0_16px_34px_-12px_rgba(212,175,55,0.9)]">
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        Abrir el prototipo
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <figcaption className="mt-4 text-center">
                <p className="font-serif text-[22px] italic leading-tight text-tinta">
                  Edición Crónica
                </p>
                <p className="mt-1 text-[9.5px] uppercase tracking-[0.28em] text-tinta-suave">
                  Prototipo · no es una colección
                </p>
                <p className="mx-auto mt-1.5 max-w-[260px] text-[12px] leading-relaxed text-tinta-media">
                  Nuestra primera arquitectura narrativa por capítulos,
                  distinta de la lista vertical clásica.
                </p>
              </figcaption>
            </figure>
          )}
        </div>

        <p className="mt-12 text-center text-[12px] leading-relaxed text-tinta-suave">
          Cada obra abre una invitación de demostración publicada en
          lumengala.site — este repositorio de prueba solo la enlaza.
        </p>
      </div>
    </section>
  );
}
