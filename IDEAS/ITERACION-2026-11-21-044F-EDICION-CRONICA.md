# Iteración 044f — Prototipo «Edición Crónica»: invitación narrativa por capítulos

- **Fecha:** 2026-11-21
- **Repositorio:** `Sebasm2kuy/lumengala` (prueba, aislado) — producción
  `Miluaistudio` / lumengala.site **intacta**.
- **Estado:** prototipo integrado y publicado en
  https://sebasm2kuy.github.io/lumengala/edicion-cronica.html (noindex).

## Qué se pidió

Prototipar la primera arquitectura de invitación realmente distinta de las
plantillas clásicas de lista vertical: la **Edición Crónica**, una invitación
estructurada como una historia dividida por capítulos/escenas, con ritmo,
jerarquía y respiro visual propios en celular y escritorio. Lineamientos:
apertura limpia (sin porcentajes trabados ni textos genéricos de ejemplo),
estructura por capítulos, identidad editorial (espacios en blanco,
contrastes tipográficos, componentes a medida) y dejarlo listo en este repo
de prueba para probarlo en el celular antes de llevarlo a producción.

## Qué se construyó

- **Estructura narrativa (scroll único, seis escenas):**
  1. **Prólogo (apertura):** portada tipográfica a pantalla completa —
     nombres apilados con ampersand itálico, fecha y lugar — con velo de
     papel que se disuelve y entrada escalonada. Sin loader ni porcentajes;
     el contenido es visible de inmediato y también sin JavaScript.
  2. **Capítulo I · El anuncio:** párrafo narrativo con capitular, cita
     destacada («Nos casamos») y **cuenta regresiva tipográfica en vivo**:
     numerales serif tabulares D · H · M · S con `role="timer"`, sin reloj
     analógico circular (decisión ya tomada en 044e y mantenida acá).
  3. **Capítulo II · Lugar y fecha:** dos escenas (ceremonia / celebración)
     con hora, recinto y nota; botones «Ver en el mapa» (búsqueda de Google
     Maps) y «Agregar al calendario» (enlace de Google Calendar con las
     horas UTC verificadas); nota de logística (estacionamiento, transporte
     de cortesía) y banda fotográfica panorámica.
  4. **Capítulo III · La galería:** capítulo oscuro con mosaico editorial de
     ritmos variados (una panorámica, dos pares, una fila 7/5, un cierre
     panorámico) y epígrafes numerados en romanos — nada de la grilla
     uniforme de las plantillas.
  5. **Capítulo IV · Los detalles:** dress code «Formal · nocturno» con
     paleta sugerida (5 círculos de color + círculo tachado para el
     blanco/pastel) y notas en lista de definición (clima, niños, regalo).
  6. **Capítulo V · RSVP (capítulo oscuro):** formulario editorial con
     campos subrayados, pills de asistencia, select de acompañantes y nota;
     confirmación en pantalla con texto personalizado. Guarda en
     `localStorage` (clave `rsvp-cronica`) — en producción se conecta al
     backend del evento.
- **Identidad editorial propia (a propósito distinta de la landing):**
  papel marfil `#F7F2E9`, tinta `#211B13`, acento terracota `#A4502A`,
  Fraunces (serif, títulos y narrativa) + Inter (etiquetas y cuerpo),
  numeración romana, filetes finos, aire generoso entre secciones. Es un
  estudio de arquitectura de contenido, no una variante de skin de la
  dirección dorada.
- **Navegación y movimiento:** índice lateral fijo de romanos en escritorio
  (≥1100 px) con capítulo activo por IntersectionObserver; revelados al
  scroll con gating `html.js` (sin JS, todo el contenido es visible);
  `prefers-reduced-motion` respetado (sin velo, sin animaciones, scroll
  automático); señal de lectura con línea animada en el prólogo.

## Decisiones técnicas

- **Integración mínima y reversible:** el prototipo vive como archivo
  autocontenido en `public/edicion-cronica.html` (HTML+CSS+JS inline, sin
  build). El export estático lo copia tal cual a `out/`, sirve en
  `/lumengala/edicion-cronica.html` (con basePath) y no toca el stack ni la
  estructura de la landing. El acceso, a pedido del estudio, está en la
  **vista [Bodas] de la galería de colecciones**: una tarjeta prototipo con
  portada tipográfica propia (papel marfil, tinta, terracota; índice de
  capítulos en romanos; hover «Abrir el prototipo») que reutiliza el
  lenguaje del museo (`marco-obra`, `velo-obra`, `boton-obra`) y el helper
  `rutaPublica()` para basePath. La tarjeta se renderiza en el componente,
  **fuera del catálogo `COLECCIONES`**: los tests fijan 6 colecciones cuyas
  URLs son siempre demos de producción, y el prototipo no es una colección
  (no tiene shoot ni URL en lumengala.site). El enlace que estaba en la nota
  de cierre de la galería se retiró para no duplicar accesos.
- **Contenido parametrizado:** el bloque `CONFIG` al final del `<script>`
  concentra la fecha del evento (alimenta la cuenta regresiva) y el enlace
  de WhatsApp; el resto de los textos son muestra editorial (Valentina &
  Mateo, Hacienda La Loma, sábado 08.05.2027 — día real de calendario,
  ~168 días de contador para la prueba).
- **Imágenes de referencia** (7, re-hosteadas en CDN): seleccionadas por
  tono cálido y coherencia con la paleta; tres candidatas se descartaron en
  revisión visual por marca de agua, por incluir niños (el evento es solo
  para adultos) y por romper la paleta. En producción se reemplazan por el
  shoot real del evento.
- **Meta de prueba:** `noindex, nofollow` por coherencia con el repositorio
  de prueba (la landing ya lo hace vía metadata de Next).

## Cómo se probó

- Gates locales: lint 0 · typecheck 0 · tests completos · build EXIT=0 con
  `NEXT_PUBLIC_BASE_PATH=/lumengala`.
- E2E con agent-browser a 375×812 y 1440×900: sin overflow horizontal (se
  corrigieron dos hallazgos: banda con `aspect-ratio` + `min-height` que
  ensanchaba el frame, y círculos de paleta comprimidos por el flex),
  contador tictaqueando en vivo, 7/7 imágenes cargadas, flujo RSVP completo
  (confirmación personalizada, singular/plural, persistencia), índice
  lateral marcando el capítulo activo, reveal al scroll correcto.
- Export servido bajo `/lumengala/` para replicar Pages; luego verificación
  del deploy en vivo.

## Pendientes antes de producción

1. Reemplazar contenido de muestra por el evento real (nombres, venue,
   direcciones, horarios, dress code, textos narrativos).
2. Reemplazar `CONFIG.whatsapp` por el número real del anfitrión.
3. Reemplazar las imágenes de referencia por el shoot real (hoy hay 7
   referencias CDN con derechos a revisar).
4. Conectar el submit del RSVP al backend/planilla del anfitrión (hoy:
   `localStorage` del dispositivo).
5. Portar la arquitectura a componentes del stack (Next/React) si el
   prototipo se aprueba como arquitectura de producto; este archivo define
   la referencia visual y de comportamiento.
