document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector("#products");
  async function fetchProducts(url) {
    let data = await fetch(url);
    let response = await data.json();

    for (let i = 0; i < response.length; i++) {
      let description = response[i].description;
      products.innerHTML += `
    <div class="product">
          <div class="product-image"><img src="${
            response[i].image
          }" alt=""></div>
          <div class="product-title">${response[i].title}</div>
          <div class="product-category">${response[i].category}</div>
          <div class="product-price">
            ${response[i].price}<span class="dollar-sign">$</span>
          </div>
          <div class="product-description">${
            description.length > 20
              ? description.substring(0, 20).concat("...more")
              : description
          } </div>
     </div>
          `;
    }
  }
  fetchProducts("https://fakestoreapi.com/products");
});
