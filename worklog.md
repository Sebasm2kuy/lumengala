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

## 2026-11-17 · Iteración 044d — Retrato editorial del arco, obras clicables y CTAs al embudo real

- Arco «Por qué digital»: se reemplaza el ramo (camila.jpg) por un retrato
  editorial generado (editorial-celu.jpg, 864×1152): mano con manicura
  sosteniendo el celular con la invitación de ornamento botánico dorado sobre
  marfil. La primera generación traía el texto «wedding Inviation» mal escrito
  en la pantalla — se regeneró SIN texto (solo ornamento) para eliminar de
  raíz el riesgo de typos del modelo. Leyenda: «Tu invitación, siempre en la
  mano · Lumen Gala».
- Museo: cada obra ahora es un enlace completo (el <a> envuelve el marco y la
  etiqueta «Ver invitación en vivo» pasa a span para no anidar elementos
  interactivos); el hover y el foco siguen viviendo en .grupo-obra, y las 6
  tarjetas apuntan a las demos vivas verificadas (HTTP 200):
  /i/ejemplo-boda/ y /i/ejemplo-quince/ de lumengala.site.
- Embudo de encargo: los botones principales «Encargar mi proyecto» (héroe y
  cierre) y el flotante «Encargar» derivan al onboarding real
  lumengala.site/personalizar/; WhatsApp queda como canal de consulta, el
  cierre suma el correo directo sebacabrera1982@gmail.com y el pie enlaza el
  panel de cliente (lumengala.site/acceso/).
- Espaciado de lujo en pantallas grandes: experiencia, museo y comparativa
  pasan de lg:py-28 a lg:py-32, grid de tarjetas a lg:gap-10 y fila del museo
  a lg:gap-y-16.
- Verificación en navegador (1440×900 y 390×844, export servido bajo
  /lumengala/): sin overflow horizontal, botón flotante visible tras el héroe
  y apuntando a /personalizar/, los 6 enlaces de obras correctos, arco y
  galería con imágenes cargadas. Capturas revisadas: héroe, arco (v2), museo,
  cierre y móvil.
- Calidad: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 con basePath.
  Ciclo git: rama 044d-editorial-y-ctas -> PR -> merge -> deploy Pages del
  repo de prueba.

## 2026-11-17 · Iteración 044e — Contador numérico en la maqueta de cuentas regresivas

- Se elimina el reloj analógico circular (RelojAnalogo) de la tarjeta 2
  «Cuentas regresivas»: el formato de esfera con manecillas no corresponde al
  producto real. Ahora la maqueta muestra el mismo contador que las
  invitaciones entregadas: cuatro columnas numéricas y tipográficas (Días ·
  Horas · Min · Seg, etiquetas idénticas a countdown.labels de producción)
  con filetes dorados, dígitos serif tabulares y role="timer" con aria-label
  hablado.
- El selector Boda/XV se mantiene y la frase del evento pasa a pie de tarjeta;
  el viejo resumen «Faltan X d · X h…» desaparece porque el contador ES el
  protagonista.
- Corrección de producto asociada (repo de producción Miluaistudio, PR aparte):
  la pantalla de precarga de las demos /i/ejemplo-* deja de mostrar
  porcentajes (se congelaban en 82% mientras cargaban los activos) y el texto
  «Ejemplo Boda»; pasa a una bienvenida limpia con la tipografía de Lumen Gala
  y un tope de tiempo que garantiza que la carga siempre termine.
- Calidad: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 con basePath.
  Ciclo git: rama 044e-contador-tipografico -> PR -> merge -> deploy Pages.

## 2026-11-21 · Iteración 044f — Prototipo «Edición Crónica»: arquitectura narrativa por capítulos

- Primera arquitectura de invitación realmente distinta de las plantillas
  clásicas de lista vertical: una historia dividida en capítulos (Prólogo /
  I. Anuncio / II. Lugar y fecha / III. Galería / IV. Detalles / V. RSVP),
  cada uno con su propio ritmo, jerarquía y respiro visual en celular y
  escritorio.
