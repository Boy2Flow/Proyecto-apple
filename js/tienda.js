// Tienda JavaScript

let allProducts = [];
let currentCategory = 'all';

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupCategoryFilters();
});

async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();
        allProducts = data.products;
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('products-container').innerHTML = 
            '<p style="text-align: center; color: #6e6e73;">Error al cargar los productos. Por favor, intenta de nuevo más tarde.</p>';
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6e6e73; grid-column: 1/-1;">No se encontraron productos en esta categoría.</p>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                ${getProductImage(product.id, product.category)}
            </div>
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                Desde ${formatPrice(product.price)}
            </div>
            <div class="product-actions">
                <button class="btn-primary" onclick="addToCart('${product.id}')">
                    Añadir al carrito
                </button>
                <a href="producto.html?id=${product.id}" class="btn-secondary">
                    Ver detalles
                </a>
            </div>
        </div>
    `).join('');
}

function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category
            const category = this.getAttribute('data-category');
            currentCategory = category;
            
            // Filter products
            if (category === 'all') {
                displayProducts(allProducts);
            } else {
                const filtered = allProducts.filter(product => 
                    product.category.toLowerCase() === category.toLowerCase()
                );
                displayProducts(filtered);
            }
        });
    });
}

function getProductImage(id, category) {
    // Mapa de imágenes disponibles
    const images = {
        'iphone-17-pro': 'images/iphone-17-pro.png',
        'iphone-air': 'images/iphone-air.png',
        'iphone-16': 'images/iphone-16.png',
        'macbook-air-15': 'images/macbook-air-15.png',
        'macbook-pro-14': 'images/macbook-air-15.png', // Fallback visual
        'ipad-air': 'images/ipad-air.png',
        'ipad-pro-13': 'images/ipad-air.png', // Fallback visual
        'watch-series-11': 'images/watch-series-11.png',
        'watch-ultra-3': 'images/watch-series-11.png', // Fallback visual
        'airpods-pro-3': 'images/airpods-pro-3.png'
    };

    if (images[id]) {
        return `<img src="${images[id]}" alt="${id}" style="width: 100%; height: 100%; object-fit: contain;">`;
    }

    // Fallback a emojis si no hay imagen
    const emojis = {
        'iPhone': '📱',
        'iPad': '📱',
        'Mac': '💻',
        'Watch': '⌚',
        'AirPods': '🎧',
        'TV y Casa': '📺'
    };
    return `<span style="font-size: 80px;">${emojis[category] || '🍎'}</span>`;
}

function formatPrice(price) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}
