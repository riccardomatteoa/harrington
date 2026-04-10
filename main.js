/* ============================================================
   main.js — Harrington
   Shared functions used across all pages.
   ============================================================ */

/* ── Mobile menu ── */
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
