"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: "Au comptoir": fotos pegadas con cinta sobre el azul noche, con el crédito escrito a mano.
 *     Qué fotos salen y en qué orden: cafe.config.ts (galeria).
 * EN: "Au comptoir": taped photos on night blue, with a handwritten credit.
 *     Which photos show and in what order: cafe.config.ts (galeria).
 */
import Image from "next/image";
import { useMotor } from "@/motor";
import { Aparece } from "../decor";
import { COPY } from "../textos";

export function Galeria() {
  const { cafe, tx, t } = useMotor();
  return (
    <section id="galerie" className="galeria" aria-labelledby="galeria-titulo">
      <div className="contenedor">
        <header className="galeria__cabecera">
          <p className="antetitulo">{tx(COPY.galeriaAntetitulo)}</p>
          <h2 id="galeria-titulo" className="titulo">
            {t("galeria")}
          </h2>
        </header>
        <ul className="galeria__muro">
          {cafe.galeria!.map((f, i) => (
            <li key={f.src}>
              <Aparece retraso={(i % 3) * 0.08}>
                <figure className="polaroid">
                  <Image src={f.src} alt={tx(f.alt)} width={f.ancho} height={f.alto} sizes="(max-width: 720px) 46vw, (max-width: 1100px) 30vw, 360px" />
                  {f.autor && <figcaption>{t("fotoDe", { autor: f.autor })}</figcaption>}
                </figure>
              </Aparece>
            </li>
          ))}
        </ul>
        <p className="galeria__nota">{tx(COPY.galeriaNota)}</p>
      </div>
    </section>
  );
}
