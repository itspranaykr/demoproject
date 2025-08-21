// Contact Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Contact Form WhatsApp Integration
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !phone || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Validate phone number (basic Indian format)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit Indian phone number.');
                return;
            }
            
            // Get subject text from selected option
            const subjectText = document.getElementById('subject').options[document.getElementById('subject').selectedIndex].text;
            
            // Format WhatsApp message
            let whatsappMessage = `New Contact Inquiry from Website:\n\n`;
            whatsappMessage += `*Name:* ${name}\n`;
            whatsappMessage += `*Phone:* ${phone}\n`;
            whatsappMessage += `*Email:* ${email}\n`;
            whatsappMessage += `*Subject:* ${subjectText}\n`;
            whatsappMessage += `*Message:* ${message}\n\n`;
            whatsappMessage += `_This message was sent from the website contact form_`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp with the message
            const whatsappUrl = `https://wa.me/917011669314?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            alert('Thank you for your message! We have opened WhatsApp for you to complete the conversation.');
            
            // Optional: Reset form
            // this.reset();
        });
    }
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Animation for form elements
    const formElements = document.querySelectorAll('.form-group, .btn');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    formElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
    
    // Animation for info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });
});