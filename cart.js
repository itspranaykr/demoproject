// Cart Page JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    const itemCount = document.getElementById('itemCount');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    const shippingAmount = document.querySelector('.shipping-amount');
    const taxAmount = document.querySelector('.tax-amount');
    const totalAmount = document.querySelector('.total-amount');
    const checkoutForm = document.getElementById('checkoutForm');
    const cartCount = document.querySelector('.cart-count');
    
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Initialize cart
    updateCartDisplay();
    
    // Update cart display
    function updateCartDisplay() {
        // Update cart count in header
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        itemCount.textContent = `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`;
        
        // Check if cart is empty
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartSummary.style.display = 'none';
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        cartSummary.style.display = 'block';
        
        // Clear cart items
        cartItemsContainer.innerHTML = '';
        
        // Add cart items
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.setAttribute('data-id', item.id);
            
            cartItemElement.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1509391366360-2e959784a276'">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-category">${item.category}</div>
                    <p class="cart-item-price">₹${item.price.toLocaleString('en-IN')} × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="decrease-quantity"><i class="fas fa-minus"></i></button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="increase-quantity"><i class="fas fa-plus"></i></button>
                        </div>
                        <button class="remove-item"><i class="fas fa-trash"></i> Remove</button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Add event listeners
        addCartEventListeners();
        
        // Update cart summary
        updateCartSummary();
    }
    
    // Add event listeners to cart items
    function addCartEventListeners() {
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').getAttribute('data-id');
                const item = cart.find(item => item.id === itemId);
                
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(item => item.id !== itemId);
                }
                
                updateCart();
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').getAttribute('data-id');
                const item = cart.find(item => item.id === itemId);
                item.quantity += 1;
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').getAttribute('data-id');
                cart = cart.filter(item => item.id !== itemId);
                updateCart();
                showToast('Item removed from cart');
            });
        });
    }
    
    // Update cart summary - REMOVED 18% GST
    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 200 : 0; // ₹200 shipping charge
        const total = subtotal + shipping; // Removed GST calculation
        
        subtotalAmount.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
        shippingAmount.textContent = `₹${shipping.toLocaleString('en-IN')}`;
        taxAmount.textContent = `₹0.00`; // Set to 0 since GST is removed
        totalAmount.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
    
    // Update cart in localStorage
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
    
    // Checkout form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (cart.length === 0) {
            showToast('Your cart is empty. Add items before checkout.');
            return;
        }
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const state = document.getElementById('state').value.trim();
        const pincode = document.getElementById('pincode').value.trim();
        const country = document.getElementById('country').value;
        const notes = document.getElementById('notes').value.trim();
        
        // Basic validation
        if (!name || !phone || !email || !address || !city || !state || !pincode || !country) {
            showToast('Please fill in all required fields.');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.');
            return;
        }
        
        // Validate phone number (basic Indian format)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            showToast('Please enter a valid 10-digit Indian phone number.');
            return;
        }
        
        // Calculate order summary - REMOVED 18% GST
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 200;
        const total = subtotal + shipping; // Removed GST calculation
        
        // Format WhatsApp message
        let whatsappMessage = `New Order from AG ENTERPRISES E-Shop:\n\n`;
        whatsappMessage += `*Customer Details:*\n`;
        whatsappMessage += `Name: ${name}\n`;
        whatsappMessage += `Phone: ${phone}\n`;
        whatsappMessage += `Email: ${email}\n\n`;
        whatsappMessage += `*Delivery Address:*\n`;
        whatsappMessage += `${address}\n`;
        whatsappMessage += `${city}, ${state} - ${pincode}\n`;
        whatsappMessage += `${country}\n\n`;
        whatsappMessage += `*Order Items:*\n`;
        
        cart.forEach(item => {
            whatsappMessage += `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price.toLocaleString('en-IN')} each\n`;
        });
        
        whatsappMessage += `\n*Order Summary:*\n`;
        whatsappMessage += `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
        whatsappMessage += `Shipping: ₹${shipping.toLocaleString('en-IN')}\n`;
        whatsappMessage += `Total: ₹${total.toLocaleString('en-IN')}\n\n`;
        
        if (notes) {
            whatsappMessage += `*Order Notes:*\n${notes}\n\n`;
        }
        
        whatsappMessage += `_This order was placed through the website_`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp with the message (using number 7011669314)
        const whatsappUrl = `https://wa.me/919376457792?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        showToast('Order placed successfully! We have opened WhatsApp for confirmation.');
        
        // Clear cart
        cart = [];
        updateCart();
        
        // Reset form
        this.reset();
    });
    
    // Toast notification function
    function showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
});