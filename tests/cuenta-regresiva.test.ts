import assert from "node:assert/strict";
import { test } from "node:test";
import {
  calcularCuentaRegresiva,
  dosDigitos,
  DESTINO_BODA_MS,
  DESTINO_QUINCE_MS,
} from "../src/lib/cuenta-regresiva";

const SEG = 1000;
const MIN = 60 * SEG;
const HORA = 60 * MIN;
const DIA = 24 * HORA;

test("cuenta regresiva: descompone exactamente días, horas, minutos y segundos", () => {
  const destino = Date.parse("2027-08-08T20:30:00Z");
  const ahora = destino - (1 * DIA + 2 * HORA + 3 * MIN + 4 * SEG);
  const r = calcularCuentaRegresiva(ahora, destino);
  assert.equal(r.cumplido, false);
  assert.equal(r.dias, 1);
  assert.equal(r.horas, 2);
  assert.equal(r.minutos, 3);
  assert.equal(r.segundos, 4);
});

test("cuenta regresiva: descarta los milisegundos sobrantes (piso, no redondeo)", () => {
  const destino = Date.parse("2027-08-08T20:30:00Z");
  const ahora = destino - 5 * SEG - 900;
  const r = calcularCuentaRegresiva(ahora, destino);
  assert.equal(r.segundos, 5);
});

test("cuenta regresiva: fecha pasada devuelve ceros y cumplido=true (jamás negativos)", () => {
  const destino = Date.parse("2026-01-01T00:00:00Z");
  const r = calcularCuentaRegresiva(destino + 10 * DIA, destino);
  assert.equal(r.cumplido, true);
  assert.equal(r.dias, 0);
  assert.equal(r.horas, 0);
  assert.equal(r.minutos, 0);
  assert.equal(r.segundos, 0);
});

test("cuenta regresiva: el instante exacto cuenta como cumplido", () => {
  const destino = Date.parse("2027-08-08T20:30:00Z");
  const r = calcularCuentaRegresiva(destino, destino);
  assert.equal(r.cumplido, true);
  assert.equal(r.segundos, 0);
});

test("cuenta regresiva: cruza correctamente los límites de horas/minutos", () => {
  const destino = Date.parse("2027-08-08T20:30:00Z");
  const ahora = destino - (90 * MIN + 61 * SEG);
  const r = calcularCuentaRegresiva(ahora, destino);
  /* 90 min + 61 s = 1 h, 31 min y 1 s exactos. */
  assert.equal(r.dias, 0);
  assert.equal(r.horas, 1);
  assert.equal(r.minutos, 31);
  assert.equal(r.segundos, 1);
});

test("destinos de demostración: fechas futuras de las invitaciones publicadas", () => {
  assert.ok(DESTINO_BODA_MS > Date.now(), "la boda demo debe ser futura");
  assert.ok(DESTINO_QUINCE_MS > Date.now(), "el XV demo debe ser futuro");
  assert.equal(DESTINO_BODA_MS, Date.parse("2027-08-08T20:30:00-03:00"));
  assert.equal(DESTINO_QUINCE_MS, Date.parse("2027-11-15T21:00:00-03:00"));
});

test("dosDigitos rellena con cero", () => {
  assert.equal(dosDigitos(7), "07");
  assert.equal(dosDigitos(42), "42");
});
