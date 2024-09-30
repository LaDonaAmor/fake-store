document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("products");
  const totalPriceElement = document.querySelector(".total-price .price");

  function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cartItemsContainer.innerHTML = "";

    cart.forEach((product) => {
      total += product.price * product.quantity;

      const title = product.title;
      const description = product.description;
      const shortTitle = title.substring(0, 20);
      const fullTitle = title.length > 20 ? title : "";

      const shortDescription = description.substring(0, 20);
      const fullDescription = description.length > 20 ? description : "";

      cartItemsContainer.innerHTML += `
           <div class="product-grid">
             <div class="product-image">
               <img src="${product.image}" alt="" loading="lazy">
             </div>
             <div class="product-title">
               <span class="short-title">${shortTitle}</span>
               ${
                 fullTitle
                   ? `<span class="full-title" style="display: none;">${fullTitle}</span>`
                   : ""
               }
               ${
                 fullTitle
                   ? '<span class="toggle-title" style="cursor: pointer;">...more</span>'
                   : ""
               }
             </div>
             <div class="product-category">${product.category}</div>
             <div class="product-price">${
               product.price
             }<span class="dollar-sign">$</span></div>
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
             <button class="remove" data-id="${product.id}">
               <img src="../assets/img/svg/delete_24px.svg" alt="delete" class="delete" />
             </button>
             <div class="separator"></div>
           </div>
         `;
    });

    totalPriceElement.textContent = total.toFixed(2);

    // Event listeners for the remove buttons
    document.querySelectorAll(".remove").forEach((button) => {
      button.addEventListener("click", function () {
        removeFromCart(button.dataset.id);
      });
    });

    // Event listeners for the toggle title functionality
    document.querySelectorAll(".toggle-title").forEach((toggleButton) => {
      toggleButton.addEventListener("click", function () {
        const shortTitle = this.previousElementSibling.previousElementSibling;
        const fullTitle = this.previousElementSibling;
        if (fullTitle.style.display === "none") {
          fullTitle.style.display = "inline";
          shortTitle.style.display = "none";
          this.textContent = "...less";
        } else {
          fullTitle.style.display = "none";
          shortTitle.style.display = "inline";
          this.textContent = "...more";
        }
      });
    });

    // Event listeners for the toggle description functionality
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

  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((product) => product.id !== parseInt(productId));
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
  }

  displayCartItems();
});
