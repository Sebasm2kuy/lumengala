"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Check,
  Image as ImageLucide,
  Minus,
  Music2,
  Palette,
  Pause,
  Play,
  Plus,
  TimerReset,
  X,
} from "lucide-react";
import {
  calcularCuentaRegresiva,
  DESTINO_BODA_MS,
  DESTINO_QUINCE_MS,
  dosDigitos,
  type Restante,
} from "@/lib/cuenta-regresiva";
import { useAhora } from "@/hooks/use-ahora";
import Revelar from "@/components/revelar";
import { rutaPublica } from "@/lib/base-ruta";

/* ── Tarjeta 1 · Música y diseño a medida ──────────────────────────────── */

const BARRAS = [42, 70, 55, 95, 62, 38, 80, 50];

const PALETA = [
  { hex: "#a9832b", nombre: "Champagne" },
  { hex: "#b0685e", nombre: "Rosado" },
  { hex: "#6e7a68", nombre: "Salvia" },
  { hex: "#7c3b45", nombre: "Borgoña" },
  { hex: "#2b2620", nombre: "Tinta" },
];

const FUENTES = [
  { id: "serif", etiqueta: "Serif fina", clase: "font-serif" },
  { id: "cursiva", etiqueta: "Itálica", clase: "font-serif italic" },
  { id: "sans", etiqueta: "Sans limpia", clase: "font-sans" },
];

