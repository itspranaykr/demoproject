document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger && navbar) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navbar) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
    
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Intersection Observer for counter animation
    const statsSection = document.querySelector('.stats');
    if (counters.length > 0 && statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form with WhatsApp Integration
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !message) {
                alert('Please fill in all required fields (Name and Message).');
                return;
            }
            
            // Format WhatsApp message
            let whatsappMessage = `New Contact Inquiry from Website:\n\n`;
            whatsappMessage += `*Name:* ${name}\n`;
            if (email) whatsappMessage += `*Email:* ${email}\n`;
            if (phone) whatsappMessage += `*Phone:* ${phone}\n`;
            whatsappMessage += `*Message:* ${message}\n\n`;
            whatsappMessage += `_This message was sent from the website contact form_`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp with the message (using number 7011669314)
            const whatsappUrl = `https://wa.me/917503133793?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            alert('Thank you for your message! We Will reach you soon.');
            
            // Reset form
            this.reset();
            
            // Optional: You can also send the form data to your server
            // sendFormDataToServer({ name, email, phone, message });
        });
    }
    
    // Simple cart functionality
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let cartItems = 0;
        
        function updateCart() {
            cartCount.textContent = cartItems;
        }
        
        // Example: Add to cart button functionality
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                cartItems++;
                updateCart();
                
                // Animation for cart icon
                if (cartCount.parentElement) {
                    cartCount.parentElement.classList.add('animate');
                    setTimeout(() => {
                        cartCount.parentElement.classList.remove('animate');
                    }, 500);
                }
            });
        });
        
        // Initialize cart
        updateCart();
    }
    
    // City cards animation
    const cityCards = document.querySelectorAll('.city-card');
    cityCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Testimonial slider (simple version)
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        // Auto-rotate testimonials
        if (testimonials.length > 1) {
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        }
        
        // Show first testimonial initially
        showTestimonial(0);
    }
    
    // Optional function to send form data to your server
    /*
    function sendFormDataToServer(formData) {
        fetch('your-server-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Form data successfully sent to server:', data);
        })
        .catch(error => {
            console.error('Error sending form data:', error);
        });
    }
    */
});
// Existing counter code (if any) plus this addition:

// Counter animation for stats section
function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(() => animateCounter(counter), 1);
        }
    });
}

