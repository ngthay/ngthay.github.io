// Mobile menu
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
const setMenu = open => {
  links.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? '✕' : '☰';
};
toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', e => { if (!e.target.closest('.nav')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
// Close the mobile menu if the window is resized up to desktop width
matchMedia('(min-width: 861px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

// Day / night mode
const themeBtn = document.querySelector('.theme-toggle');
const syncThemeBtn = () => {
  const light = document.documentElement.dataset.theme === 'light';
  themeBtn.textContent = light ? '☾' : '☀';
  themeBtn.setAttribute('aria-label', light ? 'Switch to night mode' : 'Switch to day mode');
};
themeBtn.addEventListener('click', () => {
  const light = document.documentElement.dataset.theme !== 'light';
  if (light) document.documentElement.dataset.theme = 'light';
  else delete document.documentElement.dataset.theme;
  try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
  syncThemeBtn();
});
syncThemeBtn();

// Hero image drifts gently with the mouse (desktop only)
const heroArt = document.querySelector('.hero__art');
if (heroArt && matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
  document.querySelector('.hero').addEventListener('mousemove', e => {
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    heroArt.style.setProperty('--tx', (x * -14).toFixed(1) + 'px');
    heroArt.style.setProperty('--ty', (y * -10).toFixed(1) + 'px');
  });
  document.querySelector('.hero').addEventListener('mouseleave', () => {
    heroArt.style.setProperty('--tx', '0px');
    heroArt.style.setProperty('--ty', '0px');
  });
}

// Hero project slideshow (pauses on hover or keyboard focus; no auto-play if reduced motion is on)
const heroSlides = [...document.querySelectorAll('.hero__frame img')];
const heroTag = document.querySelector('.hero__tag');
const heroDots = document.querySelector('.hero__dots');
let heroIndex = 0, heroTimer;
const showSlide = i => {
  heroIndex = (i + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((img, n) => img.classList.toggle('is-active', n === heroIndex));
  [...heroDots.children].forEach((dot, n) => dot.setAttribute('aria-current', n === heroIndex));
  heroTag.textContent = heroSlides[heroIndex].dataset.tag;
};
const stopSlides = () => clearInterval(heroTimer);
const playSlides = () => {
  stopSlides();
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroTimer = setInterval(() => showSlide(heroIndex + 1), 5000);
  }
};
heroSlides.forEach((img, n) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', 'Show ' + img.dataset.tag);
  dot.addEventListener('click', () => showSlide(n));
  heroDots.append(dot);
});
heroDots.hidden = false;
showSlide(0);
playSlides();
if (matchMedia('(hover: hover)').matches) {
  heroArt.addEventListener('mouseenter', stopSlides);
  heroArt.addEventListener('mouseleave', playSlides);
}
heroArt.addEventListener('focusin', e => { if (e.target.matches(':focus-visible')) stopSlides(); });
heroArt.addEventListener('focusout', playSlides);

// Footer year
document.getElementById('year').textContent = '© ' + new Date().getFullYear() + ' All rights reserved';

// Reveal on scroll
document.querySelectorAll('.card, .project, .about, .contact').forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Skill bars
document.querySelectorAll('.bar i').forEach(b => b.style.setProperty('--w', b.dataset.level + '%'));
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); barObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.bar i').forEach(b => barObs.observe(b));

// Counters
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, start = performance.now(), dur = 1200;
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObs.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

// Contact form -> opens the visitor's email app (no backend needed on GitHub Pages)
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `${f.get('message')}\n\nName: ${f.get('name')}\nEmail: ${f.get('email')}\nPhone: ${f.get('phone') || '-'}`;
  window.location.href = `mailto:ngengthay@gmail.com?subject=${encodeURIComponent('Portfolio enquiry from ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
});
