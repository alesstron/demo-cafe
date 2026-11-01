/**
 * [EDITABLE] Textos de la piel / Skin texts
 *
 * ES: Frases propias del diseño de Kahwa: rótulos, pegatinas y cinta, en francés, inglés y español.
 *     Se pueden reescribir libremente (respetando comillas y comas). Los datos del café (carta,
 *     horario, historia…) están en src/data/cafe.config.ts.
 * EN: Kahwa's design copy: headings, stickers and ribbon, in French, English and Spanish.
 *     They can be rewritten freely (keeping quotes and commas). The café data (menu, hours,
 *     story…) lives in src/data/cafe.config.ts.
 */
import type { Texto } from "@/motor";

export const COPY = {
  navAria: { fr: "Sections", en: "Sections", es: "Secciones" },
  navPan: { fr: "Le pain", en: "The bread", es: "El pan" },
  pedir: { fr: "Commander", en: "Order", es: "Pedir" },
  pedirLlevar: { fr: "Commander pour emporter", en: "Order for pickup", es: "Pedir para llevar" },
  todaLaCarta: { fr: "Tout le menu", en: "Full menu", es: "Toda la carta" },
  neonAbierto: { fr: "Ouvert", en: "Open", es: "Abierto" },
  neonCerrado: { fr: "Fermé", en: "Closed", es: "Cerrado" },

  // ES: Pegatinas de la puerta (portada). · EN: Door stickers (hero).
  pegaPan: { fr: "Pain maison", en: "House bread", es: "Pan casero" },
  pegaMinuto: { fr: "Fait minute", en: "Made to order", es: "Al momento" },
  pegaBarrio: { fr: "Plateau Mont-Royal", en: "Plateau Mont-Royal", es: "Plateau Mont-Royal" },

  // ES: Cinta en movimiento: frases del caballete y de la pizarra. · EN: Moving ribbon: lines from the sandwich board and menu.
  cinta: [
    { fr: "Pain maison", en: "House-made bread", es: "Pan casero" },
    { fr: "Cuit à la commande", en: "Baked to order", es: "Horneado al momento" },
    { fr: "Sauce KAHWA", en: "KAHWA sauce", es: "Salsa KAHWA" },
    { fr: "Agneau du Québec", en: "Quebec lamb", es: "Cordero de Quebec" },
    { fr: "Depuis 2010", en: "Since 2010", es: "Desde 2010" },
    { fr: "Uniques et faits minute", en: "One of a kind, made to order", es: "Únicos y hechos al momento" },
  ],

  // ES: Sección del pan. · EN: Bread section.
  panAntetitulo: { fr: "Le secret de la maison", en: "The house secret", es: "El secreto de la casa" },
  panTitulo: { fr: "Le Panuzzo à l'orientale", en: "The Panuzzo à l'orientale", es: "El Panuzzo a la oriental" },
  panTexto: {
    fr: "Pétri sur place et cuit à la commande dans notre four : il arrive encore chaud entre vos mains, doré dehors, moelleux dedans.",
    en: "Kneaded on site and baked to order in our oven: it reaches your hands still warm, golden outside and soft inside.",
    es: "Amasado aquí y horneado al momento en nuestro horno: llega todavía caliente a tus manos, dorado por fuera y tierno por dentro.",
  },
  ingredientes: [
    { fr: "Curcuma", en: "Turmeric", es: "Cúrcuma" },
    { fr: "Cumin noir", en: "Black cumin", es: "Comino negro" },
    { fr: "Huile d'olive", en: "Olive oil", es: "Aceite de oliva" },
  ],
  sello: { fr: "Uniques et faits minute !", en: "One of a kind, made to order!", es: "¡Únicos y hechos al momento!" },
  elHorno: { fr: "Le four", en: "The oven", es: "El horno" },

  // ES: Carta. · EN: Menu.
  cartaAntetitulo: { fr: "Sur pain maison", en: "On house-made bread", es: "En pan casero" },
  cartaTitulo: { fr: "Le menu", en: "The menu", es: "La carta" },

  // ES: Historia. · EN: Story.
  arabe: { fr: "« café » en arabe", en: "“coffee” in Arabic", es: "«café» en árabe" },

  // ES: Galería. · EN: Gallery.
  galeriaAntetitulo: { fr: "Au comptoir", en: "At the counter", es: "En el mostrador" },
  galeriaNota: { fr: "Photos de clients publiées sur Google Maps.", en: "Customer photos posted on Google Maps.", es: "Fotos de clientes publicadas en Google Maps." },

  // ES: Opiniones. · EN: Reviews.
  opinionesAntetitulo: { fr: "Ce qu'on dit au comptoir", en: "What people say at the counter", es: "Lo que se dice en el mostrador" },
  opinionesTemas: { fr: "Les plus cités dans les avis", en: "Most mentioned in reviews", es: "Lo más citado en las opiniones" },
  verOpiniones: { fr: "Lire les avis", en: "Read the reviews", es: "Leer las opiniones" },

  // ES: Visita. · EN: Visit.
  visitaAntetitulo: { fr: "Passez nous voir", en: "Come by", es: "Ven a vernos" },
  rinos: {
    fr: "Cherchez la façade bleue et les deux rhinocéros dorés.",
    en: "Look for the blue storefront and the two golden rhinos.",
    es: "Busca la fachada azul y los dos rinocerontes dorados.",
  },

  // ES: Pie de página. · EN: Footer.
  creditos: { fr: "Photos : clients sur Google Maps", en: "Photos: customers on Google Maps", es: "Fotos: clientes en Google Maps" },
} satisfies Record<string, Texto | Texto[]>;
