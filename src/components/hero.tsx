"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Music2,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import {
  calcularCuentaRegresiva,
  DESTINO_BODA_MS,
} from "@/lib/cuenta-regresiva";
import type { Restante } from "@/lib/cuenta-regresiva";
import { useAhora } from "@/hooks/use-ahora";
import Revelar from "@/components/revelar";

/* Canal real de contacto de Lumen Gala (WhatsApp del sitio en producción). */
const WHATSAPP =
  "https://wa.me/59895239386?text=" +
  encodeURIComponent(
    "Hola Lumen Gala 💛 Quiero encargar mi invitación digital.",
  );

const PARTES = [
  { clave: "dias", etiqueta: "Días" },
  { clave: "horas", etiqueta: "Horas" },
  { clave: "minutos", etiqueta: "Min" },
  { clave: "segundos", etiqueta: "Seg" },
] as const;

const METRICAS = [
  {
    valor: "72 h",
    etiqueta: "Entrega estimada del primer borrador",
  },
  {
    valor: "6",
    etiqueta: "Colecciones exclusivas en catálogo",
  },
  {
    valor: "1",
    etiqueta: "Enlace con música, galería, RSVP y más",
  },
  {
    valor: "24/7",
    etiqueta: "Tus invitados lo abren desde el bolsillo",
  },
];

