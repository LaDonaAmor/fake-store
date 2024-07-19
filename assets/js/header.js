// header.js
document.addEventListener('DOMContentLoaded', () => {
     loadHeader();
 });
 
 function loadHeader() {
     fetch('header.html')
         .then(response => response.text())
         .then(data => {
             document.getElementById('header-placeholder').innerHTML = data;
         });
 }
 
