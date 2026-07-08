// State of the Shopping Cart
let cart = [];

// Format Number to Currency
function formatCurrency(value) {
    return '$' + value.toLocaleString('es-CO');
}

// Open/Close Side Cart View
function toggleCart() {
    const sidebar = document.getElementById('sidebar-cart');
    sidebar.classList.toggle('open');
}

// Add Product to Cart array
function addToCart(name, price) {
    // Check if item already exists
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartUI();

    // Auto-open sidebar briefly to show addition
    const sidebar = document.getElementById('sidebar-cart');
    if (!sidebar.classList.contains('open')) {
        sidebar.classList.add('open');
    }
}

// Remove Item completely from Cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

// Synchronize Array with HTML Interface
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('btn-checkout');

    // Update Badge Count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Tu carrito está vacío</p>';
        cartTotalElement.textContent = '$0';
        checkoutButton.disabled = true;
        return;
    }

    // Generate Items list HTML
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>${item.quantity}x • ${formatCurrency(item.price)}</p>
            </div>
            <button class="btn-remove" onclick="removeFromCart('${item.name}')">Eliminar</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalElement.textContent = formatCurrency(totalPrice);
    checkoutButton.disabled = false;
}

// Simulation of purchase processing
function processPurchase() {
    const checkoutButton = document.getElementById('btn-checkout');
    checkoutButton.disabled = true;
    checkoutButton.textContent = 'Procesando...';

    // Mocking an elegant loading delay
    setTimeout(() => {
        // Reset state
        cart = [];
        updateCartUI();
        toggleCart(); // Close sidebar

        // Restore button state
        checkoutButton.textContent = 'Confirmar Compra';

        // Trigger elegant success animation modal
        openSuccessModal();
    }, 1500);
}

function openSuccessModal() {
    document.getElementById('success-modal').classList.add('open');
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.remove('open');
}