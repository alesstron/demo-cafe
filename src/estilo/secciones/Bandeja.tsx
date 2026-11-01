"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: El pedido se arma en la bandeja roja con papel de cuadros, como la sirven en el local: encima, un
 *     ticket con los platos, el total estimado y los datos para recoger. Al enviar se abre WhatsApp con
 *     el mensaje ya escrito (sin pasarela de pago). También están aquí los botones flotantes.
 * EN: The order is built on the red tray with checkered paper, the way the shop serves it: on top, a
 *     ticket with the items, the estimated total and the pickup details. Sending opens WhatsApp with
 *     the message already written (no payment gateway). The floating buttons also live here.
 */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCarrito, useMotor, usePedido, whatsappUrl } from "@/motor";
import { EASE, IconoBolsa, IconoCerrar, IconoWhatsapp } from "../decor";

export function Bandeja() {
  const { cafe, secciones, t, tx, precio, hora } = useMotor();
  const carrito = useCarrito();
  const pedido = usePedido();
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const { abierto, cerrar } = carrito;

  // ES: Al abrir: foco en "cerrar", Escape cierra y la página de fondo no se desplaza.
  // EN: On open: focus on "close", Escape closes and the page behind does not scroll.
  useEffect(() => {
    if (!abierto) return;
    cerrarRef.current?.focus();
    const alPulsar = (e: KeyboardEvent) => e.key === "Escape" && cerrar();
    document.addEventListener("keydown", alPulsar);
    const desborde = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.body.style.overflow = desborde;
    };
  }, [abierto, cerrar]);

  if (!secciones.pedido) return null;

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div className="bandeja-fondo" onClick={cerrar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            className="bandeja-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bandeja-titulo"
            initial={{ x: "8%", y: "6%", opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: "8%", y: "6%", opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="bandeja-panel__papel">
              <div className="ticket">
                <div className="ticket__cabecera">
                  <h2 id="bandeja-titulo">{t("pedido")}</h2>
                  <button ref={cerrarRef} type="button" className="ticket__cerrar" onClick={cerrar} aria-label={t("cerrar")}>
                    <IconoCerrar />
                  </button>
                </div>

                {carrito.lineas.length === 0 ? (
                  <p className="ticket__vacio">{t("pedidoVacio")}</p>
                ) : (
                  <ul className="ticket__lineas">
                    {carrito.lineas.map((l) => {
                      const nombre = tx(l.plato.nombre);
                      return (
                        <li key={l.plato.id}>
                          <span className="ticket__nombre">{nombre}</span>
                          <span className="contador-plato contador-plato--claro" role="group" aria-label={nombre}>
                            <button type="button" onClick={() => carrito.quitar(l.plato.id)} aria-label={`${t("quitarUno")} : ${nombre}`}>
                              −
                            </button>
                            <output aria-live="polite">{l.cantidad}</output>
                            <button type="button" onClick={() => carrito.anadir(l.plato.id)} aria-label={`${t("anadirUno")} : ${nombre}`}>
                              +
                            </button>
                          </span>
                          <span className="ticket__importe">{precio(l.subtotal)}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <p className="ticket__total">
                  <span>{t("totalEstimado")}</span>
                  <strong>{precio(carrito.total)}</strong>
                </p>
                {cafe.notaPrecios && <p className="ticket__nota">{tx(cafe.notaPrecios)}</p>}

                <form
                  className="ticket__formulario"
                  onSubmit={(e) => {
                    e.preventDefault();
                    pedido.enviar();
                  }}
                  noValidate
                >
                  <label>
                    <span>{t("nombre")}</span>
                    <input
                      value={pedido.datos.nombre}
                      onChange={(e) => pedido.cambiar("nombre", e.target.value)}
                      maxLength={60}
                      autoComplete="given-name"
                      aria-invalid={Boolean(pedido.errores.nombre)}
                      aria-describedby={pedido.errores.nombre ? "error-nombre" : undefined}
                    />
                    {pedido.errores.nombre && (
                      <small id="error-nombre" className="ticket__error">
                        {pedido.errores.nombre}
                      </small>
                    )}
                  </label>
                  <label>
                    <span>{t("horaRecogida")}</span>
                    <select value={pedido.datos.hora} onChange={(e) => pedido.cambiar("hora", e.target.value)}>
                      <option value="">{t("loAntesPosible")}</option>
                      {pedido.horas.map((h) => (
                        <option key={h} value={h}>
                          {hora(h)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>{t("nota")}</span>
                    <textarea value={pedido.datos.nota} onChange={(e) => pedido.cambiar("nota", e.target.value)} maxLength={300} rows={2} placeholder={t("notaAyuda")} />
                  </label>
                  <button type="submit" className="boton boton--nuit ticket__enviar" disabled={carrito.lineas.length === 0}>
                    <IconoWhatsapp />
                    {t("enviarPedido")}
                  </button>
                  <p className="ticket__ayuda">{t("pedidoAyuda")}</p>
                </form>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * ES: ¿Está la carta en pantalla? Sirve para quitar el botón de WhatsApp de encima de los "Ajouter".
 * EN: Is the menu on screen? Used to move the WhatsApp button away from the "Add" buttons.
 */
function useCartaVisible(): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const carta = document.getElementById("menu");
    if (!carta) return;
    const observador = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "-80px 0px -80px 0px" });
    observador.observe(carta);
    return () => observador.disconnect();
  }, []);
  return visible;
}

/**
 * ES: Botones flotantes: la barra del pedido (cuando hay algo en la bandeja) y WhatsApp (estándar y premium).
 *     WhatsApp se aparta mientras se pide, para no tapar los botones de la carta.
 * EN: Floating buttons: the order bar (when the tray has something) and WhatsApp (standard and premium).
 *     WhatsApp steps aside while ordering, so it does not cover the menu buttons.
 */
export function Flotantes() {
  const { cafe, secciones, funciones, t, precio } = useMotor();
  const carrito = useCarrito();
  const cartaVisible = useCartaVisible();
  const numero = cafe.contacto.whatsapp;
  const verPedido = secciones.pedido && carrito.cantidad > 0 && !carrito.abierto;
  const verWhatsapp = funciones.whatsappFlotante && Boolean(numero) && !carrito.abierto && !verPedido && !(secciones.pedido && cartaVisible);
  if (!verPedido && !verWhatsapp) return null;

  return (
    <div className="flotantes">
      <AnimatePresence>
        {verPedido && (
          <motion.button
            key="pedido"
            type="button"
            className="flotante flotante--pedido"
            onClick={carrito.abrir}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <motion.span key={carrito.cantidad} className="flotante__bolsa" initial={{ scale: 1.35 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 16 }}>
              <IconoBolsa />
              <span className="flotante__contador">{carrito.cantidad}</span>
            </motion.span>
            <span className="flotante__etiqueta">{t("verPedido")}</span>
            <span className="flotante__total">{precio(carrito.total)}</span>
          </motion.button>
        )}
      </AnimatePresence>
      {verWhatsapp && (
        <a className="flotante flotante--whatsapp" href={whatsappUrl(numero!)} target="_blank" rel="noopener noreferrer" aria-label={t("escribir")}>
          <IconoWhatsapp />
          <span className="flotante__texto">{t("escribir")}</span>
        </a>
      )}
    </div>
  );
}
