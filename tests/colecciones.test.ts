import assert from "node:assert/strict";
import { test } from "node:test";
import {
  COLECCIONES,
  ETIQUETAS_FILTRO,
  filtrarColecciones,
} from "../src/lib/colecciones";

test("catálogo: hay exactamente 6 colecciones con nombres esperados", () => {
  assert.equal(COLECCIONES.length, 6);
  const nombres = COLECCIONES.map((c) => c.nombre);
  for (const esperado of [
    "Aurora",
    "Camila",
    "Versalles",
    "Rosé Couture",
    "Mar de Seda",
    "Jardín Secreto",
  ]) {
    assert.ok(nombres.includes(esperado), `falta ${esperado}`);
  }
});

test("catálogo: mitad de bodas y mitad de XV años", () => {
  assert.equal(filtrarColecciones(COLECCIONES, "boda").length, 3);
  assert.equal(filtrarColecciones(COLECCIONES, "quince").length, 3);
});

test("filtros: todas devuelve el catálogo completo en el mismo orden", () => {
  const todas = filtrarColecciones(COLECCIONES, "todas");
  assert.equal(todas.length, 6);
  assert.deepEqual(
    todas.map((c) => c.id),
    COLECCIONES.map((c) => c.id),
  );
});

test("filtros: cada subconjunto conserva solo el tipo pedido", () => {
  for (const c of filtrarColecciones(COLECCIONES, "boda")) {
    assert.equal(c.tipo, "boda");
  }
  for (const c of filtrarColecciones(COLECCIONES, "quince")) {
    assert.equal(c.tipo, "quince");
  }
});

test("cada obra enlaza a una invitación demo publicada en producción", () => {
  const urlsValidas = [
    "https://lumengala.site/i/ejemplo-boda/",
    "https://lumengala.site/i/ejemplo-quince/",
  ];
  for (const c of COLECCIONES) {
    assert.ok(urlsValidas.includes(c.urlVivo), `URL inesperada en ${c.id}`);
    if (c.tipo === "boda") {
      assert.equal(c.urlVivo, urlsValidas[0]);
    } else {
      assert.equal(c.urlVivo, urlsValidas[1]);
    }
  }
});

test("hay tres filtros con etiquetas correctas", () => {
  assert.deepEqual(
    ETIQUETAS_FILTRO.map((f) => f.etiqueta),
    ["Todas", "Bodas", "XV Años"],
  );
});
