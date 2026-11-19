/* ============================================================
   ACOSTA STORE · datos de la tienda
   Edita aquí productos, precios y contacto.
   Reales (dados por la dueña): nombres, precios, WhatsApp, Instagram,
   pago contra entrega y 15 % en la tercera compra.
   EJEMPLO (por confirmar): tallas, descripciones, detalles y fotos.
   cat: zapatos | sandalias | tenis | cuidado | tecnologia
   ============================================================ */
window.ACOSTA = {
  brand: "Acosta Store",
  tagline: "Estilo de pies a cabeza.",
  whatsapp: "18099996514",            // formato internacional, sin signos
  whatsappDisplay: "809-999-6514",
  instagram: "@Acostastore05",
  instagramUrl: "https://instagram.com/Acostastore05",
  city: "Tienda virtual · República Dominicana",
  promo: { pct: 15 },                 // 15 % en la tercera compra

  products: [
    {
      id: "bruno-marc", cat: "zapatos", vibe: "elegante", name: "Zapatos Bruno Marc", gender: "Masculino", kind: "Zapatos de vestir",
      price: 2800, sizeLabel: "Talla", sizes: ["39", "40", "41", "42", "43", "44"],
      image: "assets/oxford-clasico.svg", ground: "#D9D3BB", tint: "#6B4A2C",
      tagline: "Elegancia sobria para quien quiere verse impecable en cualquier ocasión.",
      specs: [["Marca", "Bruno Marc"], ["Estilo", "Zapato de vestir"], ["Pago", "Contra entrega"]],
      ideal: "Oficina, eventos y ocasiones especiales"
    },
    {
      id: "tenis-mujer", cat: "tenis", vibe: "casual", name: "Tenis de mujer", gender: "Femenino", kind: "Tenis",
      price: 1600, sizeLabel: "Talla", sizes: ["36", "37", "38", "39", "40", "41"],
      image: "assets/aura-court.svg", ground: "#E4D6BC", tint: "#C4A27A",
      tagline: "Ligeros, limpios y combinables: el tenis para el día a día.",
      specs: [["Estilo", "Tenis casual"], ["Para", "Mujer"], ["Pago", "Contra entrega"]],
      ideal: "Uso diario, universidad y salidas"
    },
    {
      id: "sandalias-mujer", cat: "sandalias", vibe: "casual", name: "Sandalias de mujer", gender: "Femenino", kind: "Sandalias",
      price: 1500, sizeLabel: "Talla", sizes: ["36", "37", "38", "39", "40", "41"],
      image: "assets/slide-arena.svg", ground: "#E8D2BE", tint: "#B89468",
      tagline: "Frescas y cómodas, pensadas para el calor y para ir sin prisa.",
      specs: [["Estilo", "Sandalia casual"], ["Para", "Mujer"], ["Pago", "Contra entrega"]],
      ideal: "Paseos, playa y uso diario"
    },
    {
      id: "eos", cat: "cuidado", vibe: "casual", name: "EOS Crema y Body Wash", gender: "Unisex", kind: "Cuidado personal",
      price: 1150, sizeLabel: "Presentación", sizes: ["Crema", "Body wash"],
      image: "assets/crema-corporal.svg", ground: "#E5DABF", tint: "#C9B48E",
      tagline: "Cuidado diario para la piel: elige tu crema o tu body wash EOS.",
      specs: [["Marca", "EOS"], ["Tipo", "Crema o body wash"], ["Uso", "Rutina diaria"]],
      ideal: "Después del baño y rutina diaria"
    },
    {
      id: "vitaminas-mujer", cat: "cuidado", vibe: "elegante", name: "Vitaminas para mujeres", gender: "Femenino", kind: "Cuidado personal",
      price: 1000, sizeLabel: "Talla", sizes: ["Único"],
      image: "assets/vitaminas-mujer.svg", ground: "#EBD5CB", tint: "#C4A27A",
      tagline: "Pastillas de vitaminas pensadas para el bienestar diario de ella.",
      specs: [["Formato", "Pastillas"], ["Para", "Mujer"], ["Pago", "Contra entrega"]],
      ideal: "Rutina de bienestar y cuidado diario"
    },
    {
      id: "cargador", cat: "tecnologia", vibe: "casual", name: "Cargador portátil", gender: "Unisex", kind: "Accesorio tecnológico",
      price: 1250, sizeLabel: "Talla", sizes: ["Único"],
      image: "assets/cargador-portatil.svg", ground: "#D9D6C6", tint: "#2B2A1E",
      tagline: "Energía extra en tu bolsillo para que tu celular nunca se quede sin batería.",
      specs: [["Tipo", "Power bank"], ["Uso", "Celulares y accesorios"], ["Pago", "Contra entrega"]],
      ideal: "Viajes, universidad y trabajo"
    }
  ]
};
