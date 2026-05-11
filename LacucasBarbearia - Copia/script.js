document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Polish & Performance
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on load

    // 2. Mobile Menu Refinement
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('active');
            
            if (!isOpen) {
                // Open Menu
                navLinks.classList.add('active');
                menuToggle.classList.add('active');
                
                // Styling for full-screen overlay
                Object.assign(navLinks.style, {
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.98)',
                    backdropFilter: 'blur(15px)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '999',
                    gap: '2rem',
                    padding: '2rem'
                });
                
                navLinks.querySelectorAll('a').forEach((a, index) => {
                    a.style.fontSize = 'clamp(1.5rem, 8vw, 2.5rem)';
                    a.style.opacity = '1';
                    a.style.transform = 'translateY(0)';
                    a.style.transition = `all 0.4s ease ${index * 0.1}s`;
                });
                
                document.body.style.overflow = 'hidden';
            } else {
                // Close Menu
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Reset styles
                Object.assign(navLinks.style, {
                    display: '',
                    flexDirection: '',
                    position: '',
                    top: '',
                    left: '',
                    width: '',
                    height: '',
                    background: '',
                    backdropFilter: '',
                    justifyContent: '',
                    alignItems: '',
                    zIndex: '',
                    gap: '',
                    padding: ''
                });
                
                navLinks.querySelectorAll('a').forEach(a => {
                    a.style.fontSize = '';
                    a.style.opacity = '';
                    a.style.transform = '';
                    a.style.transition = '';
                });
                
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuToggle.click();
            }
        });
    });

    // 3. Scroll Reveal Polish (Optimized)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Hero Parallax Polish (Subtle)
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && window.innerWidth > 1024) {
        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
        }, { passive: true });
    }

    // 5. Booking Form Refinement
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const service = document.getElementById('service').value;
            
            if (!name || !service) return;

            const message = `Olá! Meu nome é ${name}. Gostaria de agendar o serviço: ${service} na Lacucas Barbearia.`;
            const whatsappUrl = `https://wa.me/5527999999999?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // 6. Smooth Scroll with Offset Fix
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
