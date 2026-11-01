/**
 * [EDITABLE] Datos del café / Café data
 *
 * ES: Datos de Kahwa Café (Montréal). Es el archivo que se edita para cambiar textos, precios, horario,
 *     contacto y fotos; el diseño no hace falta tocarlo. Fuentes de cada dato en docs/INFO-EXTRAIDA.md.
 *     Por confirmar con el dueño antes de publicar:
 *       - WhatsApp: se usa el teléfono público del local; no sabemos si tiene WhatsApp.
 *       - Precios: los de la pizarra exterior (antes de impuestos). Frites y extras sin precio legible.
 *       - Fotos: de clientes en Google Maps (con su crédito); para la web real, usar las del local.
 * EN: Kahwa Café (Montréal) data. This is the file to edit to change texts, prices, hours, contact and
 *     photos; the design does not need to be touched. Data sources in docs/INFO-EXTRAIDA.md.
 *     To confirm with the owner before going live:
 *       - WhatsApp: the shop's public phone is used; we don't know whether it has WhatsApp.
 *       - Prices: from the outdoor menu board (before tax). Fries and extras have no readable price.
 *       - Photos: customer photos from Google Maps (credited); the real site should use the shop's own.
 *
 * ES: Textos con varios idiomas: { fr: "…", en: "…", es: "…" }. Respeta comillas y comas al editar.
 * EN: Multi-language texts: { fr: "…", en: "…", es: "…" }. Keep quotes and commas intact when editing.
 */
import type { CafeConfig, Foto } from "@/motor/tipos";

// ES: Ayudante para declarar una foto: archivo en /public/img, medidas reales, texto alternativo y autor.
// EN: Helper to declare a photo: file in /public/img, real size, alt text and author.
const foto = (archivo: string, ancho: number, alto: number, alt: Foto["alt"], autor?: string): Foto => ({
  src: `/img/${archivo}`,
  ancho,
  alto,
  alt,
  autor,
});

// ES: Todas las fotos del café en un solo lugar. Para cambiar una, sustituye el archivo en /public/img
//     con el mismo nombre, o cambia aquí el nombre y sus medidas (ancho y alto en píxeles).
// EN: All the café's photos in one place. To change one, replace the file in /public/img keeping the
//     same name, or change its name and size (width and height in pixels) here.
const FOTOS = {
  devanture: foto("devanture-porte.jpg", 1200, 1600, {
    fr: "La devanture bleue de Kahwa Café, sa porte couverte d'autocollants et l'enseigne « Depuis 2010 »",
    en: "Kahwa Café's blue storefront, its sticker-covered door and the “Depuis 2010” sign",
    es: "La fachada azul de Kahwa Café, su puerta llena de pegatinas y el letrero «Depuis 2010»",
  }, "David Korenberg"),
  facade: foto("facade.jpg", 1600, 1107, {
    fr: "La façade complète avec les deux rhinocéros dorés et le menu affiché",
    en: "The full storefront with the two golden rhinos and the posted menu",
    es: "La fachada completa con los dos rinocerontes dorados y la carta expuesta",
  }, "G C"),
  panko: foto("poulet-panko.jpg", 1600, 1200, {
    fr: "Sandwich au poulet panko sur papier à carreaux bleus",
    en: "Panko chicken sandwich on blue checkered paper",
    es: "Sándwich de pollo panko sobre papel de cuadros azules",
  }, "Janie Fortin"),
  kebab: foto("kebab-libre.jpg", 1171, 752, {
    fr: "Le Kébab Libre, agneau et bœuf effilochés dans le pain maison",
    en: "Le Kébab Libre, pulled lamb and beef in the house bread",
    es: "Le Kébab Libre, cordero y res deshilachados en el pan casero",
  }, "Ib Ab"),
  italien: foto("l-italien.jpg", 1290, 694, {
    fr: "L'Italien : mozzarella fraîche, tomates, roquette et pesto",
    en: "L'Italien: fresh mozzarella, tomatoes, arugula and pesto",
    es: "L'Italien: mozzarella fresca, tomate, rúcula y pesto",
  }),
  merguez: foto("merguez-maison.jpg", 561, 460, {
    fr: "Le Merguez Maison dans son pain doré",
    en: "Le Merguez Maison in its golden bread",
    es: "Le Merguez Maison en su pan dorado",
  }, "Ib Ab"),
  four: foto("four-a-pain.jpg", 1600, 1200, {
    fr: "Les boules de pâte dans le four, pendant qu'on abaisse la pâte au comptoir",
    en: "Dough balls in the oven while the dough is rolled out at the counter",
    es: "Las bolas de masa en el horno mientras se estira la masa en el mostrador",
  }, "FD"),
  comptoir: foto("comptoir.jpg", 1600, 1200, {
    fr: "Le comptoir, le menu au mur et les lampes cage",
    en: "The counter, the menu board and the cage lamps",
    es: "El mostrador, la carta en la pared y las lámparas de jaula",
  }),
  pain: foto("pain-maison.jpg", 940, 635, {
    fr: "Le pain maison, doré et légèrement grillé",
    en: "The house bread, golden and lightly charred",
    es: "El pan casero, dorado y ligeramente tostado",
  }, "Ib Ab"),
};

