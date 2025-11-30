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