- Integración mínima: archivo autocontenido `public/edicion-cronica.html`
  (HTML+CSS+JS inline, sin build) que el export copia tal cual; sirve en
  https://sebasm2kuy.github.io/lumengala/edicion-cronica.html. La landing no
  cambia de estructura. Ubicación del acceso (ajuste de 044f): vive en la
  vista [Bodas] de la galería de colecciones como tarjeta prototipo con
  portada de «primera plana» (feedback del estudio: el índice apilado sobre
  crema se veía plano). Composición editorial con la identidad de la pieza:
  banda masthead de tinta con el título en crema y filete terracota,
  dateline del evento, capitular terracota con la apertura real del
  capítulo I citada de la pieza, marca de agua «01» y corrida de capítulos
  I–V + RSVP al pie. Sin relojes ni índices apilados; mismo marco, velo y
  botón «Abrir el prototipo» del museo, con `rutaPublica()` (respeta
  basePath). El enlace original del pie de galería se retiró. La tarjeta
  está FUERA del catálogo COLECCIONES a propósito: los tests fijan 6
  colecciones que enlazan demos de producción, y el prototipo no es una
  colección.
- Lineamientos cumplidos: apertura limpia (cero porcentajes en carga, velo
  de papel + entrada escalonada, contenido visible sin JS gracias al gating
  `html.js` de los revelados); cuenta regresiva tipográfica en vivo sin
  reloj analógico (numerales serif tabulares D · H · M · S con role="timer");
  identidad editorial propia — papel marfil #F7F2E9, tinta #211B13,
  terracota #A4502A, Fraunces + Inter — elegida distinta a la dirección
  dorada de la landing a propósito: es un estudio de arquitectura, no de
  skin; capítulos claros/oscuros alternados para ritmo; índice lateral de
  romanos en escritorio con capítulo activo; `prefers-reduced-motion`
  respetado; `noindex` por coherencia con el repo de prueba.
- RSVP de prototipo: valida nombre y asistencia, confirma en pantalla con
  texto personalizado (singular/plural de acompañantes) y guarda en
  localStorage (clave `rsvp-cronica`). La conexión a backend del evento
  queda para la fase de producción.
- Contenido de muestra (Valentina & Mateo, Hacienda La Loma, sábado
  08.05.2027 — fecha real de calendario, 168 días de contador para probar)
  e imágenes de referencia re-hosteadas: a reemplazar por el evento real y
  el shoot antes de producción.
- Calidad: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 con basePath.
  E2E agent-browser: 375px y 1440px sin overflow horizontal, contador
  tictaqueando, 7/7 imágenes cargadas, RSVP completo, índice lateral
  marcando capítulo activo; export servido bajo /lumengala/ verificado.
- Ciclo git: rama 044f-edicion-cronica -> PR -> escaneo anti-fugas -> merge
  -> deploy Pages -> verificación del prototipo en vivo.

## 2026-11-21 · Iteración 045a — Prototipo «Revista XV · Lookbook»: arquitectura asimétrica de revista

- Segunda arquitectura distinta (después de Edición Crónica 044f), para XV:
  una invitación de 15 años editada como revista / lookbook asimétrico.
  Cinco spreads con composición propia: apertura (vertical 3:4.4 + columna
  desplazada), la cita (contador + mapa/calendario, foto horizontal 16:10),
  sesión (tira de tres marcos escalonados 2fr/1.35fr/1fr con margen
  escalonado), vestuario (duo + flipa sangrada 21:9 + panel de specs) y
  RSVP (vertical + formulario). Nada de bloques simétricos repetidos.
- Enfoque XV y exteriores: exclusivamente fotos de exteriores casuales
  (ciudad, parque, calles); sin vestidos de gala para preservar la
  sorpresa de la noche. 23 candidatas re-hosteadas (image-search),
  curadas con VLM en dos pasadas (descartes por marca de agua, collage,
  texto sobreimpreso y vestimenta no casual); 7 fotos finales 4V+3H,
  todas verificadas 200 en CDN.
- Identidad propia: papel frío #F4F1EC + tinta #191511 + rosa editorial
  #C25E7A, Playfair Display 900 + Archivo — deliberadamente distinta de la
  dirección dorada de la landing y del marfil/terracota de Edición Crónica.
- Funciones: contador tipográfico D·H·M·S sin reloj analógico (fecha real
  13.03.2027), botones a Google Maps y Google Calendar, dress code en
  panel de specs legible, RSVP con confirmación personalizada
  (singular/plural de acompañantes) y localStorage (rsvp-lookbook-xv).
