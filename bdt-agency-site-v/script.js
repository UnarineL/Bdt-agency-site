const root = document.documentElement;
root.classList.add('js');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('bdt-theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('bdt-theme', next);
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuToggle && nav) {
  const setMenuState = (open) => {
    nav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    setMenuState(open);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
      setMenuState(false);
    }
  });
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });
if ('IntersectionObserver' in window) {
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
  const target = Number(el.dataset.target || 0);
  let start = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = start;
    }
  }, 30);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.ran) {
      entry.target.dataset.ran = '1';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.6 });
counters.forEach(counter => counterObserver.observe(counter));

const slider = document.querySelector('[data-slider]');
if (slider) {
  const slides = slider.querySelectorAll('.testimonial');
  const next = slider.querySelector('.next');
  const prev = slider.querySelector('.prev');
  let index = 0;

  const render = () => slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  render();

  next?.addEventListener('click', () => { index = (index + 1) % slides.length; render(); });
  prev?.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; render(); });
  setInterval(() => { index = (index + 1) % slides.length; render(); }, 5500);
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const button = item.querySelector('button');
  button?.addEventListener('click', () => item.classList.toggle('open'));
});

const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you. This premium demo form is ready to connect to email, Formspree, WhatsApp, or a custom backend workflow.');
  });
});


document.querySelectorAll('[data-current-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});


const whatsappHref = 'https://wa.me/27672565611?text=' + encodeURIComponent('Hi Unarine, I would like to discuss a website or digital project.');
if (!document.querySelector('.whatsapp-float')) {
  const wa = document.createElement('a');
  wa.className = 'whatsapp-float';
  wa.href = whatsappHref;
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.innerHTML = '<span class="wa-icon">✆</span><span class="wa-label">WhatsApp</span>';
  document.body.appendChild(wa);
}
