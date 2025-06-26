let search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick = () =>{
  search.classList.toggle("active");
  navbar.classList.remove("active");
};

let navbar = document.querySelector('.navbar');
document.querySelector('#menu-icons').onclick = () =>{
  navbar.classList.toggle("active");
  search.classList.remove("active");
};

let carticon = document.querySelector('cart-container');
document.querySelector('#cart-icon').onclick = () =>{
   carticon.classList.toggle("active");
}

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
const addCartButtons = document.querySelectorAll(".add-cart");

//it will hold all the added items
let cart = [];

// Open sidebar
cartIcon.onclick = () => {
cartSidebar.classList.add("active");
};

// Close sidebar
closeCart.onclick = () => {
cartSidebar.classList.remove("active");
};

// Add to cart
addCartButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    // stop default anchor behavior
    e.preventDefault();
    //find the nearest parent element 
    const productBox = button.closest(".box");
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
    cartItem.innerHTML = `<img src="${item.image}" alt="${item.title}">
      <div>
        <p>${item.title}</p>
        <p>RS.${item.price} × ${item.quantity}</p>
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
  cartCount.textContent = count;
}

// Remove from cart
function removeItem(index) {
  cart.splice(index, 1);
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

 