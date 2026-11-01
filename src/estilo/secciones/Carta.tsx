"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: La carta es la pizarra de la fachada: marco blanco, fondo azul, nombres en mayúsculas, precios a la
 *     derecha y el asterisco de "prix avant taxes". En premium: pestañas, fotos y "Ajouter".
 *     Los platos y precios se cambian en cafe.config.ts (carta), no aquí.
 * EN: The menu is the storefront's board: white frame, blue background, uppercase names, prices on the
 *     right and the "prix avant taxes" asterisk. In premium: tabs, photos and "Add".
 *     Items and prices are changed in cafe.config.ts (carta), not here.
 */
import Image from "next/image";
import { useState } from "react";
import { useCarrito, useMotor, type Plato } from "@/motor";
import { Aparece, Guirnalda, IconoVege, Pegatina } from "../decor";
import { COPY } from "../textos";

export function Carta() {
  const { cafe, funciones, tx, t } = useMotor();
  const [activa, setActiva] = useState(cafe.carta[0]?.id ?? "");
  const visibles = funciones.cartaPestanas ? cafe.carta.filter((c) => c.id === activa) : cafe.carta;

  return (
    <section id="menu" className="carta tablones" aria-labelledby="carta-titulo">
      <div className="contenedor">
        <header className="carta__cabecera">
          <p className="antetitulo">{tx(COPY.cartaAntetitulo)}</p>
          <h2 id="carta-titulo" className="titulo">
            {tx(COPY.cartaTitulo)}
          </h2>
        </header>

        <Aparece className="pizarra">
          <Guirnalda bombillas={7} tramos={3} caida={16} className="pizarra__luces" />
          {funciones.cartaPestanas && cafe.carta.length > 1 && (
            <div className="pizarra__pestanas" role="tablist" aria-label={t("carta")}>
              {cafe.carta.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  id={`pestana-${c.id}`}
                  aria-selected={c.id === activa}
                  aria-controls={`panel-${c.id}`}
                  onClick={() => setActiva(c.id)}
                >
                  {tx(c.nombre)}
                </button>
              ))}
            </div>
          )}

          {visibles.map((c) => (
            <div
              key={c.id}
              className="pizarra__categoria"
              {...(funciones.cartaPestanas ? { role: "tabpanel", id: `panel-${c.id}`, "aria-labelledby": `pestana-${c.id}` } : {})}
            >
              {!funciones.cartaPestanas && <h3 className="pizarra__categoria-titulo">{tx(c.nombre)}</h3>}
              {c.nota && <p className="pizarra__nota">{tx(c.nota)}</p>}
              <ul className="pizarra__lista">
                {c.platos.map((p) => (
                  <PlatoPizarra key={p.id} plato={p} />
                ))}
              </ul>
            </div>
          ))}

          {cafe.notaPrecios && <p className="pizarra__pie">{tx(cafe.notaPrecios)}</p>}
        </Aparece>
      </div>
    </section>
  );
}

function PlatoPizarra({ plato }: { plato: Plato }) {
  const { funciones, secciones, tx, t, precio } = useMotor();
  const carrito = useCarrito();
  const cantidad = carrito.cantidadDe(plato.id);
  const conFoto = funciones.cartaFotos && plato.foto;
  const sePuedePedir = secciones.pedido && typeof plato.precio === "number";
  const nombre = tx(plato.nombre);

  return (
    <li className={`plato${conFoto ? " plato--foto" : ""}${plato.destacado ? " plato--estrella" : ""}`}>
      {conFoto && (
        <span className="plato__foto">
          <Image src={plato.foto!.src} alt="" width={plato.foto!.ancho} height={plato.foto!.alto} sizes="72px" />
        </span>
      )}
      <div className="plato__cuerpo">
        <h4 className="plato__nombre">
          {nombre}
          {plato.vegetariano && <IconoVege titulo={t("vegetariano")} />}
        </h4>
        {plato.descripcion && <p className="plato__desc">{tx(plato.descripcion)}</p>}
        {plato.etiquetas?.map((e, i) => (
          <Pegatina key={i} color="oro" forma="etiqueta" giro={-3} className="plato__etiqueta">
            {tx(e)}
          </Pegatina>
        ))}
      </div>
      <div className="plato__lado">
        {typeof plato.precio === "number" && (
          <span className="plato__precio">
            {precio(plato.precio, plato.suplemento)}
            <sup>*</sup>
          </span>
        )}
        {sePuedePedir &&
          (cantidad === 0 ? (
            <button type="button" className="plato__anadir" onClick={() => carrito.anadir(plato.id)} aria-label={`${t("anadir")} : ${nombre}`}>
              + {t("anadir")}
            </button>
          ) : (
            <span className="contador-plato" role="group" aria-label={nombre}>
              <button type="button" onClick={() => carrito.quitar(plato.id)} aria-label={`${t("quitarUno")} : ${nombre}`}>
                −
              </button>
              <output aria-live="polite">{cantidad}</output>
              <button type="button" onClick={() => carrito.anadir(plato.id)} aria-label={`${t("anadirUno")} : ${nombre}`}>
                +
              </button>
            </span>
          ))}
      </div>
    </li>
  );
}
