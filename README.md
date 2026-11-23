# lumengala — Repositorio de prueba (nueva dirección luminosa)

> ⚠️ **Este es un repositorio de prueba, aislado de producción.**
> El sitio público de Lumen Gala Studio vive en `Miluaistudio` y se publica en
> [lumengala.site](https://lumengala.site). Todo lo que hay acá es una
> **propuesta de diseño** para la nueva dirección de arte luminosa y *no*
> afecta en nada al sitio en producción.

## Qué hay acá

Una landing page completa ("portada + landing") que aplica la nueva dirección
de arte:

- Fondo marfil `#FAF9F5`, acentos dorado champagne `#D4AF37`, tarjetas de
  vidrio esmerilado (glassmorphism con bordes ultra finos y sombras difusas).
- Tipografía serif elegante y fina (Cormorant Garamond) para títulos y
  sans-serif limpia (Montserrat) para cuerpo.
- Botón flotante "Encargar" fijo en la esquina inferior derecha durante el scroll.
- **Hero**: título con acento dorado, dos smartphones flotantes (boda con
  cuenta regresiva funcional en tiempo real + XV años) con brillo que los
  recorre, tarjetas de vidrio (reproductor "Clair de Lune", invitado
  confirmado, barra de progreso RSVP) y bloque de métricas.
- **Experiencia sensorial**: 4 tarjetas interactivas (reproductor con ondas
  animadas + paleta + prueba tipográfica, reloj analógico marcando segundos,
  collage editorial, widget RSVP de prueba).
- **Galería de colecciones**: 6 obras con filtros [Todas] [Bodas] [XV Años] y
  hover con botón "Ver invitación en vivo".
- **Por qué digital**: marco de arco editorial, 3 pilares y tabla comparativa
  frente al papel tradicional.
- **Cierre**: panel de vidrio sobre seda champagne con CTAs
  "Encargar mi proyecto" y "Agendar videollamada".

Los botones "Ver invitación en vivo" enlazan a las dos invitaciones de
demostración **ya publicadas en producción** (`/i/ejemplo-boda/` y
`/i/ejemplo-quince/`); este repositorio solo las enlaza, nunca las modifica.

## Prototipo Edición Crónica (044f)

Primera arquitectura de invitación realmente distinta de las plantillas
clásicas de lista vertical: una **historia narrativa por capítulos**
(Prólogo → I. Anuncio con cuenta regresiva tipográfica → II. Lugar y fecha →
III. Galería → IV. Detalles / dress code → V. RSVP), cada uno con su propio
ritmo, jerarquía y respiro visual en celular y escritorio.

- Archivo autocontenido en `public/edicion-cronica.html` (HTML+CSS+JS
  inline, sin build): se sirve en `/lumengala/edicion-cronica.html` y su
  acceso vive en la **vista [Bodas] de la galería de colecciones** como
  tarjeta prototipo con portada de **primera plana** (masthead de tinta con
  el título en crema, dateline del evento, capitular con la apertura real
  del capítulo I y corrida de capítulos al pie; fuera del catálogo de
  colecciones).
- Apertura limpia (cero porcentajes en carga, contenido visible sin JS),
  cuenta regresiva en vivo sin reloj analógico, capítulos claros/oscuros
  alternados, índice lateral de romanos en escritorio,
  `prefers-reduced-motion` respetado, sin overflow a 375 px.
- Identidad editorial propia a propósito (papel marfil + tinta + terracota,
  Fraunces + Inter): es un estudio de arquitectura, no de skin de la landing.
- Contenido de muestra (nombres, venue, imágenes de referencia) y RSVP que
  confirma en pantalla con `localStorage`: pendientes de evento real y
  backend antes de producción. `noindex` por coherencia con este repo.

## Prototipo Pase Privado 3D (047a)

**Tercera arquitectura insignia** — y la tercera edición de la invitación
como objeto: una **tarjeta vertical de membresía de gala** con física 3D
(`public/pase-3d.html`). La invitación deja de ser una página web con
scroll y se vuelve un objeto de colección en la palma de la mano: papel
marfil con textura fina, filletes dorados dobles, ranura del cordón,
tipografía grabada (letterpress) y monograma en círculo.

- **Física 3D y reflejo realista:** tarjeta de 320×506 escalada al
  viewport; `perspective: 1400px` + `rotateX/rotateY` con interpolación
  rAF y flotación en reposo. Cuatro entradas suman sobre un objetivo
  común: hover del mouse, arrastre táctil (el pase queda donde se deja),
  giroscopio opcional (botón *Inclinar*, con permiso iOS) y flechas del
  teclado. El **brillo especular** y la sombra de piso derivan del mismo
  estado, como si la luz viniera de una sola fuente.
- **Doble cara con giro 180°:** el frente anuncia la fecha con cuenta
  regresiva numérica limpia (sin relojes) y botón *VER DORSO /
  DETALLES*; un tap corto sobre la tarjeta (o el botón) la gira y el
  dorso reúne el lugar con botones a mapa y calendario, el código de
  vestimenta, la nota de Lucía y la confirmación de asistencia (RSVP
  local + WhatsApp). La inclinación y el giro se componen en wrappers
  separados; la luz no gira con la cara.
- **Identidad Lumen Gala:** tinta nocturna + marfil + rosa + dorado,
  Playfair Display + Archivo; sin fotos de vestido de XV ni textos de
  ejemplo. La página no scrollea; sin JS el pase se degrada a una lista
  editorial legible; `prefers-reduced-motion` apaga flotación,
  partículas y transiciones.

En la galería (vista [XV Años]) vive junto a Revista XV · Lookbook —y,
en [Bodas], junto a Edición Crónica— con una miniatura compuesta de la
mini-tarjeta (filletes, monograma, sheen en diagonal y leve inclinación)
sin inventar imágenes ni números falsos. Reemplaza a la escena
explorable 046a, descartada por decisión de dirección.

## Prototipo Revista XV · Lookbook (045a → 045d)

Segunda arquitectura distinta: una invitación de **15 años editada como una
revista / lookbook**, hoy en su **edición paginada (045d)**: una revista
interactiva de **6 páginas a pantalla completa (`100dvh`) que se lee pasando
hojas de derecha a izquierda con volteo físico de libro** — el contenedor
de hojas usa `perspective: 1800px` + `transform-style: preserve-3d`, cada
página es una lámina de dos caras (frente con el contenido con
`backface-visibility: hidden` y dorso limpio de papel editorial con la
marca «XV»), el lomo vive en el borde izquierdo y la hoja saliente gira
sobre el eje Y quedándose por encima (`z-index` superior) mientras revela
la siguiente, posicionada debajo; sombras dinámicas de pliegue (la hoja se
apaga al pasar el lomo y proyecta viñeta sobre la revelada junto a su
canto libre). El *swipe* gira la hoja en vivo siguiendo al dedo (Touch
Events con preventDefault por intención horizontal, *flick* por velocidad,
tap-vs-arrastre desambiguado y regla de «pasado el medio se completa»),
más clic en los bordes de la pantalla y en los controles del paginador,
flechas del teclado (←/→, Inicio/Fin) y rueda horizontal de trackpad;
paginador visible `01 / 06` y paso instantáneo con
`prefers-reduced-motion`. Nació como página de scroll vertical asimétrico
(045a), se rediseñó a lectura paginada (045b), se hizo fiable el gesto
(045c) y se sustituyó la transición por el volteo físico completo (045d),
sin perder la identidad ni el enfoque.

- Estructura editorial por páginas: 1 portada (Edición Nº 15, nombre,
  fecha y lugar) · 2 editorial de apertura + cuenta regresiva tipográfica
  (sin relojes analógicos) · 3 coordenadas (horarios, lugar, mapa y
  calendario) · 4 pliego de lookbook asimétrico (tres encuadres
  escalonados) · 5 código de vestimenta y detalles · 6 contraportada con
  RSVP.
- Archivo autocontenido en `public/lookbook-xv.html` (HTML+CSS+JS inline,
  sin build): se sirve en `/lumengala/lookbook-xv.html` y su acceso vive en
  la **vista [XV Años] de la galería de colecciones** como tarjeta
  prototipo con la portada real de la revista (foto de la sesión a página
  completa, masthead serif gigante «Lucía», chip «06 páginas» y dateline;
  fuera del catálogo de colecciones). Sin JS, la revista se degrada a
  apilado vertical legible.
- Enfoque XV con fotos de exteriores solamente (ciudad, parque, calles):
  sin vestidos de gala para preservar la sorpresa de la noche. 23
  candidatas buscadas y re-hosteadas, filtradas con VLM (descartes por
  marca de agua, collages y vestimenta no casual); **8 fotos finales, una
  distinta por página, sin repeticiones**.
- Funciones: cuenta regresiva tipográfica (sin reloj analógico), mapa y
  calendario (Google), dress code en panel de specs, RSVP con
  confirmación en pantalla y `localStorage` (clave `rsvp-lookbook-xv`,
  con respuesta previa ya registrada al recargar).
- Identidad propia a propósito (papel frío + tinta + rosa editorial
  #C25E7A, Playfair Display + Archivo): es un estudio de arquitectura
  distinta, no un skin de la landing ni de Edición Crónica.
- Contenido de muestra (Lucía, Jardines de la Quinta, Guadalajara,
  sábado 13.03.2027 — fecha real de calendario): a reemplazar por el
  evento real y el shoot antes de producción. `noindex` por coherencia
  con este repo.

## Stack

Mismo stack que producción, para que el diseño sea portable después:

- Next.js 16 (App Router) + React 19 + TypeScript, export estático.
- Tailwind CSS 4.
- Fuentes vía `next/font` (Cormorant Garamond + Montserrat).

## Comandos

```bash
npm install
npm run dev        # http://localhost:4100
npm run lint
npm run typecheck
npm test
npm run build      # export estático en out/
```

## Publicación de prueba (opcional)

Con `NEXT_PUBLIC_BASE_PATH=/lumengala` el build genera el export listo para
GitHub Pages **de este repo** (`https://sebasm2kuy.github.io/lumengala/`),
sin tocar el dominio propio. El workflow `.github/workflows/prueba.yml`
valida cada PR y publica la rama `main` en Pages de prueba.
