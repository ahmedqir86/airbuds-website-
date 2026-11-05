
const products = [
  {
    id: 1,
    name: "AirBuds Pro",
    price: 2500,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600"
  },
  {
    id: 2,
    name: "AirBuds Max",
    price: 3500,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600"
  },
  {
    id: 3,
    name: "AirBuds Lite",
    price: 3500,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600"
  },
  {
    id: 4,
    name: "AirBuds Black",
    price: 4500,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600"
  },
  {
    id: 5,
    name: "AirBuds Premium",
    price: 1300,
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=600"
  },
  {
    id: 6,
    name: "AirBuds Mini",
    price: 1000,
    image: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600"
  }
];

let cart = [];

function displayProducts(items) {

  const container = document.getElementById("productList");

  container.innerHTML = items.map(product => `
    <div class="product">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Premium Wirlees Sound</p>
      <div class="price">Rs. ${product.price.toLocaleString("en-PK")}</div>
      <button class="btn" onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `).join("");

}

function addToCart(id) {

  const product = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }

  updateCart();
}

function removeFromCart(id) {

  cart = cart.filter(p => p.id !== id);

  updateCart();
}

function updateCart() {

  const container = document.getElementById("cartItems");

  const count = cart.reduce((sum,p) => sum + p.quantity, 0);

  document.getElementById("cartCount").innerText = count;

  const total = cart.reduce(
    (sum,p) => sum + p.price * p.quantity, 0
  );

  document.getElementById("total").innerText =
    total.toLocaleString("en-PK");

  if(cart.length === 0) {
    container.innerHTML = "Your cart is empty.";
    return;
  }

  container.innerHTML = cart.map(p => `
    <div class="cart-item">
      <span>${p.name} × ${p.quantity}</span>
      <span>Rs. ${(p.price*p.quantity).toLocaleString("en-PK")}</span>
      <button class="remove" onclick="removeFromCart(${p.id})">
        Remove
      </button>
    </div>
  `).join("");
}

document.getElementById("search").addEventListener("input", function() {

  const value = this.value.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});

function checkout() {

  if(cart.length === 0) {
    alert("Please add a product to your cart first!");
    return;
  }

  let message = "Hello! I want to order AirBuds:\n\n";

  cart.forEach(p => {
    message += p.name + " x " + p.quantity +
    " = Rs. " + (p.price*p.quantity) + "\n";
  });

  const total = cart.reduce(
    (sum,p) => sum + p.price*p.quantity, 0
  );

  message += "\nTotal: Rs. " + total;

  const phone = "923001234567";

  window.open(
    "https://wa.me/" + phone +
    "?text=" + encodeURIComponent(message),
    "_blank"
  );
}

// CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e) {

  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  const successMessage = document.getElementById("successMessage");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const messageError = document.getElementById("messageError");

  // Clear previous errors

  [name, email, phone, message].forEach(field => {
    field.classList.remove("invalid");
  });

  [nameError, emailError, phoneError, messageError].forEach(error => {
    error.innerText = "";
  });

  successMessage.innerText = "";

  let valid = true;

  // Name validation

  if(name.value.trim().length < 3) {
    nameError.innerText = "Name must contain at least 3 characters.";
    name.classList.add("invalid");
    valid = false;
  }

  // Email validation

  const emailPattern = /^[a-zA-Z0-9._%+-]{3,}@(gmail\.com|yahoo\.com)$/i;

if (!emailPattern.test(email.value.trim())) {
    emailError.innerText =
        "Please enter a valid Gmail or Yahoo email (minimum 3 characters before @).";

    email.classList.add("invalid");
    valid = false;
} else {
    emailError.innerText = "";
    email.classList.remove("invalid");
  }

  // Phone validation 

  const phonePattern = /^(03\d{9}|\+923\d{9}|923\d{9})$/;

  if(!phonePattern.test(phone.value.trim())) {
    phoneError.innerText = "Enter a valid Pakistani phone number.";
    phone.classList.add("invalid");
    valid = false;
  }

  // Message validation

  if(message.value.trim().length < 10) {
    messageError.innerText = "Message must contain at least 10 characters.";
    message.classList.add("invalid");
    valid = false;
  }

  if(!valid) {
    return;
  }

  successMessage.innerText =
    "Your form has been validated successfully!";

  contactForm.reset();

});

displayProducts(products);

const hamburger = document.querySelector('.hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function(){
  navMenu.classList.toggle('active');
  // Icon badal do
  if(navMenu.classList.contains('active')){
    hamburger.textContent = '✕';
  } else {
    hamburger.textContent = '☰';
  }
});

// Kisi link pe click karo to menu khud band ho jaye
document.querySelectorAll('#navMenu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.textContent = '☰';
  });
});