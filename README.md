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
