# Iteración 045c — «Revista XV»: swipe fiable en las 6 páginas + volteo de hoja marcado

**Fecha:** 2026-11-21 · **Arquitectura:** Nº 2, tercera edición (045a → 045b → 045c)
**URL de prueba:** https://sebasm2kuy.github.io/lumengala/lookbook-xv.html

## Objetivo

Corregir dos problemas reportados en el celular: 1) el swipe solo pasaba
páginas de forma consistente en la primera hoja; 2) el paso de página era
un desplazamiento plano, sin la sensación de voltear una hoja de revista.

## Diagnóstico del swipe roto

- **PointerEvents + `touch-action:pan-y`** dejaban la decisión en manos
  del navegador: ante el mínimo jitter vertical (inevitable en un gesto
  humano), Chrome/iOS iniciaba un pan nativo y disparaba `pointercancel`,
  matando el swipe. La detección de eje exigía |dx|>12 y |dx|>|dy|·1.2
  *antes* de que el navegador se decidiera — carrera perdida.
- **Sin *flick***: un gesto rápido de 40px (típico) no llegaba al umbral
  de 56px / 18% del ancho → "a veces pasa, a veces no".
- **Bloqueos por elementos interactivos**: cualquier arrastre que naciera
  sobre un enlace/botón/label se descartaba entero.

## Soluciones

1. **Motor táctil dedicado (Touch Events, no Pointer):** `touchmove` con
   `passive:false` y `preventDefault` apenas el eje horizontal gana
   (|dx|>8 y |dx|>|dy|·1.1). El navegador nunca se apropia del gesto →
   funciona igual en las 6 páginas, sobre enlaces y con jitter. El eje
   vertical no se previene: el scroll interno nativo sigue disponible si
   una página desborda. Tap-vs-arrastre: sin eje horizontal confirmado no
   hay commit ni supresión → los clics siguen funcionando; con commit se
   suprime el clic fantasma (90ms). Campos de formulario excluidos
   (selección/scroll nativos). Mouse por PointerEvents con captura de
   puntero; goma en extremos; pinch y touchcancel abortan.
2. **Flick por velocidad:** commit si |dx| > max(18%, 56px) **o** si
   |dx|>24 con |v|>0.45 px/ms en la dirección del gesto (velocidad medida
   entre move events reales).
3. **Volteo de hoja marcado:**
   - Perspectiva **por hoja** (`perspective(1200px)` dentro del
     transform): la del track era inútil — su `perspective-origin`
     quedaba en el centro de un track de 600vw (punto de fuga a ~300vw,
     perspectiva nula). Hallazgo clave de la revisión visual: una página
     full-bleed girada sobre eje vertical **no cambia de silueta** (bordes
     laterales verticales, superior/inferior fuera del viewport) → el
     giro era invisible aunque el matrix3d fuera correcto. Solución de
     los flipbooks reales: la hoja que sale se **levanta encogiéndose**
     (scale .9) — la silueta recortada contra el fondo tinta lee como
     "página despegándose" — y la que entra se asienta desde ±34°/
     scale .95.
   - **Sombra progresiva del pliego:** dos capas por página (`turn-shade`
     oscura desde la izquierda y `turn-shade--r` desde la derecha),
     animadas (pico ~.75) en el camino de botones/teclado/rueda/bordes y
     con opacidad proporcional al dedo durante el arrastre en vivo.
   - Dos caminos de animación excluyentes: clases
     `turn-fwd`/`turn-prev` + `is-leaving`/`is-entering` (keyframes,
     limpieza a 740ms) para navegación instantánea por botones/teclado;
     estilos inline + transiciones (.68s cubic-bezier de folio) para el
     arrastre con seguimiento y su asentado final.
   - `prefers-reduced-motion` respetado en CSS (sin transiciones ni
     animaciones, revelados visibles) y en JS (`REDUCED` salta giros y
     sombras; paso instantáneo).
4. **Limpieza de estados:** `setIdx` con guarda (un swipe abortado ya no
   re-animaba los revelados por llamar `activate()` sin cambio de página);
   `clearDragStyles` a 780ms limpia transforms/origins/sombras inline.

## Bug cazado por el E2E antes de publicar

Error de signo introducido en la refactorización: `to = idx + commit`
con `commit=-1` (adelante) apuntaba a `pages[-1]` → TypeError en
`endDrag` y **bloqueo total del avance por swipe** (justo el síntoma que
se quería arreglar, ahora por otra causa). Corregido a `idx - commit`;
el repro sintético con TouchEvents lo atrapó en el primer intento.

## Hotfix posterior al deploy

Detectado y corregido tras el deploy (ver worklog): swipes fuertes en
los extremos lanzaban TypeError por índice fuera de rango; `to` ahora se
acota y el caso se trata como rebote sin volteo.

## Verificación

- Gates: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 (basePath).
- E2E (agent-browser, TouchEvents sintéticos con `Touch`/`TouchEvent`):
  encadenado 01→06 con 5 swipes y vuelta 06→01 con otros 5; flick real
  (40px en ~60ms, entre llamadas para timing genuino) 06→05; adelante
  bloqueado en 06 (goma, sin commit); drag que **nace sobre el botón de
  mapa** voltea a la 4 sin abrir el enlace; swipe abortado conserva los
  revelados activos; teclado ←/→, Inicio/Fin vía `go()`; bordes y
  paginador; matrix3d en vivo durante el gesto; fits intactos en 375×667
  y 1440×900; consola sin errores nuevos (solo el histórico del build
  viejo en la sesión).
- Revisión visual VLM del frame congelado a mitad de volteo (móvil +
  escritorio en una tira): **GOOD — flip_visible true**, con giro,
  levantamiento y sombra de pliego legibles; ajuste previo motivado por
  la misma revisión (perspectiva del track → por hoja; scale de
  levantamiento; sombra más ancha y oscura).

## Contenido

Sin cambios: mismas 6 páginas, mismas 8 fotos, mismo RSVP/countdown;
colofón actualizado a `Prototipo lumengala 045c`. La miniatura de la
galería no cambia (el chip «06 páginas» sigue describiendo la pieza).
