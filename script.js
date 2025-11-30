// ----------------------------
// Navegación y productos demo
// ----------------------------
function goToCategory(cat) {
  window.location.href = `category.html?cat=${cat}`;
}

const productsData = {
  perfumes: [
    { name: "Perfume Floral", price: "$4.500", img: "img/perfume1.jpg" },
    { name: "Colonia Fresca", price: "$3.200", img: "img/perfume2.jpg" }
  ],
  cremas: [
    { name: "Crema Hidratante", price: "$2.800", img: "img/crema1.jpg" },
    { name: "Body Lotion", price: "$3.500", img: "img/crema2.jpg" }
  ],
  kids: [
    { name: "Shampoo Infantil", price: "$2.000", img: "img/kids1.jpg" },
    { name: "Lunchera", price: "$2.000", img: "img/kids2.jpg" }
  ],
  hogar: [
    { name: "Set Organizadores", price: "$3.000", img: "img/hogar1.jpg" },
    { name: "Dispenser Baño", price: "$2.500", img: "img/hogar2.jpg" }
  ]
};

const heroByCategory = {
  perfumes: { img: "img/perfumes.jpg", text: "Perfumes" },
  cremas:   { img: "img/cremas.jpg", text: "Cremas & Cuidado" },
  kids:     { img: "img/kids.jpg", text: "Niños" },
  hogar:    { img: "img/hogar.jpg", text: "Hogar" },
  default:  { img: "img/hero.jpg", text: "Belleza • Fragancias • Hogar" }
};