function NumeroCountdown({ restante }: { restante: Restante | null }) {
  return (
    <div className="grid w-full grid-cols-4 gap-1.5" aria-label="Cuenta regresiva para la boda">
      {PARTES.map((parte) => {
        const valor = restante
          ? String(
              parte.clave === "dias"
                ? restante.dias
                : parte.clave === "horas"
                  ? restante.horas
                  : parte.clave === "minutos"
                    ? restante.minutos
                    : restante.segundos,
            ).padStart(2, "0")
          : "—";
        return (
          <div
            key={parte.clave}
            className="vidrio vidrio-borde-oro rounded-lg px-1 py-1.5"
          >
            <div className="font-serif text-[15px] leading-none text-dorado-hondo tabular-nums">
              {valor}
            </div>
            <div className="mt-1 text-[6px] uppercase tracking-[0.18em] text-tinta-suave">
              {parte.etiqueta}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Smartphone de boda: invitación real de demostración con cuenta regresiva
   funcional (8 de agosto de 2027, la misma fecha de ejemplo-boda). */
function TelefonoBoda({ restante }: { restante: Restante | null }) {
  return (
    <div className="relative z-20 w-[236px] shrink-0 sm:w-[252px] lg:absolute lg:left-1/2 lg:top-12 lg:-translate-x-[74%]">
      <div className="flotar">
        <div className="rounded-[2.9rem] bg-gradient-to-b from-[#3a342c] to-[#17130e] p-[9px] shadow-[0_50px_90px_-38px_rgba(43,38,32,0.6)]">
          <div className="brillo relative aspect-[9/19.2] overflow-hidden rounded-[2.35rem] bg-[#fbf8f1]">
            {/*_isla superior */}
            <div className="absolute left-1/2 top-2 z-20 h-[20px] w-[80px] -translate-x-1/2 rounded-full bg-[#17130e]/90" />

            <div className="flex h-full flex-col items-center px-4 pb-4 pt-12 text-center">
              <span className="text-[7.5px] tracking-[0.42em] text-tinta-suave">
                LUMEN GALA
              </span>
              <span className="mt-3 text-[8px] uppercase tracking-[0.3em] text-dorado-hondo">
                Nuestra boda
              </span>
              <h3 className="mt-1 font-serif text-[25px] font-light leading-[1.1] text-tinta">
                Valentina{" "}
                <span className="italic text-dorado-hondo">&</span> Martín
              </h3>
              <div className="mt-2.5 h-px w-16 bg-dorado/50" aria-hidden="true" />
              <p className="mt-2 text-[8.5px] tracking-[0.2em] text-tinta-media">
                SÁB · 8 AGOSTO 2027 · 20:30 H
              </p>

              <div className="mt-3 w-full">
                <NumeroCountdown restante={restante} />
              </div>

              <div
                className="flex flex-1 items-center justify-center py-2"
                aria-hidden="true"
              >
                <span className="destello text-[10px] text-dorado-hondo">✦</span>
              </div>

              <div className="mt-auto w-full">
                <div className="brillo rounded-full bg-gradient-to-b from-[#e6c96f] to-[#c39b2a] py-2 text-[8px] font-semibold uppercase tracking-[0.24em] text-[#241d10]">
                  Confirmar asistencia
                </div>
                <p className="mt-2 text-[6.5px] tracking-[0.22em] text-tinta-suave">
                  MÚSICA · GALERÍA · RSVP
                </p>
              </div>
            </div>

            {/* reflejo fijo del vidrio */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[2.35rem] bg-gradient-to-br from-white/25 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Smartphone de XV años, detrás y girado, con dirección rosé. */
function TelefonoXV() {
  return (
    <div className="relative z-10 hidden w-[236px] shrink-0 -rotate-[7deg] sm:block sm:w-[248px] lg:absolute lg:left-1/2 lg:top-0 lg:translate-x-[10%] lg:rotate-[7deg]">
      <div className="flotar-lento">
        <div className="rounded-[2.9rem] bg-gradient-to-b from-[#42352f] to-[#1c1410] p-[9px] shadow-[0_50px_90px_-38px_rgba(43,38,32,0.55)]">
          <div className="relative aspect-[9/19.2] overflow-hidden rounded-[2.35rem] bg-gradient-to-b from-[#f9efe9] to-[#f2dcd4]">
            <div className="absolute left-1/2 top-2 z-20 h-[20px] w-[80px] -translate-x-1/2 rounded-full bg-[#1c1410]/90" />

            <div className="flex h-full flex-col items-center px-4 pb-5 pt-14 text-center">
              <span className="text-[7.5px] tracking-[0.42em] text-[#a98f86]">
                LUMEN GALA
              </span>
              <span className="mt-4 text-[8px] uppercase tracking-[0.32em] text-[#b3766b]">
                Mis XV años
              </span>
              <h3 className="mt-1 font-serif text-[34px] font-light italic leading-tight text-[#4a3a34]">
                Sofía
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-[#b3766b]" aria-hidden="true">
                <span className="destello text-[9px]">✦</span>
                <span className="destello destello-tardio text-[12px]">✦</span>
                <span className="destello text-[9px]">✦</span>
              </div>
              <p className="mt-3 text-[9px] tracking-[0.24em] text-[#8d746c]">
                15 · NOVIEMBRE · 2027
              </p>
              <div className="mt-5 w-full rounded-2xl border border-[#c9a49a]/60 bg-white/50 py-3 backdrop-blur-sm">
                <p className="text-[8px] uppercase tracking-[0.26em] text-[#a98f86]">
                  Fiesta en
                </p>
                <p className="mt-0.5 font-serif text-[15px] italic text-[#4a3a34]">
                  Salón Champagne
                </p>
              </div>

              <div className="mt-auto w-full">
                <div className="rounded-full border border-[#b3766b]/60 py-2 text-[8px] font-semibold uppercase tracking-[0.24em] text-[#b3766b]">
                  Ver ubicación
                </div>
                <p className="mt-2 text-[6.5px] tracking-[0.22em] text-[#a98f86]">
                  GALERÍA · DRESS CODE · HASHTAG
                </p>
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-0 rounded-[2.35rem] bg-gradient-to-br from-white/30 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Tarjeta de vidrio: reproductor sonando "Clair de Lune". */
function TarjetaMusica() {
  const [sonando, setSonando] = useState(true);
  const barras = [42, 70, 55, 95, 62, 38, 80, 50];

  return (
    <div className="vidrio w-full rounded-2xl p-3.5 sm:w-auto lg:absolute lg:-left-3 lg:top-4 lg:z-30 lg:w-[214px]">
      <div className="flex items-center gap-2.5">
        <div className="brillo grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#322c24] to-[#4a4136] shadow-inner">
          <Music2 className="h-4 w-4 text-dorado" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-serif text-[15px] italic leading-tight text-tinta">
            Clair de Lune
          </p>
          <p className="text-[9px] uppercase tracking-[0.14em] text-tinta-suave">
            Debussy · suena al abrir
          </p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setSonando((v) => !v)}
          aria-pressed={sonando}
          aria-label={sonando ? "Pausar muestra musical" : "Reproducir muestra musical"}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-tinta text-marfil transition-transform hover:scale-105"
        >
          {sonando ? (
            <Pause className="h-3 w-3" aria-hidden="true" />
          ) : (
            <Play className="h-3 w-3 translate-x-[1px]" aria-hidden="true" />
          )}
        </button>
        <div
          className="ecualizador h-[16px] flex-1 text-dorado-hondo"
          data-pausado={!sonando}
          aria-hidden="true"
        >
          {barras.map((alto, i) => (
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
      </div>
    </div>
  );
}

/* Tarjeta de vidrio: invitado confirmado. */
function TarjetaInvitado() {
  return (
    <div className="vidrio w-full rounded-2xl p-4 sm:w-auto lg:absolute lg:bottom-28 lg:left-2 lg:z-30 lg:w-[248px]">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#f2e2b4] to-[#dfc9a4] font-serif text-[13px] italic text-[#6d5417]">
          LM
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium leading-snug text-tinta">
            Lucía confirmó asistencia
          </p>
          <p className="text-[9.5px] tracking-wide text-tinta-suave">
            hace 2 minutos · con 1 acompañante
          </p>
        </div>
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-dorado/15 text-dorado-hondo">
          <BadgeCheck className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

/* Tarjeta de vidrio: progreso RSVP. */
function TarjetaRsvp() {
  return (
    <div className="vidrio w-full rounded-2xl p-4 sm:w-auto lg:absolute lg:bottom-2 lg:right-0 lg:z-30 lg:w-[236px]">
      <div className="flex items-baseline justify-between">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-tinta-media">
          RSVP · Bodas 2027
        </p>
        <p className="font-serif text-[15px] text-dorado-hondo">18/24</p>
      </div>
      <div
        className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-dorado/15"
        role="img"
        aria-label="Barra de progreso: 18 confirmaciones de 24 invitados, 75 por ciento"
      >
        <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-[#c39b2a] to-[#e9d18a]" />
      </div>
      <p className="mt-2 text-[9.5px] tracking-wide text-tinta-suave">
        75% confirmado a 9 meses del evento
      </p>
    </div>
  );
}

export default function Hero() {
  const ahora = useAhora(1000);
  const restante =
    ahora === null ? null : calcularCuentaRegresiva(ahora, DESTINO_BODA_MS);

  return (
    <section
      className="relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-16 lg:pt-32"
      aria-labelledby="titulo-hero"
    >
      {/* resplandores de fondo */}
      <div
        className="resplandor-dorado pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px]"
        aria-hidden="true"
      />
      <div
        className="resplandor-dorado pointer-events-none absolute bottom-[-30%] left-[-12%] h-[480px] w-[480px] opacity-70"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-6">
          {/* Columna de texto */}
          <div className="relative z-10 text-center lg:text-left">
            <Revelar>
              <p className="inline-flex items-center gap-2 rounded-full border border-dorado/30 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-dorado-hondo">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Lumen Gala Studio · Invitaciones web
              </p>
            </Revelar>

            <Revelar retraso={120}>
              <h1
                id="titulo-hero"
                className="mt-6 font-serif text-[2.75rem] font-light leading-[1.04] text-tinta sm:text-6xl lg:text-[4.3rem]"
              >
                El preludio perfecto de tu{" "}
                <span className="relative inline-block italic text-dorado-hondo">
                  gran día
                  <svg
                    viewBox="0 0 120 12"
                    className="absolute -bottom-1.5 left-0 w-full text-dorado"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8 C 32 2, 62 12, 117 4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>{" "}
                comienza aquí
              </h1>
            </Revelar>

            <Revelar retraso={240}>
              <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-tinta-media sm:text-base lg:mx-0">
                Invitaciones web que abren con música, brillan con recuerdos y
                confirman cada asistencia en tiempo real. Diseñadas a medida
                para bodas y XV años, en un solo enlace.
              </p>
            </Revelar>

            <Revelar retraso={360}>
              <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brillo inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#e6c96f] to-[#c39b2a] px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[#241d10] shadow-[0_20px_44px_-16px_rgba(212,175,55,0.8)] transition-transform hover:scale-[1.03] sm:w-auto"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Encargar mi proyecto
                </a>
                <a
                  href="#colecciones"
                  className="inline-flex w-full items-center justify-center rounded-full border border-tinta/15 bg-white/50 px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.2em] text-tinta backdrop-blur transition-colors hover:border-dorado hover:text-dorado-hondo sm:w-auto"
                >
                  Descubrir colecciones
                </a>
              </div>
            </Revelar>
          </div>

          {/* Escenario: teléfonos + tarjetas de vidrio */}
          <Revelar retraso={200} className="relative">
            <div className="pointer-events-none absolute inset-0 -m-10 hidden rounded-full lg:block">
              <div
                className="resplandor-dorado absolute inset-0"
                aria-hidden="true"
              />
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:h-[545px] lg:max-w-none">
              {/* teléfonos */}
              <div className="relative flex items-start justify-center gap-5 sm:gap-10 lg:block lg:h-full">
                <TelefonoXV />
                <TelefonoBoda restante={restante} />
              </div>

              {/* tarjetas de vidrio flotantes */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:block">
                <TarjetaMusica />
                <TarjetaInvitado />
                <div className="sm:col-span-2 lg:col-span-1">
                  <TarjetaRsvp />
                </div>
              </div>
            </div>
          </Revelar>
        </div>

        {/* Métricas visibles en la primera pantalla */}
        <Revelar retraso={120}>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t filete pt-8 md:grid-cols-4 lg:mt-14">
            {METRICAS.map((metrica) => (
              <div key={metrica.valor} className="text-center md:text-left">
                <dt className="sr-only">{metrica.etiqueta}</dt>
                <dd>
                  <span className="block font-serif text-4xl font-light text-dorado-hondo">
                    {metrica.valor}
                  </span>
                  <span className="mt-2 block text-[11px] uppercase leading-relaxed tracking-[0.16em] text-tinta-media">
                    {metrica.etiqueta}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Revelar>
      </div>
    </section>
  );
}
