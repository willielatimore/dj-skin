// Simple cart logic using localStorage
const cart = JSON.parse(localStorage.getItem("cart") || "[]");

// Add to cart
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  });
});

// Display cart
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

if (cartItemsContainer && cartTotal) {
  let total = 0;
  cartItemsContainer.innerHTML = "";
  cart.forEach(item => {
    total += item.price;
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.name}</td><td>$${item.price.toFixed(2)}</td>`;
    cartItemsContainer.appendChild(row);
  });
  cartTotal.textContent = total.toFixed(2);
}




// Product Filtering
const categoryButtons = document.querySelectorAll(".category-btn");
const productCards = document.querySelectorAll(".product-card");

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    productCards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      if (category === "all" || cardCategory === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});


            // Search Bar
const searchBar = document.getElementById("search-bar");
const sortSelect = document.getElementById("sort-select");

function filterProducts() {
  const activeCategory = document.querySelector(".category-btn.active").getAttribute("data-category");
  const searchText = searchBar.value.toLowerCase();

  productCards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    const category = card.getAttribute("data-category");
    const matchesCategory = activeCategory === "all" || category === activeCategory;
    const matchesSearch = name.includes(searchText);

    card.style.display = matchesCategory && matchesSearch ? "block" : "none";
  });
}

function sortProducts() {
  const sortType = sortSelect.value;
  const productList = document.getElementById("product-list");
  const sorted = Array.from(productCards).sort((a, b) => {
    const priceA = parseFloat(a.getAttribute("data-price"));
    const priceB = parseFloat(b.getAttribute("data-price"));
    return sortType === "low-high" ? priceA - priceB : priceB - priceA;
  });

  sorted.forEach(card => productList.appendChild(card)); // re-append in sorted order
}

searchBar.addEventListener("input", () => {
  filterProducts();
});

sortSelect.addEventListener("change", () => {
  sortProducts();
});

//  Testimonials swipe on mobile
const carousel = document.getElementById('testimonialCarousel');
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', function (event) {
  touchStartX = event.changedTouches[0].screenX;
}, false);

carousel.addEventListener('touchend', function (event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipeGesture();
}, false);

function handleSwipeGesture() {
  if (touchEndX < touchStartX - 50) {
    const nextBtn = carousel.querySelector('.carousel-control-next');
    nextBtn.click();
  }
  if (touchEndX > touchStartX + 50) {
    const prevBtn = carousel.querySelector('.carousel-control-prev');
    prevBtn.click();
  }
}

// Lightbox functionality
document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = this.href;
    lightbox.style.display = 'block';
  });
});

document.querySelector('.lightbox .close').addEventListener('click', () => {
  document.getElementById('lightbox').style.display = 'none';
});

// Close lightbox on outside click
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.style.display = 'none';
  }
});