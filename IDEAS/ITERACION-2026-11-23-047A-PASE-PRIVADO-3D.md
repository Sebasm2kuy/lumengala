# Iteración 047a — Arquitectura 3 (v2): «Pase Privado 3D»

**Fecha:** 2026-11-23 · **Arquitectura:** Nº 3, segunda edición (047a)
**URL de prueba:** https://sebasm2kuy.github.io/lumengala/pase-3d.html
**Reemplaza a:** Escena XV · Explorable (046a, descartada por decisión de dirección)

## Objetivo

Convertir la invitación en un **objeto de colección en la palma de la
mano**: una tarjeta vertical de alta etiqueta con física 3D, reflejo de
luz dinámico y doble cara giratoria — eliminando el formato tradicional
de página web con scroll. Requisitos del pedido: inclinación 3D
(perspective + rotateX/rotateY) con brillo especular al deslizar o mover
el teléfono; frente con monograma, fecha, cuenta regresiva numérica
(sin relojes analógicos) y gesto de giro; dorso con ubicación (mapa +
calendario), dress code, nota especial y RSVP integrado; miniatura fiel
en la galería junto a Edición Crónica y Revista XV · Lookbook.

## Decisiones de diseño

- **El objeto, no la página:** la tarjeta vive en una vitrina oscura con
  halo cálido y bokeh tenue; la página no scrollea. La tarjeta se diseña
  a 320×506 fijos y JS la escala al viewport (min(1.06, ancho*0.84/320,
  alto*0.62/506)) — el contenido nunca se reacomoda, solo cambia de
  tamaño: es un objeto.
- **Papel, no pantalla:** marfil con grano SVG, filletes dorados dobles
  (::before/::after), ranura del cordón con sombra interior, tipografía
  grabada (text-shadow blanco arriba/oscuro abajo, letterpress). El
  brillo especular vive en el plano de la tarjeta a translateZ(1px): la
  luz no gira con la cara.
- **Una sola fuente de luz:** la inclinación (rotateX/rotateY
  interpolados en rAF) alimenta simultáneamente la posición e intensidad
  del especular y la sombra de piso — coherencia física, no tres
  animaciones sueltas. Flotación en reposo de amplitud baja tras 3 s sin
  input; REDUCED apaga todo movimiento.
- **Doble cara:** inclinación y giro en wrappers separados
  (.inclinada/.volteada) para componer sin conflictos de transform. El
  giro se dispara por tap corto sobre la tarjeta (movimiento < 9px y
  < 350 ms, ignorando controles) o por los botones VER DORSO / VOLVER AL
  FRENTE; la guía inferior cambia de lado con el giro.
- **Dorso con presupuesto exacto:** la cara mide 506px fijos; el contenido
  se midió por bloques (lugar 89, código 76, nota 54, confirmación 135)
  y se ajustó a 395/395 — textos a una línea, formulario en dos filas
  (radios propias + acompañantes/confirmar), confirmación que reemplaza
  al formulario tras enviar.

## Hallazgos técnicos del día

1. **Tap que no giraba:** con setPointerCapture, el pointerup se
   retargetea al elemento que captura (el escenario) y e.target deja de
   ser la tarjeta — el tap corto se detecta con el objetivo guardado en
   pointerdown.
2. **Doble traslación en Tailwind v4:** las clases -translate-x/y-1/2
   usan la propiedad CSS `translate`; combinadas con un transform inline
   que ya incluye translate(-50%,-50%) SUMAN y la miniatura se corrió
   fuera del marco. Regla: cuando el transform va inline, el centrado va
   inline.
3. **Rects escalados:** getBoundingClientRect incluye las escalas de los
   ancestros (--escala 0.817) — para comparar contra un presupuesto en
   px de diseño, dividir por la escala.

## Verificación

- Gates: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 · HTML
  balanceado.
- E2E (agent-browser): tilt real por mouse/touch/teclado con sheen
  siguiendo la luz, giro 0↔180 por tap y por botón con guía sincronizada,
  cuenta regresiva viva (110 días + texto SR), RSVP con confirmación,
  WhatsApp y prefill, sin scroll de página, fits 375/667 y 1440/900,
  consola limpia.
- Visual: 6 rondas VLM + verificación directa de la miniatura — resultado
  final: pase GOOD (móvil y escritorio, frente y dorso) y miniatura de
  galería legible, elegante y sin colisiones con el cromo.
