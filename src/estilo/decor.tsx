"use client";

/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: Piezas sacadas de la fachada de Kahwa: vitral con rombos ámbar, guirnalda de bombillas,
 *     pegatinas de la puerta, medallones de rinoceronte, neón de abierto/cerrado, estrellas e iconos.
 *     Solo dibujan; los datos llegan del motor.
 * EN: Pieces taken from Kahwa's storefront: amber-diamond stained glass, string lights, door stickers,
 *     rhino medallions, open/closed neon, stars and icons. They only draw; data comes from the engine.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { useId } from "react";
import { fraseEstado, useEstadoHorario, useMotor, type CafeConfig, type Foto } from "@/motor";
import { COPY } from "./textos";

// ES: Curva de animación común (frena al final). · EN: Shared easing curve (slows down at the end).
export const EASE = [0.22, 1, 0.36, 1] as const;

/** ES: Busca una foto del café por su nombre de archivo. · EN: Finds a café photo by its file name. */
export function fotoPorArchivo(cafe: CafeConfig, archivo: string): Foto | undefined {
  const todas = [cafe.portada, ...(cafe.galeria ?? []), ...cafe.carta.flatMap((c) => c.platos.map((p) => p.foto))];
  return todas.find((f): f is Foto => Boolean(f && f.src.endsWith(`/${archivo}`)));
}

/**
 * ES: Aparición al hacer scroll (gamas estándar y premium). En la básica se pinta quieto.
 * EN: Reveal on scroll (standard and premium tiers). In the basic tier it renders still.
 */
export function Aparece({ children, retraso = 0, className }: { children: React.ReactNode; retraso?: number; className?: string }) {
  const { funciones } = useMotor();
  if (!funciones.animaciones) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: retraso }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ES: Vitral del montante: paneles esmerilados y una fila de rombos ámbar, como el de la fachada.
 *     El dibujo mide 100 de alto y se escala con la altura de la franja, así siempre se ven los rombos.
 * EN: Transom stained glass: frosted panes and a row of amber diamonds, like the real storefront.
 *     The drawing is 100 units tall and scales with the band height, so the diamonds always show.
 */
export function Vitral({ fino = false }: { fino?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <div className={`vitral${fino ? " vitral--fino" : ""}`} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 3000 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${id}e`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F5F1E8" />
            <stop offset="1" stopColor="#D3C9B7" />
          </linearGradient>
          <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F6CB76" />
            <stop offset="1" stopColor="#A9651C" />
          </linearGradient>
          <pattern id={`${id}p`} width="36" height="100" patternUnits="userSpaceOnUse">
            <rect width="36" height="100" fill="#171C33" />
            <polygon points="18,3 33,11 33,71 18,79 3,71 3,11" fill={`url(#${id}e)`} />
            <polygon points="18,82 26,90 18,98 10,90" fill={`url(#${id}a)`} />
            <polygon points="0,82 8,90 0,98" fill={`url(#${id}a)`} />
            <polygon points="36,82 36,98 28,90" fill={`url(#${id}a)`} />
          </pattern>
        </defs>
        <rect width="3000" height="100" fill={`url(#${id}p)`} />
      </svg>
    </div>
  );
}

/**
 * ES: Guirnalda de bombillas colgando en `tramos` curvas. Las bombillas parpadean en la gama premium.
 *     La caída es una parábola: 0 en los ganchos y `caida` píxeles en el centro de cada tramo.
 * EN: String lights hanging in `tramos` swags. The bulbs twinkle in the premium tier.
 *     The sag is a parabola: 0 at the hooks and `caida` pixels at the middle of each swag.
 */
export function Guirnalda({ bombillas = 9, tramos = 3, caida = 24, className = "" }: { bombillas?: number; tramos?: number; caida?: number; className?: string }) {
  const { funciones } = useMotor();
  const alto = caida + 30;
  const ancho = 100 / tramos;
  const cable = Array.from({ length: tramos }, (_, i) => `M${i * ancho},2 Q${i * ancho + ancho / 2},${2 + caida * 2} ${(i + 1) * ancho},2`).join(" ");
  const puntos = Array.from({ length: bombillas }, (_, i) => {
    const x = (i + 0.5) / bombillas;
    const u = (x * tramos) % 1;
    return { x, y: 2 + caida * (1 - Math.pow(2 * u - 1, 2)) };
  });
  return (
    <div className={`guirnalda${funciones.animacionesAvanzadas ? " guirnalda--viva" : ""} ${className}`} style={{ height: alto }} aria-hidden="true">
      <svg viewBox={`0 0 100 ${alto}`} preserveAspectRatio="none">
        <path d={cable} />
      </svg>
      {puntos.map((p, i) => (
        <span key={i} className="bombilla" style={{ left: `${p.x * 100}%`, top: p.y, animationDelay: `${((i * 0.43) % 2.4).toFixed(2)}s` }} />
      ))}
    </div>
  );
}

type ColorPegatina = "naranja" | "crema" | "oro" | "azul" | "rojo";

/**
 * ES: Pegatina troquelada (borde blanco, giro y sombra) como las de la puerta.
 *     En premium se "pega de golpe" al entrar en pantalla. `escala` cambia el tamaño del texto.
 * EN: Die-cut sticker (white border, tilt and shadow) like the ones on the door.
 *     In premium it "slaps on" when it enters the screen. `escala` changes the text size.
 */
export function Pegatina({
  children,
  color = "naranja",
  forma = "pildora",
  giro = 0,
  escala,
  retraso = 0,
  className = "",
}: {
  children: React.ReactNode;
  color?: ColorPegatina;
  forma?: "pildora" | "circulo" | "etiqueta";
  giro?: number;
  escala?: number;
  retraso?: number;
  className?: string;
}) {
  const { funciones } = useMotor();
  const clase = `pegatina pegatina--${color} pegatina--${forma} ${className}`;
  const estilo = { "--giro": `${giro}deg`, "--escala": escala ?? 1 } as React.CSSProperties;
  if (!funciones.animacionesAvanzadas) {
    return (
      <span className={clase} style={estilo}>
        {children}
      </span>
    );
  }
  return (
    <motion.span
      className={clase}
      style={estilo}
      initial={{ opacity: 0, scale: 1.6, rotate: giro - 14 }}
      whileInView={{ opacity: 1, scale: 1, rotate: giro }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ type: "spring", stiffness: 520, damping: 19, delay: retraso }}
    >
      {children}
    </motion.span>
  );
}

