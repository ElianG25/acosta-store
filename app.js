/* PÉREZ PERFUM · comportamiento de la tienda */
(function () {
  "use strict";
  var D = window.PEREZ, P = D.products, MAX = 10;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (n) { return "RD$ " + Math.round(n).toLocaleString("en-US"); };
  var byId = function (id) { return P.filter(function (p) { return p.id === id; })[0]; };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ICON = function (n) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  function openWa(text) {
    var a = document.createElement("a");
    a.href = "https://wa.me/" + D.whatsapp + "?text=" + encodeURIComponent(text);
    a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove();
  }

  /* ---------- aviso (toast) ---------- */
  var toastEl = $("#toast"), toastT;
  function toast(t) { toastEl.textContent = t; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2600); }

  /* ---------- efectos: confeti y vuelo al pedido ---------- */
  var COLORS = ["#C9A24F", "#3A1223", "#D9C9B8", "#e7a6bb", "#FAF6F2"];
  function burst(x, y, n) {
    if (reduce || !document.body.animate) return;
    for (var i = 0; i < (n || 16); i++) {
      var s = document.createElement("i"); s.className = "confetti";
      s.style.left = x + "px"; s.style.top = y + "px"; s.style.background = COLORS[i % COLORS.length];
      document.body.appendChild(s);
      var a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 90;
      var an = s.animate([
        { transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 1 },
        { transform: "translate(" + Math.cos(a) * d + "px," + (Math.sin(a) * d + 40) + "px) rotate(" + (Math.random() * 540) + "deg) scale(.4)", opacity: 0 }
      ], { duration: 700 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.2,1)" });
      an.onfinish = (function (el) { return function () { el.remove(); }; })(s);
    }
  }
  function burstAt(el, n) { if (!el) return; var r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, n); }
  function fly(from, src) {
    if (reduce || !from || !document.body.animate) return;
    var cb = $("#cartOpen").getBoundingClientRect(), fr = from.getBoundingClientRect();
    var im = document.createElement("img"); im.className = "fly"; im.src = src; im.alt = "";
    im.style.left = fr.left + fr.width / 2 - 28 + "px"; im.style.top = fr.top + fr.height / 2 - 28 + "px";
    document.body.appendChild(im);
    var dx = cb.left + cb.width / 2 - (fr.left + fr.width / 2), dy = cb.top + cb.height / 2 - (fr.top + fr.height / 2);
    var an = im.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: "translate(" + dx * .6 + "px," + (dy * .6 - 60) + "px) scale(.8)", opacity: 1, offset: .5 },
      { transform: "translate(" + dx + "px," + dy + "px) scale(.25)", opacity: .3 }
    ], { duration: 750, easing: "cubic-bezier(.5,0,.3,1)" });
    an.onfinish = function () { im.remove(); };
  }

  /* ---------- estado del pedido ---------- */
  var cart = store.get("pp_cart", []), code = store.get("pp_code", ""), ship = store.get("pp_ship", { name: "", zone: "" }), favs = store.get("pp_fav", []);
  if (!Array.isArray(cart)) cart = []; if (!Array.isArray(favs)) favs = [];
  cart = cart.filter(function (l) { return l && byId(l.id) && (l.size === "100" || l.size === "10") && l.qty > 0; });
  favs = favs.filter(function (id) { return byId(id); });
  if (typeof code !== "string") code = "";
  if (!ship || typeof ship !== "object") ship = { name: "", zone: "" };
  function saveCart() { store.set("pp_cart", cart); store.set("pp_code", code); store.set("pp_ship", ship); }

  function add(id, size, origin) {
    var l = cart.filter(function (x) { return x.id === id && x.size === size; })[0];
    if (l && l.qty >= MAX) { toast("Máximo " + MAX + " por producto. Para pedidos al por mayor escríbenos por WhatsApp."); return false; }
    if (l) l.qty++; else cart.push({ id: id, size: size, qty: 1 });
    saveCart(); renderCart();
    var c = $("#cartCount"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
    toast("Añadido: " + byId(id).name + (size === "10" ? " · decant 10 ml" : " · 100 ml"));
    if (origin) { fly(origin, byId(id).image); burstAt(origin, 8); }
    return true;
  }
  function unit(l) { var p = byId(l.id); return l.size === "10" ? p.decant : p.price; }
  function totals() {
    var sub = cart.reduce(function (s, l) { return s + unit(l) * l.qty; }, 0);
    var ok = !!code && code.toUpperCase() === D.promo.code;
    var disc = ok ? Math.round(sub * D.promo.pct / 100) : 0;
    return { sub: sub, disc: disc, total: sub - disc, ok: ok, gift: sub > D.promo.giftOver };
  }

  /* ---------- validaciones ---------- */
  function setErr(input, msg) {
    var e = document.getElementById(input.id + "Err");
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (e) e.textContent = msg || "";
    return !msg;
  }
  function nameError(v) {
    v = v.trim();
    if (v.length < 2) return "Escribe tu nombre (mínimo 2 letras).";
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s'.\-]*$/.test(v)) return "Usa solo letras en tu nombre.";
    return "";
  }
  function phoneDigits(v) { var d = v.replace(/\D/g, ""); if (d.length === 11 && d.charAt(0) === "1") d = d.slice(1); return d.slice(0, 10); }
  function phoneFormat(v) { var d = phoneDigits(v), o = d.slice(0, 3); if (d.length > 3) o += "-" + d.slice(3, 6); if (d.length > 6) o += "-" + d.slice(6); return o; }
  function phoneError(v) {
    if (!v.trim()) return "";
    var d = phoneDigits(v);
    if (d.length !== 10 || !/^(809|829|849)/.test(d)) return "Escribe un número dominicano válido, ej. 829-715-0290.";
    return "";
  }
  function shake(el) { if (reduce) return; el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); }

  /* ---------- carrito (diálogo) ---------- */
  var dlg = $("#cart"), body = $("#cartBody"), foot = $("#cartFoot");
  function lockScroll(on) { document.body.style.overflow = on ? "hidden" : ""; }
  function renderCart() {
    var n = cart.reduce(function (s, l) { return s + l.qty; }, 0);
    $("#cartCount").textContent = n;
    $("#cartOpen").setAttribute("aria-label", "Abrir pedido, " + n + (n === 1 ? " producto" : " productos"));
    if (!cart.length) {
      body.innerHTML = '<div class="empty"><h3>Aún no hay nada aquí</h3><p>Añade una fragancia de la colección o un decant de 10 ml para armar tu pedido.</p></div>';
      foot.innerHTML = '<button class="send" type="button" id="goShop">Ver la colección ' + ICON("arrow") + '</button>';
      $("#goShop").onclick = function () { closeCart(); document.getElementById("coleccion").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); };
      return;
    }
    body.innerHTML = cart.map(function (l, i) {
      var p = byId(l.id);
      return '<div class="line"><img src="' + p.image + '" alt="" width="72" height="96">' +
        '<div><b>' + p.name + '</b><small>' + (l.size === "10" ? "Decant 10 ml" : "Eau de Parfum 100 ml") + ' · ' + money(unit(l)) + '</small>' +
        '<div class="qty"><button type="button" data-q="-1" data-i="' + i + '" aria-label="Quitar una unidad de ' + p.name + '">−</button><span>' + l.qty + '</span><button type="button" data-q="1" data-i="' + i + '" aria-label="Añadir una unidad de ' + p.name + '"' + (l.qty >= MAX ? " disabled" : "") + '>+</button></div></div>' +
        '<div class="line-price">' + money(unit(l) * l.qty) + '<button class="rm" type="button" data-rm="' + i + '">Quitar</button></div></div>';
    }).join("");
    var t = totals();
    foot.innerHTML =
      (t.gift ? '<p class="gift">' + ICON("gift") + ' Tu pedido incluye una miniatura de regalo.</p>' : '<p class="note" style="margin:0 0 12px">Compras de más de ' + money(D.promo.giftOver) + ': miniatura de regalo.</p>') +
      '<form class="promo-row" id="promoForm" novalidate><label class="sr" for="promoIn">Código de descuento</label><input id="promoIn" placeholder="Tu código" value="' + (code || "").replace(/"/g, "") + '" autocomplete="off" maxlength="20"><button type="submit">Aplicar</button></form>' +
      '<p class="msg ' + (t.ok ? "ok" : (code ? "bad" : "")) + '" id="promoMsg" role="status">' + (t.ok ? "Código aplicado: " + D.promo.pct + " % de descuento." : (code ? "Ese código no es válido." : "")) + '</p>' +
      '<div class="sum"><div><span>Subtotal</span><span>' + money(t.sub) + '</span></div>' +
      (t.ok ? '<div><span>Descuento ' + D.promo.code + '</span><span>−' + money(t.disc) + '</span></div>' : '') +
      '<div class="tot"><span>Total</span><span>' + money(t.total) + '</span></div></div>' +
      '<div class="ship"><div class="field"><label class="sr" for="shName">Tu nombre</label><input id="shName" placeholder="Tu nombre" autocomplete="name" maxlength="60" value="' + (ship.name || "").replace(/"/g, "") + '" aria-describedby="shNameErr"><p class="field-err" id="shNameErr" role="alert"></p></div>' +
      '<div class="field"><label class="sr" for="shZone">Zona de entrega</label><select id="shZone" aria-describedby="shZoneErr"><option value="">Zona de entrega</option><option value="Gran Santo Domingo"' + (ship.zone === "Gran Santo Domingo" ? " selected" : "") + '>Gran Santo Domingo (24–48 h)</option><option value="Interior del país"' + (ship.zone === "Interior del país" ? " selected" : "") + '>Interior del país (encomienda)</option></select><p class="field-err" id="shZoneErr" role="alert"></p></div></div>' +
      '<button class="send" type="button" id="sendWa">' + ICON("wa") + ' Enviar pedido por WhatsApp</button>' +
      '<p class="note">Tu nombre y zona viajan en el mensaje. El costo de envío y la forma de pago se coordinan por WhatsApp; aquí no se piden datos de tarjeta.</p>';
    $("#promoForm").onsubmit = applyCode;
    $("#sendWa").onclick = sendOrder;
    $("#shName").oninput = function () { ship.name = this.value; saveCart(); if (this.getAttribute("aria-invalid") === "true") setErr(this, nameError(this.value)); };
    $("#shZone").onchange = function () { ship.zone = this.value; saveCart(); if (this.value) setErr(this, ""); };
  }
  function applyCode(e) {
    e.preventDefault();
    code = $("#promoIn").value.trim(); saveCart();
    var ok = code.toUpperCase() === D.promo.code;
    renderCart();
    if (ok) { burstAt($("#promoMsg"), 18); toast("¡Código aplicado! " + D.promo.pct + " % de descuento"); }
    else if (code) shake($("#promoIn"));
    var i = $("#promoIn"); if (i && code && !ok) i.focus();
  }
  body.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    var q = b.getAttribute("data-q"), i = b.getAttribute("data-i"), r = b.getAttribute("data-rm");
    if (q !== null && cart[i]) { cart[i].qty = Math.min(MAX, cart[i].qty + (+q)); if (cart[i].qty < 1) cart.splice(i, 1); saveCart(); renderCart(); }
    else if (r !== null && cart[r]) { cart.splice(r, 1); saveCart(); renderCart(); }
  });
  function sendOrder() {
    if (!cart.length) return;
    var n = $("#shName"), z = $("#shZone");
    var okN = setErr(n, nameError(n.value)), okZ = setErr(z, z.value ? "" : "Elige tu zona de entrega.");
    if (!okN || !okZ) { (okN ? z : n).focus(); shake($(".ship")); return; }
    var t = totals();
    var lines = cart.map(function (l) {
      var p = byId(l.id), dec = l.size === "10";
      return (dec ? "\ud83d\udca7 " : "\ud83e\uddf4 ") + l.qty + " × *" + p.name + "* · " + (dec ? "decant 10 ml" : "Eau de Parfum 100 ml") + "\n      _" + money(unit(l) * l.qty) + "_";
    });
    var txt = "\ud83d\udecd\ufe0f *NUEVO PEDIDO · Pérez Perfum*\n" +
      "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n" +
      "\ud83d\udc64 *Cliente:* " + n.value.trim() + "\n" +
      "\ud83d\udccd *Entrega:* " + z.value + (z.value === "Gran Santo Domingo" ? " (24–48 h)" : " (encomienda)") + "\n\n" +
      "\u2728 *Mi selección*\n" + lines.join("\n") + "\n\n" +
      "\ud83e\uddfe *Resumen*\n" +
      "• Subtotal: " + money(t.sub) + "\n" +
      (t.ok ? "\ud83c\udf9f\ufe0f Código *" + D.promo.code + "* (−" + D.promo.pct + " %): −" + money(t.disc) + "\n" : "") +
      "\ud83d\udcb0 *Total productos: " + money(t.total) + "*\n" +
      (t.gift ? "\ud83c\udf81 _Incluye miniatura de regalo_\n" : "") +
      "\n\ud83d\ude9a _Envío y forma de pago: por coordinar_\n\n" +
      "¡Gracias por elegirnos! \ud83d\udda4\n_Una esencia que habla por ti._";
    burstAt($("#sendWa"), 22);
    openWa(txt);
    toast("Abrimos WhatsApp con tu pedido");
  }
  $("#cartOpen").onclick = function () { renderCart(); dlg.showModal(); lockScroll(true); };
  function closeCart() { dlg.close(); lockScroll(false); }
  $("#cartClose").onclick = closeCart;
  dlg.addEventListener("close", function () { lockScroll(false); });
  dlg.addEventListener("cancel", function () { lockScroll(false); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeCart(); });

  /* ---------- hero: arco de fragancias ---------- */
  var h1 = $("#h1");
  if (h1 && !reduce) h1.innerHTML = h1.textContent.split(" ").map(function (w, k) { return '<span class="w" style="--k:' + k + '">' + w + "</span>"; }).join(" ");

  var arc = $("#arc"), items = [], cur = -1, moved = false, interacted = false, heroSeen = true;
  P.forEach(function (p, i) {
    var b = document.createElement("button");
    b.className = "arc-item"; b.type = "button";
    b.setAttribute("aria-label", p.name + ", " + p.family + ". Elegir");
    b.innerHTML = '<img src="' + p.image + '" alt="Frasco de ' + p.name + ', Eau de Parfum 100 ml" width="360" height="480" draggable="false">';
    b.addEventListener("click", function () { if (moved) return; interacted = true; goto(i); });
    arc.appendChild(b); items.push(b);
  });
  var heroPick = $(".hero-pick");
  function setHero(i) {
    if (i === cur) return; var first = cur === -1; cur = i; var p = P[i];
    $("#hero").style.setProperty("--hero", p.ground);
    var fill = function () {
      $("#heroName").textContent = p.name;
      $("#heroFamily").textContent = p.family + " · " + p.gender;
      $("#heroTag").textContent = p.tagline;
      $("#heroPrice").textContent = money(p.price) + " · Eau de Parfum 100 ml";
      heroPick.classList.remove("swap");
    };
    if (first) fill(); else { heroPick.classList.add("swap"); setTimeout(function () { if (cur === i) fill(); }, 160); }
    items.forEach(function (b, k) { if (k === i) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
  }
  function pitch() { return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : 1; }
  function paint() {
    var c = arc.scrollLeft + arc.clientWidth / 2, pt = pitch(), best = 0, bd = 1e9;
    items.forEach(function (b, i) {
      var d = (b.offsetLeft + b.offsetWidth / 2 - c) / pt, a = Math.abs(d);
      if (a < bd) { bd = a; best = i; }
      var s = 1 / (1 + .38 * Math.min(a, 3.4)), y = Math.pow(a, 1.7) * 26, r = (1 - Math.min(1, a)) * -4;
      b.style.transform = "translateY(" + y.toFixed(1) + "px) scale(" + s.toFixed(3) + ") rotate(" + r.toFixed(2) + "deg)";
      b.style.filter = "brightness(" + Math.max(.32, 1 - .26 * a).toFixed(2) + ")";
      b.style.zIndex = String(100 - Math.round(a * 10));
    });
    setHero(best);
  }
  function goto(i, instant) {
    var b = items[i]; if (!b) return;
    arc.scrollTo({ left: b.offsetLeft + b.offsetWidth / 2 - arc.clientWidth / 2, behavior: instant || reduce ? "auto" : "smooth" });
  }
  var tick = false;
  arc.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(function () { tick = false; paint(); }); } }, { passive: true });
  arc.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); interacted = true; goto(Math.min(P.length - 1, cur + 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); interacted = true; goto(Math.max(0, cur - 1)); }
  });
  ["touchstart", "wheel"].forEach(function (ev) { arc.addEventListener(ev, function () { interacted = true; }, { passive: true }); });
  var down = false, sx = 0, sl = 0;
  arc.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; interacted = true; down = true; moved = false; sx = e.clientX; sl = arc.scrollLeft; });
  window.addEventListener("pointermove", function (e) {
    if (!down) return; var dx = e.clientX - sx;
    if (Math.abs(dx) > 4) { moved = true; arc.classList.add("dragging"); }
    arc.scrollLeft = sl - dx;
  });
  window.addEventListener("pointerup", function () {
    if (!down) return; down = false; arc.classList.remove("dragging");
    var c = arc.scrollLeft + arc.clientWidth / 2, best = 0, bd = 1e9;
    items.forEach(function (b, i) { var d = Math.abs(b.offsetLeft + b.offsetWidth / 2 - c); if (d < bd) { bd = d; best = i; } });
    goto(best); setTimeout(function () { moved = false; }, 30);
  });
  $("#heroAdd").onclick = function () { if (cur >= 0) add(P[cur].id, "100", this); };
  $("#heroDetail").onclick = function () { if (cur < 0) return; selectFicha(P[cur].id); document.getElementById("fichas").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); };
  window.addEventListener("resize", function () { if (cur >= 0) goto(cur, true); paint(); });
  /* avance automático suave hasta que la persona interactúa */
  if (!reduce) {
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { heroSeen = es[0].isIntersecting; }, { threshold: .4 }).observe($("#hero"));
    setInterval(function () { if (interacted || document.hidden || !heroSeen || dlg.open) return; goto((cur + 1) % P.length); }, 4200);
  }

  /* ---------- catálogo: filtros, orden y favoritos ---------- */
  var grid = $("#grid"), view = { filter: "all", sort: "default" };
  function favBtn(p) { var on = favs.indexOf(p.id) > -1; return '<button class="fav" type="button" data-fav="' + p.id + '" aria-pressed="' + on + '" aria-label="' + (on ? "Quitar " : "Guardar ") + p.name + (on ? " de favoritos" : " en favoritos") + '">' + ICON("heart") + '</button>'; }
  function card(p, i) {
    return '<article class="card is-in" style="--i:' + i + '"><div class="card-media">' +
      '<button class="card-img" type="button" data-fic="' + p.id + '" aria-label="Ver la ficha olfativa de ' + p.name + '"><img src="' + p.image + '" alt="Frasco de ' + p.name + ', Eau de Parfum 100 ml" width="360" height="480" loading="lazy"></button>' + favBtn(p) + '</div>' +
      '<div class="card-body"><h3 class="card-name">' + p.name + '</h3><p class="card-fact">' + p.family + ' · ' + p.gender + '</p>' +
      '<p class="card-price">' + money(p.price) + ' <span class="card-fact" style="font-weight:400">· 100 ml</span></p>' +
      '<div class="card-buy"><button class="mini mini-wine" type="button" data-add="' + p.id + '" data-size="100">' + ICON("bag") + ' Añadir 100 ml</button>' +
      '<button class="mini mini-soft" type="button" data-add="' + p.id + '" data-size="10" aria-label="Añadir decant de 10 ml de ' + p.name + ', ' + money(p.decant) + '">' + ICON("drop") + ' Decant ' + money(p.decant) + '</button></div></div></article>';
  }
  function renderGrid() {
    var list = P.filter(function (p) { return view.filter === "all" || (view.filter === "fav" ? favs.indexOf(p.id) > -1 : p.gender === view.filter); });
    if (view.sort === "asc") list.sort(function (a, b) { return a.price - b.price; });
    else if (view.sort === "desc") list.sort(function (a, b) { return b.price - a.price; });
    else if (view.sort === "az") list.sort(function (a, b) { return a.name.localeCompare(b.name, "es"); });
    if (!list.length) {
      grid.innerHTML = '<div class="empty-grid">' + ICON("heart") + '<h3>Aún no tienes favoritos</h3><p>Toca el corazón de cualquier fragancia para guardarla aquí y compararla después.</p><button class="btn btn-wine" type="button" data-resetfilter>Ver todas las fragancias</button></div>';
      return;
    }
    var html = list.map(card);
    if (view.filter === "all" && view.sort === "default") {
      html.splice(2, 0, '<article class="card is-in wide wide-2" style="--i:2"><div><h3>Prueba antes de comprar</h3><p>Decants de 10 ml de cada fragancia para vivir el aroma en tu piel antes de elegir el frasco.</p></div><a class="btn btn-gold" href="#fichas">Ver fichas olfativas ' + ICON("arrow") + '</a></article>');
      html.push('<article class="card is-in wide wide-3" style="--i:7"><div><h3>15 % en tu primer pedido</h3><p>Con el código BIENVENIDO15 y una miniatura de regalo en compras de más de RD$ 3,000.</p></div><button class="btn btn-wine" type="button" data-copy>' + ICON("copy") + ' Copiar código</button></article>');
    }
    grid.innerHTML = html.join("");
  }
  function setFilter(f) {
    view.filter = f;
    $$(".chip").forEach(function (x) { var on = x.getAttribute("data-filter") === f; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
    renderGrid();
  }
  function updateFavCount() { $("#favCount").textContent = favs.length; }
  grid.addEventListener("click", function (e) {
    var a = e.target.closest("[data-add]"), f = e.target.closest("[data-fic]"), h = e.target.closest("[data-fav]");
    if (a) add(a.getAttribute("data-add"), a.getAttribute("data-size"), a);
    else if (h) {
      var id = h.getAttribute("data-fav"), k = favs.indexOf(id);
      if (k > -1) favs.splice(k, 1); else favs.push(id);
      store.set("pp_fav", favs); updateFavCount();
      if (view.filter === "fav") { renderGrid(); return; }
      var on = k === -1; h.setAttribute("aria-pressed", on ? "true" : "false");
      h.setAttribute("aria-label", (on ? "Quitar " : "Guardar ") + byId(id).name + (on ? " de favoritos" : " en favoritos"));
      h.classList.remove("pop"); void h.offsetWidth; h.classList.add("pop");
      if (on) { burstAt(h, 8); toast(byId(id).name + " guardada en favoritos"); }
    }
    else if (f) { selectFicha(f.getAttribute("data-fic")); document.getElementById("fichas").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
    else if (e.target.closest("[data-resetfilter]")) setFilter("all");
    else if (e.target.closest("[data-copy]")) copyCode(e.target.closest("[data-copy]"));
  });
  $$(".chip").forEach(function (c) { c.addEventListener("click", function () { setFilter(c.getAttribute("data-filter")); }); });
  $("#sort").addEventListener("change", function () { view.sort = this.value; renderGrid(); });
  updateFavCount();

  /* ---------- fichas olfativas ---------- */
  var ficNames = $("#ficNames"), ficha = $("#ficha"), disc = $("#disc"), ficImg = $("#ficImg"), fsel = null;
  ficNames.innerHTML = P.map(function (p) { return '<button type="button" data-id="' + p.id + '" aria-pressed="false">' + p.name + '</button>'; }).join("");
  function selectFicha(id) {
    var p = byId(id); if (!p || fsel === id) return; var first = fsel === null; fsel = id;
    $$("button", ficNames).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-id") === id ? "true" : "false"); });
    disc.style.background = p.tint;
    ficImg.classList.add("swap");
    setTimeout(function () { if (fsel !== id) return; ficImg.src = p.image; ficImg.alt = "Frasco de " + p.name + ", Eau de Parfum 100 ml"; ficImg.classList.remove("swap"); }, first ? 0 : 250);
    ficha.innerHTML = '<h3>' + p.name + '</h3><p class="f-fam">' + p.family + ' · ' + p.gender + '</p><p class="f-tag">' + p.tagline + '</p>' +
      '<dl class="notes"><div><dt>Notas de salida</dt><dd>' + p.notes.top + '</dd></div><div><dt>Notas de corazón</dt><dd>' + p.notes.heart + '</dd></div><div><dt>Notas de fondo</dt><dd>' + p.notes.base + '</dd></div></dl>' +
      '<p class="f-ideal"><b>Ideal para:</b> ' + p.ideal + '</p>' +
      '<div class="f-buy"><span class="f-price">' + money(p.price) + '</span><button class="mini mini-wine" type="button" data-add="' + p.id + '" data-size="100">' + ICON("bag") + ' Añadir 100 ml</button><button class="mini mini-soft" type="button" data-add="' + p.id + '" data-size="10">' + ICON("drop") + ' Decant ' + money(p.decant) + '</button></div>';
  }
  ficNames.addEventListener("click", function (e) { var b = e.target.closest("[data-id]"); if (b) selectFicha(b.getAttribute("data-id")); });
  ficha.addEventListener("click", function (e) { var a = e.target.closest("[data-add]"); if (a) add(a.getAttribute("data-add"), a.getAttribute("data-size"), a); });
  selectFicha(P[0].id);

  /* ---------- quiz: encuentra tu aroma ---------- */
  var qa = { who: null, vibe: null, moment: null }, qr = $("#quizResult");
  var VIBE = { fresca: "fresca", dulce: "dulce", intensa: "intensa" };
  function quizPick() {
    var best = null, bs = -1;
    P.forEach(function (p) {
      if (qa.who !== "any" && p.gender !== qa.who && p.gender !== "Unisex") return;
      var s = (p.vibe === qa.vibe ? 2 : 0) + (p.moment === qa.moment ? 1 : 0) + (p.gender === qa.who ? .5 : 0);
      if (s > bs) { bs = s; best = p; }
    });
    return { p: best, s: bs };
  }
  function renderQuiz() {
    var done = qa.who && qa.vibe && qa.moment;
    if (!done) {
      var left = 3 - [qa.who, qa.vibe, qa.moment].filter(Boolean).length;
      qr.innerHTML = '<div class="q-empty">' + ICON("spark") + '<p>Tu perfume ideal aparece aquí</p><small>' + (left === 3 ? "Responde 3 preguntas rápidas." : "Te falta" + (left === 1 ? " 1 respuesta." : "n " + left + " respuestas.")) + '</small></div>';
      return;
    }
    var r = quizPick(), p = r.p; if (!p) return;
    var why = "Una vibra " + p.vibe + " " + (p.moment === "noche" ? "para la noche y los eventos." : "para el día a día.") + (r.s < 3 ? " Es lo más cercano a lo que elegiste." : "");
    qr.innerHTML = '<div class="q-body"><p class="q-fam">Tu match · ' + p.family + '</p><h3>' + p.name + '</h3><p class="q-why">' + why + '</p><p class="q-price">' + money(p.price) + '</p>' +
      '<div class="q-buy"><button class="mini mini-wine" type="button" data-add="' + p.id + '" data-size="100">' + ICON("bag") + ' Añadir 100 ml</button><button class="mini mini-soft" type="button" data-ficha="' + p.id + '">Ver ficha</button></div></div>' +
      '<div class="q-img"><img src="' + p.image + '" alt="Frasco de ' + p.name + '" width="360" height="480"></div>';
    burstAt($(".q-img", qr), 14);
  }
  $$(".opts").forEach(function (g) {
    g.addEventListener("click", function (e) {
      var b = e.target.closest(".opt"); if (!b) return;
      var k = g.getAttribute("data-q"); qa[k] = b.getAttribute("data-v");
      $$(".opt", g).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      renderQuiz();
    });
  });
  $("#quizReset").onclick = function () { qa = { who: null, vibe: null, moment: null }; $$(".opt").forEach(function (x) { x.setAttribute("aria-pressed", "false"); }); renderQuiz(); };
  qr.addEventListener("click", function (e) {
    var a = e.target.closest("[data-add]"), f = e.target.closest("[data-ficha]");
    if (a) add(a.getAttribute("data-add"), a.getAttribute("data-size"), a);
    if (f) { selectFicha(f.getAttribute("data-ficha")); document.getElementById("fichas").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  });
  renderQuiz();

  /* ---------- código promocional ---------- */
  function copyCode(btn) {
    var done = function () {
      $("#copyHint").textContent = "¡Copiado!"; toast("Código " + D.promo.code + " copiado");
      burstAt(btn || $("#copyCode"), 16); setTimeout(function () { $("#copyHint").textContent = "Copiar"; }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(D.promo.code).then(done, done); else done();
  }
  $("#copyCode").onclick = function () { copyCode(this); };

  /* ---------- contacto ---------- */
  var cName = $("#cName"), cPhone = $("#cPhone"), cOk = $("#cOk"), sel = $("#cFrag");
  sel.innerHTML = '<option value="">Fragancia de interés</option>' + P.map(function (p) { return '<option value="' + p.name + '">' + p.name + ' · ' + p.family + '</option>'; }).join("") + '<option value="No sé cuál elegir">No sé cuál elegir</option>';
  cPhone.addEventListener("input", function () { this.value = phoneFormat(this.value); if (this.getAttribute("aria-invalid") === "true") setErr(this, phoneError(this.value)); });
  cName.addEventListener("input", function () { if (this.getAttribute("aria-invalid") === "true") setErr(this, nameError(this.value)); });
  cName.addEventListener("blur", function () { if (this.value) setErr(this, nameError(this.value)); });
  cPhone.addEventListener("blur", function () { setErr(this, phoneError(this.value)); });
  $("#contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); cOk.innerHTML = "";
    var okN = setErr(cName, nameError(cName.value)), okP = setErr(cPhone, phoneError(cPhone.value));
    if (!okN || !okP) { (okN ? cPhone : cName).focus(); shake($(".coupon-r")); return; }
    var msg = $("#cMsg").value.trim();
    var txt = "\ud83d\udc4b ¡Hola, *Pérez Perfum*! Soy *" + cName.value.trim() + "*.\n\n" +
      (sel.value ? "\u2728 *Me interesa:* " + sel.value + "\n" : "") +
      (msg ? "\ud83d\udcac _" + msg + "_\n" : "") +
      (cPhone.value.trim() ? "\ud83d\udcf1 *Mi WhatsApp:* " + cPhone.value.trim() + "\n" : "") +
      "\n¿Me ayudan a elegir mi aroma ideal? \ud83d\ude4f";
    var url = "https://wa.me/" + D.whatsapp + "?text=" + encodeURIComponent(txt);
    openWa(txt);
    cOk.innerHTML = "¡Gracias, " + cName.value.trim().split(" ")[0].replace(/[<>&]/g, "") + "! Abrimos WhatsApp para enviar tu mensaje. Si no se abrió, <a href=\"" + url + "\" target=\"_blank\" rel=\"noopener\">tócalo aquí</a>.";
    burstAt($(".coupon-submit"), 22);
  });
  $("#footTag").textContent = D.tagline;
  $("#waFab").href = "https://wa.me/" + D.whatsapp + "?text=" + encodeURIComponent("\ud83d\udc4b ¡Hola, *Pérez Perfum*! Quiero una recomendación \u2728");
  $("#fWa").href = "https://wa.me/" + D.whatsapp + "?text=" + encodeURIComponent("\ud83d\udc4b ¡Hola, *Pérez Perfum*!");
  $("#fIg").href = D.instagramUrl; $("#fTt").href = D.tiktokUrl;

  /* ---------- navegación, progreso, secciones activas ---------- */
  var nav = $("#nav"), links = $("#navLinks"), mb = $("#menuBtn"), prog = $("#progress"), toTop = $("#toTop");
  function onScroll() {
    nav.classList.toggle("solid", window.scrollY > $("#hero").offsetHeight - 90 || links.classList.contains("open"));
    var h = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = "scaleX(" + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ")";
    toTop.classList.toggle("show", window.scrollY > innerHeight * 1.2);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  function closeMenu() { links.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); mb.textContent = "Menú"; lockScroll(false); onScroll(); }
  mb.onclick = function () { var o = links.classList.toggle("open"); mb.setAttribute("aria-expanded", o ? "true" : "false"); mb.textContent = o ? "Cerrar" : "Menú"; lockScroll(o); onScroll(); };
  $$("a", links).forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && links.classList.contains("open")) { closeMenu(); mb.focus(); } });
  window.addEventListener("resize", function () { if (innerWidth > 1100 && links.classList.contains("open")) closeMenu(); });
  toTop.onclick = function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); };
  if ("IntersectionObserver" in window) {
    var secs = ["coleccion", "fichas", "quiz", "faq", "contacto"].map(function (id) { return document.getElementById(id); });
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) $$("a", links).forEach(function (a) { if (a.getAttribute("href") === "#" + x.target.id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); }); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(function (s) { if (s) so.observe(s); });
  }

  /* ---------- entradas con scroll y contadores ---------- */
  function countUp(el) {
    var to = +el.getAttribute("data-count"); if (reduce || !to) return;
    var t0 = performance.now(), dur = 1100;
    (function step(t) { var k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(t0);
  }
  var rv = $$("[data-reveal]");
  function reveal(el) { el.classList.add("in"); $$("[data-count]", el).forEach(countUp); }
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { reveal(x.target); io.unobserve(x.target); } }); }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add("in"); });

  /* imágenes que fallan: no dejar huecos rotos */
  document.addEventListener("error", function (e) { var t = e.target; if (t && t.tagName === "IMG") { t.style.visibility = "hidden"; } }, true);

  /* ---------- inicio ---------- */
  renderGrid(); renderCart();
  var start = Math.floor(P.length / 2);
  requestAnimationFrame(function () { goto(start, true); paint(); });
  window.addEventListener("load", function () { goto(cur < 0 ? start : cur, true); paint(); });
})();
