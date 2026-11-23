"use client";

import { useSyncExternalStore } from "react";

/* Reloj compartido como "sistema externo": un único setInterval por
   intervalo distinto alimenta a todos los componentes que lo leen vía
   useSyncExternalStore. Mientras nadie está suscripto (o en el servidor)
   devuelve null, así servidor y cliente renderizan lo mismo y no hay
   errores de hidratación. */

interface RelojExterno {
  suscribir: (avisar: () => void) => () => void;
  leer: () => number | null;
}

const relojes = new Map<number, RelojExterno>();

function obtenerReloj(intervaloMs: number): RelojExterno {
  const existente = relojes.get(intervaloMs);
  if (existente) return existente;

  let valor: number | null = null;
  let temporizador: ReturnType<typeof setInterval> | null = null;
  const oyentes = new Set<() => void>();

  const reloj: RelojExterno = {
    suscribir(avisar) {
      oyentes.add(avisar);
      if (oyentes.size === 1) {
        valor = Date.now();
        temporizador = setInterval(() => {
          valor = Date.now();
          for (const oyente of oyentes) oyente();
        }, intervaloMs);
      }
      return () => {
        oyentes.delete(avisar);
        if (oyentes.size === 0 && temporizador !== null) {
          clearInterval(temporizador);
          temporizador = null;
          valor = null;
        }
      };
    },
    leer() {
      return valor;
    },
  };

  relojes.set(intervaloMs, reloj);
  return reloj;
}

export function useAhora(intervaloMs = 1000): number | null {
  const reloj = obtenerReloj(intervaloMs);
  return useSyncExternalStore(reloj.suscribir, reloj.leer, () => null);
}
