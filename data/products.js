/* ============================================================
   ACOSTA STORE · datos de la tienda
   Edita aquí productos, precios y contacto. Cuando llegue el Excel
   con los productos reales, se reemplaza solo la lista "products".
   TODOS los productos de abajo son EJEMPLOS provisionales.
   cat: tenis | zapatos | sandalias | cuidado
   ============================================================ */
window.ACOSTA = {
  brand: "Acosta Store",
  tagline: "Estilo de pies a cabeza.",
  whatsapp: "18297150290",            // formato internacional, sin signos
  whatsappDisplay: "829-715-0290",
  city: "República Dominicana",
  promo: { code: "BIENVENIDO15", pct: 15, giftOver: 5000 },   // EJEMPLO

  products: [
    {
      id: "aura-court", cat: "tenis", vibe: "casual", name: "Aura Court", gender: "Unisex", kind: "Tenis urbanos",
      price: 3400, sizes: ["38", "39", "40", "41", "42", "43", "44"],
      image: "assets/aura-court.svg", ground: "#E4D6BC", tint: "#C4A27A",
      tagline: "El tenis blanco que combina con todo: limpio, ligero y listo para el día a día.",
      specs: [["Material", "Cuero sintético premium"], ["Comodidad", "Plantilla acolchada"], ["Cuidado", "Se limpia con paño húmedo"]],
      ideal: "Uso diario, universidad y salidas casuales"
    },
    {
      id: "oxford-clasico", cat: "zapatos", vibe: "elegante", name: "Oxford Clásico", gender: "Masculino", kind: "Zapatos de vestir",
      price: 4800, sizes: ["39", "40", "41", "42", "43", "44"],
      image: "assets/oxford-clasico.svg", ground: "#D9D3BB", tint: "#6B4A2C",
      tagline: "Elegancia sobria en cuero marrón: el zapato para quien quiere verse impecable.",
      specs: [["Material", "Cuero pulido"], ["Suela", "Goma antideslizante"], ["Cuidado", "Betún neutro y cepillo"]],
      ideal: "Oficina, eventos y ocasiones especiales"
    },
    {
      id: "slide-arena", cat: "sandalias", vibe: "casual", name: "Slide Arena", gender: "Femenino", kind: "Sandalias",
      price: 1900, sizes: ["36", "37", "38", "39", "40", "41"],
      image: "assets/slide-arena.svg", ground: "#E8D2BE", tint: "#B89468",
      tagline: "Una sandalia suave y fresca, pensada para el calor y para ir sin prisa.",
      specs: [["Material", "Tira acolchada"], ["Suela", "Flexible y ligera"], ["Cuidado", "Lavable con agua y jabón"]],
      ideal: "Playa, paseos y uso en casa"
    },
    {
      id: "crema-corporal", cat: "cuidado", vibe: "casual", name: "Crema Corporal", gender: "Unisex", kind: "Cuidado personal",
      price: 780, sizes: ["Único"],
      image: "assets/crema-corporal.svg", ground: "#E5DABF", tint: "#C9B48E",
      tagline: "Hidratación diaria con textura ligera que deja la piel suave sin sentirse grasosa.",
      specs: [["Contenido", "250 ml"], ["Tipo de piel", "Todo tipo"], ["Uso", "Después del baño"]],
      ideal: "Rutina diaria y regalo"
    },
    {
      id: "serum-facial", cat: "cuidado", vibe: "elegante", name: "Sérum Facial", gender: "Unisex", kind: "Cuidado personal",
      price: 1250, sizes: ["Único"],
      image: "assets/serum-facial.svg", ground: "#DADCC4", tint: "#8A8F5E",
      tagline: "Un sérum de absorción rápida para una piel con luz propia, mañana y noche.",
      specs: [["Contenido", "30 ml"], ["Tipo de piel", "Todo tipo"], ["Uso", "2 a 3 gotas, mañana y noche"]],
      ideal: "Rutina de piel y cuidado diario"
    }
  ]
};
