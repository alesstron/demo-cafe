"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: "Depuis 2010": la historia sobre el azulejo blanco del interior. La palabra قهوة (kahwa) explica
 *     el nombre, y la guirnalda une los tres momentos como un hilo de luces. Textos: cafe.config.ts.
 * EN: "Depuis 2010": the story over the shop's white subway tile. The word قهوة (kahwa) explains the
 *     name, and the string lights link the three moments. Texts: cafe.config.ts.
 */
import { useMotor } from "@/motor";
import { Aparece, Guirnalda } from "../decor";
import { COPY } from "../textos";

export function Historia() {
  const { cafe, tx, t } = useMotor();
  const h = cafe.historia!;
  return (
    <section id="histoire" className="historia" aria-labelledby="historia-titulo">
      <div className="contenedor">
        <header className="historia__cabecera">
          <p className="antetitulo antetitulo--naranja">{h.titulo ? tx(h.titulo) : ""}</p>
          <h2 id="historia-titulo" className="titulo titulo--nuit">
            {t("historia")}
          </h2>
        </header>

        <div className="historia__cuerpo">
          <Aparece className="historia__arabe">
            <span lang="ar" dir="rtl">
              قهوة
            </span>
            <small>
              Kahwa · {tx(COPY.arabe)}
            </small>
          </Aparece>
          <div className="historia__texto">
            {h.parrafos.map((p, i) => (
              <Aparece key={i} retraso={i * 0.08}>
                <p>{tx(p)}</p>
              </Aparece>
            ))}
          </div>
        </div>

        {h.hitos && h.hitos.length > 0 && (
          <div className="hitos">
            <Guirnalda bombillas={h.hitos.length} tramos={h.hitos.length} caida={18} className="hitos__luces" />
            <ol className="hitos__lista">
              {h.hitos.map((hito, i) => (
                <li key={i} className="hito">
                  <Aparece retraso={i * 0.12} className="hito__tarjeta">
                    <p className="hito__anio">{tx(hito.anio)}</p>
                    {hito.titulo && <p className="hito__titulo">{tx(hito.titulo)}</p>}
                    <p className="hito__texto">{tx(hito.texto)}</p>
                  </Aparece>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
