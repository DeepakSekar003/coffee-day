  // search icon
  let search = document.querySelector('.search-box');
  document.querySelector('#search-icon').onclick = () =>{
    search.classList.toggle("active");
    navbar.classList.remove("active");
    cartSidebar.classList.remove("active");
 };
  //menu icon
  let navbar = document.querySelector('.navbar');
  document.querySelector('#menu-icons').onclick = () =>{
    navbar.classList.toggle("active");
    search.classList.remove("active");
    cartSidebar.classList.remove("active");
 };
  //shop now button
  function conformation(){
  let userprefer = confirm("You want to ShopNow");    
   if(userprefer) {
   alert("Enjoy your day with new flavour");
 } 
   else {
   alert("No worries! Take your time");
 }};

  // sidebar
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartIcon = document.getElementById("cart-icon");
  const closeCart = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  //it will hold all the added items
  let cart = [];

  // Open sidebar
  cartIcon.onclick = () => {
  cartSidebar.classList.add("active");
  search.classList.remove("active");
  navbar.classList.remove("active");
 };

  // Close sidebar
  closeCart.onclick = () => {
  cartSidebar.classList.remove("active");
 };

  // Load products from JSON
  document.addEventListener('DOMContentLoaded', function () {
   fetch('data.json')
    .then(response => response.json())
    .then(data => {
    loadProducts(data.products);
    loadCustomers(data.customers);
 })
   .catch(error => {
   console.error('Error Loading Data', error);
 });

  function loadProducts(products) {
  const container = document.getElementById('products-container');
  container.innerHTML = "";
  products.forEach(product => {
  const productBox = document.createElement('div');
  productBox.className = 'box';
  productBox.innerHTML = `  
   <img src="${product.image}" alt="${product.name}">
   <h3>${product.name}</h3>
   <div class="content">
     <span>RS.${product.price}</span>
     <a href="#" class="add-cart">Add to cart</a>
   </div>`;
  container.appendChild(productBox);
   });
  }
 });

  //load customer from json
  function loadCustomers(customers) { 
  const customerContainer = document.querySelector('.customers-container');
  customerContainer.innerHTML = ""; 
  customers.forEach(customer => {
  const customerBox = document.createElement('div');
  customerBox.classList.add('box');
  customerBox.innerHTML = `
   <div class="stars">
     <i class='bx bxs-star'></i>
     <i class='bx bxs-star'></i>
     <i class='bx bxs-star'></i>
     <i class='bx bxs-star'></i>
     <i class='bx bxs-star-half'></i>
   </div>
   <p>${customer.review}</p>
   <h2>${customer.name}</h2>
   <img src="${customer.image}" alt="${customer.name}">`;
   customerContainer.appendChild(customerBox);
  });
 }

  // Add to cart
  document.addEventListener('click', function (e) {
   if (e.target.classList.contains('add-cart')) {
    e.preventDefault();
  const productBox = e.target.closest(".box");
  const title = productBox.querySelector("h3").textContent;
  // parse:convert a string to num
  const price = parseFloat(productBox.querySelector("span").textContent.replace("RS.", ""));
  const image = productBox.querySelector("img").src;
  const existingProduct = cart.find(item => item.title === title);
   if (existingProduct) {
    showPopup("Item already in the cart!");
    return; // Stop here, do not update
 } 
   else {
    cart.push({ title, price, image, quantity: 1 });
    updateCartUI();
    showPopup("Item added to cart!");
   }
  }
 });

  //pop up
  function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message; //set dynamic message
  popup.style.display = "block";

  setTimeout(() => {
  popup.style.display = "none";
 }, 2000);
 }
  document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", function () {
  showPopup();
 });
 });

  // Update cart
  function updateCartUI() {
  // innerHTML:read current html and replace new
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
  total += item.price * item.quantity;
  count += item.quantity;
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
   <div class="cart-img">
    <img src="${item.image}" alt="${item.title}">
   </div>

   <div class="cart-details">
    <p class="cart-title">${item.title}</p>
    <p class="cart-price">RS.${item.price}</p>
   </div>

   <div class="cart-quantity">
   <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
   <span>${item.quantity}</span>
   <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
   </div>
   <button class="remove-btn" onclick="removeItem(${index})">X</button>`;
   cartItemsContainer.appendChild(cartItem); 
 });
   if (cart.length === 0) {
   cartItemsContainer.innerHTML = "Your cart is empty";
 }
  //it will take add a two number after the dot 
  cartTotal.textContent = total.toFixed(2);
  // //it will show a cart count 
  cartCount.textContent = count;
 }
  
  // quantity btn in sidebar
  document.addEventListener("click", function (e) {
   if (e.target.classList.contains("qty-btn")) {
  const action = e.target.dataset.action;
  const index = parseInt(e.target.dataset.index);
   if (action === "increase") {
   cart[index].quantity += 1;
 }
   else if (action === "decrease") {
   if (cart[index].quantity > 1) {
   cart[index].quantity -= 1;
 } 
   else {
   cart.splice(index, 1); // Remove item if quantity is 1
 }
 }
  updateCartUI(); //  Always refresh the UI after changes
 }
 });

  // Remove one quantity from cart item
  function removeItem(index) {
   cart.splice(index, 1);
   updateCartUI();
 }

  window.onscroll = () => {
   navbar.classList.remove('active');
   search.classList.remove('active'); 
 }

  let header = document.querySelector('header');
   window.addEventListener('scroll' , () => {
   header.classList.toggle('shadow', window.scrollY > 0);
 });     

 