// Cargar categoría (category.html)
function loadCategory() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  const hero = heroByCategory[cat] || heroByCategory.default;

  const heroImg = document.getElementById("category-hero-img");
  const heroText = document.getElementById("category-hero-text");
  const title = document.getElementById("cat-title");
  const container = document.getElementById("products");

  if (heroImg) heroImg.src = hero.img;
  if (heroText) heroText.innerText = hero.text;
  if (title) title.innerText = hero.text;

  if (!container) return;
  container.innerHTML = "";

  const items = productsData[cat] || [];
  items.forEach(p => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <div class="price">${p.price}</div>
    `;
    container.appendChild(item);
  });
}

// ----------------------------
// Tema (modo oscuro) y persistencia
// ----------------------------
const THEME_KEY = "miTienda_theme";

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");

  // Actualizar icono botón (si existe)
  document.querySelectorAll("#theme-toggle").forEach(btn => {
    btn.innerText = theme === "dark" ? "☀️" : "🌙";
  });
}

function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || "light";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

// Inicializar theme en carga
(function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  applyTheme(theme);

  document.querySelectorAll("#theme-toggle").forEach(btn => {
    btn.addEventListener("click", toggleTheme);
  });
})();

// ----------------------------
// Utilidades al cargar cualquier página
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // año en footer
  const y = new Date().getFullYear();
  const yEl = document.getElementById("year");
  const yEl2 = document.getElementById("year-2");
  if (yEl) yEl.innerText = y;
  if (yEl2) yEl2.innerText = y;

  // cargar category si estamos en category.html
  if (window.location.pathname.includes("category.html")) {
    loadCategory();
  }
});

// ============================
//   PRODUCTOS POR CATEGORÍA
// ============================
const products = {
  perfumes: [
    {
      name: "On Duty",
      description: "Desodorante Roll On Minimiza Vello",
      price: 3080,
      oldPrice: 3800,
      discount: 25,
      img: "img/perfume1.jpg"
    },
    {
      name: "Colonia Fresh",
      description: "Aroma cítrico para uso diario",
      price: 2500,
      img: "img/perfume2.jpg"
    }
  ],

  cremas: [
    {
      name: "Sweet Honesty",
      description: "Desodorante Roll-On Sweet Honesty Treasures",
      price: 2850,
      oldPrice: 3800,
      discount: 25,
      img: "img/desodorante1.jpg"
    },
    {
      name: "Pur Blanca",
      description: "Desodorante anti-transpirante roll-on con el mismo aroma del perfume Pur Blanca.",
      price: 2850,
      oldPrice: 3800,
      discount: 25,
      img: "img/desodorante2.jpg"
    },
    {
      name: "Lov/u",
      description: "Desodorante Roll-On Love u ",
      price: 1900,
      oldPrice: 3800,
      discount: 50,
      img: "img/desodorante3.jpg"
    },
    {
      name: "Toque De Amor",
      description: "Desodorante Antitranspirante Roll-on ",
      price: 2850,
      oldPrice: 3800,
      discount: 25,
      img: "img/desodorante4.jpg"
    },
    {
      name: "Sweet Honesty",
      description: "Desodorante Roll-On Sweet Honesty ",
      price: 2850,
      oldPrice: 3800,
      discount: 25,
      img: "img/desodorante5.jpg"
    },
    {
      name: "On Duty",
      description: "Desodorantes Roll On de Mujer On Duty Care Minimizador de Vello",
      price: 3080,
      oldPrice: 5600,
      discount: 45,
      img: "img/desodorante6.jpg"
    },
  ],

  kids: [
    {
      name: "Shampoo Kids",
      description: "Sin lágrimas",
      price: 2200,
      img: "img/kids1.jpg"
    }
  ],

  hogar: [
    {
      name: "Recipiente Hermético",
      description: "Plástico resistente",
      price: 1800,
      img: "img/hogar1.jpg"
    }
  ]
};


// ============================
//   FAVORITOS (localStorage)
// ============================
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderProducts(currentCategory);
}


// ============================
//   CARRITO (localStorage)
// ============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBubble();
}

function updateCartBubble() {
  document.getElementById("cart-count").textContent = cart.length;
}

updateCartBubble();


// ============================
//   RENDER DE PRODUCTOS
// ============================

let currentCategory = null;

function renderProducts(category) {
  currentCategory = category;

  const container = document.getElementById("products-container");
  const title = document.getElementById("category-title");

  title.textContent = category.toUpperCase();
  container.innerHTML = "";

  products[category].forEach((p, index) => {

    const id = category + "-" + index;
    const isFav = favorites.includes(id);

    const oldPriceHtml = p.oldPrice
      ? `<div class="old-price">$ ${p.oldPrice.toLocaleString()}</div>`
      : "";

    const discountHtml = p.discount
      ? `<div class="discount-tag">-${p.discount}%</div>`
      : "";

    container.innerHTML += `
      <div class="product-card">

        ${discountHtml}

        <div class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${id}')">
          ❤
        </div>

        <img src="${p.img}" alt="${p.name}">

        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description}</div>

        <div class="price-box">
          ${oldPriceHtml}
          <div class="new-price">$ ${p.price.toLocaleString()}</div>
        </div>

        <button class="add-btn" onclick='addToCart(${JSON.stringify(p)})'>
          agregar a mi bolsa
        </button>
      </div>
    `;
  });
}


// ============================
//   MODAL DEL CARRITO
// ============================
const modal = document.getElementById("cart-modal");
const openCart = document.getElementById("open-cart");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");

openCart.onclick = () => {
  modal.style.display = "block";
  renderCartModal();
};

closeCart.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

function renderCartModal() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Tu bolsa está vacía.</p>";
    return;
  }

  cart.forEach(item => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong> - $${item.price.toLocaleString()}
      </div>
    `;
  });
}


// ============================
//   WHATSAPP CHECKOUT
// ============================
document.getElementById("checkout-btn").onclick = () => {
  if (cart.length === 0) return;

  const text = cart.map(p => `• ${p.name} - $${p.price}`).join("%0A");

  const message = `Hola! Me gustaría comprar:%0A${text}`;
  const phone = "5492474568933"; // ← poné tu número

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
};


// ============================
//   DETECTAR CATEGORÍA
// ============================
const params = new URLSearchParams(window.location.search);
const category = params.get("cat");

if (category) renderProducts(category);
