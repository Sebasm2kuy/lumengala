# Iteración 045b — «Revista XV · Lookbook»: edición paginada (se lee pasando páginas)

**Fecha:** 2026-11-21 · **Arquitectura:** Nº 2, segunda edición (045a → 045b)
**URL de prueba:** https://sebasm2kuy.github.io/lumengala/lookbook-xv.html

## Objetivo

Rediseñar el prototipo Revista XV · Lookbook para que deje de ser una
página de scroll vertical continuo y funcione como una **revista
interactiva que se lee pasando páginas de derecha a izquierda**, con
estructura editorial por páginas, transición con sensación de pliego y
paginador visible, conservando identidad, enfoque XV/exteriores y
miniatura en la galería.

## Requisitos cumplidos

1. **Navegación horizontal de derecha a izquierda:** sin scroll vertical
   continuo; 6 páginas a pantalla completa (`100dvh` con fallback
   `100vh`). Cuatro vías de avance: *swipe* táctil con seguimiento de
   dedo (PointerEvents con detección de eje dominante y snap), clic en
   controles del paginador y en los bordes laterales de la pantalla,
   flechas del teclado (←/→, Inicio/Fin) y rueda horizontal de trackpad.
   Transición fluida (cubic-bezier .77,0,.18,1) con sombra sutil de
   pliego (box-shadow inset en el canto), páginas inactivas bajadas y
   parallax del contenido; paginador visible `01 / 06` con prev/next
   deshabilitados en los extremos.
2. **Estructura editorial por páginas:** P1 portada (Edición Nº 15,
   nombre, fecha y lugar) · P2 nota editorial de apertura + cuenta
   regresiva tipográfica limpia (sin relojes analógicos) · P3 coordenadas
   (horarios, lugar, botones de mapa y calendario) · P4 pliego de
   lookbook asimétrico (tres encuadres escalonados) · P5 código de
   vestimenta y detalles clave (dress code, tono guía, clima) · P6
   contraportada con confirmación de asistencia (RSVP).
3. **Fotos variadas sin vestido de 15:** 8 imágenes distintas — una por
   página y sin repeticiones (045a repetía dos) — todas de exteriores con
   estilo casual/urbano/natural, del pool ya curado con VLM en 045a;
   8/8 URLs verificadas 200 en CDN.
4. **Miniatura en la galería:** tarjeta actualizada en [XV Años] para
   reflejar la edición paginada: chip «06 páginas», aria-label
   «revista interactiva paginada», descripción nueva y la misma portada
   que la página 1 real. Fuera del catálogo `COLECCIONES`, igual que
   antes (tests del museo intactos).

## Decisiones técnicas

- **Motor de revista:** track flex con `transform: translateX` por
  porcentaje y easing de folio; sin librerías. Arrastre con
  PointerEvents (mouse + touch unificados), detección de eje dominante
  (horizontal si |dx| > |dy|·1.2 y >12px), snap con umbral 18% del
  ancho o 56px, y supresión del *click fantasma* tras arrastre. La rueda
  horizontal acumula deltaX con debounce de 200ms y umbral 90.
- **Bordes clicables sin robar taps:** los `<button>` de borde viven en
  `z-index:8`, por debajo del contenido (`page-inner` en `z-index:10`);
  en desktop capturan los márgenes libres (fuera del max-width 1080) y
  en móvil quedan bajo el contenido a pantalla completa — ahí navegan
  swipe y paginador.
- **Ajuste garantizado por página:** fotos con altura acotada en
  `dvh` (`fit-v/fit-h/fit-wide`) en vez de aspect-ratios fijos; contenido
  envuelto en `.stack` con `margin:auto 0` (centrado cuando sobra lugar,
  arriba sin recortes cuando falta, evitando el clip del centrado flex);
  `overflow-y:auto` invisible por página como red de seguridad, con
  `touch-action:pan-y` para que el gesto vertical siga siendo nativo.
- **Degradación sin JS:** el modo revista se activa vía gating
  `html.js`; sin JS, las páginas se apilan verticalmente legibles y
  paginador/bordes/pista quedan ocultos.
- **A11y:** páginas como `role="group"` con `aria-roledescription="página"`
  y etiqueta «Página N de 6 — …»; páginas inactivas con `inert`; paginador
  con `aria-live` en el número actual; handler de teclado defensivo.
- **Revelados por página activa:** cada activación reinicia y re-anima
  los `.reveal` de la página con stagger de 70ms (re-animan al reentrar,
  como pasar la hoja de nuevo).
- **RSVP con memoria:** al recargar, si hay respuesta en
  `localStorage`, la contraportada muestra directamente la confirmación
  «Tu respuesta ya estaba registrada».

## Bugs encontrados y corregidos durante la verificación

- Página 5 excedía `100dvh` en 375×667 por 13px → foto de referencia
  27dvh→24dvh y specs compactados; verificado `scrollHeight <= clientHeight`
  en las 6 páginas en 375 y 1440.
- Handler de teclado lanzaba TypeError si el evento llegaba con `target`
  sin `closest` (test sintético sobre `document`) → guard defensivo.
- Script de capturas del E2E con `translateX(-N*100%)` inválido (faltaba
  `calc()`) → todas las capturas mostraban la portada; corregido y
  rehecho antes de la revisión VLM.

## Contenido de muestra

Sin cambios respecto a 045a: Lucía · Jardines de la Quinta, Guadalajara ·
sábado 13 de marzo de 2027 · recepción 20:00, vals 22:30 · dress code
«coctel de día», tono guía «rosa pálido & champán». A reemplazar por el
evento real y el shoot antes de producción.
