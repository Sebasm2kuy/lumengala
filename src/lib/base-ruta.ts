/* Prefijo de basePath para recursos estáticos servidos desde public/.

   Por qué existe: next/image con `unoptimized: true` emite el src tal cual,
   SIN anteponer el basePath (el prefijo lo aplican los loaders de optimización,
   que acá están desactivados). En la prueba de GitHub Pages el sitio vive bajo
   /lumengala/, así que un src="/img/x.jpg" resuelve a la raíz del dominio y da
   404. Los recursos deben llevar el prefijo de forma explícita: con
   NEXT_PUBLIC_BASE_PATH=/lumengala → "/lumengala/img/x.jpg"; en producción
   (raíz del dominio, sin la variable) → "/img/x.jpg". */

export const BASE_PATH: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function rutaPublica(recurso: string): string {
  return `${BASE_PATH}${recurso}`;
}
