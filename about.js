document.addEventListener('DOMContentLoaded', function() {
    // Animation for elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                if (element.classList.contains('offer-card')) {
                    element.classList.add('animate__fadeInUp');
                } else if (element.classList.contains('reason-card')) {
                    element.classList.add('animate__fadeInLeft');
                } else if (element.classList.contains('team-member')) {
                    element.classList.add('animate__zoomIn');
                } else if (element.classList.contains('cert-image')) {
                    element.classList.add('animate__fadeInRight');
                }
            }
        });
    };

    // Initial animation check
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Counter animation for stats
    const statItems = document.querySelectorAll('.stat-item h3');
    let counted = false;

    const animateCounters = () => {
        const statsSection = document.querySelector('.company-stats');
        if (!statsSection || counted) return;

        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            counted = true;
            
            statItems.forEach(stat => {
                const target = parseInt(stat.textContent);
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        stat.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(count) + '+';
                    }
                }, 16);
            });
        }
    };

    // Initial counter check
    animateCounters();

    // Add scroll event listener for counters
    window.addEventListener('scroll', animateCounters);

    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scrolling for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons a');
    ctaButtons.forEach(button => {
        if (button.getAttribute('href') === '#contact') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    window.scrollTo({
                        top: contactSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    
});