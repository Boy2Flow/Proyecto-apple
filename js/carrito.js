// Shopping Cart JavaScript

let cart = [];
let products = [];

document.addEventListener('DOMContentLoaded', async function() {
    await loadProductsData();
    loadCart();
    displayCart();
});

async function loadProductsData() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();
        products = data.products;
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function loadCart() {
    const savedCart = localStorage.getItem('appleCart');
    cart = savedCart ? JSON.parse(savedCart) : [];
}

function saveCart() {
    localStorage.setItem('appleCart', JSON.stringify(cart));
    updateCartCount();
}

function displayCart() {
    const cartEmpty = document.getElementById('cart-empty');
    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.style.display = 'none';
        cartSummary.style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartItems.style.display = 'block';
    cartSummary.style.display = 'block';
    
    // Display cart items
    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        return `
            <div class="cart-item" data-product-id="${product.id}">
                <div class="item-image">
                    ${getProductImage(product.id, product.category)}
                </div>
                <div class="item-details">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${product.id}', -1)">−</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${product.id}', 1)">+</button>
                    </div>
                    <button class="item-remove" onclick="removeFromCart('${product.id}')">Eliminar</button>
                </div>
                <div class="item-price">
                    <span class="price">${formatPrice(product.price * item.quantity)}</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Update summary
    updateSummary();
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.productId === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    saveCart();
    displayCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveCart();
    displayCart();
    showNotification('Producto eliminado del carrito');
}

function updateSummary() {
    let subtotal = 0;
    
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            subtotal += product.price * item.quantity;
        }
    });
    
    const shipping = subtotal > 0 ? 0 : 0; // Free shipping
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = shipping === 0 ? 'Gratis' : formatPrice(shipping);
    document.getElementById('total').textContent = formatPrice(total);
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
    return `<span style="font-size: 60px;">${emojis[category] || '🍎'}</span>`;
}

function formatPrice(price) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Checkout button
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Tu carrito está vacío');
                return;
            }
            
            showNotification('¡Gracias por tu compra! (Demo)');
            
            // Clear cart after checkout (demo)
            setTimeout(() => {
                cart = [];
                saveCart();
                displayCart();
            }, 2000);
        });
    }
});
