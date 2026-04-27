/* ============================================
   script.js — Portfolio Interactive Logic
   ============================================ */

'use strict';

// ─── Typed Role ───────────────────────────────
const roles = [
  'Full-Stack Developer',
  'DevOps Enthusiast',
  'Backend Engineer',
  'Açık Kaynak Sevdalısı',
  'Yazılım Mühendisi',
];

let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typedRole');

function typeRole() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 60 : 90);
}
typeRole();

// ─── Reveal on Scroll ─────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger skill bars
        if (entry.target.classList.contains('skill-category')) {
          entry.target.querySelectorAll('.skill-bar__fill').forEach((bar) => {
            bar.style.width = bar.style.getPropertyValue('--w');
          });
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach((el) => observer.observe(el));

// ─── Navbar Scroll ────────────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  navbar.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('visible', window.scrollY > 400);

  // Active nav link highlighting
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach((sec) => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  document.querySelectorAll('.nav__link').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// ─── Back to Top ──────────────────────────────
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Theme Toggle ─────────────────────────────
const themeBtn = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ─── Hamburger Menu ───────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

// Close menu on link click
navLinks.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ─── Particles ────────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${Math.random() * 6 + 4}s;
      --delay: ${Math.random() * 4}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ─── Contact Form ─────────────────────────────
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(inputId, errorId, msg) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.add('error');
  if (error) error.textContent = msg;
}

function clearErrors() {
  form.querySelectorAll('.form-input').forEach((i) => i.classList.remove('error'));
  form.querySelectorAll('.form-error').forEach((e) => (e.textContent = ''));
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    let valid = true;
    if (name.length < 2) { showError('contactName', 'nameError', 'Ad en az 2 karakter olmalı.'); valid = false; }
    if (!validateEmail(email)) { showError('contactEmail', 'emailError', 'Geçerli bir e-posta girin.'); valid = false; }
    if (message.length < 10) { showError('contactMessage', 'messageError', 'Mesaj en az 10 karakter olmalı.'); valid = false; }

    if (!valid) return;

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Gönderiliyor...';

    // Simulate form submission (replace with actual endpoint)
    await new Promise((r) => setTimeout(r, 1200));

    form.reset();
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Mesaj Gönder';
    formSuccess.hidden = false;
    setTimeout(() => { formSuccess.hidden = true; }, 6000);
  });
}

// ─── Smooth scroll for anchor links ───────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── Keyboard accessibility: close nav on Escape ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});
