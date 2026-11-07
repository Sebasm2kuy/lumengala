# Worklog — lumengala (repositorio de prueba)

Registro de trabajo del repo aislado de diseño. La producción real
(lumengala.site) vive en `Miluaistudio` y tiene su propio worklog.

## 2026-11-03 · Iteración 044 — Nueva dirección luminosa (portada + landing)

- Repo creado desde cero (estaba vacío) con stack espejo de producción:
  Next.js 16 + React 19 + Tailwind 4 + TS 5.8, export estático.
- Landing completa con la dirección de arte luminosa: marfil `#FAF9F5`,
  dorado champagne `#D4AF37`, vidrio esmerilado, Cormorant Garamond +
  Montserrat, botón flotante "Encargar".
- Secciones: hero (smartphones con countdown real a la fecha de la demo
  publicada 08.08.2027 20:30, tarjetas de vidrio, métricas), experiencia
  sensorial (4 tarjetas interactivas), galería museo (6 obras + filtros +
  hover "Ver invitación en vivo" hacia las demos de producción), por qué
  digital (arco editorial + pilares + tabla) y cierre (seda champagne
  generada + CTAs reales).
- Calidad: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0.
- E2E agent-browser en escritorio y móvil: countdown en vivo, paleta,
  tipografía, reloj, RSVP completo, filtros, hover overlay, botón flotante,
  cero errores de consola/hidratación, sin overflow horizontal.
- Ciclo git: base en `main` → rama `feat/044-landing-nueva-direccion-luminosa`
  → PR #1 (escaneo anti-fugas: 34 archivos, 0 secretos) → merge `15e90258`
  → workflow "Validar y publicar prueba" verde (validar ✓, publicar-prueba ✓)
  → Pages del repo activo con `build_type: workflow`.
- Publicado y verificado: https://sebasm2kuy.github.io/lumengala/
  (200, basePath `/lumengala`, fuentes/imágenes OK, countdown tictaqueando,
  noindex).
- Aislamiento confirmado: lumengala.site intacta (200, sin rastro de la
  propuesta, demos y /estudio/ operando).
- Detalle completo en `IDEAS/ITERACION-2026-11-03-044-DIRECCION-LUMINOSA.md`.

## 2026-11-03 · Iteración 044b — Corrección de imágenes con basePath

- Hallazgo en la prueba publicada: las 7 imágenes (6 obras del museo, arco
  editorial, 3 miniaturas y seda champagne) daban 404. Causa raíz: next/image
  con `unoptimized: true` NO antepone basePath al src emitido (el prefijo lo
  aplican los loaders de optimización, desactivados acá), así que
  src="/img/x.jpg" resolvía a la raíz del dominio en vez de /lumengala/img/.
- Fix: helper `rutaPublica()` en src/lib/base-ruta.ts (usa
  NEXT_PUBLIC_BASE_PATH; en producción sin la variable queda igual) aplicado
  en colecciones, comparativa, experiencia y cierre.
- Verificación con el export servido bajo /lumengala/ (como Pages real):
  11/11 imágenes cargadas (naturalWidth > 0), consola sin errores, countdown
  en vivo tictaqueando (278 d), botón flotante fixed, sin overflow a 390×844,
  filtros del museo y hover intactos. Capturas revisadas (héroe, museo, arco).
- Calidad: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 con basePath.
  Ciclo git: rama fix/044b-imagenes-basepath (36e19bf) -> PR #2 -> merge ->
  deploy Pages del repo de prueba, publicación verificada en vivo.

## 2026-11-07 · Iteración 044c — Responsive móvil: corte inferior y ajustes finos

- Reporte en revisión móvil: el final de la página se veía cortado — el pie
  tenía py-9 (36 px de aire inferior) y el botón flotante "Encargar" (fijo,
  47 px de alto) tapaba el email y el aviso al llegar al final del scroll.
- Fix pie: `py-9` -> `pb-32 pt-9` en móvil (128 px) y `md:pb-24` en fila de
  escritorio; el contenido del pie queda siempre por encima de la franja del
  botón flotante.
- Fix botón flotante: `bottom-5/sm:bottom-7` ->
  `calc(... + env(safe-area-inset-bottom, 0px))` para no quedar pegado a la
  barra home de iOS.
- Endurecido overflow horizontal: `overflow-x: clip` en html y body (hidden
  queda como fallback; clip no crea contenedor de scroll y anula el rebote
  lateral decorativo en iOS).
- E2E móvil (emulación iPhone 14, 390×844) sobre el export servido bajo
  /lumengala/: scrollWidth 390 = clientWidth (sin overflow), grids de
  experiencia/colecciones/pilares a 1 columna con márgenes de 20 px, botón
  NO intersecta logo ni contacto del pie (61 px de aire), pie con 128 px
  bajo el último contenido; tabla comparativa scrollea adentro de su
  contenedor (560 px) sin expandir la página. Recheck a 360×740: sin
  overflow. Capturas revisadas: héroe, experiencia, museo, final.
- Calidad: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 con basePath.
  Ciclo git: rama fix/044c-responsive-movil -> PR -> escaneo anti-fugas ->
  merge -> verificación del deploy del repo de prueba.
