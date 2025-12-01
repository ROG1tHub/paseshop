/* ======================================================
   CONFIG (modificá solo tu número)
====================================================== */
const WHATSAPP_PHONE = "5492474568933";


/* ======================================================
   NAVEGACIÓN
====================================================== */
window.goToCategory = function(cat) {
  window.location.href = `category.html?cat=${cat}`;
};


/* ======================================================
   DATABASE DE PRODUCTOS
====================================================== */
const products = {
  perfumes: [
    { name: "Perfume Exclusivo", desc: "Aroma floral elegante para hombres", price: 12000, oldPrice: 15000, img: "img/perfume1.jpg" },
    { name: "Aroma Mujer", desc: "Fragancia fresca y activa", price: 9000, oldPrice: null, img: "img/perfume2.jpg" }
  ],
  cremas: [
    { name: "Sweet Honesty Treasures", desc: "Desodorante Roll-On Sweet Honesty Treasures", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante1.jpg" },
    { name: "Pur Blanca", desc: "Desodorante roll-on con aroma del perfume Pur Blanca.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante2.jpg" },
    { name: "Love U", desc: "Desodorante Roll-On Love U", price: 1900, oldPrice: 3800, discount: 50, img: "img/desodorante3.jpg" },
    { name: "Toque de Amor", desc: "Desodorante Antitranspirante Roll-on", price: 2850, oldPrice: 3800, img: "img/desodorante4.jpg" },
    { name: "Sweet Honesty", desc: "Desodorante Roll-On Sweet Honesty", price: 2850, oldPrice: 3800, img: "img/desodorante5.jpg" },
    { name: "On Duty", desc: "Desodorante On Duty Care Minimizador de Vello", price: 3080, oldPrice: 5600, discount: 45, img: "img/desodorante6.jpg" }
  ],
  kids: [
    { name: "Recipiente unicornio", desc: "Lunchera para niñas", price: 5000, oldPrice: null, img: "img/kids1.jpg" },
    { name: "Sábana M Kids", desc: "Estampado para niños", price: 5000, oldPrice: null, img: "img/kids2.jpg" }
  ],
  hogar: [
    { name: "Organizador Multiuso", desc: "Ideal para habitación", price: 4500, oldPrice: null, img: "img/hogar1.jpg" },
    { name: "Dispenser de jabón líquido", desc: "Ideal para cocina o baño", price: 4500, oldPrice: null, img: "img/hogar2.jpg" }
  ]
};


/* ======================================================
   ESTADO GLOBAL + LOCALSTORAGE
====================================================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || {};

function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); }
function saveFavorites() { localStorage.setItem("favorites", JSON.stringify(favorites)); }
function formatPrice(num) { return "$ " + Number(num).toLocaleString("es-AR"); }


/* ======================================================
   BURBUJA DEL CARRITO
====================================================== */
function updateCartBubble() {
  const bubble = document.getElementById("cart-bubble");
  if (!bubble) return;

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  bubble.textContent = totalQty;
  bubble.style.display = totalQty > 0 ? "inline-flex" : "none";
}


/* ======================================================
   CARRITO: UTILIDADES
====================================================== */
function findCartItem(id) {
  return cart.find(i => i.id === id);
}

function addToCart(id) {
  const [category, idx] = id.split("-");
  const index = Number(idx);
  const p = products[category]?.[index];
  if (!p) return;

  const existing = findCartItem(id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, category, index, qty: 1 });
  }

  saveCart();
  updateCartBubble();
  flashCartButton();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartBubble();
  renderCartModal();
}

function increaseQty(id) {
  const item = findCartItem(id);
  if (!item) return;
  item.qty++;
  saveCart();
  updateCartBubble();
  renderCartModal();
}

function decreaseQty(id) {
  const item = findCartItem(id);
  if (!item) return;

  item.qty--;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart();

  updateCartBubble();
  renderCartModal();
}


/* ======================================================
   MODAL DEL CARRITO
====================================================== */
function openCart() {
  const modal = document.getElementById("cart-modal");
  if (!modal) return;

  modal.style.display = "flex";
  renderCartModal();
}

function closeCart() {
  const modal = document.getElementById("cart-modal");
  if (modal) modal.style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("cart-modal");
  if (event.target === modal) modal.style.display = "none";
};


