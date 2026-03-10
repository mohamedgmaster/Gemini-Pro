/* ============================================================
   G.Master — script.js
   Vanilla JavaScript | Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Mobile Navigation ---- */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ---- 2. Navbar scroll opacity ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.6)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  /* ---- 3. Scroll Reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  /* ---- 4. Active nav link highlight ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- 5. Floating Particles ---- */
  const heroSection = document.querySelector('.hero') || document.querySelector('.page-hero');
  if (heroSection) {
    const container = document.createElement('div');
    container.className = 'particles-container';
    heroSection.prepend(container);

    const colors = ['var(--accent-blue)', 'var(--accent-green)', 'var(--accent-orange)'];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        --dur: ${6 + Math.random() * 10}s;
        --delay: ${Math.random() * 8}s;
        width: ${1 + Math.random() * 3}px;
        height: ${1 + Math.random() * 3}px;
      `;
      container.appendChild(p);
    }
  }

  /* ---- 6. Counter Animation ---- */
  function animateCount(el, target, suffix = '') {
    const duration = 1800;
    const start = performance.now();
    const startVal = 0;
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(startVal + (target - startVal) * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCount(el, target, suffix);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

});
