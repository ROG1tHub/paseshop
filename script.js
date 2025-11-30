// ======================================================
//                  DATOS DE PRODUCTOS
// ======================================================

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
      description: "Desodorante Roll-On Love u",
      price: 1900,
      oldPrice: 3800,
      discount: 50,
      img: "img/desodorante3.jpg"
    },
    {
      name: "Toque De Amor",
      description: "Desodorante Antitranspirante Roll-on",
      price: 2850,
      oldPrice: 3800,
      discount: 25,
      img: "img/desodorante4.jpg"
    },
    {
      name: "Sweet Honesty",
      description: "Desodorante Roll-On Sweet Honesty",
      price: 2850,
      oldPrice: 3800,
      discount: 25,
      img: "img/desodorante5.jpg"
    },
    {
      name: "On Duty",
      description: "Desodorantes Roll On On Duty Care Minimizador de Vello",
      price: 3080,
      oldPrice: 5600,
      discount: 45,
      img: "img/desodorante6.jpg"
    }
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


// ======================================================
//                     FAVORITOS
// ======================================================

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


// ======================================================
//                      CARRITO
// ======================================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
  const [category, index] = productId.split("-");
  const p = products[category][index];

  cart.push(p);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartBubble();
}

function updateCartBubble() {
  const bubble = document.getElementById("cart-count");
  if (bubble) bubble.textContent = cart.length;
}

updateCartBubble();


// ======================================================
//                 MODAL DEL CARRITO
// ======================================================

const modal = document.getElementById("cart-modal");
const openCart = document.getElementById("open-cart");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");

if (openCart) {
  openCart.onclick = () => {
    modal.style.display = "block";
    renderCartModal();
  };
}

if (closeCart) {
  closeCart.onclick = () => modal.style.display = "none";
}

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

function renderCartModal() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Tu bolsa está vacía.</p>";
    return;
  }

  cart.forEach(p => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${p.img}">
        <div>
          <strong>${p.name}</strong><br>
          $${p.price.toLocaleString()}
        </div>
      </div>
    `;
  });
}


// ======================================================
//                   CHECKOUT WHATSAPP
// ======================================================

const checkout = document.getElementById("checkout-btn");

if (checkout) {
  checkout.onclick = () => {
    if (cart.length === 0) return;

    const text = cart
      .map(p => `• ${p.name} - $${p.price.toLocaleString()}`)
      .join("%0A");

    const phone = "5492474568933";

    window.open(
      `https://wa.me/${phone}?text=Hola! Me gustaría comprar:%0A${text}`,
      "_blank"
    );
  };
}


// ======================================================
//                RENDERIZAR PRODUCTOS
// ======================================================

let currentCategory = null;

function renderProducts(category) {
  currentCategory = category;

  const container = document.getElementById("products-container");
  const title = document.getElementById("category-title");

  if (!container) return;

  title.textContent = category.toUpperCase();
  container.innerHTML = "";

  products[category].forEach((p, index) => {
    const id = `${category}-${index}`;
    const isFav = favorites.includes(id);

    container.innerHTML += `
      <div class="product-card">

        ${p.discount ? `<div class="discount-tag">-${p.discount}%</div>` : ""}

        <div class="favorite-btn ${isFav ? "active" : ""}" onclick="toggleFavorite('${id}')">
          ❤
        </div>

        <img src="${p.img}" alt="${p.name}">

        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description}</div>

        <div class="price-box">
          ${p.oldPrice ? `<div class="old-price">$${p.oldPrice.toLocaleString()}</div>` : ""}
          <div class="new-price">$${p.price.toLocaleString()}</div>
        </div>

        <button class="add-btn" onclick="addToCart('${id}')">
          agregar a mi bolsa
        </button>
      </div>
    `;
  });
}


// ======================================================
//         DETECTAR CATEGORÍA AL CARGAR LA PÁGINA
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");

  if (cat && products[cat]) {
    renderProducts(cat);
  }
});
