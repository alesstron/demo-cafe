"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: "Nous trouver": el horario como el vinilo blanco de la puerta, el neón OUVERT/FERMÉ, la dirección
 *     con el metro y el mapa enmarcado como la pizarra, con la postal de la fachada.
 *     Horario, dirección y teléfono: cafe.config.ts.
 * EN: "Nous trouver": hours as the door's white vinyl, the OPEN/CLOSED neon, the address with the metro
 *     and the map framed like the menu board, with a postcard of the storefront.
 *     Hours, address and phone: cafe.config.ts.
 */
import Image from "next/image";
import { semanaAgrupada, urlComoLlegar, urlMapaIncrustado, urlTelefono, useEstadoHorario, useMotor, whatsappUrl } from "@/motor";
import { Aparece, IconoRuta, IconoSilla, IconoTelefono, IconoWhatsapp, Neon, fotoPorArchivo } from "../decor";
import { COPY } from "../textos";

export function Visita() {
  const { cafe, idioma, tx, t } = useMotor();
  const vivo = useEstadoHorario();
  const { contacto } = cafe;
  const grupos = semanaAgrupada(cafe.horario.franjas, idioma, cafe.region, 0);
  const postal = fotoPorArchivo(cafe, "facade.jpg");

  return (
    <section id="visite" className="visita tablones" aria-labelledby="visita-titulo">
      <div className="contenedor">
        <header className="visita__cabecera">
          <p className="antetitulo">{tx(COPY.visitaAntetitulo)}</p>
          <h2 id="visita-titulo" className="titulo">
            {t("visita")}
          </h2>
        </header>

        <div className="visita__rejilla">
          <Aparece className="vinilo">
            <Neon grande />
            <h3 className="vinilo__titulo">{t("horario")}</h3>
            <dl className="vinilo__horario">
              {grupos.map((g) => (
                <div key={g.etiqueta} className={vivo && g.dias.includes(vivo.hoy) ? "es-hoy" : undefined}>
                  <dt>{g.etiqueta}</dt>
                  <dd>{g.horas}</dd>
                </div>
              ))}
            </dl>
            <address className="vinilo__direccion">
              {contacto.direccion}
              <br />
              {contacto.ciudad} ({contacto.provincia}) {contacto.codigoPostal}
            </address>
            {contacto.referencia && (
              <p className="vinilo__metro">
                <span className="metro-punto" aria-hidden="true" />
                {tx(contacto.referencia)}
              </p>
            )}
            {cafe.servicios?.map((s, i) => (
              <p key={i} className="vinilo__servicio">
                <IconoSilla />
                {tx(s)}
              </p>
            ))}
            <div className="vinilo__acciones">
              <a className="boton boton--naranja" href={urlComoLlegar(cafe)} target="_blank" rel="noopener noreferrer">
                <IconoRuta />
                {t("comoLlegar")}
              </a>
              {contacto.telefono && (
                <a className="boton boton--contorno" href={urlTelefono(contacto.telefono)}>
                  <IconoTelefono />
                  {contacto.telefono}
                </a>
              )}
              {contacto.whatsapp && (
                <a className="boton boton--contorno" href={whatsappUrl(contacto.whatsapp)} target="_blank" rel="noopener noreferrer">
                  <IconoWhatsapp />
                  WhatsApp
                </a>
              )}
            </div>
          </Aparece>

          <Aparece className="visita__mapa" retraso={0.12}>
            <div className="marco-mapa">
              <iframe title={`${t("visita")} · ${cafe.marca.nombre}`} src={urlMapaIncrustado(cafe, idioma)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            {postal && (
              <figure className="polaroid visita__postal">
                <Image src={postal.src} alt={tx(postal.alt)} width={postal.ancho} height={postal.alto} sizes="280px" />
                <figcaption>{tx(COPY.rinos)}</figcaption>
              </figure>
            )}
          </Aparece>
        </div>
      </div>
    </section>
  );
}
