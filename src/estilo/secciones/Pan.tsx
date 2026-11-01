"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: "Le pain": el papel de cuadros azules en el que sirven, una servilleta con el Panuzzo y sus tres
 *     ingredientes, y el sándwich en la bandeja roja, todavía humeante.
 * EN: "Le pain": the blue checkered paper they serve on, a napkin with the Panuzzo and its three
 *     ingredients, and the sandwich on the red tray, still steaming.
 */
import Image from "next/image";
import { useMotor } from "@/motor";
import { Aparece, Pegatina, fotoPorArchivo } from "../decor";
import { COPY } from "../textos";

// ES: Color del punto de cada ingrediente: cúrcuma, comino negro, aceite de oliva.
// EN: Dot color for each ingredient: turmeric, black cumin, olive oil.
const COLOR_INGREDIENTE = ["#E8A317", "#1D1B1A", "#7C8B2E"];

export function Pan() {
  const { cafe, tx, funciones } = useMotor();
  const sandwich = fotoPorArchivo(cafe, "poulet-panko.jpg");
  const horno = fotoPorArchivo(cafe, "four-a-pain.jpg");

  return (
    <section id="pain" className="pan" aria-labelledby="pan-titulo">
      <div className="pan__contenido">
        <Aparece className="servilleta">
          <p className="antetitulo antetitulo--azul">{tx(COPY.panAntetitulo)}</p>
          <h2 id="pan-titulo" className="titulo titulo--nuit">
            {tx(COPY.panTitulo)}
          </h2>
          <ul className="ingredientes">
            {COPY.ingredientes.map((ing, i) => (
              <li key={i}>
                <span className="ingredientes__punto" style={{ background: COLOR_INGREDIENTE[i] }} />
                {tx(ing)}
              </li>
            ))}
          </ul>
          <p className="servilleta__texto">{tx(COPY.panTexto)}</p>
        </Aparece>

        <Aparece className="pan__bandeja" retraso={0.15}>
          {funciones.animaciones && (
            <svg className="vapor" viewBox="0 0 120 90" aria-hidden="true">
              <path d="M30 88c-10-14 10-22 0-38s10-24 2-40" />
              <path d="M60 88c-10-14 10-22 0-38s10-24 2-40" />
              <path d="M90 88c-10-14 10-22 0-38s10-24 2-40" />
            </svg>
          )}
          <div className="bandeja">
            <div className="bandeja__papel">
              {sandwich && (
                <Image className="bandeja__foto" src={sandwich.src} alt={tx(sandwich.alt)} width={sandwich.ancho} height={sandwich.alto} sizes="(max-width: 900px) 92vw, 46vw" />
              )}
            </div>
          </div>
          {horno && (
            <figure className="polaroid pan__horno">
              <Image src={horno.src} alt={tx(horno.alt)} width={horno.ancho} height={horno.alto} sizes="220px" />
              <figcaption>{tx(COPY.elHorno)}</figcaption>
            </figure>
          )}
          <Pegatina color="azul" forma="circulo" giro={-12} className="pan__sello" retraso={0.3}>
            {tx(COPY.sello)}
          </Pegatina>
        </Aparece>
      </div>
    </section>
  );
}