export const cafe: CafeConfig = {
  // ── Gama y ajustes generales · Tier and general settings ───────────────────────────
  // ES: gama = "basica" | "estandar" | "premium" (qué secciones salen; ver README).
  // EN: gama = "basica" | "estandar" | "premium" (which sections show; see README).
  gama: "premium",
  // ES: true mientras sea una maqueta (aviso visible, fuera de Google). false en la web real.
  // EN: true while it is a mock-up (visible notice, hidden from Google). false on the real site.
  demo: true,
  tipo: "Restaurant",
  // ES: Idioma por defecto e idiomas disponibles ("fr", "en", "es").
  // EN: Default language and available languages ("fr", "en", "es").
  idiomaBase: "fr",
  idiomas: ["fr", "en", "es"],
  // ES: País y moneda para formatear precios y horas. · EN: Country and currency for prices and times.
  region: "CA",
  moneda: "CAD",

  // ── Marca · Brand ──────────────────────────────────────────────────────────────────
  // ES: Nombre, lema y descripción (Google también usa la descripción).
  // EN: Name, tagline and description (Google also uses the description).
  marca: {
    nombre: "Kahwa Café",
    eslogan: { fr: "Sandwicherie urbaine légendaire", en: "Legendary urban sandwich shop", es: "Sandwichería urbana legendaria" },
    descripcion: {
      fr: "Des sandwichs sur pain maison, pétri et cuit à la commande, sur l'avenue du Mont-Royal depuis 2010.",
      en: "Sandwiches on house-made bread, kneaded and baked to order, on Mont-Royal Avenue since 2010.",
      es: "Sándwiches en pan casero, amasado y horneado al momento, en la avenida Mont-Royal desde 2010.",
    },
    desde: 2010,
    icono: "/marca/icono.svg",
  },

  // ── Contacto y ubicación · Contact and location ────────────────────────────────────
  // ES: Dirección, teléfono y WhatsApp. lat/lng salen de la URL de Google Maps (!3d…!4d…).
  // EN: Address, phone and WhatsApp. lat/lng come from the Google Maps URL (!3d…!4d…).
  contacto: {
    direccion: "331, avenue du Mont-Royal Est",
    ciudad: "Montréal",
    codigoPostal: "H2T 1P8",
    provincia: "QC",
    pais: "CA",
    lat: 45.5233015,
    lng: -73.5836349,
    telefono: "+1 438-836-9706",
    // ES: POR CONFIRMAR: teléfono público del local; falta saber si tiene WhatsApp. Solo dígitos, con prefijo.
    // EN: TO CONFIRM: the shop's public phone; we don't know if it has WhatsApp. Digits only, with country code.
    whatsapp: "14388369706",
    referencia: {
      fr: "À deux pas du métro Mont-Royal (ligne orange)",
      en: "A stone's throw from Mont-Royal metro (orange line)",
      es: "A dos pasos del metro Mont-Royal (línea naranja)",
    },
    mapsUrl: "https://maps.app.goo.gl/sc2tjrwp9FKQvYkc8",
  },

  // ── Horario · Opening hours ────────────────────────────────────────────────────────
  // ES: Una línea por día (0 = domingo … 6 = sábado), horas "HH:MM" de 24 h.
  //     Día cerrado = quita su línea. Dos turnos el mismo día = dos líneas con ese día.
  // EN: One line per day (0 = Sunday … 6 = Saturday), 24-hour "HH:MM" times.
  //     Closed day = remove its line. Two shifts on one day = two lines with that day.
  horario: {
    // ES: Montréal usa la hora del Este, la misma zona que Toronto. · EN: Montreal uses Eastern Time, same as Toronto.
    zonaHoraria: "America/Toronto",
    franjas: [
      { dia: 0, abre: "10:00", cierra: "22:00" },
      { dia: 1, abre: "10:00", cierra: "22:00" },
      { dia: 2, abre: "10:00", cierra: "22:00" },
      { dia: 3, abre: "10:00", cierra: "22:00" },
      { dia: 4, abre: "10:00", cierra: "23:00" },
      { dia: 5, abre: "10:00", cierra: "23:00" },
      { dia: 6, abre: "10:00", cierra: "23:00" },
    ],
  },

  // ES: Servicios junto a la dirección. · EN: Services shown next to the address.
  servicios: [{ fr: "Accessible en fauteuil roulant", en: "Wheelchair accessible", es: "Accesible en silla de ruedas" }],

  // ES: Foto de la vista previa al compartir el enlace. · EN: Link preview photo when sharing.
  portada: FOTOS.facade,

  // ── Carta · Menu ───────────────────────────────────────────────────────────────────
  // ES: Categorías → platos. Precio con punto decimal (11.8 = 11,80 $), antes de impuestos.
  //     Sin `precio`, el plato se muestra pero no se puede pedir. Cada `id` es único y sin espacios.
  //     vegetariano: true añade el icono ⊙; destacado: true lo pinta en dorado.
  // EN: Categories → items. Price with a decimal point (11.8 = $11.80), before tax.
  //     Without `precio` the item is shown but cannot be ordered. Every `id` is unique, with no spaces.
  //     vegetariano: true adds the ⊙ icon; destacado: true paints it gold.
  carta: [
    {
      id: "sandwichs",
      nombre: { fr: "Sandwichs", en: "Sandwiches", es: "Sándwiches" },
      nota: {
        fr: "Sur pain maison, pétri et cuit à la commande.",
        en: "On house-made bread, kneaded and baked to order.",
        es: "En pan casero, amasado y horneado al momento.",
      },
      platos: [
        {
          id: "poulet-panko",
          nombre: "Poulet Panko",
          descripcion: {
            fr: "Poulet frit au panko, salade mixte, sauce KAHWA",
            en: "Panko fried chicken, mixed salad, KAHWA sauce",
            es: "Pollo frito con panko, ensalada mixta, salsa KAHWA",
          },
          precio: 11.8,
          destacado: true,
          etiquetas: [{ fr: "Le plus cité", en: "Most mentioned", es: "El más citado" }],
          foto: FOTOS.panko,
        },
        {
          id: "kebab-libre",
          nombre: "Le Kébab Libre",
          descripcion: {
            fr: "Agneau du Québec, bœuf, sauce yogourt, salade mixte, sauce KAHWA",
            en: "Quebec lamb, beef, yogurt sauce, mixed salad, KAHWA sauce",
            es: "Cordero de Quebec, res, salsa de yogur, ensalada mixta, salsa KAHWA",
          },
          precio: 13.5,
          foto: FOTOS.kebab,
        },
        {
          id: "merguez-maison",
          nombre: "Le Merguez Maison",
          descripcion: {
            fr: "Merguez, salade mixte, sauce KAHWA",
            en: "Merguez sausage, mixed salad, KAHWA sauce",
            es: "Merguez, ensalada mixta, salsa KAHWA",
          },
          precio: 11.8,
          foto: FOTOS.merguez,
        },
        {
          id: "thon-tunisien",
          nombre: "Le Thon Tunisien",
          descripcion: {
            fr: "Thon, salade mixte, sauce KAHWA, œuf frit",
            en: "Tuna, mixed salad, KAHWA sauce, fried egg",
            es: "Atún, ensalada mixta, salsa KAHWA, huevo frito",
          },
          precio: 10.8,
        },
        {
          id: "l-italien",
          nombre: "L'Italien",
          descripcion: {
            fr: "Tomates, mozzarella fraîche, pesto, roquette, balsamique",
            en: "Tomatoes, fresh mozzarella, pesto, arugula, balsamic",
            es: "Tomate, mozzarella fresca, pesto, rúcula, balsámico",
          },
          precio: 10.8,
          vegetariano: true,
          foto: FOTOS.italien,
        },
        {
          id: "le-vege",
          nombre: "Le Végé",
          descripcion: {
            fr: "Légumes grillés, pesto, fromage de chèvre ou feta",
            en: "Grilled vegetables, pesto, goat cheese or feta",
            es: "Verduras a la parrilla, pesto, queso de cabra o feta",
          },
          precio: 10.8,
          vegetariano: true,
        },
        {
          id: "le-falafel",
          nombre: "Le Falafel",
          descripcion: {
            fr: "Falafel, salade mixte, houmous, yogourt au tahini, cornichons et radis marinés",
            en: "Falafel, mixed salad, hummus, tahini yogurt, pickles and pickled radish",
            es: "Falafel, ensalada mixta, hummus, yogur con tahini, pepinillos y rábanos encurtidos",
          },
          precio: 10.8,
          vegetariano: true,
        },
      ],
    },
    {
      id: "frites-extras",
      nombre: { fr: "Frites & extras", en: "Fries & extras", es: "Papas y extras" },
      nota: { fr: "Prix affichés au comptoir.", en: "Prices posted at the counter.", es: "Precios en el mostrador." },
      platos: [
        { id: "duo", nombre: "Duo", descripcion: { fr: "Votre sandwich avec frites", en: "Your sandwich with fries", es: "Tu sándwich con papas fritas" } },
        { id: "trio", nombre: "Trio", descripcion: { fr: "Avec frites et boisson", en: "With fries and a drink", es: "Con papas fritas y bebida" } },
        { id: "frites", nombre: { fr: "Frites seules", en: "Fries only", es: "Solo papas fritas" } },
        { id: "extra-merguez", nombre: { fr: "Extra merguez", en: "Extra merguez", es: "Merguez extra" } },
        {
          id: "extra-sauce",
          nombre: { fr: "Sauce KAHWA en extra", en: "Extra KAHWA sauce", es: "Salsa KAHWA extra" },
          descripcion: { fr: "Harissa maison et mayonnaise", en: "House harissa and mayo", es: "Harissa casera y mayonesa" },
        },
      ],
    },
  ],
  // ES: Nota bajo la carta. · EN: Note under the menu.
  notaPrecios: { fr: "* Prix avant taxes.", en: "* Prices before tax.", es: "* Precios antes de impuestos." },

  // ── Historia · Story ───────────────────────────────────────────────────────────────
  // ES: Párrafos y tres momentos clave (hitos). · EN: Paragraphs and three key moments (hitos).
  historia: {
    titulo: { fr: "Depuis 2010", en: "Since 2010", es: "Desde 2010" },
    parrafos: [
      {
        fr: "« Kahwa », c'est le café en arabe. En 2010, Anis Ghozzi ouvre un petit café sur l'avenue du Mont-Royal, vite adopté par les étudiants et les artistes du Plateau.",
        en: "“Kahwa” means coffee in Arabic. In 2010, Anis Ghozzi opened a small café on Mont-Royal Avenue that Plateau students and artists quickly made their own.",
        es: "«Kahwa» significa café en árabe. En 2010, Anis Ghozzi abrió un pequeño café en la avenida Mont-Royal que los estudiantes y artistas del Plateau hicieron suyo enseguida.",
      },
      {
        fr: "Quand la pandémie frappe, il transforme le café en sandwicherie. Le pain naît presque par accident : il voulait faire des panuzzi à la sicilienne, mais son four ne cuisait pas le cœur de la pâte… alors il a enfourné une boule de pâte entière.",
        en: "When the pandemic hit, he turned the café into a sandwich shop. The bread was born almost by accident: he wanted to make Sicilian-style panuzzi, but his oven couldn't cook the middle of the dough… so he baked a whole ball of dough instead.",
        es: "Cuando llegó la pandemia, convirtió el café en sandwichería. El pan nació casi por accidente: quería hacer panuzzi al estilo siciliano, pero su horno no cocía el centro de la masa… así que horneó una bola de masa entera.",
      },
      {
        fr: "Le résultat : le Panuzzo à l'orientale, au curcuma, au cumin noir et à l'huile d'olive, cuit à la commande et servi encore chaud.",
        en: "The result: the Panuzzo à l'orientale, with turmeric, black cumin and olive oil, baked to order and served still warm.",
        es: "El resultado: el Panuzzo a la oriental, con cúrcuma, comino negro y aceite de oliva, horneado al momento y servido todavía caliente.",
      },
    ],
    hitos: [
      {
        anio: "2010",
        titulo: { fr: "Le café", en: "The café", es: "El café" },
        texto: {
          fr: "Kahwa ouvre sur Mont-Royal, repaire d'étudiants et d'artistes.",
          en: "Kahwa opens on Mont-Royal, a hangout for students and artists.",
          es: "Kahwa abre en Mont-Royal, refugio de estudiantes y artistas.",
        },
      },
      {
        anio: { fr: "La pandémie", en: "The pandemic", es: "La pandemia" },
        titulo: { fr: "La sandwicherie", en: "The sandwich shop", es: "La sandwichería" },
        texto: {
          fr: "Le café devient sandwicherie, avec son propre four à pain.",
          en: "The café becomes a sandwich shop with its own bread oven.",
          es: "El café se convierte en sandwichería, con su propio horno de pan.",
        },
      },
      {
        anio: { fr: "Aujourd'hui", en: "Today", es: "Hoy" },
        titulo: { fr: "Légendaire", en: "Legendary", es: "Legendaria" },
        texto: {
          fr: "4,6 étoiles sur plus de 2 600 avis Google, et le poulet panko en tête.",
          en: "4.6 stars across 2,600+ Google reviews, with the panko chicken on top.",
          es: "4,6 estrellas en más de 2.600 opiniones de Google, con el pollo panko a la cabeza.",
        },
      },
    ],
  },

  // ── Galería · Gallery ──────────────────────────────────────────────────────────────
  // ES: Fotos en el orden en que se muestran (mínimo 3). · EN: Photos in display order (at least 3).
  galeria: [FOTOS.panko, FOTOS.four, FOTOS.kebab, FOTOS.facade, FOTOS.italien, FOTOS.comptoir, FOTOS.merguez, FOTOS.pain, FOTOS.devanture],

  // ── Opiniones · Reviews ────────────────────────────────────────────────────────────
  // ES: Nota, total y temas de Google Maps; actualízalos cada pocos meses.
  // EN: Rating, total and topics from Google Maps; update them every few months.
  resenas: {
    nota: 4.6,
    total: 2657,
    fuente: "Google",
    url: "https://maps.app.goo.gl/sc2tjrwp9FKQvYkc8",
    temas: [
      { nombre: "Panko", menciones: 158 },
      { nombre: { fr: "Kébab", en: "Kebab", es: "Kebab" }, menciones: 66 },
      { nombre: "Merguez", menciones: 54 },
      { nombre: { fr: "Sandwich à l'agneau", en: "Lamb sandwich", es: "Sándwich de cordero" }, menciones: 30 },
    ],
    // ES: Resúmenes de varias opiniones (sin autor): no son citas literales.
    // EN: Summaries of several reviews (no author): they are not verbatim quotes.
    destacadas: [
      {
        texto: {
          fr: "Un pain unique, pétri et cuit sur place.",
          en: "One-of-a-kind bread, kneaded and baked on site.",
          es: "Un pan único, amasado y horneado en el local.",
        },
      },
      {
        texto: {
          fr: "Souvent bondé et peu de tables : prenez votre temps, ou commandez pour emporter.",
          en: "Often packed, with few tables: take your time, or order to go.",
          es: "Suele estar lleno y hay pocas mesas: ve con calma o pide para llevar.",
        },
      },
      {
        texto: {
          fr: "À deux pas du métro Mont-Royal, sur une avenue pleine de vie.",
          en: "Steps from Mont-Royal metro, on a lively avenue.",
          es: "A dos pasos del metro Mont-Royal, en una avenida con mucha vida.",
        },
      },
    ],
  },

  // ── Ajustes de la gama · Tier tweaks ───────────────────────────────────────────────
  // ES: Local con pocas mesas: la reserva no encaja; los pedidos para llevar sí. Para activarla: reserva: true.
  // EN: Few tables: bookings don't fit, pickup orders do. To turn bookings on: reserva: true.
  funciones: { reserva: false },
};
