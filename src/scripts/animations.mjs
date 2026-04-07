import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  gsap.globalTimeline.timeScale(0);
  document.querySelectorAll('.anim-hidden').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
} else {
  initAnimations();
}

function initAnimations() {
  // --- Hero entrance ---
  const heroTitle = document.querySelector('.hero-title');
  const heroSub = document.querySelector('.hero-subtitle');
  const scrollArrow = document.querySelector('.scroll-arrow');

  if (heroTitle) {
    gsap.from(heroTitle, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  if (heroSub) {
    gsap.from(heroSub, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.5,
    });
  }

  // --- Scroll arrow bounce ---
  if (scrollArrow) {
    gsap.to(scrollArrow, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'sine.inOut',
    });
  }

  // --- TechCards stagger ---
  const cards = document.querySelectorAll('.tech-card');
  if (cards.length > 0) {
    ScrollTrigger.batch(cards, {
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          overwrite: true,
        });
      },
      once: true,
    });
  }

  // --- Sections fade-in on scroll ---
  const sections = document.querySelectorAll('.anim-section');
  sections.forEach((section) => {
    gsap.from(section, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // --- Comparison table rows stagger ---
  const tableRows = document.querySelectorAll('.comparison-table tbody tr');
  if (tableRows.length > 0) {
    ScrollTrigger.create({
      trigger: '.comparison-table',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from(tableRows, {
          x: -30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        });
      },
    });
  }

  // --- Footer fade-in ---
  const footer = document.querySelector('.site-footer');
  if (footer) {
    gsap.from(footer, {
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: footer,
        start: 'top 95%',
        once: true,
      },
    });
  }
}

// --- Expose counter pulse function ---
window.counterPulse = function () {
  const display = document.querySelector('.counter-value');
  if (!display) return;
  gsap.fromTo(display,
    { scale: 1.3, color: '#FF8C42' },
    { scale: 1, color: '#FF5D01', duration: 0.4, ease: 'power2.out' },
  );
};
