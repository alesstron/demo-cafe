"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: Portada = la fachada de Kahwa en tres paneles, como la real: la vitrina con el letrero, la puerta
 *     llena de pegatinas (foto real) y la pizarra con los sándwiches y sus precios. Arriba, el vitral
 *     con rombos ámbar, la guirnalda y los dos rinocerontes dorados. Textos y precios: cafe.config.ts.
 * EN: Hero = Kahwa's storefront in three panels, like the real one: the shop window with the sign, the
 *     sticker-covered door (real photo) and the menu board with sandwiches and prices. On top, the
 *     amber-diamond stained glass, the string lights and the two golden rhinos. Texts and prices: cafe.config.ts.
 */
import Image from "next/image";
import { useCarrito, useMotor } from "@/motor";
import { Guirnalda, Medallon, Neon, Pegatina, Vitral, fotoPorArchivo } from "../decor";
import { COPY } from "../textos";

export function Fachada() {
  const { cafe, secciones, tx, t, precio, locale } = useMotor();
  const carrito = useCarrito();
  const puerta = fotoPorArchivo(cafe, "devanture-porte.jpg");
  const destacados = (cafe.carta[0]?.platos ?? []).filter((p) => typeof p.precio === "number").slice(0, 4);
  const nota = new Intl.NumberFormat(locale).format(cafe.resenas?.nota ?? 0);

  return (
    <section className="fachada tablones" id="haut" aria-labelledby="fachada-titulo">
      <div className="fachada__frontis">
        <Vitral />
        <Guirnalda bombillas={11} tramos={3} caida={22} className="fachada__luces" />
        <Medallon lado="izq" />
        <Medallon lado="der" />
      </div>

      <div className="fachada__paneles">
        <div className="fachada__vitrina">
          <h1 id="fachada-titulo" className="logotipo fachada__logo">
            Kahwa <span>Café</span>
          </h1>
          <p className="fachada__lema">{tx(cafe.marca.eslogan)}</p>
          <p className="fachada__intro">{tx(cafe.marca.descripcion)}</p>
          <div className="fachada__acciones">
            <a className="boton boton--naranja" href="#menu">
              {t("verCarta")}
            </a>
            {secciones.pedido && (
              <button type="button" className="boton boton--crema" onClick={carrito.abrir}>
                {tx(COPY.pedirLlevar)}
              </button>
            )}
          </div>
          <Neon />
        </div>

        <figure className="fachada__puerta">
          <div className="puerta__montante">
            <span>{t("desde", { anio: cafe.marca.desde ?? "" })}</span>
          </div>
          {puerta && (
            <div className="puerta__vidrio">
              <Image src={puerta.src} alt={tx(puerta.alt)} fill priority sizes="(max-width: 900px) 100vw, 30vw" />
            </div>
          )}
          <Pegatina color="naranja" giro={-9} className="puerta__pega puerta__pega--1" retraso={0.5}>
            {tx(COPY.pegaPan)}
          </Pegatina>
          {secciones.resenas && cafe.resenas && (
            <Pegatina color="oro" forma="circulo" giro={11} className="puerta__pega puerta__pega--2" retraso={0.7}>
              <strong>{nota}</strong>
              <small>★ Google</small>
            </Pegatina>
          )}
          <Pegatina color="crema" forma="etiqueta" giro={-4} className="puerta__pega puerta__pega--3" retraso={0.9}>
            {tx(COPY.pegaBarrio)}
          </Pegatina>
        </figure>

        <aside className="fachada__pizarra" aria-label={t("carta")}>
          <Guirnalda bombillas={4} tramos={2} caida={10} className="pizarra-mini__luces" />
          <ul>
            {destacados.map((p) => (
              <li key={p.id}>
                <span className="pizarra-mini__nombre">{tx(p.nombre)}</span>
                <span className="pizarra-mini__precio">{precio(p.precio!)}*</span>
                {p.descripcion && <span className="pizarra-mini__desc">{tx(p.descripcion)}</span>}
              </li>
            ))}
          </ul>
          <p className="pizarra-mini__pie">
            {cafe.notaPrecios && <span>{tx(cafe.notaPrecios)}</span>}
            <a href="#menu">{tx(COPY.todaLaCarta)} →</a>
          </p>
        </aside>
      </div>
      <div className="fachada__zocalo" aria-hidden="true" />
    </section>
  );
}
