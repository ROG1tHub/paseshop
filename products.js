/* ===============================
   BASE DE PRODUCTOS
   Editá libremente, no afecta nada
=================================*/

const products = {

  hombre: [
    { name: "Musk", desc: "Perfume de Hombre Musk+ Air. 75 ml.", price: 14820, oldPrice: 24700, discount: 40, img: "img/perfume1.jpg" },
    { name: "300 km/h", desc: "Perfume para hombre 300 KM/H Electric. 100 ml.", price: 19470, oldPrice: 35400, discount: 45, img: "img/perfume2.jpg" },
    { name: "Exclusive", desc: "Perfume de Hombre Exclusive in Blue. 100 ml.", price: 36400, oldPrice: 56000, discount: 35, img: "img/perfume3.jpg" },
    { name: "Black Suede", desc: "Versión Hot 100 mL diseñada para hombre.", price: 32000, oldPrice: null, img: "img/perfume4.jpg" },

    /* Desodorantes Hombre */
    { name: "Wild Country", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante7.jpg" },
    { name: "Musk", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante8.jpg" },
    { name: "Black Suede Hot", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante9.jpg" },
    { name: "Black Suede Secret", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante10.jpg" },
    { name: "Black Suede Intense", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante11.jpg" },
    { name: "Legacy", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante12.jpg" },

    /* Colonias Hombre */
    { name: "Wild Country", desc: "Colonia refrescante 150ml.", price: 6700, oldPrice: null, img: "img/colonia1.jpg" },
    { name: "Legacy", desc: "Colonia refrescante 150ml.", price: 7000, oldPrice: null, img: "img/colonia2.jpg" }
  ],

  mujer: [
    { name: "Sweet Honesty Treasures", desc: "Desodorante Roll-On", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante1.jpg" },
    { name: "Pur Blanca", desc: "Roll-on aroma Pur Blanca", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante2.jpg" },
    { name: "Love U", desc: "Desodorante Roll-On Love U", price: 1900, oldPrice: 3800, discount: 50, img: "img/desodorante3.jpg" },
    { name: "Toque de Amor", desc: "Antitranspirante roll-on", price: 2850, oldPrice: 3800, img: "img/desodorante4.jpg" },
    { name: "Sweet Honesty", desc: "Roll-On", price: 2850, oldPrice: 3800, img: "img/desodorante5.jpg" },
    { name: "On Duty", desc: "Minimizador de Vello", price: 3080, oldPrice: 5600, discount: 45, img: "img/desodorante6.jpg" },

    /* Colonias Mujer */
    { name: "Sweet Honesty", desc: "Colonia 150ml", price: 4200, oldPrice: 7000, discount: 40, img: "img/colonia3.jpg" },
    { name: "Pasión Gitana", desc: "Colonia 150ml", price: 7000, oldPrice: null, img: "img/colonia4.jpg" },
    { name: "Imari", desc: "Colonia 150ml", price: 7000, oldPrice: null, img: "img/colonia5.jpg" }
  ],

  cuidado: [
    { name: "Recipiente unicornio", desc: "Lunchera para niñas", price: 5000, img: "img/kids1.jpg" },
    { name: "Sábana M Kids", desc: "Estampado infantil", price: 5000, img: "img/kids2.jpg" }
  ],

  hogarestilo: [
    { name: "Organizador Multiuso", desc: "Ideal para habitación", price: 4500, img: "img/hogar1.jpg" },
    { name: "Dispenser", desc: "Jabón líquido", price: 4500, img: "img/hogar2.jpg" }
  ]
};


