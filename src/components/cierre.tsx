import Image from "next/image";
import { Sparkles, Video } from "lucide-react";
import Revelar from "@/components/revelar";
import { rutaPublica } from "@/lib/base-ruta";

/* Canales reales de contacto de Lumen Gala Studio (mismos que producción). */
const WHATSAPP =
  "https://wa.me/59895239386?text=" +
  encodeURIComponent(
    "Hola Lumen Gala 💛 Quiero encargar mi invitación digital.",
  );
const MAIL_VIDEOLLAMADA =
  "mailto:lumengala.studio@gmail.com" +
  "?subject=" +
  encodeURIComponent("Quiero agendar una videollamada · Lumen Gala");

export default function Cierre() {
  return (
    <section
      id="cierre"
      className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32"
      aria-labelledby="titulo-cierre"
    >
      {/* fondo de seda champagne */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={rutaPublica("/img/seda-champagne.jpg")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-marfil/70 via-white/25 to-marfil/70" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Revelar>
          <div className="vidrio vidrio-borde-oro mx-auto max-w-2xl rounded-[2.25rem] px-7 py-12 text-center sm:px-12 sm:py-14">
            <div
              className="flex items-center justify-center gap-2 text-dorado-hondo"
              aria-hidden="true"
            >
              <span className="destello text-[11px]">✦</span>
              <span className="destello destello-tardio text-[15px]">✦</span>
              <span className="destello text-[11px]">✦</span>
            </div>

            <h2
              id="titulo-cierre"
              className="mt-5 font-serif text-4xl font-light leading-[1.12] text-tinta sm:text-[3.1rem]"
            >
              Que tu historia comience{" "}
              <span className="italic text-dorado-hondo">con un destello</span>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-tinta-media">
              Contanos la fecha, los nombres y los colores. En 72 horas tenés
              el primer borrador brillando en tu pantalla.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="brillo inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#e6c96f] to-[#c39b2a] px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[#241d10] shadow-[0_22px_46px_-16px_rgba(212,175,55,0.85)] transition-transform hover:scale-[1.03] sm:w-auto"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Encargar mi proyecto
              </a>
              <a
                href={MAIL_VIDEOLLAMADA}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-tinta/15 bg-white/60 px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.2em] text-tinta backdrop-blur transition-colors hover:border-dorado hover:text-dorado-hondo sm:w-auto"
              >
                <Video className="h-4 w-4" aria-hidden="true" />
                Agendar videollamada
              </a>
            </div>

            <p className="mt-7 text-[11px] uppercase tracking-[0.22em] text-tinta-suave">
              Respuesta en menos de 24 h · Montevideo, Uruguay
            </p>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
