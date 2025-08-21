document.addEventListener('DOMContentLoaded', function() {
    

    // Animation for service cards when they come into view
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        serviceCards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    // Animation for benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    if (benefitCards.length > 0) {
        const benefitObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                        benefitObserver.unobserve(entry.target);
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        benefitCards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            benefitObserver.observe(card);
        });
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