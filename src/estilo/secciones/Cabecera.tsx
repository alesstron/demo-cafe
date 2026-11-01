"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: Cabecera fija: logotipo de la vitrina, secciones, idioma (premium) y botón de pedido.
 * EN: Sticky header: shop-window logo, sections, language (premium) and order button.
 */
import { NOMBRE_IDIOMA, useCarrito, useMotor } from "@/motor";
import { IconoBolsa } from "../decor";
import { COPY } from "../textos";

export function Cabecera() {
  const { cafe, secciones, idioma, idiomas, cambiarIdioma, t, tx } = useMotor();
  const carrito = useCarrito();
  const enlaces = [
    { href: "#pain", texto: tx(COPY.navPan) },
    { href: "#menu", texto: t("carta") },
    secciones.historia && { href: "#histoire", texto: t("historia") },
    secciones.resenas && { href: "#avis", texto: t("resenas") },
    { href: "#visite", texto: t("visita") },
  ].filter((e): e is { href: string; texto: string } => Boolean(e));

  return (
    <header className="cabecera">
      <a className="cabecera__logo logotipo" href="#haut" aria-label={cafe.marca.nombre}>
        Kahwa <span>Café</span>
      </a>
      <nav className="cabecera__nav" aria-label={tx(COPY.navAria)}>
        {enlaces.map((e) => (
          <a key={e.href} href={e.href}>
            {e.texto}
          </a>
        ))}
      </nav>
      <div className="cabecera__acciones">
        {idiomas.length > 1 && (
          <div className="idiomas" role="group" aria-label={t("idioma")}>
            {idiomas.map((i) => (
              <button key={i} type="button" lang={i} aria-pressed={i === idioma} title={NOMBRE_IDIOMA[i]} onClick={() => cambiarIdioma(i)}>
                {i.toUpperCase()}
              </button>
            ))}
          </div>
        )}
        {secciones.pedido && (
          <button type="button" className="cabecera__pedir" onClick={carrito.abrir}>
            <IconoBolsa />
            <span className="cabecera__pedir-texto">{tx(COPY.pedir)}</span>
            {carrito.cantidad > 0 && (
              <span className="contador" aria-label={`${carrito.cantidad}`}>
                {carrito.cantidad}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
