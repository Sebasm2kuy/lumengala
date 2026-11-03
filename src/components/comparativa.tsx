import Image from "next/image";
import { Check, Leaf, Minus, Music2, Smartphone } from "lucide-react";
import Revelar from "@/components/revelar";

const PILARES = [
  {
    icono: Leaf,
    titulo: "Ecológica",
    texto: "Cero papel, cero impresiones, cero envíos. Solo luz.",
  },
  {
    icono: Music2,
    titulo: "Interactiva",
    texto: "Música, fotos, cuenta regresiva y RSVP en la misma página.",
  },
  {
    icono: Smartphone,
    titulo: "Siempre contigo",
    texto: "Se actualiza al instante y vive en el bolsillo de cada invitado.",
  },
] as const;

const COMPARATIVA = [
  { dato: "Música de la fiesta", papel: "", lumen: "Playlist propia sonando al abrir" },
  { dato: "Galería de recuerdos", papel: "", lumen: "Fotos ilimitadas, siempre a mano" },
  { dato: "Cuenta regresiva", papel: "", lumen: "En tiempo real, segundo a segundo" },
  { dato: "Confirmación de asistencia", papel: "Respuestas a mano", lumen: "RSVP con acompañantes, al instante" },
  { dato: "Cambios de última hora", papel: "Reimprimir todo", lumen: "Actualización inmediata para todos" },
  { dato: "Alcance", papel: "Una copia por mano", lumen: "Un enlace, infinitos bolsillos" },
] as const;

export default function Comparativa() {
  return (
    <section
      id="por-que-digital"
      className="scroll-mt-24 py-20 lg:py-28"
      aria-labelledby="titulo-comparativa"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* Retrato en arco editorial */}
          <Revelar className="mx-auto w-full max-w-[420px]">
            <div className="anillo-arco">
              <div className="arco relative aspect-[3/4] overflow-hidden border border-dorado/35 shadow-[0_40px_80px_-40px_rgba(43,38,32,0.45)]">
                <Image
                  src="/img/camila.jpg"
                  alt="Ramo rosado en arco editorial de la colección Camila"
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#2b2620]/20 to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-tinta-suave">
              Colección Camila · XV años
            </p>
          </Revelar>

          {/* Texto + pilares + tabla */}
          <div>
            <Revelar>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.34em] text-dorado-hondo">
                Por qué digital
              </p>
              <h2
                id="titulo-comparativa"
                className="mt-3 font-serif text-4xl font-light leading-[1.12] text-tinta sm:text-[2.9rem]"
              >
                El papel se guarda en un cajón.{" "}
                <span className="italic text-dorado-hondo">
                  Lumen vive en el bolsillo.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-tinta-media">
                Una invitación de Lumen Gala no se lee una vez y se pierde:
                se abre, suena, se comparte y se sigue actualizando mucho
                después del gran día.
              </p>
            </Revelar>

            <Revelar retraso={140}>
              <ul className="mt-9 grid gap-6 sm:grid-cols-3">
                {PILARES.map((pilar) => (
                  <li key={pilar.titulo} className="text-center sm:text-left">
                    <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-dorado/40 bg-white/70 text-dorado-hondo sm:mx-0">
                      <pilar.icono className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-3 font-serif text-xl text-tinta">
                      {pilar.titulo}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-tinta-media">
                      {pilar.texto}
                    </p>
                  </li>
                ))}
              </ul>
            </Revelar>
          </div>
        </div>

        {/* Tabla comparativa */}
        <Revelar retraso={100}>
          <div className="mt-14 overflow-hidden rounded-3xl border filete bg-white/70 shadow-[0_30px_60px_-40px_rgba(43,38,32,0.35)] lg:mt-20">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Comparación entre una invitación de papel tradicional y una
                invitación de Lumen Gala
              </caption>
              <thead>
                <tr className="bg-marfil-hondo">
                  <th
                    scope="col"
                    className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-tinta-media sm:px-7"
                  >
                    Detalle
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-tinta-media sm:px-7"
                  >
                    Papel tradicional
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-dorado-hondo sm:px-7"
                  >
                    Lumen Gala
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVA.map((fila) => (
                  <tr key={fila.dato} className="border-t filete">
                    <th
                      scope="row"
                      className="px-5 py-4 text-[13px] font-medium text-tinta sm:px-7"
                    >
                      {fila.dato}
                    </th>
                    <td className="px-5 py-4 text-[13px] text-tinta-suave sm:px-7">
                      <span className="flex items-center gap-2">
                        <Minus
                          className="h-3.5 w-3.5 shrink-0 text-tinta-suave/70"
                          aria-hidden="true"
                        />
                        {fila.papel}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-tinta sm:px-7">
                      <span className="flex items-center gap-2">
                        <Check
                          className="h-4 w-4 shrink-0 text-dorado-hondo"
                          aria-hidden="true"
                        />
                        {fila.lumen}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
