/* Catálogo de colecciones de la galería estilo museo. Cada obra enlaza a la
   invitación de demostración ya publicada en producción (solo se enlaza, no
   se modifica producción). */

export type TipoColeccion = "boda" | "quince";

export interface Coleccion {
  id: string;
  nombre: string;
  tipo: TipoColeccion;
  etiquetaTipo: string;
  imagen: string;
  descripcion: string;
  urlVivo: string;
}

export type FiltroColeccion = "todas" | TipoColeccion;

export const ETIQUETAS_FILTRO: { id: FiltroColeccion; etiqueta: string }[] = [
  { id: "todas", etiqueta: "Todas" },
  { id: "boda", etiqueta: "Bodas" },
  { id: "quince", etiqueta: "XV Años" },
];

export const COLECCIONES: Coleccion[] = [
  {
    id: "aurora",
    nombre: "Aurora",
    tipo: "boda",
    etiquetaTipo: "Colección de bodas · Nº 01",
    imagen: "aurora",
    descripcion: "Cielos de medianoche y oro de primera hora.",
    urlVivo: "https://lumengala.site/i/ejemplo-boda/",
  },
  {
    id: "camila",
    nombre: "Camila",
    tipo: "quince",
    etiquetaTipo: "Colección de XV años · Nº 02",
    imagen: "camila",
    descripcion: "Arcos rosados para una tarde de coronación.",
    urlVivo: "https://lumengala.site/i/ejemplo-quince/",
  },
  {
    id: "versalles",
    nombre: "Versalles",
    tipo: "boda",
    etiquetaTipo: "Colección de bodas · Nº 03",
    imagen: "versalles",
    descripcion: "Espejos dorados y gala de otra época.",
    urlVivo: "https://lumengala.site/i/ejemplo-boda/",
  },
  {
    id: "rose-couture",
    nombre: "Rosé Couture",
    tipo: "quince",
    etiquetaTipo: "Colección de XV años · Nº 04",
    imagen: "rose-couture",
    descripcion: "Rosas en cascada con alta costura.",
    urlVivo: "https://lumengala.site/i/ejemplo-quince/",
  },
  {
    id: "mar-de-seda",
    nombre: "Mar de Seda",
    tipo: "boda",
    etiquetaTipo: "Colección de bodas · Nº 05",
    imagen: "mar-de-seda",
    descripcion: "Blanco perla que se mueve como una marea.",
    urlVivo: "https://lumengala.site/i/ejemplo-boda/",
  },
  {
    id: "jardin-secreto",
    nombre: "Jardín Secreto",
    tipo: "quince",
    etiquetaTipo: "Colección de XV años · Nº 06",
    imagen: "jardin-secreto",
    descripcion: "Duraznos y verdes para una fiesta al aire libre.",
    urlVivo: "https://lumengala.site/i/ejemplo-quince/",
  },
];

/* Filtro puro de la galería (testeable). */
export function filtrarColecciones(
  lista: Coleccion[],
  filtro: FiltroColeccion,
): Coleccion[] {
  if (filtro === "todas") return lista;
  return lista.filter((c) => c.tipo === filtro);
}
