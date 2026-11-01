"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: Opiniones: la nota grande, los temas más citados como pegatinas (más grandes cuantas más menciones)
 *     y resúmenes de lo que dicen los clientes. Los resúmenes no llevan nombre: no son citas literales.
 * EN: Reviews: the big rating, the most mentioned topics as stickers (bigger with more mentions) and
 *     summaries of what customers say. Summaries carry no name: they are not verbatim quotes.
 */
import { useMotor } from "@/motor";
import { Aparece, Estrellas, Pegatina } from "../decor";
import { COPY } from "../textos";

// ES: Colores y giros de las pegatinas, en orden. · EN: Sticker colors and tilts, in order.
const COLORES = ["naranja", "azul", "rojo", "oro"] as const;
const GIROS = [-6, 4, -3, 7];

export function Opiniones() {
  const { cafe, tx, t, locale } = useMotor();
  const r = cafe.resenas!;
  const formato = new Intl.NumberFormat(locale);
  const maximo = Math.max(...(r.temas ?? []).map((x) => x.menciones), 1);

  return (
    <section id="avis" className="opiniones" aria-labelledby="opiniones-titulo">
      <div className="contenedor opiniones__rejilla">
        <Aparece className="opiniones__nota">
          <p className="antetitulo antetitulo--azul">{tx(COPY.opinionesAntetitulo)}</p>
          <h2 id="opiniones-titulo" className="solo-lector">
            {t("resenas")}
          </h2>
          <p className="opiniones__cifra">{formato.format(r.nota)}</p>
          <Estrellas nota={r.nota} etiqueta={`${formato.format(r.nota)} / 5`} />
          <p className="opiniones__total">
            {r.url ? (
              <a href={r.url} target="_blank" rel="noopener noreferrer">
                {t("resenasTotal", { total: formato.format(r.total), fuente: r.fuente })}
              </a>
            ) : (
              t("resenasTotal", { total: formato.format(r.total), fuente: r.fuente })
            )}
          </p>
        </Aparece>

        <div className="opiniones__detalle">
          {r.temas && r.temas.length > 0 && (
            <div className="opiniones__temas">
              <p className="opiniones__subtitulo">{tx(COPY.opinionesTemas)}</p>
              <ul>
                {r.temas.map((tema, i) => (
                  <li key={i}>
                    <Pegatina color={COLORES[i % COLORES.length]} giro={GIROS[i % GIROS.length]} escala={0.9 + 0.75 * (tema.menciones / maximo)} retraso={i * 0.1}>
                      {tx(tema.nombre)} <small>×{tema.menciones}</small>
                    </Pegatina>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {r.destacadas && r.destacadas.length > 0 && (
            <div className="opiniones__resumen">
              <ul>
                {r.destacadas.map((d, i) => (
                  <li key={i}>
                    <Aparece retraso={i * 0.1} className="burbuja">
                      <p>{tx(d.texto)}</p>
                      {d.autor && <p className="burbuja__autor">{d.autor}</p>}
                    </Aparece>
                  </li>
                ))}
              </ul>
              {r.destacadas.some((d) => !d.autor) && <p className="opiniones__fuente">{t("resenasResumen", { fuente: r.fuente })}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
