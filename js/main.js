/* المرجع القضائي - main.js v2.0 */

document.addEventListener('DOMContentLoaded', function () {

    /* ── Nav: scroll effect ── */
    const header = document.getElementById('mainHeader');
    if (header && !header.classList.contains('page-header-nav')) {
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ── Mobile menu ── */
    const menuBtn   = document.getElementById('mobileMenuBtn');
    const navLinks  = document.getElementById('navLinks') || document.querySelector('.nav-links');
    const overlay   = document.getElementById('navOverlay');

    function openMenu() {
        navLinks && navLinks.classList.add('active');
        overlay  && overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (menuBtn) menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }

    function closeMenu() {
        navLinks && navLinks.classList.remove('active');
        overlay  && overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (menuBtn) menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }

    if (menuBtn) menuBtn.addEventListener('click', () => {
        navLinks && navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    if (overlay) overlay.addEventListener('click', closeMenu);

    /* إغلاق القائمة عند النقر على رابط */
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => { if (window.innerWidth <= 768) closeMenu(); });
    });

    /* ── Scroll-to-top button ── */
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ── Intersection Observer: fade-in animations ── */
    const animItems = document.querySelectorAll('.animate-in');
    if (animItems.length) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        animItems.forEach(el => obs.observe(el));
    }

    /* ── Logo fallback ── */
    const logo = document.getElementById('logo-placeholder');
    if (logo) {
        logo.addEventListener('error', function () {
            this.style.display = 'none';
        });
    }

    const authorImg = document.getElementById('author-img-placeholder');
    if (authorImg) {
        authorImg.addEventListener('error', function () {
            this.style.display = 'none';
        });
    }

    /* ── Active nav link ── */
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href').split('/').pop();
        if (href === path) a.classList.add('active');
    });

    /* ── Mobile: تبديل أيقونة زر القائمة عند إغلاق النافذة ── */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
});
