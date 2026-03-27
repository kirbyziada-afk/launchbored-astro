document.addEventListener('DOMContentLoaded', () => {
    /* Custom Cursor */
    const cursor = document.querySelector('.custom-cursor');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        const interactiveSelectors = 'a, button, .interactive, input, textarea';
        document.querySelectorAll(interactiveSelectors).forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    /* Header Scrolled State & Mobile Menu */
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    /* Hero Animations */
    const animateTitleWords = document.querySelectorAll('.animate-title .word');
    const animateFadeIns = document.querySelectorAll('.animate-fade-in');

    animateTitleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, 100 * index + 300);
    });

    animateFadeIns.forEach((el, index) => {
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 800 + (200 * index));
    });

    /* Magnetic Buttons */
    const magneticElements = document.querySelectorAll('.btn-large, .logo');
    if (!isTouchDevice) {
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const pull = 0.3;
                el.style.transform = `translate(${x * pull}px, ${y * pull}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = `translate(0px, 0px)`;
                el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });

            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
            });
        });
    }

    /* Scroll Reveal */
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    /* Opaque Text Reveal String Splitting */
    const scrollRevealText = document.querySelector('.scroll-reveal-text');
    if (scrollRevealText) {
        const words = scrollRevealText.textContent.trim().split(/\s+/);
        scrollRevealText.innerHTML = '';
        words.forEach(word => {
            const span = document.createElement('span');
            span.innerText = word + ' ';
            span.style.color = 'rgba(255,255,255,0.15)';
            span.style.transition = 'color 0.1s linear';
            scrollRevealText.appendChild(span);
        });
    }

    /* ==========================================================================
       Stacked Cards Depth Effect & Goo Dividers (Maxima Therapy Style)
       ========================================================================== */
    const stackSections = document.querySelectorAll('.stack-section');
    
    // Inject the goo into each section except hero
    const dripSvgHTML = `
        <div class="drip-container">
            <svg class="drip-svg" viewBox="0 0 1000 120" preserveAspectRatio="none">
                <path fill="currentColor">
                    <animate repeatCount="indefinite" fill="freeze" attributeName="d" dur="5s" values="
                    M 0 0 L 1000 0 L 1000 10 C 970 10, 960 90, 930 90 C 900 90, 890 10, 860 10 C 830 10, 820 60, 790 60 C 760 60, 750 10, 720 10 C 690 10, 680 110, 650 110 C 620 110, 610 10, 580 10 C 550 10, 540 40, 510 40 C 480 40, 470 10, 440 10 C 410 10, 400 80, 370 80 C 340 80, 330 10, 300 10 C 270 10, 260 120, 230 120 C 200 120, 190 10, 160 10 C 130 10, 120 50, 90 50 C 60 50, 50 10, 20 10 L 0 10 Z;
                    M 0 0 L 1000 0 L 1000 10 C 970 10, 960 60, 930 60 C 900 60, 890 10, 860 10 C 830 10, 820 100, 790 100 C 760 100, 750 10, 720 10 C 690 10, 680 40, 650 40 C 620 40, 610 10, 580 10 C 550 10, 540 120, 510 120 C 480 120, 470 10, 440 10 C 410 10, 400 50, 370 50 C 340 50, 330 10, 300 10 C 270 10, 260 80, 230 80 C 200 80, 190 10, 160 10 C 130 10, 120 100, 90 100 C 60 100, 50 10, 20 10 L 0 10 Z;
                    M 0 0 L 1000 0 L 1000 10 C 970 10, 960 90, 930 90 C 900 90, 890 10, 860 10 C 830 10, 820 60, 790 60 C 760 60, 750 10, 720 10 C 690 10, 680 110, 650 110 C 620 110, 610 10, 580 10 C 550 10, 540 40, 510 40 C 480 40, 470 10, 440 10 C 410 10, 400 80, 370 80 C 340 80, 330 10, 300 10 C 270 10, 260 120, 230 120 C 200 120, 190 10, 160 10 C 130 10, 120 50, 90 50 C 60 50, 50 10, 20 10 L 0 10 Z" />
                </path>
            </svg>
        </div>
    `;

    const sectionsData = [
        { id: 'intro', bgColor: 'var(--bg-main)' },
        { id: 'about', bgColor: 'var(--bg-dark)' },
        { id: 'products', bgColor: 'var(--bg-main)' },
        { id: 'coming-soon', bgColor: 'var(--bg-dark)' },
        { id: 'waitlist', bgColor: 'var(--bg-main)' },
        { id: 'contact', bgColor: 'var(--bg-dark)' },
        { id: 'footer', bgColor: 'var(--bg-main)' }
    ];

    sectionsData.forEach(data => {
        const sec = document.getElementById(data.id);
        if (sec) {
            const inner = sec.querySelector('.stack-inner');
            if (inner) {
                inner.style.overflow = 'visible'; // allow organic sticking out of the boundary
                inner.insertAdjacentHTML('afterbegin', `<div style="position: absolute; bottom: calc(100% - 2px); left: 0; width: 100%; color: ${data.bgColor}; z-index: 10; pointer-events: none; transform: rotate(180deg);">${dripSvgHTML}</div>`);
            }
        }
    });

    const starWarsContent = document.querySelector('.star-wars-content');
    const aboutSection = document.getElementById('about');

    window.addEventListener('scroll', () => {
        const wh = window.innerHeight;

        // 1. Opaque Text Fill Logic
        if (aboutSection && scrollRevealText) {
            const productsSec = document.getElementById('products');
            if (productsSec) {
                const prodRect = productsSec.getBoundingClientRect();
                // 'about' section has 150vh margin-bottom, so products enters the bottom of the screen when prodRect.top = 2.5 * wh.
                // It completes its margin travel when prodRect.top = 1.0 * wh (reaching the bottom edge).
                let progress = 1 - ((prodRect.top - wh) / (1.5 * wh));
                
                if (progress < 0) progress = 0;
                if (progress > 1) progress = 1;
                
                const spans = scrollRevealText.querySelectorAll('span');
                const totalSpans = spans.length;
                const fillIndex = progress * totalSpans;
                
                spans.forEach((span, i) => {
                    let wordProgress = fillIndex - i; 
                    if (wordProgress > 1) wordProgress = 1;
                    if (wordProgress < 0) wordProgress = 0;
                    
                    const alpha = 0.15 + (0.85 * wordProgress);
                    span.style.color = `rgba(255, 255, 255, ${alpha})`;
                });
            }
        }

        // 2. Stacked Depth Logic
        stackSections.forEach((sec, index) => {
            const rect = sec.getBoundingClientRect();
            const inner = sec.querySelector('.stack-inner');
            if (!inner) return;

            const innerContent = inner.querySelector('.content-wrapper, .star-wars-container');

            // Once the section naturally sticks at top:0
            if (rect.top <= 0) {
                const nextSec = stackSections[index + 1];
                if (nextSec) {
                    const nextRect = nextSec.getBoundingClientRect();
                    // Distance before the next section fully covers this one
                    let progress = 1 - (nextRect.top / wh);
                    
                    if (progress < 0) progress = 0;
                    if (progress > 1) progress = 1;
                    
                    // Slightly scale as it is obscured
                    const scale = 1 - (progress * 0.05); // Max scale down to 0.95
                    
                    inner.style.transform = `scale(${scale})`; // scale the INNER content
                    inner.style.filter = `none`;

                    if (innerContent) {
                        // Fade out the content so it doesn't get awkwardly chopped off
                        let fadeProgress = progress * 2.5; // Fades completely by the time next card is 40% up the screen
                        innerContent.style.opacity = Math.max(0, 1 - fadeProgress);
                        innerContent.style.transform = `translateY(${progress * -150}px)`;
                        innerContent.style.transition = 'none'; // Ensure smooth fast scroll tracking
                    }
                }
            } else {
                inner.style.transform = `scale(1)`;
                inner.style.filter = `none`;
                if (innerContent) {
                    innerContent.style.opacity = 1;
                    innerContent.style.transform = `translateY(0px)`;
                }
            }

            // 3. Goo Divider is static now, just pure SVG animations.
        });
    }, { passive: true });

    /* Form Submission */
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Cosmetic loading state
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Formulate payload
            const formData = new FormData(form);
            const actionUrl = form.getAttribute('action') || 'https://api.web3forms.com/submit';

            try {
                // Background transmission
                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    btn.textContent = 'Awesome! Sent 🚀';
                    btn.style.backgroundColor = '#16a085';
                    btn.style.color = '#fff';
                    btn.style.opacity = '1';
                    form.reset(); // Clear user inputs on success
                } else {
                    btn.textContent = 'Error! Try Again.';
                    btn.style.backgroundColor = '#e74c3c';
                    btn.style.color = '#fff';
                }
            } catch (error) {
                    btn.textContent = 'Error! Try Again.';
                    btn.style.backgroundColor = '#e74c3c';
                    btn.style.color = '#fff';
            }
            
            // Reset visual state after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 3000);
        });
    });
});
