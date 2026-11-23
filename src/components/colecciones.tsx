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
              {obras.length}{" "}
              {obras.length + (filtro === "todas" ? 0 : 1) === 1
                ? "obra"
                : "obras"}
              {filtro !== "todas" && " + prototipo"}
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

          {/* Arquitectura 2 (045a→045b): Revista XV · Lookbook, para XV.
              Misma lógica que Edición Crónica: "obra" extra SOLO en la vista
              [XV Años], fuera del catálogo COLECCIONES (tests del museo).
              Miniatura de portada de revista con la foto real de la sesión
              (imagen remota; se usa <img> y no next/image para no tocar la
              config de dominios del repo de pruebas) + masthead "Lucía" +
              barra inferior con nº de edición y acento rosa editorial.
              045b: la pieza es una revista paginada (6 páginas que se pasan
              de derecha a izquierda) — la miniatura lo refleja con la marca
              "06 páginas" y la portada real de la página 1. */}
          {filtro === "quince" && (
            <figure
              className="grupo-obra obra-entrante group"
              style={{ animationDelay: `${obras.length * 70}ms` }}
            >
              <a
                href={rutaPublica("/lookbook-xv.html")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir el prototipo Revista XV · Lookbook: revista interactiva paginada, se lee pasando páginas (abre en una pestaña nueva)"
              >
                <div className="marco-obra">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#15120E]">
                    {/* Portada de revista: foto de la sesión a página
                        completa, filete superior "Edición Nº 15", masthead
                        serif gigante "Lucía" y pie con dateline. El acento
                        rosa editorial (#C25E7A) es la identidad de la pieza.
                        Imagen remota con <img> (no next/image) para no
                        tocar la config de dominios del repo de pruebas. */}
                    <img
                      src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1746547fe9b9.png"
                      alt="Lucía al aire libre en la ciudad, sesión casual del lookbook"
                      className="foto-obra absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    {/* degradado para legibilidad del texto sobre la foto
                        (refuerzo inferior: el subtítulo pisa la zona
                        luminosa de la escena del café) */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-b from-[#15120E]/80 via-[#15120E]/15 to-[#15120E]/88"
                    />
                    <div className="absolute inset-0 flex flex-col justify-between p-5 text-left sm:p-6">
                      <div>
                        <div className="flex items-baseline justify-between rounded-[2px] bg-[#15120E]/55 px-2 py-1 backdrop-blur-[2px] text-[7.5px] font-semibold uppercase tracking-[0.28em] text-[#F2EDE4]/95">
                          <span>Prototipo</span>
                          <span className="text-[#E3A2B8]">Edición Nº 15</span>
                        </div>
                        <div
                          className="mt-2 h-px w-full bg-[#F2EDE4]/35"
                          aria-hidden="true"
                        />
                        <p className="mt-3 font-serif text-[44px] font-black leading-[0.9] text-[#F2EDE4] drop-shadow-[0_2px_14px_rgba(21,18,14,0.85)] sm:text-[52px]">
                          Lucía
                        </p>
                        <p className="mt-1.5 rounded-[2px] bg-[#15120E]/55 px-2 py-1 font-serif text-[11px] italic text-[#F2EDE4] backdrop-blur-[2px] sm:text-[12px]">
                          quince años, editados como una revista
                        </p>
                      </div>
                      <div>
                        <div
                          className="mb-2.5 h-px w-full bg-[#F2EDE4]/35"
                          aria-hidden="true"
                        />
                        <div className="flex items-baseline justify-between text-[7.5px] uppercase tracking-[0.22em] text-[#F2EDE4]/75">
                          <span>Marzo 2027</span>
                          <span className="text-[#E3A2B8]">06 páginas</span>
                        </div>
                        <p className="mt-1.5 text-[8px] uppercase tracking-[0.24em] text-[#F2EDE4]/60">
                          Guadalajara · Sábado 13
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
                  Revista XV · Lookbook
                </p>
                <p className="mt-1 text-[9.5px] uppercase tracking-[0.28em] text-tinta-suave">
                  Prototipo · no es una colección
                </p>
                <p className="mx-auto mt-1.5 max-w-[260px] text-[12px] leading-relaxed text-tinta-media">
                  Segunda arquitectura: revista interactiva de 6 páginas que
                  se lee pasando hojas, con sesión de exteriores.
                </p>
              </figcaption>
            </figure>
          )}

          {/* Arquitectura 3 (047a): Pase Privado 3D, para XV. La escena
              exploratoria 046a se descartó y esta es la tercera pieza: una
              tarjeta vertical de gala con física 3D, reflejo especular
              dinámico y doble cara giratoria (frente: fecha + cuenta
              regresiva; dorso: lugar, código, nota y RSVP). La miniatura
              es una mini-tarjeta compuesta (sin foto): papel marfil,
              filletes dorados, monograma, ranura del cordón, sheen en
              diagonal y leve inclinación — transmite el objeto sin
              inventar imágenes ni números de cuenta regresiva falsos. */}
          {filtro === "quince" && (
            <figure
              className="grupo-obra obra-entrante group"
              style={{ animationDelay: `${obras.length * 70 + 70}ms` }}
            >
              <a
                href={rutaPublica("/pase-3d.html")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir el prototipo Pase Privado 3D: tarjeta vertical de gala con física 3D y doble cara giratoria (abre en una pestaña nueva)"
              >
                <div className="marco-obra">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#0B0805]">
                    {/* vitrina de la mini-tarjeta */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(95% 74% at 50% 40%, #2A1D13 0%, #191209 48%, #0B0805 100%)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-[44%] h-[150px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(194,94,122,0.16)] blur-[2px]"
                    />
                    {/* sombra de piso */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-[78%] h-[9px] w-[116px] -translate-x-1/2 rounded-full bg-black/55 blur-[5px]"
                    />
                    {/* la mini-tarjeta, levemente inclinada (el centrado va
                        en el transform inline: las clases -translate de
                        Tailwind v4 usan la propiedad `translate` y con el
                        transform se sumarían — doble traslación) */}
                    <div
                      className="absolute left-1/2 top-1/2 w-[58%]"
                      style={{
                        aspectRatio: "320 / 506",
                        transform:
                          "translate(-50%, -55%) perspective(700px) rotateX(3deg) rotateY(-6deg)",
                      }}
                    >
                      <div
                        className="relative h-full w-full overflow-hidden rounded-[14px] bg-gradient-to-b from-[#F7F4EE] via-[#F4F1EC] to-[#EBE6DA]"
                        style={{
                          boxShadow:
                            "0 20px 44px -14px rgba(0,0,0,.78), inset 0 1px 0 rgba(255,255,255,.7)",
                        }}
                      >
                        {/* filletes dorados dobles */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-[6px] rounded-[10px] border-[1.5px] border-[#8B6D2C]/60"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-[10px] rounded-[7px] border border-[#8B6D2C]/25"
                        />
                        {/* ranura del cordón */}
                        <div
                          aria-hidden="true"
                          className="absolute left-1/2 top-[5.5%] h-[9px] w-[26px] -translate-x-1/2 rounded-[5px] border border-[#8B6D2C]/40 bg-[#14100C] shadow-[inset_0_2px_3px_rgba(0,0,0,.55)]"
                        />
                        <div className="flex h-full flex-col items-center px-[10%] pb-[8%] pt-[16%] text-center text-[#191511]">
                          <div
                            aria-hidden="true"
                            className="grid h-[32px] w-[32px] place-items-center rounded-full border-[1.5px] border-[#8B6D2C]/80"
                          >
                            <b className="font-serif text-[16px] font-black leading-none text-[#8B6D2C]">
                              L
                            </b>
                          </div>
                          <p className="mt-[6%] font-serif text-[28px] font-black leading-none text-[#191511]">
                            Lucía
                          </p>
                          <p className="mt-[3%] font-serif text-[10px] italic text-[#9E4660]">
                            quince años
                          </p>
                          <div
                            aria-hidden="true"
                            className="mt-[6%] h-px w-[72%] bg-gradient-to-r from-transparent via-[#C39B2A] to-transparent"
                          />
                          <p className="mt-[6%] text-[7.5px] font-bold uppercase tracking-[0.18em] text-[#5E5850]">
                            Sábado 13 · 03 · 2027
                          </p>
                          <p className="mt-[3%] text-[6.5px] font-bold uppercase tracking-[0.16em] text-[#8B6D2C]">
                            Jardines de la Quinta
                          </p>
                          <span className="mt-[7%] rounded-full border border-[#C39B2A] px-[12px] py-[5px] text-[6.5px] font-bold uppercase tracking-[0.16em] text-[#8B6D2C]">
                            Ver dorso
                          </span>
                          <span className="mt-auto text-[6.5px] font-semibold uppercase tracking-[0.22em] text-[#5E5850]/80">
                            Nº 001
                          </span>
                        </div>
                        {/* sheen diagonal sobre el papel */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(115deg, transparent 38%, rgba(255,252,242,.22) 48%, rgba(255,250,236,.1) 55%, transparent 64%)",
                          }}
                        />
                      </div>
                    </div>
                    {/* degradados para legibilidad del texto */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-b from-[#15120E]/42 via-transparent to-[#15120E]/80"
                    />
                    <div className="absolute inset-0 flex flex-col justify-between p-5 text-left sm:p-6">
                      <div>
                        <div className="flex items-baseline justify-between rounded-[2px] bg-[#15120E]/55 px-2 py-1 backdrop-blur-[2px] text-[7.5px] font-semibold uppercase tracking-[0.28em] text-[#F2EDE4]/95">
                          <span>Prototipo</span>
                          <span className="text-[#E3A2B8]">Pase 3D</span>
                        </div>
                        <div
                          className="mt-2 h-px w-full bg-[#F2EDE4]/35"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <div
                          className="mb-2.5 h-px w-full bg-[#F2EDE4]/35"
                          aria-hidden="true"
                        />
                        <div className="flex items-baseline justify-between text-[7.5px] uppercase tracking-[0.22em] text-[#F2EDE4]/75">
                          <span>Marzo 2027</span>
                          <span className="text-[#E3A2B8]">Doble cara · Giro 180°</span>
                        </div>
                        <p className="mt-1.5 text-[8px] uppercase tracking-[0.24em] text-[#F2EDE4]/60">
                          Física 3D · Guadalajara · Sábado 13
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
                  Pase Privado 3D
                </p>
                <p className="mt-1 text-[9.5px] uppercase tracking-[0.28em] text-tinta-suave">
                  Prototipo · no es una colección
                </p>
                <p className="mx-auto mt-1.5 max-w-[260px] text-[12px] leading-relaxed text-tinta-media">
                  Tercera arquitectura: tarjeta de gala con física 3D,
                  reflejo dinámico y doble cara giratoria.
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