function TarjetaMusicaDiseno() {
  const [sonando, setSonando] = useState(true);
  const [colorActivo, setColorActivo] = useState(PALETA[0]);
  const [fuenteActiva, setFuenteActiva] = useState(FUENTES[0]);

  return (
    <article className="vidrio flex flex-col gap-5 rounded-[1.75rem] p-6 sm:p-7">
      <header className="flex items-start gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-dorado/40 bg-white/70 text-dorado-hondo">
          <Music2 className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-serif text-2xl font-light text-tinta">
            Música y diseño a medida
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-tinta-media">
            Tu canción suena al abrir. Probá la paleta y la tipografía de una
            invitación real.
          </p>
        </div>
      </header>

      {/* reproductor de muestra */}
      <div className="flex items-center gap-3.5 rounded-2xl border filete bg-white/60 p-3.5">
        <div className="brillo grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#322c24] to-[#4a4136]">
          <Music2 className="h-5 w-5 text-dorado" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-[17px] italic leading-tight text-tinta">
            Clair de Lune
          </p>
          <p className="text-[10px] uppercase tracking-[0.16em] text-tinta-suave">
            Debussy · muestra de la fiesta
          </p>
        </div>
        <div
          className="ecualizador hidden text-dorado-hondo sm:flex"
          data-pausado={!sonando}
          aria-hidden="true"
        >
          {BARRAS.map((alto, i) => (
            <span
              key={i}
              style={{
                height: `${alto}%`,
                animationDelay: `${i * 0.12}s`,
                animationDuration: `${0.9 + (i % 3) * 0.18}s`,
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSonando((v) => !v)}
          aria-pressed={sonando}
          aria-label={
            sonando ? "Pausar ondas del reproductor" : "Animar ondas del reproductor"
          }
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tinta text-marfil transition-transform hover:scale-105"
        >
          {sonando ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 translate-x-[1px]" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* paleta de colores */}
      <div>
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-tinta-media">
          <Palette className="h-3.5 w-3.5 text-dorado-hondo" aria-hidden="true" />
          Paleta del evento
        </p>
        <div
          className="mt-2.5 flex items-center gap-2.5"
          role="group"
          aria-label="Elegir color de acento"
        >
          {PALETA.map((color) => (
            <button
              key={color.hex}
              type="button"
              onClick={() => setColorActivo(color)}
              aria-pressed={colorActivo.hex === color.hex}
              aria-label={`Color ${color.nombre}`}
              title={color.nombre}
              className={`h-7 w-7 rounded-full border transition-transform hover:scale-110 ${
                colorActivo.hex === color.hex
                  ? "scale-110 border-dorado ring-2 ring-dorado/40 ring-offset-2 ring-offset-white/50"
                  : "border-black/10"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* prueba tipográfica */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-tinta-media">
          Prueba tipográfica
        </p>
        <div
          className="mt-2.5 flex flex-wrap gap-2"
          role="group"
          aria-label="Elegir tipografía"
        >
          {FUENTES.map((fuente) => (
            <button
              key={fuente.id}
              type="button"
              onClick={() => setFuenteActiva(fuente)}
              aria-pressed={fuenteActiva.id === fuente.id}
              className={`rounded-full px-3.5 py-1.5 text-[11px] tracking-wide transition-colors ${
                fuenteActiva.id === fuente.id
                  ? "bg-tinta text-marfil"
                  : "border filete bg-white/60 text-tinta-media hover:border-dorado hover:text-dorado-hondo"
              }`}
            >
              {fuente.etiqueta}
            </button>
          ))}
        </div>
        <div className="mt-3.5 rounded-2xl border border-dorado/25 bg-white/50 px-5 py-4 text-center">
          <p
            className={`${fuenteActiva.clase} text-[27px] leading-tight transition-colors`}
            style={{ color: colorActivo.hex }}
          >
            Aurora — 08.08.2027
          </p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-tinta-suave">
            {colorActivo.nombre} · {fuenteActiva.etiqueta}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ── Tarjeta 2 · Cuentas regresivas (contador numérico en vivo) ────────── */

const EVENTOS_CONTADOR = [
  { id: "boda", etiqueta: "Boda · 08.08.27", destino: DESTINO_BODA_MS, frase: "para el «sí quiero»" },
  { id: "quince", etiqueta: "XV · 15.11.27", destino: DESTINO_QUINCE_MS, frase: "para el gran 15" },
] as const;

/* Contador numérico y tipográfico, igual al de las invitaciones reales:
   cuatro columnas serenas con filetes dorados, sin relojes ni adornos. */
function ContadorNumerico({ restante }: { restante: Restante | null }) {
  const partes = [
    { valor: restante ? String(restante.dias) : "—", etiqueta: "Días" },
    { valor: restante ? dosDigitos(restante.horas) : "—", etiqueta: "Horas" },
    { valor: restante ? dosDigitos(restante.minutos) : "—", etiqueta: "Min" },
    { valor: restante ? dosDigitos(restante.segundos) : "—", etiqueta: "Seg" },
  ];

  return (
    <div
      className="grid grid-cols-4 rounded-2xl border border-dorado/25 bg-white/50"
      role="timer"
      aria-label={
        restante
          ? `Faltan ${restante.dias} días, ${restante.horas} horas, ${restante.minutos} minutos y ${restante.segundos} segundos`
          : "Cuenta regresiva cargando"
      }
    >
      {partes.map((p, i) => (
        <div
          key={p.etiqueta}
          className={`px-1 py-5 text-center ${i > 0 ? "border-l border-dorado/20" : ""}`}
        >
          <p className="font-serif text-[34px] leading-none text-tinta tabular-nums sm:text-[44px]">
            {p.valor}
          </p>
          <p className="mt-2.5 text-[10px] uppercase tracking-[0.28em] text-tinta-suave">
            {p.etiqueta}
          </p>
        </div>
      ))}
    </div>
  );
}

function TarjetaCuentasRegresivas() {
  const [eventoId, setEventoId] = useState<(typeof EVENTOS_CONTADOR)[number]["id"]>("boda");
  const evento = EVENTOS_CONTADOR.find((e) => e.id === eventoId) ?? EVENTOS_CONTADOR[0];
  const ahora = useAhora(1000);
  const restante =
    ahora === null ? null : calcularCuentaRegresiva(ahora, evento.destino);

  return (
    <article className="vidrio flex flex-col gap-5 rounded-[1.75rem] p-6 sm:p-7">
      <header className="flex items-start gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-dorado/40 bg-white/70 text-dorado-hondo">
          <TimerReset className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-serif text-2xl font-light text-tinta">
            Cuentas regresivas
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-tinta-media">
            Un contador numérico y tipográfico que marca cada segundo hasta el
            gran día, igual que en las invitaciones reales.
          </p>
        </div>
      </header>

      <ContadorNumerico restante={restante} />

      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Elegir evento del contador"
      >
        {EVENTOS_CONTADOR.map((ev) => (
          <button
            key={ev.id}
            type="button"
            onClick={() => setEventoId(ev.id)}
            aria-pressed={eventoId === ev.id}
            className={`rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wide transition-colors ${
              eventoId === ev.id
                ? "bg-dorado text-[#241d10] shadow-[0_10px_24px_-10px_rgba(212,175,55,0.8)]"
                : "border filete bg-white/60 text-tinta-media hover:border-dorado hover:text-dorado-hondo"
            }`}
          >
            {ev.etiqueta}
          </button>
        ))}
      </div>

      <p className="text-center text-[10px] uppercase tracking-[0.28em] text-tinta-suave">
        {restante ? evento.frase : "Elegí un evento para ver el contador"}
      </p>
    </article>
  );
}

/* ── Tarjeta 3 · Galería (collage editorial) ───────────────────────────── */

function TarjetaGaleria() {
  return (
    <article className="vidrio flex flex-col gap-5 rounded-[1.75rem] p-6 sm:p-7">
      <header className="flex items-start gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-dorado/40 bg-white/70 text-dorado-hondo">
          <ImageLucide className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-serif text-2xl font-light text-tinta">
            Galería editorial
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-tinta-media">
            Collage de revista de moda: cada foto respira en su propio marco.
          </p>
        </div>
      </header>

      <div className="grid h-[240px] grid-cols-3 grid-rows-2 gap-2.5">
        <figure className="zoom-editorial relative col-span-2 row-span-2 overflow-hidden rounded-2xl">
          <Image
            src={rutaPublica("/img/rose-couture.jpg")}
            alt="Rosas en cascada de la colección Rosé Couture"
            fill
            sizes="(min-width: 768px) 380px, 90vw"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2b2620]/75 to-transparent px-4 pb-3 pt-10">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#f3e9d2]">
              Editorial Nº 04 — Rosé
            </span>
          </figcaption>
        </figure>
        <figure className="zoom-editorial relative overflow-hidden rounded-2xl">
          <Image
            src={rutaPublica("/img/aurora.jpg")}
            alt="Cielo de medianoche dorado de la colección Aurora"
            fill
            sizes="180px"
            className="object-cover"
          />
        </figure>
        <figure className="zoom-editorial relative overflow-hidden rounded-2xl">
          <Image
            src={rutaPublica("/img/camila.jpg")}
            alt="Arco rosado de la colección Camila"
            fill
            sizes="180px"
            className="object-cover"
          />
        </figure>
      </div>

      <p className="text-center text-[11px] uppercase tracking-[0.24em] text-tinta-suave">
        Fotos ilimitadas · se ven desde el primer toque
      </p>
    </article>
  );
}

/* ── Tarjeta 4 · RSVP inteligente (widget de prueba) ───────────────────── */

function TarjetaRsvp() {
  const [asistencia, setAsistencia] = useState<"si" | "no" | null>(null);
  const [acompanantes, setAcompanantes] = useState(0);
  const [enviado, setEnviado] = useState(false);

  const reiniciar = () => {
    setAsistencia(null);
    setAcompanantes(0);
    setEnviado(false);
  };

  return (
    <article className="vidrio flex flex-col gap-5 rounded-[1.75rem] p-6 sm:p-7">
      <header className="flex items-start gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-dorado/40 bg-white/70 text-dorado-hondo">
          <BadgeCheck className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-serif text-2xl font-light text-tinta">
            RSVP inteligente
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-tinta-media">
            Probá el sistema: elegí asistencia y acompañantes, como lo haría un
            invitado.
          </p>
        </div>
      </header>

      {enviado ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-dorado/30 bg-white/60 px-6 py-8 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-dorado/15 text-dorado-hondo">
            <BadgeCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="font-serif text-[22px] text-tinta">¡Confirmación registrada!</p>
          <p className="max-w-[280px] text-[12px] leading-relaxed text-tinta-media">
            Esto es una demostración: en la invitación real queda guardado en la
            planilla del anfitrión.
          </p>
          <button
            type="button"
            onClick={reiniciar}
            className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-dorado-hondo underline decoration-dorado/50 underline-offset-4 hover:text-tinta"
          >
            Probar de nuevo
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <p className="text-[12px] font-medium text-tinta">¿Contás con asistir?</p>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAsistencia("si")}
                aria-pressed={asistencia === "si"}
                className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-medium transition-colors ${
                  asistencia === "si"
                    ? "bg-dorado text-[#241d10] shadow-[0_12px_26px_-12px_rgba(212,175,55,0.9)]"
                    : "border filete bg-white/60 text-tinta-media hover:border-dorado hover:text-dorado-hondo"
                }`}
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                Sí, ahí estaré
              </button>
              <button
                type="button"
                onClick={() => setAsistencia("no")}
                aria-pressed={asistencia === "no"}
                className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-medium transition-colors ${
                  asistencia === "no"
                    ? "bg-tinta text-marfil"
                    : "border filete bg-white/60 text-tinta-media hover:border-tinta hover:text-tinta"
                }`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
                No podré ir
              </button>
            </div>
          </div>

          {asistencia === "si" && (
            <div>
              <p className="text-[12px] font-medium text-tinta">
                ¿Con cuántos acompañantes?
              </p>
              <div className="mt-2.5 flex items-center justify-between rounded-full border filete bg-white/60 px-3 py-2">
                <button
                  type="button"
                  onClick={() => setAcompanantes((n) => Math.max(0, n - 1))}
                  disabled={acompanantes === 0}
                  aria-label="Quitar un acompañante"
                  className="grid h-8 w-8 place-items-center rounded-full border filete text-tinta-media transition-colors hover:border-dorado hover:text-dorado-hondo disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span
                  className="font-serif text-xl text-tinta tabular-nums"
                  aria-live="polite"
                >
                  {acompanantes} {acompanantes === 1 ? "acompañante" : "acompañantes"}
                </span>
                <button
                  type="button"
                  onClick={() => setAcompanantes((n) => Math.min(4, n + 1))}
                  disabled={acompanantes === 4}
                  aria-label="Agregar un acompañante"
                  className="grid h-8 w-8 place-items-center rounded-full border filete text-tinta-media transition-colors hover:border-dorado hover:text-dorado-hondo disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          <p className="text-[12px] leading-relaxed text-tinta-media" aria-live="polite">
            {asistencia === "si"
              ? `Tu mesa: ${1 + acompanantes} ${1 + acompanantes === 1 ? "lugar" : "lugares"} · registrados al instante.`
              : asistencia === "no"
                ? "¡Gracias por avisarnos! Los cupos se liberan solos."
                : "Elegí una opción para ver el resumen."}
          </p>

          <button
            type="button"
            onClick={() => setEnviado(true)}
            disabled={asistencia === null}
            className="brillo mt-auto rounded-full bg-gradient-to-b from-[#e6c96f] to-[#c39b2a] px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#241d10] shadow-[0_16px_34px_-14px_rgba(212,175,55,0.8)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enviar confirmación
          </button>
        </div>
      )}
    </article>
  );
}

/* ── Sección ───────────────────────────────────────────────────────────── */

export default function Experiencia() {
  return (
    <section
      id="experiencia"
      className="relative scroll-mt-24 overflow-hidden py-20 lg:py-32"
      aria-labelledby="titulo-experiencia"
    >
      <div
        className="resplandor-dorado pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 opacity-60"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Revelar className="mx-auto max-w-2xl text-center">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.34em] text-dorado-hondo">
            Experiencia sensorial
          </p>
          <h2
            id="titulo-experiencia"
            className="mt-3 font-serif text-4xl font-light leading-tight text-tinta sm:text-5xl"
          >
            Cuatro destellos que se sienten{" "}
            <span className="italic text-dorado-hondo">antes de llegar</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-tinta-media">
            Todo lo que hace especial a una invitación de Lumen Gala, en
            versiones interactivas para que lo pruebes ahora mismo.
          </p>
        </Revelar>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-10">
          <Revelar retraso={0}>
            <TarjetaMusicaDiseno />
          </Revelar>
          <Revelar retraso={120}>
            <TarjetaCuentasRegresivas />
          </Revelar>
          <Revelar retraso={0}>
            <TarjetaGaleria />
          </Revelar>
          <Revelar retraso={120}>
            <TarjetaRsvp />
          </Revelar>
        </div>
      </div>
    </section>
  );
}
