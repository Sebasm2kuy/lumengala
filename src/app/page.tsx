import BotonEncargar from "@/components/boton-encargar";
import Cierre from "@/components/cierre";
import Colecciones from "@/components/colecciones";
import Comparativa from "@/components/comparativa";
import Encabezado from "@/components/encabezado";
import Experiencia from "@/components/experiencia";
import Hero from "@/components/hero";
import Pie from "@/components/pie";

export default function Pagina() {
  return (
    <>
      <Encabezado />
      <main id="inicio">
        <Hero />
        <Experiencia />
        <Colecciones />
        <Comparativa />
        <Cierre />
      </main>
      <Pie />
      <BotonEncargar />
    </>
  );
}
