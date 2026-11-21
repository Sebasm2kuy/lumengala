# Iteración 045a — Prototipo «Revista XV · Lookbook»: arquitectura asimétrica de revista

**Fecha:** 2026-11-21 · **Arquitectura:** Nº 2 (después de Edición Crónica 044f)
**URL de prueba:** https://sebasm2kuy.github.io/lumengala/lookbook-xv.html

## Objetivo

Crear la segunda arquitectura de invitación realmente distinta de las
plantillas clásicas de lista vertical y de la Edición Crónica: una
experiencia **editorial tipo revista / lookbook asimétrico** para una fiesta
de 15 años, e incluirla en la galería de la landing de pruebas con una
miniatura cuidadosamente trabajada.

## Lineamientos cumplidos

1. **Enfoque en XV y fotos de exteriores:** ejemplo orientado a 15 años;
   exclusivamente fotografías de exteriores en entornos naturales,
   urbanos, parques, calles y arquitectura, con ropa casual de sesión al
   aire libre. Sin vestidos de gala en ninguna parte (preserva la
   sorpresa de la noche — la propia pieza lo dice en el editorial de
   apertura).
2. **Identidad de revista:** masthead con número de edición (Nº 15),
   nombre de la homenajeada (Lucía), fecha (Marzo 2027) y lugar
   (Guadalajara); contraste tipográfico marcado (Playfair Display 900
   para «Lucía» gigante vs Archivo en etiquetas de 9-10px con tracking
   amplio); respiro visual por spread. Sin porcentajes de carga ni
   textos de "ejemplo".
3. **Diagramación asimétrica:** cada spread tiene su propia proporción —
   vertical 3:4.4 con columna desplazada 26px, horizontal 16:10 y 21:9
   sangrada, tira de tres marcos escalonados (2fr / 1.35fr / 1fr con
   márgenes 34px y 68px), columnas invertidas en los spreads oscuros.
   Ningún bloque se repite simétricamente.
4. **Funciones clave:** contador tipográfico D·H·M·S (sin reloj
   analógico circular), botones a Google Maps y Google Calendar, dress
   code + tono guía en panel de specs, RSVP con confirmación
   personalizada y `localStorage` (clave `rsvp-lookbook-xv`).
5. **Inclusión en la galería:** tarjeta prototipo en la **vista [XV
   Años]** (misma lógica de Edición Crónica en [Bodas]): portada de
   revista con la foto hero de la sesión, tira «Prototipo / Edición
   Nº 15», masthead serif gigante «Lucía», tagline en píldora, dateline
   al pie y el mismo marco/velo/botón del museo. Fuera del catálogo
   `COLECCIONES` (los tests lo fijan). Contador de obras: «N obras +
   prototipo» en vistas filtradas.

## Decisiones técnicas

- **Autocontenido en `public/lookbook-xv.html`** (HTML+CSS+JS inline, sin
  build), copiado tal cual por el export estático; sirve en
  `/lumengala/lookbook-xv.html` con basePath y no toca el stack de la
  landing. Mismos patrones de comportamiento del estudio: CONFIG al
  inicio del script (fecha + WhatsApp), revelados por IntersectionObserver
  con gating `html.js` (contenido visible sin JS), `noindex, nofollow`.
- **Curaduría de fotos con VLM:** 23 candidatas re-hosteadas desde
  búsqueda de imágenes; dos pasadas de clasificación (KEEP/REJECT por
  marca de agua, collage, texto sobreimpreso, vestimenta de gala) y
  verificación de encuadre/orientación por imagen; 7 fotos finales
  (4 verticales + 3 horizontales), cada URL verificada 200 en CDN. Una
  URL con prefijo de set duplicado se detectó en E2E (404) y se corrigió.
- **Legibilidad sobre foto (tarjeta):** degradado de tinta + píldoras
  translúcidas con `backdrop-blur` para la tira superior y el tagline
  (zonas luminosas de la foto), drop-shadow en «Lucía». Iterado con
  revisión VLM hasta GOOD — no se aprobó a ojo.
- **Imagen remota en la tarjeta con `<img>`** y no `next/image`: el repo
  de pruebas no configura dominios remotos y la tarjeta es client-side;
  así no se toca `next.config.ts`.
- **Specs de vestuario sobre panel claro propio** (fondo crema con
  filetes): el primer intento heredaba color crema pensado para spread
  oscuro y quedaba ilegible sobre foto; se detectó en revisión VLM del
  móvil y se rediseñó.

## Contenido de muestra

Lucía · Jardines de la Quinta, Guadalajara · sábado 13 de marzo de 2027
(fecha real de calendario, ~112 días de contador al probar) · recepción
20:00, vals 22:30 · dress code «coctel de día», tono guía «rosa pálido &
champán». A reemplazar por el evento real y el shoot antes de producción.
