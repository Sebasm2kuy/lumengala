# Iteración 045d — «Revista XV»: volteo físico de hoja (page flip de libro)

**Fecha:** 2026-11-21 · **Arquitectura:** Nº 2, cuarta edición (045a → 045d)
**URL de prueba:** https://sebasm2kuy.github.io/lumengala/lookbook-xv.html

## Objetivo

Reemplazar la transición de 045c (giro leve + levantamiento, que se leía
como un desplazamiento elegante) por un **volteo auténtico de hoja de
revista en 3D**, según especificación: contenedor con `perspective:
1800px` + `preserve-3d`, giro desde el lomo izquierdo con la hoja
saliente por encima revelando la siguiente debajo, dorso limpio de papel
(sin contenido en espejo), sombras dinámicas de pliegue y gesto táctil
fluidos en las 6 páginas.

## Modelo libro

- **Contenedor:** `html.js .track{position:absolute;inset:0;
  perspective:1800px;transform-style:preserve-3d}` — el track es del
  tamaño del viewport, así el punto de fuga queda en el centro real de
  la pantalla (lección de 045c: la perspectiva en un contenedor
  deslizante de 600vw quedaba fuera de pantalla).
- **Hojas apiladas:** las 6 `.page` pasan de flex a `position:absolute;
  inset:0` con `visibility:hidden` por defecto; visibles solo
  `.active` (reposo), `.flipping` (la hoja que gira, z-index 6) y
  `.under` (la revelada debajo, z-index 2). El orden por profundidad
  (`preserve-3d`) + `translateZ(1px)` garantiza la hoja encima.
- **Lámina de dos caras:** JS re-envuelve el contenido de cada página en
  `.leaf-front` (con `backface-visibility:hidden`) y agrega
  `.leaf-back` (`rotateY(180deg)`, papel `--paper`, marco hairline,
  «XV» fantasma en Playfair rosa y folio). El frente nunca se ve en
  espejo; el dorso existe como cara real de la lámina.
- **Giro:** `transform-origin:left center`; avanzar = `rotateY` 0→-94°
  (keyframes `flip-out`, la hoja se apaga al pasar el pliegue);
  retroceder = -94°→0 (`flip-in`, la hoja se despliega del lomo
  cubriendo la vista). **Física documentada:** con el lomo en el borde
  izquierdo, la porción visible de un giro real de 180° es 0→~90° —
  pasado el pliegue la hoja queda proyectada fuera del viewport; por
  eso el rango útil termina en 94° con fade, sin tiempo muerto. La
  especificación pedía -180°: se implementa el equivalente visible
  completo del mismo giro físico.
- **Sombras de pliegue:** la hoja se oscurece al girar (`.shade-f`,
  canto del lomo, hasta .52) y proyecta viñeta sobre la página revelada
  **junto a su canto libre** (`.shade-b` desde la derecha) — el VLM
  detectó que una sombra en el lomo caía oscuro-sobre-oscuro y era
  invisible; la sombra físicamente correcta acompaña al pliegue móvil.
- **Arrastre:** la hoja obedece al dedo (ángulo proporcional a dx, con
  opacidad y sombras proporcionales); al soltar, transición .56s
  completa el giro (pasado el medio del ancho, o flick por velocidad)
  o lo devuelve al reposo. Tap-vs-arrastre desambiguado sobre
  enlaces/botones; goma en extremos; pinch aborta; mouse por
  PointerEvents con captura. `prefers-reduced-motion`: paso
  instantáneo, sin giros.

## Coreografía de visibilidad (el detalle fino)

En «avanzar», la página revelada gana `.active` al commit (sus
revelados escalonan mientras la hoja la cubre). En «retroceder», la
activa **no** cambia hasta que la hoja la cubre por completo (cleanup a
880ms), para que nunca se vea el fondo vacío. Limpieza centralizada en
`clearTurnClasses()`/`dragTeardown()` con timers acotados; los giros
rápidos encadenados reinician la animación con reflow (`void
track.offsetWidth`).

## Verificación

- Gates: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 (basePath).
- E2E agent-browser con TouchEvents sintéticos: volteo por botón con
  `matrix3d` en pleno vuelo y limpieza; encadenado táctil 01→06,
  06→01→02; hoja siguiendo al dedo (rotateY ≈ -25° con el dedo al 27%);
  flick y sobre-gestos en ambos extremos sin errores; teclado
  (←/→/Inicio/Fin), bordes y paginador; drag sobre el botón de mapa
  voltea sin abrir el enlace; una sola hoja visible en reposo; fits
  intactos en 375×667 y 1440×900; consola sin errores nuevos.
- Revisión visual VLM del frame a mitad de volteo (con sombras): **GOOD,
  flip_visible true** — giro legible, revelado correcto, sombra en el
  canto móvil, sin texto en espejo. Dos rondas previas de la misma
  revisión ajustaron: sombra al lado del pliegue (no del lomo) e
  intensidades.
- Contenido intacto: mismas 6 páginas, mismas 8 fotos, RSVP/countdown
  sin cambios; colofón `Prototipo lumengala 045d`.
