var cartTotal = 0;
const authForm = document.querySelector('.auth-form');
const authModal = document.querySelector('.auth-modal');
const orderItemsParent = document.querySelector('.order-items');
authForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
}
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItems = document.querySelector(".cart-items");
  const total = document.querySelector(".total");
  const categories = document.querySelectorAll(".categories li");
  showProductsByCategory('all');
  window.addEventListener('scroll', function () {
    var button = document.getElementById('backToTopButton');
    if (window.pageYOffset > 200) {
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  });

  document.getElementById('backToTopButton').addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      const product = event.target.parentElement;
      const productName = product.querySelector("h3").textContent;
      const productPrice = parseFloat(product.querySelector(".price").textContent.slice(1));

      addToCart(productName, productPrice);
    });
  });

  function addToCart(name, price) {
    const item = document.createElement("li");
    item.textContent = `${name} - $${price}`;
    cartItems.appendChild(item);

    cartTotal += price;
    total.textContent = `Загальна сума: $${cartTotal.toFixed(2)}`;
  }

  categories.forEach(function (category) {
    category.addEventListener("click", function () {
      const selectedCategory = category.dataset.category;

      categories.forEach(function (item) {
        item.classList.remove("active");
      });

      category.classList.add("active");

      showProductsByCategory(selectedCategory);
    });
  });

  function showProductsByCategory(category) {
    const products = document.querySelectorAll(".product");

    products.forEach(function (product) {
      product.style.display = "none";

      if (category === "all" || product.classList.contains(category)) {
        product.style.display = "block";
      }
    });
  }
});

// auth

let name = document.querySelector('#name');
let login = document.querySelector('#login');
let password = document.querySelector('#password');
let submitAuth = document.querySelector('#submit-auth');

let users = {};

function User(name, login, password) {
  this.name = name;
  this.login = login;
  this.password = password;
}

function createId(users) {
  return Object.keys(users).length;
}

submitAuth.addEventListener('click', (event) => {
  event.preventDefault(); 
  const nameUser = name.value;
  const loginUser = login.value;
  const passwordUser = password.value;

  const userId = Object.keys(users).find((id) => users[id].login === loginUser);

  if (userId) {
    if (users[userId].password === passwordUser) {
      alert('Ви успішно авторизувалися!');
      closeAuthModal();
      clearAuthModal();
    } else {
      alert('Неправильний пароль!');
    }
  } else {
    const user = new User(nameUser, loginUser, passwordUser);
    const newUserId = 'User' + createId(users);
    users[newUserId] = user;
    alert('Ви успішно зареєструвалися!');
    closeAuthModal();
    clearAuthModal();
  }
  console.log(users);
});

function clearAuthModal(){
  name.value = '';
  login.value = '';
  password.value = '';
}

function openAuthModal() {
  authModal.style.display = 'block';
}

function closeAuthModal() {
  authModal.style.display = 'none';
}

// auth

const clearCartButton = document.querySelector('.clear-cart');
clearCartButton.addEventListener('click', () => {
  const cartItems = document.querySelector('.cart-items');
  cartItems.innerHTML = '';
  cartTotal = 0;
  const total = document.querySelector(".total");
  total.textContent = `Загальна сума: $${cartTotal.toFixed(2)}`;
  orderItemsParent.innerHTML = '';
  updateCartItemsTotal();
});


const orderButton = document.querySelector('.order-button');
const overlay = document.querySelector('.overlay');
const orderWindow = document.querySelector('.order-window');
const closeWindowButton = document.querySelector('.close-window');

orderButton.addEventListener('click', () => {
  overlay.classList.add('show-overlay');
  orderWindow.classList.add('show-order-window');
  if (cartTotal > 0) {
    var cartItems = document.querySelector('.cart-items');
    var cartIntoOrder = cartItems.cloneNode(true);
    orderItemsParent.appendChild(cartIntoOrder);
  } else {
    orderItemsParent.innerHTML = '';
  }
});


closeWindowButton.addEventListener('click', () => {
  overlay.classList.remove('show-overlay');
  orderWindow.classList.remove('show-order-window');
});



function updateCartItemsTotal() {
  const cartItems = document.querySelectorAll('.cart-items li');
  cartItems.forEach(function (item) {
    const price = parseFloat(item.textContent.split(' - $')[1]);
    item.textContent = `${item.textContent.split(' - $')[0]} - $${price.toFixed(2)}`;
  });
}

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
  input.addEventListener('input', function () {
    if (input.value.trim() !== '') {
      input.classList.add('success');
    } else {
      input.classList.remove('success');
    }
  });
});