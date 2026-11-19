/* ============================================================
   PÉREZ PERFUM · datos de la tienda
   Edita aquí productos, precios y contacto. (Cuando esté el Excel
   con los productos reales, se reemplaza solo este archivo.)
   Los campos marcados "EJEMPLO" son provisionales.
   ============================================================ */
window.PEREZ = {
  brand: "Pérez Perfum",
  tagline: "Una esencia que habla por ti.",
  whatsapp: "18099996514",            // formato internacional, sin signos
  whatsappDisplay: "809-999-6514",
  email: "perezperfum@gmail.com",
  social: "@perezperfum",
  instagramUrl: "https://instagram.com/perezperfum",
  tiktokUrl: "https://www.tiktok.com/@perezperfum",
  city: "Santo Domingo, República Dominicana",
  promo: { code: "BIENVENIDO15", pct: 15, giftOver: 3000 },

  products: [
    {
      id: "ameer", vibe: "dulce", moment: "noche", name: "Ameer", gender: "Masculino", family: "Ámbar especiado",
      price: 3200, decant: 550,                       // decant: EJEMPLO
      image: "assets/ameer.png", ground: "#3d2111", tint: "#c9a24f",
      tagline: "Cálido y envolvente: el perfume que se queda en la memoria de la noche.",
      notes: { top: "Bergamota, cardamomo", heart: "Ámbar, canela", base: "Vainilla, sándalo" },  // EJEMPLO
      ideal: "Noches, cenas y clima fresco"                                                         // EJEMPLO
    },
    {
      id: "noura", vibe: "dulce", moment: "dia", name: "Noura", gender: "Femenino", family: "Floral luminoso",
      price: 3100, decant: 520,
      image: "assets/noura.png", ground: "#4a1d33", tint: "#e7a6bb",
      tagline: "Una rosa suave y luminosa que te acompaña de la mañana a la tarde.",
      notes: { top: "Pera, bergamota rosa", heart: "Rosa de Taif, peonía", base: "Almizcle blanco, vainilla" },
      ideal: "Día a día, oficina y brunch"
    },
    {
      id: "zafir", vibe: "intensa", moment: "noche", name: "Zafir", gender: "Masculino", family: "Oud y cuero",
      price: 3600, decant: 620,
      image: "assets/zafir.png", ground: "#241019", tint: "#5a3a22",
      tagline: "Intenso y elegante, con la profundidad del oud para quien quiere dejar huella.",
      notes: { top: "Pimienta negra, azafrán", heart: "Oud, cuero", base: "Ámbar gris, pachulí" },
      ideal: "Eventos y ocasiones especiales"
    },
    {
      id: "layal", vibe: "dulce", moment: "noche", name: "Layal", gender: "Femenino", family: "Floral frutal",
      price: 3300, decant: 560,
      image: "assets/layal.png", ground: "#4d0f26", tint: "#c2305a",
      tagline: "Frutos rojos y flores nocturnas: seductor, dulce y con carácter.",
      notes: { top: "Frambuesa, litchi", heart: "Rosa, jazmín", base: "Oud suave, haba tonka" },
      ideal: "Salidas nocturnas y citas"
    },
    {
      id: "rayan", vibe: "fresca", moment: "dia", name: "Rayan", gender: "Unisex", family: "Verde fresco",
      price: 2900, decant: 490,
      image: "assets/rayan.png", ground: "#1f3a30", tint: "#6bb28b",
      tagline: "Fresco y limpio, pensado para el calor del Caribe y para compartir.",
      notes: { top: "Menta, limón", heart: "Té verde, hoja de higuera", base: "Musgo, cedro" },
      ideal: "Calor, playa y uso diario"
    },
    {
      id: "sahar", vibe: "intensa", moment: "noche", name: "Sahar", gender: "Unisex", family: "Incienso y lavanda",
      price: 3400, decant: 580,
      image: "assets/sahar.png", ground: "#2e1a4a", tint: "#7a52c2",
      tagline: "Misterioso y sereno: incienso suave sobre un fondo cremoso de benjuí.",
      notes: { top: "Lavanda, ciruela", heart: "Iris, incienso", base: "Benjuí, almizcle" },
      ideal: "Noches tranquilas y regalos"
    },
    {
      id: "malik", vibe: "fresca", moment: "dia", name: "Malik", gender: "Masculino", family: "Aromático acuático",
      price: 3500, decant: 600,
      image: "assets/malik.png", ground: "#14304a", tint: "#3f7fb0",
      tagline: "Limpio y seguro de sí mismo: frescura marina con una base de madera.",
      notes: { top: "Notas acuáticas, bergamota", heart: "Salvia, geranio", base: "Vetiver, cedro, ámbar" },
      ideal: "Trabajo, deporte y todos los días"
    }
  ]
};
