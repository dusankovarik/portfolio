'use strict';

/* -------------------------------------------------------
   1. GLightbox – image lightbox for project & interest images
------------------------------------------------------- */
GLightbox({ selector: '.glightbox', touchNavigation: true, loop: false });


/* -------------------------------------------------------
   2. Hamburger / mobile menu toggle
------------------------------------------------------- */
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamLines   = document.querySelectorAll('.ham-line');

function openMenu() {
  mobileMenu.classList.remove('hidden');
  menuBtn.setAttribute('aria-expanded', 'true');
  // Animate to X
  hamLines[0].style.transform = 'translateY(6.5px) rotate(45deg)';
  hamLines[1].style.opacity   = '0';
  hamLines[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
}

function closeMenu() {
  mobileMenu.classList.add('hidden');
  menuBtn.setAttribute('aria-expanded', 'false');
  // Reset to hamburger
  hamLines[0].style.transform = '';
  hamLines[1].style.opacity   = '';
  hamLines[2].style.transform = '';
}

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.contains('hidden') ? openMenu() : closeMenu();
});

// Close when any mobile link is tapped
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close when clicking outside the navbar
document.addEventListener('click', (e) => {
  if (!mobileMenu.classList.contains('hidden') &&
      !menuBtn.contains(e.target) &&
      !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});


/* -------------------------------------------------------
   3. Scroll-reveal animation (IntersectionObserver)
      Adds .visible to .fade-in elements as they enter view.
------------------------------------------------------- */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // animate once only
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


/* -------------------------------------------------------
   4. Active nav link highlight on scroll
      Watches each section and marks the matching nav link.
------------------------------------------------------- */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('text-cyan-400',    active);
        link.classList.toggle('border-cyan-400',  active);
        link.classList.toggle('text-gray-300',   !active);
        link.classList.toggle('border-transparent', !active);
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => sectionObserver.observe(s));


/* -------------------------------------------------------
   5. Contact form – async Formspree submission
------------------------------------------------------- */
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const btnText    = document.getElementById('btn-text');
const successMsg = document.getElementById('form-success');
const errorMsg   = document.getElementById('form-error');
const errorText  = document.getElementById('form-error-text');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Guard: remind developer to configure Formspree
  if (!form.action.includes('formspree.io')) {
    errorText.textContent = 'Formulář není nakonfigurován – prosím nastavte Formspree endpoint.';
    errorMsg.classList.remove('hidden');
    successMsg.classList.add('hidden');
    return;
  }

  // Disable button and show loading state
  submitBtn.disabled = true;
  btnText.textContent = 'Odesílám…';
  successMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');

  try {
    const res = await fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      successMsg.classList.remove('hidden');
      form.reset();
    } else {
      const data = await res.json().catch(() => ({}));
      errorText.textContent =
        (data.errors && data.errors.map(err => err.message).join(', ')) ||
        'Něco se pokazilo. Zkuste to prosím znovu.';
      errorMsg.classList.remove('hidden');
    }
  } catch {
    errorText.textContent = 'Síťová chyba. Zkontrolujte připojení a zkuste znovu.';
    errorMsg.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = 'Odeslat';
  }
});


/* -------------------------------------------------------
   6. Footer year – auto-updates each year
------------------------------------------------------- */
document.getElementById('footer-year').textContent = new Date().getFullYear();