// ES: Recortes de las dos cabezas doradas de la foto de la fachada. · EN: Crops of the two golden heads from the storefront photo.
const RINOS = {
  izq: { src: "/img/rhino-gauche.jpg", ancho: 360, alto: 360 },
  der: { src: "/img/rhino-droite.jpg", ancho: 360, alto: 360 },
};

/** ES: Medallón con una cabeza de rinoceronte dorada (foto real). · EN: Medallion with a golden rhino head (real photo). */
export function Medallon({ lado }: { lado: "izq" | "der" }) {
  const r = RINOS[lado];
  return (
    <span className={`medallon medallon--${lado}`} aria-hidden="true">
      <Image src={r.src} alt="" width={r.ancho} height={r.alto} sizes="(max-width: 720px) 64px, 128px" />
    </span>
  );
}

/**
 * ES: Rótulo de neón OUVERT / FERMÉ con la frase de cuándo cierra o abre. Se enciende al cargar.
 * EN: OPEN / CLOSED neon sign with a line saying when it closes or opens. It lights up on load.
 */
export function Neon({ grande = false }: { grande?: boolean }) {
  const { cafe, idioma, tx, funciones } = useMotor();
  const vivo = useEstadoHorario();
  const estado = !vivo ? "cargando" : vivo.estado.abierto ? "abierto" : "cerrado";
  return (
    <p className={`neon neon--${estado}${grande ? " neon--grande" : ""}${funciones.animacionesAvanzadas ? " neon--parpadeo" : ""}`} aria-live="polite">
      <span className="neon__tubo">{!vivo ? "· · ·" : tx(vivo.estado.abierto ? COPY.neonAbierto : COPY.neonCerrado)}</span>
      <span className="neon__frase">{vivo ? fraseEstado(vivo.estado, idioma, cafe.region) : " "}</span>
    </p>
  );
}

const ESTRELLA = "M12 1.8l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.9l-6.4 3.5L7 14.3 1.7 9.3l7.2-.9z";

/** ES: Cinco estrellas rellenas según la nota (4,6 → 92 %). · EN: Five stars filled by the rating (4.6 → 92%). */
export function Estrellas({ nota, etiqueta }: { nota: number; etiqueta: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ancho = Math.max(0, Math.min(1, nota / 5)) * 120;
  const estrellas = [0, 1, 2, 3, 4].map((i) => <path key={i} d={ESTRELLA} transform={`translate(${i * 24} 0)`} />);
  return (
    <svg className="estrellas" viewBox="0 0 120 24" role="img" aria-label={etiqueta}>
      <defs>
        <clipPath id={`${id}c`}>
          <rect width={ancho} height="24" />
        </clipPath>
      </defs>
      <g className="estrellas__fondo">{estrellas}</g>
      <g className="estrellas__relleno" clipPath={`url(#${id}c)`}>
        {estrellas}
      </g>
    </svg>
  );
}

/* ES: Iconos (trazo simple, heredan el color del texto). · EN: Icons (simple strokes, inherit the text color). */

export function IconoVege({ titulo }: { titulo: string }) {
  return (
    <svg className="icono icono--vege" viewBox="0 0 16 16" role="img" aria-label={titulo}>
      <title>{titulo}</title>
      <circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8" cy="8" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function IconoBolsa() {
  return (
    <svg className="icono" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M5.5 8.5h13l-1 11.5h-11z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </svg>
  );
}

export function IconoWhatsapp() {
  return (
    <svg className="icono" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.6a9.4 9.4 0 0 0-8.1 14.2L2.7 21.3l4.6-1.2A9.4 9.4 0 1 0 12 2.6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path
        d="M8.7 7.5c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.8 1.9c.1.2 0 .5-.1.7l-.5.6c-.1.1-.2.3 0 .5.5.9 1.3 1.7 2.2 2.2.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.6-.1l1.9.8c.3.1.4.3.4.5v.5c0 .3-.1.6-.4.8-.6.4-1.4.6-2.2.4-2.6-.6-4.8-2.8-5.4-5.4-.2-.8 0-1.6.4-2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconoTelefono() {
  return (
    <svg className="icono" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function IconoRuta() {
  return (
    <svg className="icono" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function IconoSilla() {
  return (
    <svg className="icono" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="4" r="1.8" />
      <path d="M10 7v6h5l2.5 5.5" />
      <path d="M10 10h4.5" />
      <path d="M7.4 11.2a5.6 5.6 0 1 0 7.9 6.1" />
    </svg>
  );
}

export function IconoCerrar() {
  return (
    <svg className="icono" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
