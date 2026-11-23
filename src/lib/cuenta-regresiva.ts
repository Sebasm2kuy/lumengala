/* Cuenta regresiva compartida por el hero (teléfono de boda) y la tarjeta
   de reloj. Función pura => testeable con node:test. */

export interface Restante {
  cumplido: boolean;
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

/* Devuelve cuánto falta de `ahoraMs` a `destinoMs`, con todas las partes
   acotadas a cero si la fecha ya pasó (jamás negativos). */
export function calcularCuentaRegresiva(
  ahoraMs: number,
  destinoMs: number,
): Restante {
  const totalSegundos = Math.max(0, Math.floor((destinoMs - ahoraMs) / 1000));
  const dias = Math.floor(totalSegundos / 86400);
  const horas = Math.floor((totalSegundos % 86400) / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;
  return {
    cumplido: destinoMs - ahoraMs <= 0,
    dias,
    horas,
    minutos,
    segundos,
  };
}

/* Fechas de las invitaciones de demostración publicadas en producción
   (lumengala.site/i/ejemplo-boda y /i/ejemplo-quince). Uruguay = UTC-3 todo
   el año (sin horario de verano). */
export const DESTINO_BODA_MS = Date.parse("2027-08-08T20:30:00-03:00");
export const DESTINO_QUINCE_MS = Date.parse("2027-11-15T21:00:00-03:00");

/* Etiqueta corta de cada parte, con relleno de ceros para el teléfono. */
export function dosDigitos(n: number): string {
  return String(n).padStart(2, "0");
}
