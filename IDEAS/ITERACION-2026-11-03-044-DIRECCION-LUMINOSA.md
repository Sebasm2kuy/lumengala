# Iteración 044 — Nueva dirección luminosa: portada y landing (repo de prueba)

- **Fecha:** 2026-11-03
- **Repositorio:** `Sebasm2kuy/lumengala` (prueba, aislado) — producción `Miluaistudio` / lumengala.site **intacta**.
- **Estado:** publicado en https://sebasm2kuy.github.io/lumengala/ y verificado.

## Qué se pidió

Diseñar y desarrollar la nueva portada + landing de Lumen Gala Studio con la
dirección de arte luminosa, íntegramente en el repositorio de prueba, sin
afectar la versión de producción de lumengala.site.

## Qué se construyó

- **Estética general:** fondo marfil `#FAF9F5`, acentos dorado champagne
  `#D4AF37`, tarjetas de vidrio esmerilado (backdrop-blur, bordes ultra finos,
  sombras difusas), serif fina Cormorant Garamond para títulos y Montserrat
  para cuerpo. Botón flotante "Encargar" fijo abajo a la derecha durante el
  scroll (aparece pasando el hero).
- **Hero:** título "El preludio perfecto de tu *gran día* comienza aquí" con
  acento dorado y subrayado a mano; dos smartphones flotantes con brillo que
  los recorre (boda con **cuenta regresiva funcional en tiempo real** hacia
  08.08.2027 20:30 — la fecha real de la demo publicada — y XV "Sofía" con
  dirección rosé); tarjetas de vidrio flotantes: reproductor "Clair de Lune"
  con ecualizador animado y play/pausa, invitado confirmado, barra de
  progreso RSVP 18/24; bloque de **métricas visibles en la primera pantalla**
  (72 h de entrega, 6 colecciones, 1 enlace, 24/7).
- **Experiencia sensorial (4 tarjetas interactivas):**
  1. Música y diseño a medida: reproductor con ondas animadas, paleta de 5
     colores que cambia la muestra en vivo y prueba tipográfica (serif,
     itálica, sans).
  2. Cuentas regresivas: reloj analógico SVG con segundero suave en tiempo
     real + selector de evento (boda/XV) con contador digital.
  3. Galería: collage editorial estilo revista con zoom al hover.
  4. RSVP inteligente: asistencia sí/no, acompañantes 0-4, resumen de mesa en
     vivo y confirmación de demostración con reinicio.
- **Galería de colecciones (estilo museo):** 6 obras (Aurora, Camila,
  Versalles, Rosé Couture, Mar de Seda, Jardín Secreto), filtros dinámicos
  [Todas] [Bodas] [XV Años] con contador, marcos con filete dorado y placa de
  museo; al hover (o foco por teclado) aparece el botón **"Ver invitación en
  vivo"** que abre las demos reales ya publicadas en producción
  (`/i/ejemplo-boda/`, `/i/ejemplo-quince/`).
- **Por qué digital:** retrato en marco de arco editorial con anillo dorado,
  título "El papel se guarda en un cajón. Lumen vive en el bolsillo.", 3
  pilares (Ecológica, Interactiva, Siempre contigo) y tabla comparativa
  frente al papel tradicional (con scroll horizontal interno en móvil).
- **Cierre y CTA:** panel de vidrio sobre **fondo de seda champagne generado
  por script**, título "Que tu historia comience con un destello" y botones
  reales: "Encargar mi proyecto" (WhatsApp de Lumen Gala) y "Agendar
  videollamada" (email del estudio).

## Decisiones técnicas

- Stack espejo de producción: Next.js 16 + React 19 + Tailwind 4 + TS 5.8,
  export estático con `trailingSlash`, para portar el diseño después sin
  fricción.
- Imágenes: reutilización de 6 fotos del catálogo de Lumen Gala (renombradas
  por colección) + favicon propio; nada de recursos externos.
- Reloj compartido con `useSyncExternalStore` (un solo `setInterval` por
  frecuencia, hidratación sin saltos); revelado al scroll por manipulación
  directa del DOM + clase `html.js` (mejora progresiva: sin JS todo es
  visible); `prefers-reduced-motion` respetado; foco visible y
  `aria-pressed`/`aria-label` en todos los controles.
- Hover de la galería con CSS propio (`.velo-obra`, `.boton-obra`) en lugar
  de variantes `group-hover` de Tailwind, que en el modo dev de este entorno
  perdían la cascada frente a `opacity-0`; así funciona igual en dev y en el
  export estático.
- `robots` noindex + `robots.txt` Disallow: es un repo de prueba, sin SEO.
- Publicación de prueba con `NEXT_PUBLIC_BASE_PATH=/lumengala` en GitHub
  Pages del propio repo (workflow `prueba.yml`: valida y publica `main`).

## Verificación

- **Calidad:** lint 0 · typecheck 0 · 13/13 tests (`cuenta-regresiva`,
  `colecciones`) · build estático EXIT=0.
- **E2E con agent-browser (dev, escritorio 1440×900 y móvil 390×844):**
  countdown en vivo (51→48 s, 278 días, matemática correcta), paleta y
  tipografía cambian la muestra, reloj cambia de evento (278→377 días), flujo
  RSVP completo hasta el éxito, filtros 6→3 con contador, hover overlay con
  enlace correcto, botón flotante aparece al scroll, cero errores de consola,
  cero errores de hidratación, sin scroll horizontal en móvil.
- **En producción real (GitHub Pages del repo de prueba):**
  https://sebasm2kuy.github.io/lumengala/ → 200, basePath correcto, fuentes e
  imágenes 200, countdown tictaqueando (56→53 s), noindex activo.
- **Aislamiento verificado:** lumengala.site responde 200 sin ningún rastro
  de la propuesta; demos y /estudio/ siguen operando.

## Pendientes / notas honestas

- El botón "Ver invitación en vivo" **enlaza** a las demos de producción;
  este repo no las modifica ni las redeploya.
- El reproductor es una demo visual (equalizador animado + play/pausa de las
  ondas), no reproduce audio: en las invitaciones reales la música va vía
  Spotify.
- La seda champagne es una textura generada (jpg 71 KB); si el propietario
  quiere otra veta, basta reemplazar `public/img/seda-champagne.jpg`.
- Métricas del hero: cifras de producto honestas (72 h, 6, 1, 24/7); si el
  propietario quiere métricas de tracción reales, hay que cargarlas a mano.
