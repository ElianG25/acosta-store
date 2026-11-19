/* ============================================================
   ACOSTA STORE · datos de la tienda
   Edita aquí productos, precios y contacto.
   Reales (dados por la dueña): nombres, precios, WhatsApp, Instagram,
   pago contra entrega y 15 % en la tercera compra.
   Fotos: reales (enviadas por la dueña). EJEMPLO (por confirmar): tallas.
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
      id: "bruno-marc", cat: "zapatos", vibe: "elegante", name: "Zapatos Bruno Marc", gender: "Masculino", kind: "Zapatos casuales de vestir",
      price: 2800, sizeLabel: "Talla", sizes: ["39", "40", "41", "42", "43", "44"],
      image: "assets/photos/bruno-1.webp", images: ["assets/photos/bruno-1.webp", "assets/photos/bruno-2.webp", "assets/photos/bruno-3.webp", "assets/photos/bruno-4.webp", "assets/photos/bruno-5.webp", "assets/photos/bruno-6.webp", "assets/photos/bruno-7.webp"], ground: "#E2DED6", tint: "#C4A27A",
      tagline: "Zapatos Bruno Marc con diseño elegante y suela cómoda: para verte bien sin renunciar a la comodidad.",
      specs: [["Marca", "Bruno Marc"], ["Estilo", "Casual de vestir"], ["Colores", "Marrón, azul marino y negro"]],
      ideal: "Oficina, eventos y uso diario"
    },
    {
      id: "tenis-mujer", cat: "tenis", vibe: "casual", name: "Tenis de mujer", gender: "Femenino", kind: "Tenis casuales",
      price: 1600, sizeLabel: "Talla", sizes: ["36", "37", "38", "39", "40", "41"],
      image: "assets/photos/tenis-1.webp", images: ["assets/photos/tenis-1.webp"], ground: "#E6E1DA", tint: "#C4A27A",
      tagline: "Tenis blancos y limpios con detalle metálico, fáciles de combinar con todo.",
      specs: [["Estilo", "Tenis casual blanco"], ["Detalle", "Metálico rosa, plata o dorado"], ["Para", "Mujer"]],
      ideal: "Uso diario, universidad y salidas"
    },
    {
      id: "sandalias-mujer", cat: "sandalias", vibe: "casual", name: "Sandalias de mujer", gender: "Femenino", kind: "Sandalias",
      price: 1500, sizeLabel: "Talla", sizes: ["36", "37", "38", "39", "40", "41"],
      image: "assets/photos/sandalias-1.webp", images: ["assets/photos/sandalias-1.webp", "assets/photos/sandalias-2.webp", "assets/photos/sandalias-3.webp", "assets/photos/sandalias-4.webp", "assets/photos/sandalias-5.webp"], ground: "#E8DCCB", tint: "#C4A27A",
      tagline: "Sandalias cómodas y con estilo, en varios modelos para el calor de todos los días.",
      specs: [["Estilo", "Sandalias casuales"], ["Modelos", "Varios, escríbenos por el tuyo"], ["Para", "Mujer"]],
      ideal: "Paseos, playa y uso diario"
    },
    {
      id: "eos", cat: "cuidado", vibe: "casual", name: "EOS Body Lotion", gender: "Unisex", kind: "Loción corporal",
      price: 1150, sizeLabel: "Aroma", sizes: ["Coconut Waters", "Beach Waves", "Pomegranate Raspberry", "Jasmine Peach", "Fresh + Easy", "Pink Champagne", "Crème de Pistache", "Vanilla Cashmere"],
      image: "assets/photos/eos-1.webp", images: ["assets/photos/eos-1.webp", "assets/photos/eos-2.webp", "assets/photos/eos-3.webp", "assets/photos/eos-4.webp", "assets/photos/eos-5.webp"], ground: "#E6D9DD", tint: "#C4A27A",
      tagline: "Loción corporal EOS con 24 horas de hidratación y aromas para todos los gustos.",
      specs: [["Marca", "EOS Shea Better"], ["Contenido", "16 fl oz (473 ml)"], ["Hidratación", "24 horas"]],
      ideal: "Rutina diaria de hidratación"
    },
    {
      id: "bbw-colonia", cat: "cuidado", vibe: "elegante", name: "Colonia Bath & Body Works", gender: "Unisex", kind: "Colonia (fragrance mist)",
      price: 1000, sizeLabel: "Aroma", sizes: ["Into the Night", "In the Stars", "Platinum", "Japanese Cherry Blossom", "Champagne Toast"],
      image: "assets/photos/bbw-1.webp", images: ["assets/photos/bbw-1.webp", "assets/photos/bbw-2.webp", "assets/photos/bbw-3.webp", "assets/photos/bbw-4.webp"], ground: "#E9D9DD", tint: "#C4A27A",
      tagline: "Colonia corporal Bath & Body Works en aromas dulces y frescos para todos los días.",
      specs: [["Marca", "Bath & Body Works"], ["Producto", "Fragrance mist"], ["Precio", "RD$ 1,000 c/u"]],
      ideal: "Regalos y uso diario"
    },
    {
      id: "bbw-combo", cat: "cuidado", vibe: "elegante", name: "Combo Bath & Body Works", gender: "Unisex", kind: "Crema corporal + colonia",
      price: 1800, sizeLabel: "Aroma", sizes: ["Into the Night", "In the Stars", "Platinum", "Japanese Cherry Blossom", "Champagne Toast"],
      image: "assets/photos/bbw-1.webp", images: ["assets/photos/bbw-1.webp", "assets/photos/bbw-2.webp", "assets/photos/bbw-3.webp", "assets/photos/bbw-4.webp"], ground: "#E9D9DD", tint: "#C4A27A",
      tagline: "El combo completo: crema corporal y colonia del mismo aroma a precio especial.",
      specs: [["Marca", "Bath & Body Works"], ["Incluye", "Crema corporal + colonia"], ["Ahorro", "RD$ 200 vs. por separado"]],
      ideal: "Regalos y rutina de cuidado personal"
    },
    {
      id: "vitaminas", cat: "cuidado", vibe: "elegante", name: "Vitaminas Nature's Bounty", gender: "Femenino", kind: "Vitaminas en gomitas",
      price: 1000, sizeLabel: "Tipo", sizes: ["Hair, Skin & Nails", "Women's Multi"],
      image: "assets/photos/vitaminas-1.webp", images: ["assets/photos/vitaminas-1.webp", "assets/photos/vitaminas-2.webp"], ground: "#EFE0DF", tint: "#C4A27A",
      tagline: "Gomitas Nature's Bounty para mujer: Hair, Skin & Nails con biotina o Women's Multi con colágeno.",
      specs: [["Marca", "Nature's Bounty"], ["Hair, Skin & Nails", "2,500 mcg de biotina · fresa"], ["Women's Multi", "50 mg de colágeno · frutos rojos"]],
      ideal: "Rutina de bienestar y belleza"
    },
    {
      id: "cargador", cat: "tecnologia", vibe: "casual", name: "Cargador portátil Zonix Z123", gender: "Unisex", kind: "Power bank",
      price: 1250, sizeLabel: "Color", sizes: ["Blanco", "Negro"],
      image: "assets/photos/cargador-1.webp", images: ["assets/photos/cargador-1.webp"], ground: "#E3E6C8", tint: "#C4A27A",
      tagline: "Power bank de 10,000 mAh con cables integrados y varias salidas para no quedarte sin batería.",
      specs: [["Capacidad", "10,000 mAh · 3A"], ["Conexiones", "Micro, Type-C, iOS y USB-A"], ["Extra", "Luz integrada"]],
      ideal: "Viajes, universidad y trabajo"
    }
  ]
};
