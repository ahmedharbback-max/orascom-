document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── ACTIVE NAV ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.4 }).observe || sections.forEach(s =>
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    }, { threshold: 0.4 }).observe(s)
  );

  // ── HAMBURGER ──
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  ham.addEventListener('click', () => mob.classList.toggle('open'));
  window.closeMobile = () => mob.classList.remove('open');

  // ── UNITS TABS ──
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.dataset.tab;
      document.querySelectorAll('.unit-card').forEach(card => {
        card.classList.toggle('hidden', card.dataset.type !== type);
      });
    });
  });

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll(
    '.about-wrap, .phase-card, .unit-card, .am-card, .di, .gi, .contact-form-box, .contact-left, .af'
  );
  reveals.forEach(el => el.classList.add('reveal'));

  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), 60);
        revObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revObs.observe(el));

  // ── STAGGER DELAY ──
  document.querySelectorAll('.phase-card, .am-card, .di, .gi').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
  });

  // ── SCROLL TOP ──
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 450);
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── VIDEO BOX ──
  const vbox = document.getElementById('videoBox');
  if (vbox) {
    vbox.addEventListener('click', () => {
      vbox.innerHTML = `<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        width="100%" height="100%" allow="autoplay; fullscreen" allowfullscreen
        style="border:none;border-radius:16px;"></iframe>`;
      vbox.style.padding = '0';
    });
  }

  // ── CONTACT FORM ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      btn.textContent = '⏳ Sending...';
      btn.disabled = true;
      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align:center;padding:2rem">
            <div style="font-size:3.5rem;margin-bottom:1rem">✅</div>
            <h3 style="color:#041e35;font-family:'Cormorant Garamond',serif;font-size:1.8rem;margin-bottom:.5rem">Request Received!</h3>
            <p style="color:#5a7a8a;font-size:.95rem;line-height:1.7">Thank you for your interest in Makadi Heights.<br>Our sales team will contact you within 24 hours.</p>
            <a href="tel:01095453622" style="display:inline-block;margin-top:1.5rem;padding:.8rem 2rem;background:#041e35;color:#fff;border-radius:30px;font-weight:700;font-size:.9rem">📞 Call us now: 010 9545 3622</a>
          </div>`;
      }, 1500);
    });
  }

  // ── SMOOTH ANCHORS ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  // ── HERO PARALLAX ──
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero && window.scrollY < window.innerHeight) {
      hero.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      hero.style.opacity = 1 - window.scrollY / (window.innerHeight * 0.75);
    }
  });

});
