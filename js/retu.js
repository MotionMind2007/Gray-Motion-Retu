document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Logging
    console.log('Gray Retu Modern Script Charged');

    // 2. Load Products from JSON
    const productGrid = document.getElementById('food-grid');
    if (productGrid) {
        // Fetch products.json (path logic)
        const pathPrefix = window.location.pathname.includes('pages/') ? '../' : '';
        fetch(`${pathPrefix}assets/products.json`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                renderProducts(data);
                initScrollAnimations();
                console.log('Products loaded successfully');
            })
            .catch(err => {
                console.error('Error loading products:', err);
                // Fallback content in case fetch fails
                productGrid.innerHTML = '<p style="color:red; text-align:center;">Failed to load products. Check console for details.</p>';
            });
    } else {
        initScrollAnimations();
    }

    function renderProducts(products) {
        productGrid.innerHTML = products.map((item, index) => `
            <div class="card" data-aos="fade-up" data-aos-delay="${(index % 3) * 100}">
                <img src="${item.image}" alt="${item.name}">
                <div class="card-body">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="card-footer">
                        <span class="price">${item.price}</span>
                        <a href="${window.location.pathname.includes('pages/') ? '' : 'pages/'}contact.html" class="btn order-btn">Order Now</a>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Refresh AOS after adding dynamic content
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Scroll Effects
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(18, 18, 18, 0.95)';
            header.style.padding = '15px 10%';
        } else {
            header.style.background = 'rgba(18, 18, 18, 0.8)';
            header.style.padding = '20px 10%';
        }
    });

    // 5. GSAP Animations
    function initScrollAnimations() {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Hero section
            gsap.to('.hero-content h1', {
                duration: 1.2,
                y: 0,
                opacity: 1,
                ease: 'power4.out',
                delay: 0.3,
                startAt: { y: 100, opacity: 0 }
            });

            gsap.to('.hero-content p', {
                duration: 1.2,
                y: 0,
                opacity: 1,
                ease: 'power4.out',
                delay: 0.6,
                startAt: { y: 50, opacity: 0 }
            });

            gsap.to('.hero-content .btn', {
                duration: 0.8,
                scale: 1,
                opacity: 1,
                ease: 'back.out(1.7)',
                delay: 0.9,
                startAt: { scale: 0.8, opacity: 0 }
            });

            // Card hover effects
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const { left, top, width, height } = card.getBoundingClientRect();
                    const x = (e.clientX - left) / width - 0.5;
                    const y = (e.clientY - top) / height - 0.5;
                    
                    gsap.to(card.querySelector('img'), {
                        duration: 0.4,
                        x: x * 15,
                        y: y * 15,
                        scale: 1.1,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card.querySelector('img'), {
                        duration: 0.4,
                        x: 0,
                        y: 0,
                        scale: 1,
                        ease: 'power2.out'
                    });
                });
            });
        }
    }

    // 6. Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.innerText = 'Sending...';
            setTimeout(() => {
                btn.innerText = 'Sent!';
                contactForm.reset();
                setTimeout(() => btn.innerText = 'Send Message', 2000);
            }, 1000);
        });
    }
});
