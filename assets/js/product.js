document.addEventListener("DOMContentLoaded", function () {
  const productDetailsContainer = document.querySelector(".product-grid");

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  async function fetchProductDetails(id) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await response.json();

      productDetailsContainer.innerHTML = `
               <div class="product-image">
                  <img src="${product.image}" alt="${product.title}" />
               </div>
               <div class="product-details">
               <div class="product-title">${product.title}</div>
               <div class="product-category"><span class="category">${product.category}</span></div>
               <div class="product-description">${product.description}</div>
               <div class="product-rate">
               <div class="rate-info">
                rate: <span class="rate">${product.rating.rate}</span> count:
                <span class="rate">${product.rating.count}</span>
               </div>
              <button type="button" class="cart" id="addToCartBtn">
                Add to Cart <img src="../assets/img/svg/plus_24px.svg" alt="plus" class="plus"/>
              </button>
            </div>
          </div>
               `;

      document
        .getElementById("addToCartBtn")
        .addEventListener("click", function () {
          addToCart(product);
        });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} has been added to the  cart`);
  }

  if (productId) {
    fetchProductDetails(productId);
  } else {
    console.error("No product ID found in URL.");
  }
});
