// Get cart count badge element
const cartCount = document.getElementById("cart-count");

// Load cart from localStorage or initialize
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count badge
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add product to cart
function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
}

// Remove item from cart by index
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const price = parseFloat(this.getAttribute("data-price"));
    addToCart(name, price);
    alert(`${name} added to cart!`);
  });
});

// Expose functions globally if needed in cart.html
window.removeFromCart = removeFromCart;

// Update badge count on page load
updateCartCount();
