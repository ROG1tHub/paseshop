/*
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
  ]*/

 // ====== LISTA DE PRODUCTOS (EJEMPLO) ======
const products = {
    perfumes: [
        { name: "Perfume Exclusivo", desc: "Aroma floral elegante", price: 12000, oldPrice: 15000, img: "img/perfumes.jpg", fav: false },
        { name: "Aroma Sport", desc: "Fragancia fresca y activa", price: 9000, oldPrice: null, img: "img/perfume2.jpg", fav: false }
    ],
    cremas: [
        { name: "Crema Hidratante", desc: "Piel suave todo el día", price: 7000, oldPrice: 8500, img: "img/cremas.jpg", fav: false }
    ],
    kids: [
        { name: "Colonia Kids", desc: "Aroma suave para niños", price: 5000, oldPrice: null, img: "img/kids.jpg", fav: false }
    ],
    hogar: [
        { name: "Organizador Multiuso", desc: "Para cocina o baño", price: 4500, oldPrice: null, img: "img/hogar.jpg", fav: false }
    ]
};

// Detectar categoría
const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get("cat");

// Carrito y favoritos
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || {};

updateCartBubble();

// ====== RENDER ======
function renderProducts(category) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    products[category].forEach((p, index) => {
        const id = `${category}-${index}`;
        const favActive = favorites[id] ? "fav-active" : "";

        container.innerHTML += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${p.img}" alt="${p.name}">
                    <button class="fav-btn ${favActive}" onclick="toggleFavorite('${id}')">♥</button>
                </div>
        
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                
                <div class="price-box">
                    ${p.oldPrice ? `<span class="old-price">$${p.oldPrice}</span>` : ""}
                    <span class="price">$${p.price}</span>
                </div>

                <button class="add-btn" onclick="addToCart('${id}')">Agregar al carrito 🛒</button>
            </div>
        `;
    });
}

if (currentCategory) renderProducts(currentCategory);

// ====== FAVORITOS ======
function toggleFavorite(id) {
    favorites[id] = !favorites[id];
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderProducts(currentCategory);
}

// ====== CARRITO ======
function addToCart(id) {
    const [cat, index] = id.split("-");
    const product = products[cat][index];

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBubble();
}

function updateCartBubble() {
    const bubble = document.getElementById("cart-bubble");
    if (bubble) bubble.textContent = cart.length;
}

// ====== MODAL CARRITO ======
const modal = document.getElementById("cart-modal");
const closeBtn = document.getElementById("close-cart");

function openCart() {
    modal.style.display = "flex";
    renderCartItems();
}

function renderCartItems() {
    const box = document.getElementById("cart-items");
    box.innerHTML = "";

    cart.forEach((item) => {
        box.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong><br>
                $${item.price}
            </div>
        `;
    });
}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// ====== MODO OSCURO AVON ======
const toggle = document.getElementById("darkToggle");

// Cargar preferencia
if (localStorage.getItem("darkMode") === "true") {
    toggle.checked = true;
    document.body.classList.add("dark");
}

// Evento
toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", toggle.checked);
});
