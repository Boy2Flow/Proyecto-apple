// Apple Website - Main JavaScript

// Navigation Search Functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(".nav-search");
  const navContent = document.querySelector(".nav-content");

  if (searchButton) {
    searchButton.addEventListener("click", function () {
      toggleSearch();
    });
  }

  // Load cart count
  updateCartCount();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

function toggleSearch() {
  const searchOverlay = document.getElementById("search-overlay");
  if (!searchOverlay) {
    createSearchOverlay();
  } else {
    searchOverlay.classList.toggle("active");
    if (searchOverlay.classList.contains("active")) {
      document.getElementById("search-input").focus();
    }
  }
}

function createSearchOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "search-overlay";
  overlay.className = "search-overlay active";
  overlay.innerHTML = `
        <div class="search-container">
            <input type="text" id="search-input" placeholder="Buscar en apple.com" autofocus>
            <button class="search-close" onclick="toggleSearch()">×</button>
        </div>
        <div class="search-results" id="search-results"></div>
    `;
  document.body.appendChild(overlay);

  // Add styles
  const style = document.createElement("style");
  style.textContent = `
        .search-overlay {
            position: fixed;
            top: 44px;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9998;
            display: none;
            padding: 40px 20px;
        }
        
        .search-overlay.active {
            display: block;
        }
        
        .search-container {
            max-width: 680px;
            margin: 0 auto;
            position: relative;
        }
        
        #search-input {
            width: 100%;
            padding: 15px 50px 15px 20px;
            font-size: 24px;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            color: #f5f5f7;
            outline: none;
        }
        
        .search-close {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #f5f5f7;
            font-size: 32px;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.3s;
        }
        
        .search-close:hover {
            opacity: 1;
        }
        
        .search-results {
            max-width: 680px;
            margin: 20px auto;
            color: #f5f5f7;
        }
    `;
  document.head.appendChild(style);

  // Add search functionality
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", performSearch);
}

function performSearch(e) {
  const query = e.target.value.toLowerCase();
  const resultsContainer = document.getElementById("search-results");

  if (query.length < 2) {
    resultsContainer.innerHTML = "";
    return;
  }

  // Load products from database
  fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      const results = data.products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );

      displaySearchResults(results);
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
}

function displaySearchResults(results) {
  const resultsContainer = document.getElementById("search-results");

  if (results.length === 0) {
    resultsContainer.innerHTML =
      '<p style="opacity: 0.6;">No se encontraron resultados</p>';
    return;
  }

  const html = results
    .map(
      (product) => `
        <div style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <h3 style="font-size: 18px; margin-bottom: 5px;">${product.name}</h3>
            <p style="opacity: 0.6; font-size: 14px;">${product.description}</p>
            <a href="tienda.html?product=${product.id}" style="color: #2997ff; font-size: 14px;">Ver producto →</a>
        </div>
    `
    )
    .join("");

  resultsContainer.innerHTML = html;
}

// Shopping Cart Functions
function updateCartCount() {
  const cart = getCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Update cart badge if it exists
  const cartBadge = document.querySelector(".cart-badge");
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? "block" : "none";
  }
}

function getCart() {
  const cart = localStorage.getItem("appleCart");
  return cart ? JSON.parse(cart) : [];
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  localStorage.setItem("appleCart", JSON.stringify(cart));
  updateCartCount();

  // Show notification
  showNotification("Producto añadido al carrito");
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("appleCart", JSON.stringify(cart));
  updateCartCount();
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        background: #000;
        color: #fff;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Utility Functions
function formatPrice(price) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

// Add animation styles
const animationStyles = document.createElement("style");
animationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);
