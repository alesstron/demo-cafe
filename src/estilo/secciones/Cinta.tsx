"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: Cinta con las frases del caballete y la pizarra (se editan en src/estilo/textos.ts). Se mueve en
 *     estándar y premium; los rombos son los del vitral.
 * EN: Ribbon with lines from the sandwich board and menu (edited in src/estilo/textos.ts). It moves in
 *     standard and premium; the diamonds come from the stained glass.
 */
import { useMotor } from "@/motor";
import { COPY } from "../textos";

export function Cinta() {
  const { tx, funciones } = useMotor();
  const frases = COPY.cinta.map((c) => tx(c));
  const fila = (clave: string) => (
    <span className="cinta__fila" key={clave}>
      {frases.map((f, i) => (
        <span key={i} className="cinta__frase">
          {f}
          <i className="rombo" />
        </span>
      ))}
    </span>
  );
  return (
    <div className={`cinta${funciones.animaciones ? " cinta--mueve" : ""}`} aria-hidden="true">
      <div className="cinta__pista">
        {fila("a")}
        {fila("b")}
      </div>
    </div>
  );
}
