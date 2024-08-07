// header.js
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
});

function loadHeader() {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
    });
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