/* ======================================================
   RENDER DEL MODAL
====================================================== */
function renderCartModal() {
  const list = document.getElementById("cart-items");
  const checkoutBtn = document.querySelector(".checkout-btn") || document.getElementById("checkout-btn");

  if (!list) return;

  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = "<p>Tu bolsa está vacía.</p>";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  cart.forEach(item => {
    const p = products[item.category][item.index];
    const subtotal = p.price * item.qty;

    const row = document.createElement("div");
    row.classList.add("cart-item");

    row.innerHTML = `
      <div style="display:flex; gap:12px; align-items:center;">
        <img src="${p.img}" style="width:60px; height:60px; object-fit:cover; border-radius:6px;">
        <div style="flex:1;">
          <strong>${p.name}</strong><br>
          <small>${p.desc || ""}</small>
        </div>
        <div style="text-align:right;">
          ${formatPrice(p.price)}
          <div style="margin-top:6px;">
            <button onclick="decreaseQty('${item.id}')">−</button>
            <span style="padding:0 8px;">${item.qty}</span>
            <button onclick="increaseQty('${item.id}')">+</button>
          </div>
        </div>
      </div>

      <div style="text-align:right; margin-top:8px; font-weight:700;">${formatPrice(subtotal)}</div>
      <div style="text-align:right; margin-top:6px;">
        <button onclick="removeFromCart('${item.id}')">Eliminar</button>
      </div>
    `;

    list.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + products[item.category][item.index].price * item.qty, 0);

  const totalRow = document.createElement("div");
  totalRow.innerHTML = `
    <div style="display:flex; justify-content:space-between; padding-top:12px; border-top:1px solid #ccc;">
      <strong>Total</strong>
      <strong>${formatPrice(total)}</strong>
    </div>
  `;

  list.appendChild(totalRow);

  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.onclick = sendToWhatsApp;
  }
}


/* ======================================================
   WHATSAPP CHECKOUT
====================================================== */
function sendToWhatsApp() {
  if (!cart.length) return alert("Tu bolsa está vacía.");

  const lines = cart.map(item => {
    const p = products[item.category][item.index];
    return `• ${p.name} x${item.qty} - ${formatPrice(p.price * item.qty)}`;
  }).join("%0A");

  const total = cart.reduce(
    (s, it) => s + products[it.category][it.index].price * it.qty,
    0
  );

  const msg = `Hola! Quiero comprar:%0A${lines}%0A%0ATotal: ${formatPrice(total)}`;

  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, "_blank");
}


/* ======================================================
   FAVORITOS
====================================================== */
function toggleFavorite(id) {
  favorites[id] = !favorites[id];
  saveFavorites();
  renderProductsIfNeeded();
}


/* ======================================================
   RENDER DE PRODUCTOS (category.html)
====================================================== */
const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get("cat");

function renderProductsIfNeeded() {
  if (!currentCategory) return;

  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";

  const arr = products[currentCategory] || [];

  arr.forEach((p, i) => {
    const id = `${currentCategory}-${i}`;
    const fav = favorites[id] ? "fav-active" : "";

    container.innerHTML += `
      <div class="product-card">

        ${p.discount ? `<div class="discount-tag">-${p.discount}%</div>` : ""}

        <button onclick="toggleFavorite('${id}')" class="fav-btn ${fav}">♥</button>

        <div class="img-wrapper">
          <img src="${p.img}" alt="${p.name}">
        </div>

        <h3>${p.name}</h3>
        <p>${p.desc || ""}</p>

        <div class="price-box">
          ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}
          <div class="price">${formatPrice(p.price)}</div>
        </div>

        <button class="add-btn" onclick="addToCart('${id}')">
          Agregar al carrito 🛒
        </button>

      </div>
    `;
  });

  // Zoom en hover
  document.querySelectorAll(".product-card img").forEach(img => {
    img.addEventListener("mouseenter", () => img.style.transform = "scale(1.08)");
    img.addEventListener("mouseleave", () => img.style.transform = "scale(1)");
  });
}


/* ======================================================
   MODO OSCURO
====================================================== */
function initDarkMode() {
  const toggle = document.getElementById("darkToggle");
  if (!toggle) return;

  const savedDark = localStorage.getItem("darkmode") === "true";

  if (savedDark) {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    const isDark = toggle.checked;
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("darkmode", isDark);
  });
}


/* ======================================================
   INICIALIZACIÓN GLOBAL
====================================================== */
document.addEventListener("DOMContentLoaded", () => {

  updateCartBubble();
  initDarkMode();

  const openBtn = document.getElementById("open-cart");
  if (openBtn) openBtn.addEventListener("click", openCart);

  const closeBtn = document.getElementById("close-cart");
  if (closeBtn) closeBtn.addEventListener("click", closeCart);

  const checkoutBtn = document.querySelector(".checkout-btn") || document.getElementById("checkout-btn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", sendToWhatsApp);

  if (currentCategory) {
    const title = document.getElementById("category-title");
    if (title) title.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    renderProductsIfNeeded();
  }
});


/* ======================================================
   ANIMACIÓN AGREGAR AL CARRITO
====================================================== */
function flashCartButton() {
  const btn = document.getElementById("open-cart");
  if (!btn) return;
  btn.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.1)" }, { transform: "scale(1)" }],
    { duration: 250 }
  );
}