- Galería: tarjeta prototipo SOLO en la vista [XV Años] (misma lógica que
  Edición Crónica en [Bodas]), fuera del catálogo COLECCIONES; portada de
  revista con la foto hero de la sesión, masthead «Lucía», tira de
  edición y dateline; legibilidad sobre foto resuelta con degradado +
  píldoras translúcidas en tira superior y tagline (iterado con VLM hasta
  GOOD). Contador de obras ahora dice «N obras + prototipo» en las vistas
  filtradas. Imagen remota con <img> (no next/image) para no tocar la
  config de dominios del repo de pruebas.
- Fixes durante E2E: URL de imagen ciudad corregida (prefijo de set
  duplicado, 404), specs con color de texto adaptado al panel claro,
  colofón en una línea, espaciado del duo de vestuario.
- Calidad: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 con basePath.
  E2E agent-browser: 375px y 1440px sin overflow horizontal, 8/8 imágenes
  cargadas, contador tictaqueando (112 días), RSVP completo verificado,
  revisión visual VLM GOOD en móvil y escritorio.
- Ciclo git: rama 045a-lookbook-xv -> PR #9 -> escaneo anti-fugas -> merge
  -> deploy Pages -> verificación en vivo.

## 2026-11-21 · Iteración 045b — «Revista XV · Lookbook»: de scroll vertical a revista paginada

- Rediseño completo de la segunda arquitectura: deja de ser una página de
  scroll vertical continuo y pasa a ser una **revista interactiva de 6
  páginas a pantalla completa (100dvh con fallback 100vh) que se lee
  pasando hojas de derecha a izquierda**.
- Navegación por cuatro vías: swipe táctil con seguimiento de dedo
  (PointerEvents, detección de eje dominante, umbral 18% del ancho o 56px,
  con snap y supresión del click fantasma), clic en los bordes laterales
  (solo zonas libres de contenido: z-index por debajo de page-inner) y en
  los controles del paginador, flechas del teclado (←/→ avanzar/retroceder,
  Inicio/Fin saltos, handler defensivo contra targets sin closest) y rueda
  horizontal de trackpad con acumulador y debounce.
- Transición con sensación de pliego: track con transform translateX y
  easing cubic-bezier(.77,0,.18,1), sombra sutil de doblez en el canto de
  cada página (box-shadow inset), páginas inactivas levemente bajadas
  (overlay rgba) con parallax del contenido (2.4%), paginador visible
  «01 / 06» en barra fija con blur (prev/next deshabilitados en extremos).
  prefers-reduced-motion: paso instantáneo, sin revelados.
- Estructura editorial por páginas: 1 portada (foto full-bleed + Edición
  Nº 15 + dateline) · 2 editorial de apertura + cuenta regresiva
  tipográfica · 3 coordenadas (horarios, lugar, mapa, calendario) · 4
  pliego de lookbook (tres encuadres escalonados) · 5 código de vestimenta
  y detalles (panel de specs) · 6 contraportada con RSVP. Revelados por
  página activa con stagger (re-animan al reentrar), páginas inactivas con
  inert para el foco de teclado.
- Fotos: 8 imágenes distintas, una por página y sin repeticiones (045a
  repetía dos): portada hero, grupo en parque, parque otoñal, tres
  encuadres (esquina/parque/avenida), look de tarde y la tarde urbana.
  Todas de exteriores casuales, sin vestidos de gala; 8/8 URLs 200.
- Degradación sin JS: páginas apiladas verticalmente legibles (gating
  html.js para el modo revista), paginador/bordes/pista ocultos sin JS.
- Galería: miniatura actualizada a la nueva edición — chip «06 páginas»,
  aria-label «revista interactiva paginada», descripción nueva; la portada
  de la tarjeta coincide con la página 1 real. Contador de obras intacto.
- Fixes durante E2E: página 5 excedía 100dvh en 375×667 por 13px (foto
  fit-h 27dvh→24dvh y specs compactados), handler de teclado defensivo,
  y bug del propio script de capturas (translateX sin calc()).
- Calidad: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0 con basePath.
  E2E agent-browser: 375×667 y 1440×900 con las 6 páginas sin overflow
  interno, swipe/botones/teclado/bordes/drag de mouse, tope 06 sin
  overscroll, hint oculto tras navegar, RSVP completo + prefill al
  recargar, countdown 112 días, 8/8 imágenes; revisión visual VLM de las
  6 páginas en móvil y escritorio: GOOD en los 4 strips.
- Ciclo git: rama 045b-revista-paginada -> PR #10 -> escaneo anti-fugas ->
  merge -> deploy Pages -> verificación en vivo.

