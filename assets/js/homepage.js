document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelector("#products");

  async function fetchProducts(url) {
    try {
      const data = await fetch(url);
      const response = await data.json();

      response.forEach((product) => {
        const description = product.description;
        const title = product.title;

        products.innerHTML += `
          <div class="product-grid">
            <div class="product-image">
              <a href="product.html?id=${product.id}"><img src="${
          product.image
        }" alt="" loading="lazy"></a>
            </div>
            <div class="product-title">
              <a href="product.html?id=${product.id}">${
          title.length > 20 ? title.substring(0, 20).concat("...more") : title
        }</a>
            </div>
            <div class="product-category">${product.category}</div>
            <div class="product-price">
              ${product.price}<span class="dollar-sign">$</span>
            </div>
            <div class="product-description">
              ${
                description.length > 20
                  ? description.substring(0, 20).concat("...more")
                  : description
              }
            </div>
            <div class="separator"></div>
          </div>
        `;
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  fetchProducts("https://fakestoreapi.com/products");
});
