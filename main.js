let search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick = () =>{
  search.classList.toggle("active");
  navbar.classList.remove("active");
  cartSidebar.classList.remove("active");
};

let navbar = document.querySelector('.navbar');
document.querySelector('#menu-icons').onclick = () =>{
  navbar.classList.toggle("active");
  search.classList.remove("active");
  cartSidebar.classList.remove("active");
};
  function conformation(){
    let userprefer = confirm("You want to ShopNow");    
    if(userprefer){
    alert("Enjoy your day with new flavour");
  } else{
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
      <img src="${customer.image}" alt="${customer.name}">
    `;
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
        existingProduct.quantity += 1;
    } else {
      cart.push({ title, price, image, quantity: 1 });
    }
   // refresh the sidebar content
    updateCartUI();
  }
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
    cartItem.innerHTML = `<img src="${item.image}" alt="${item.title}">
      <div>
        <p>${item.title}</p>
        <p>RS.${item.price} x ${item.quantity}</p>
      </div>
      <button onclick="removeItem(${index})" 
      style="background:red;color:white;border:none;padding:4px 8px;cursor:pointer;">X</button>`;
      //add a new child elelment to existing parent element in dom
    cartItemsContainer.appendChild(cartItem);
  });

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "Your cart is empty";
  }
  //it will take add a two number after the dot 
  cartTotal.textContent = total.toFixed(2);
  //it will show a cart count 
  cartCount.textContent = count;
}

// Remove one quantity from cart item
function removeItem(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // remove completely if quantity is 1
  }
  updateCartUI();  
}


//pop up
function showPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000); // hide after 2 seconds 
}

document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", function () {
  showPopup();
  });
});

window.onscroll = () => {
  navbar.classList.remove('active');
  search.classList.remove('active'); 
  
}

let header = document.querySelector('header');
  window.addEventListener('scroll' , () => {
  header.classList.toggle('shadow', window.scrollY > 0);
});     

 