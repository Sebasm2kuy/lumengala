# Iteración 046a — Arquitectura 3: «Escena XV · Explorable»

**Fecha:** 2026-11-21 · **Arquitectura:** Nº 3, primera edición (046a)
**URL de prueba:** https://sebasm2kuy.github.io/lumengala/escena-xv.html

## Objetivo

Tercera arquitectura insignia: el invitado no lee una página pasiva sino
que **explora una escena con profundidad 3D real** (parallax reactivo al
deslizamiento táctil, al giroscopio y al cursor) y **descubre los datos
de la fiesta tocando objetos integrados en el entorno**. Requisitos del
pedido: 4-5 puntos de interés con pulso y etiqueta elegante, indicador
de progreso, índice rápido accesible, estética Lumen Gala sin textos de
ejemplo ni fotos genéricas de XV, e integración a la galería con
miniatura propia.

## Decisiones de diseño

- **Concepto:** «la noche de Lucía vista desde el jardín» — el arco con
  la guirnalda, la mesa de honor con el candelabro, el atril de firmas:
  los datos viven en objetos de la propia escena (el farol es el lugar,
  el perchero el código, el sobre la fecha, la carta la nota de Lucía,
  el atril la confirmación).
- **Dibujada, no fotografiada:** las capas son SVG/CSS (siluetas +
  gradientes + partículas generadas). Coherente con «sin fotos de
  vestido de 15» y hace la miniatura de la galería reproducible con el
  mismo lenguaje.
- **Motor:** perspectiva 1200px en el contenedor, escenario que rota
  (rotateY/rotateX) y capas a translateZ fijo con compensación de
  escala + desplazamiento proporcional a la profundidad. Cuatro
  entradas de parallax suman sobre un objetivo común (clamp [-1,1])
  que un rAF interpola — mouse hover, arrastre táctil (la vista queda
  donde se deja, como girar la cabeza), giroscopio opcional con
  permiso iOS y flechas de teclado (accesibilidad).
- **Descubrimiento:** los focos son botones reales (teclado/lector),
  el contador es aria-live, el índice rápido abre cualquier dato sin
  depender del gesto. Los paneles son tarjetas de papel editorial; el
  RSVP es local (localStorage) con salida por WhatsApp, como el
  lookbook.
- **Hallazgo técnico del día:** un `replace()` de Python aplicó reglas
  CSS en el lugar equivocado y perdieron contra la regla base por
  orden de aparición (misma especificidad). Diagnosticado con estilos
  computados (el transform medía -50% en vez de -62%) y resuelto con
  un prefijo de especificidad (`button.foco--rsvp`), que hace la regla
  independiente del orden. Lección: después de inyectar CSS por
  script, verificar el estilo computado, no solo la presencia de la
  regla.

## Verificación

- Gates: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 · HTML
  balanceado.
- E2E (agent-browser): descubrimiento 0→5 por focos e índice, ESC y
  fondo, parallax por mouse/touch/teclado con transforms reales,
  giroscopio tras permiso, RSVP completo con prefill, consola limpia.
- VLM en 4 rondas: ronda final **GOOD sin issues** — móvil sin
  recortes ni racimos de texto, escritorio con siluetas definidas y
  capas legibles, miniatura de galería que transmite la atmósfera.
