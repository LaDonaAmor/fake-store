document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelector("#products");

  async function fetchProducts(url) {
    try {
      const data = await fetch(url);
      const response = await data.json();
      window.allProducts = response;

      renderProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
      }
    }

    function renderProducts(productToRender) {
      products.innerHTML = "";
      productToRender.forEach((product) => {

        const description = product.description;
        const shortDescription = description.substring(0, 20);
        const fullDescription = description.length > 20 ? description : "";

        products.innerHTML += `
          <div class="product-grid">
            <div class="product-image">
              <a href="product.html?id=${product.id}"><img src="${
          product.image
        }" alt="" loading="lazy"></a>
            </div>
            <div class="product-title">
              <a href="product.html?id=${product.id}">${product.title}</a>
            </div>
            <div class="product-category">${product.category}</div>
            <div class="product-price">
              ${product.price}<span class="dollar-sign">$</span>
            </div>
            <div class="product-description">
               <span class="short-desc">${shortDescription}</span>
               ${
                 fullDescription
                   ? `<span class="full-desc" style="display: none;">${fullDescription}</span>`
                   : ""
               }
               ${
                 fullDescription
                   ? '<span class="toggle-desc" style="cursor: pointer;">...more</span>'
                   : ""
               }
             </div>
            <div class="separator"></div>
          </div>
        `;
      });

      document.querySelectorAll(".toggle-desc").forEach((toggleButton) => {
        toggleButton.addEventListener("click", function () {
          const shortDesc = this.previousElementSibling.previousElementSibling;
          const fullDesc = this.previousElementSibling;
          if (fullDesc.style.display === "none") {
            fullDesc.style.display = "inline";
            shortDesc.style.display = "none";
            this.textContent = "...less";
          } else {
            fullDesc.style.display = "none";
            shortDesc.style.display = "inline";
            this.textContent = "...more";
          }
        });
      });
    } 
    
    window.addEventListener("filterProducts", (event) => {
      const category = event.detail.category;

      const filteredProducts = category
    ? window.allProducts.filter(product => product.category === category)
    : window.allProducts; 
   
    renderProducts(filteredProducts);
    });

    fetchProducts("https://fakestoreapi.com/products");

  });