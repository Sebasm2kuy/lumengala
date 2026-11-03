"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

interface PropsRevelar {
  children: ReactNode;
  className?: string;
  retraso?: number;
}

/* Envoltorio que revela su contenido con una aparición suave cuando entra
   en el viewport. La visibilidad se aplica directamente sobre el DOM (el
   observador es un sistema externo) y el CSS solo oculta los elementos
   cuando el documento tiene la clase .js, así que sin JavaScript todo el
   contenido queda visible. Respeta prefers-reduced-motion. */
export default function Revelar({
  children,
  className = "",
  retraso = 0,
}: PropsRevelar) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const mostrar = () => {
      nodo.classList.add("visible");
    };

    if (typeof IntersectionObserver === "undefined") {
      mostrar();
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            mostrar();
            observador.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  const estilo = retraso
    ? ({ "--retraso": `${retraso}ms` } as CSSProperties)
    : undefined;

  return (
    <div ref={ref} style={estilo} className={`revelar ${className}`}>
      {children}
    </div>
  );
}
