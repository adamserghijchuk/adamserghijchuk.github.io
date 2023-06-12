var cartTotal = 0;
const orderItemsParent = document.querySelector('.order-items');
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
  input.addEventListener('input', function() {
    if (input.value.trim() !== '') {
      input.classList.add('success');
    } else {
      input.classList.remove('success');
    }
  });
});
