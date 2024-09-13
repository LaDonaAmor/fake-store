document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector("#products");
  async function fetchProducts(url) {
    let data = await fetch(url);
    let response = await data.json();

    for (let i = 0; i < response.length; i++) {
      let description = response[i].description;
      let title = response[i].title;
      products.innerHTML += `
    <div class="product-grid">
          <div class="product-image"><img src="${
            response[i].image
          }" alt=""></div>
          <div class="product-title">${
            title.length > 20 ? title.substring(0, 20).concat("...more") : title
          }</div>
          <div class="product-category">${response[i].category}</div>
          <div class="product-price">
            ${response[i].price}<span class="dollar-sign">$</span>
          </div>
          <div class="product-description">${
            description.length > 20
              ? description.substring(0, 20).concat("...more")
              : description
          } </div>
          <div class="separator"></div>
     </div>
          `;
    }
  }
  fetchProducts("https://fakestoreapi.com/products");
});
