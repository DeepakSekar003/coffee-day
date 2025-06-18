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
  function conformation(){
    let userprefer = confirm("You want to ShopNow"); 
    if(userprefer){
    alert("Enjoy your day with new flavour");
  } else{
    alert("No worries! Take your time");
  }};

window.onscroll = () => {
  navbar.classList.remove('active');
  search.classList.remove('active');
}

let header = document.querySelector('header');
  window.addEventListener('scroll' , () => {
  header.classList.toggle('shadow', window.scrollY > 0);
});     