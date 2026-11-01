"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: Piel de Kahwa Café: "La devanture" (ficha de estilo en docs/DISEÑO.md). Cada sección dibuja un
 *     elemento real del local; qué secciones salen lo decide el motor según la gama. Para quitar una
 *     sección, cambia la gama o `funciones` en cafe.config.ts en vez de borrar líneas aquí.
 * EN: Kahwa Café skin: "La devanture" (style sheet in docs/DISEÑO.md). Every section draws a real element
 *     of the shop; which sections show is decided by the engine from the tier. To hide a section, change
 *     the tier or `funciones` in cafe.config.ts instead of deleting lines here.
 */
import { MotionConfig } from "framer-motion";
import { useMotor } from "@/motor";
import { Bandeja, Flotantes } from "./secciones/Bandeja";
import { Cabecera } from "./secciones/Cabecera";
import { Carta } from "./secciones/Carta";
import { Cinta } from "./secciones/Cinta";
import { Fachada } from "./secciones/Fachada";
import { Galeria } from "./secciones/Galeria";
import { Historia } from "./secciones/Historia";
import { Opiniones } from "./secciones/Opiniones";
import { Pan } from "./secciones/Pan";
import { Pie } from "./secciones/Pie";
import { Visita } from "./secciones/Visita";

export function Pagina() {
  const { secciones } = useMotor();
  return (
    <MotionConfig reducedMotion="user">
      <Cabecera />
      <main>
        <Fachada />
        <Cinta />
        <Pan />
        {secciones.carta && <Carta />}
        {secciones.historia && <Historia />}
        {secciones.galeria && <Galeria />}
        {secciones.resenas && <Opiniones />}
        <Visita />
      </main>
      <Pie />
      <Bandeja />
      <Flotantes />
    </MotionConfig>
  );
}