## 2026-11-21 · Iteración 045c — «Revista XV»: swipe fiable en las 6 páginas + volteo de hoja marcado

- **Swipe roto después de la página 01 (reporte en celular), tres causas:**
  el gesto iba por PointerEvents + `touch-action:pan-y` y el navegador se
  apropiaba del gesto ante cualquier jitter vertical (pointercancel, agudo
  en iOS Safari); no había detección de *flick* (un gesto rápido de ~40px
  no llegaba al umbral de 56px/18%); y los arrastres que empezaban sobre
  enlaces/botones se descartaban por completo.
- **Motor de gesto reescrito:** touch por Touch Events dedicados con
  `preventDefault` apenas el eje horizontal gana (umbral bajo, |dx|>8 y
  |dx|>|dy|·1.1) — ningún navegador reclama el gesto ni lanza
  touchcancel; el eje vertical queda nativo para el scroll interno si una
  página desborda. *Flick* por velocidad (umbral 24px + |v|>0.45 px/ms
  en la dirección del gesto). Tap-vs-arrastre desambiguado sobre
  enlaces/botones: tap dispara el clic, arrastre voltea y suprime el clic
  fantasma (solo se excluyen campos de formulario). Mouse por
  PointerEvents con setPointerCapture. Goma (resistencia) en los extremos
  y pinch/touchcancel abortan sin navegar. Fix extra: los swipe abortados
  ya no re-animan los revelados (guard en setIdx).
- **Volteo de hoja marcado:** perspectiva por hoja vía `perspective()`
  dentro del transform (la del track quedaba con origin fuera de pantalla
  y anulaba el 3D); giro desde el borde —la que sale se levanta con
  rotateY ∓44° y scale .9 (sin el scale, una página full-bleed girada
  sobre eje vertical no cambia de silueta y el giro no se lee), la que
  entra se asienta desde ±34°— con sombras progresivas del pliego (dos
  cantos por página, pico ~.75, también en vivo durante el arrastre con
  opacidad proporcional al dedo). Camino de botones/teclado/rueda/bordes
  con keyframes + clases `turn-fwd`/`turn-prev` + `is-leaving`/
  `is-entering` (limpieza a 740ms); camino de arrastre con estilos inline
  y transiciones (.68s cubic-bezier de folio). `prefers-reduced-motion`
  respetado en CSS (transiciones y animaciones fuera, revelados
  visibles) y en JS (const REDUCED salta giros y sombras).
- **Bug cazado por el E2E antes de publicar:** error de signo en la
  refactorización (`to = idx + commit` con commit=-1 → página −1 →
  TypeError y bloqueo total del avance por swipe); corregido a
  `idx - commit` y verificado con TouchEvents sintéticos encadenados.
- Calidad: lint 0 · typecheck 0 · 13/13 tests · build EXIT=0. E2E
  agent-browser 375×667 y 1440×900: encadenado 01→06 y 06→01 por touch
  en todas las páginas, flick real (40px/60ms) 06→05, adelante bloqueado
  en 06 con goma, drag que nace sobre el botón de mapa voltea a la 4 sin
  abrir el enlace, aborto conserva los revelados, teclado/bordes/
  paginador por go(), matrix3d en vivo durante el gesto, fits intactos,
  consola sin errores nuevos. Revisión visual VLM del frame a mitad de
  volteo (móvil + escritorio): GOOD con giro y sombra de pliego legibles.
- Ciclo git: rama 045c-volteo-swipe -> PR #11 -> escaneo anti-fugas ->
  merge -> deploy Pages -> verificación en vivo.

### 2026-11-21 · Hotfix 045c — swipes fuertes en los extremos de la revista

- El E2E en vivo cazó lo que la regresión local había dejado pasar: un
  swipe que excede el límite (atrás fuerte en la 01 / adelante fuerte en
  la 06) calculaba `pages[-1]` o `pages[6]` en `endDrag` → TypeError
  antes de `setIdx` (la página no cambiaba, pero sonaba en consola y se
  perdía la supresión del clic fantasma). La goma amortiguaba el visual
  pero no la decisión de commit.
- Fix: `to` acotado a `[0, N-1]`; cuando el commit no mueve de página,
  la hoja se asienta de nuevo (sin volteo) y se suprime el clic igual.
- Verificado: 2 swipes atrás fuertes en 01 y 6 adelante con la última
  fuerte en 06 — sin errores nuevos en consola, estado consistente
  (`translateX(0%)`, paginador y botones deshabilitados correctos).
