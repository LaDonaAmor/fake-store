document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  fetchCategories();
});

function loadHeader() {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
    });
}

async function fetchCategories() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await response.json();
    const dropdown = document.getElementById("category-dropdown");

    const allOption = document.createElement("a");
    allOption.href = "javascript:void(0)";
    allOption.textContent = "All";
    allOption.onclick = () => filterProductsByCategory(); 
    dropdown.appendChild(allOption);

    categories.forEach((category) => {
      const a = document.createElement("a");
      a.href = "javascript:void(0)"; 
      a.textContent = category;
      a.onclick = () => filterProductsByCategory(category); 
      dropdown.appendChild(a);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function filterProductsByCategory(category) {
  const event = new CustomEvent("filterProducts", { detail: { category } });
  window.dispatchEvent(event); 
}

window.onscroll = function () {
  myFunction();
};

var header = document.getElementById("header-placeholder");
var sticky = header.offsetTop;

function myFunction() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
