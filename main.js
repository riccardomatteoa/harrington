/* ============================================================
   main.js — Harrington
   Shared functions and component loaders for all pages.
   ============================================================ */

/* ── Toggle mobile menu ── */
function toggleMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('fullscreenMenu');
  if (!hamburger || !menu) return;
  hamburger.classList.toggle('open');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

document.addEventListener('click', function(e) {
  if (e.target.closest('.navbar__fullscreen-nav a')) {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('fullscreenMenu');
    if (hamburger) hamburger.classList.remove('open');
    if (menu) menu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── Popup ── */
function openPopup() {
  const overlay = document.getElementById('popupOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    document.getElementById('popupTrigger').style.display = 'none';
    document.body.style.overflow = 'hidden';
  }
}

function closePopup() {
  const overlay = document.getElementById('popupOverlay');
  if (overlay) overlay.style.display = 'none';
  document.getElementById('popupTrigger').style.display = 'flex';
  document.body.style.overflow = '';
}

/* ── Component loaders ── */

// Load footer (same on every page)
function loadFooter() {
  const el = document.getElementById('footer');
  if (!el) return;
  fetch('footer.html')
    .then(res => res.text())
    .then(html => { el.innerHTML = html; });
}

// Load navbar — pass heroMode = true for pages with transparent hero navbar
function loadNavbar(heroMode) {
  const el = document.getElementById('navbar');
  if (!el) return;
  fetch('navbar.html')
    .then(res => res.text())
    .then(html => {
      el.innerHTML = html;
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      if (heroMode) {
        navbar.classList.add('navbar--hero');
        window.addEventListener('scroll', () => {
          navbar.classList.toggle('scrolled', window.scrollY > 50);
          if (window.scrollY > 50) navbar.classList.remove('navbar--hero');
          else navbar.classList.add('navbar--hero');
        });
      } else {
        navbar.classList.add('scrolled');
        window.addEventListener('scroll', () => navbar.classList.add('scrolled'));
      }
    });
}

// Load popup (only once per session)
function loadPopup() {
  const el = document.getElementById('popup');
  if (!el) return;
  if (!sessionStorage.getItem('popupShown')) {
    fetch('popup.html')
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html;
        sessionStorage.setItem('popupShown', 'true');
        document.body.style.overflow = 'hidden';
      });
  }
}

/* ── Auto-init on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  // Detect if this page uses a hero navbar
  const heroPages = ['index.html', 'project.html', ''];
  const currentPage = window.location.pathname.split('/').pop();
  const isHero = heroPages.includes(currentPage);

  loadNavbar(isHero);
  loadFooter();
  loadPopup();
});
