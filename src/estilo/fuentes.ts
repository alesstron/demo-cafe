/**
 * [CON CUIDADO · EDIT WITH CARE] Piel / Skin
 *
 * ES: Fuentes de Kahwa, elegidas por su rotulación:
 *       - Jost: geometría tipo Futura, como el letrero "KAHWA CAFÉ" de la vitrina y la pizarra.
 *       - Yellowtail: la caligrafía de "Depuis 2010" sobre la puerta.
 *       - Patrick Hand: la letra a mano de "sandwicherie urbaine légendaire".
 *     Para cambiar una fuente, cambia la importación; los nombres --f-jost, --f-yellowtail y
 *     --f-patrick se usan en estilo.css.
 * EN: Kahwa's fonts, chosen from its signage:
 *       - Jost: Futura-like geometry, like the "KAHWA CAFÉ" window sign and the menu board.
 *       - Yellowtail: the "Depuis 2010" script above the door.
 *       - Patrick Hand: the handwritten "sandwicherie urbaine légendaire".
 *     To swap a font, change the import; the names --f-jost, --f-yellowtail and --f-patrick
 *     are used in estilo.css.
 */
import { Jost, Patrick_Hand, Yellowtail } from "next/font/google";

const jost = Jost({ subsets: ["latin"], variable: "--f-jost", display: "swap" });
const yellowtail = Yellowtail({ subsets: ["latin"], weight: "400", variable: "--f-yellowtail", display: "swap" });
const patrick = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--f-patrick", display: "swap" });

export const fuentes = [jost.variable, yellowtail.variable, patrick.variable].join(" ");

/** ES: Barra del navegador en el móvil: el azul noche de la cornisa. · EN: Mobile browser bar: the cornice's night blue. */
export const colorNavegador = "#0F1A3D";
