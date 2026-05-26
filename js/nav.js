/* ============================================================
   ORBC — NAVIGATION COMPONENT
   Injected into every page via nav.js
   ============================================================ */

export function renderNav(activePage = '') {
  const pages = [
    { href: 'index.html',        label: 'Home' },
    { href: 'about.html',        label: 'About' },
    { href: 'programs.html',     label: 'Programs' },
    { href: 'schedule.html',     label: 'Schedule' },
    { href: 'achievements.html', label: 'Achievements' },
    { href: 'gallery.html',      label: 'Gallery' },
    { href: 'events.html',       label: 'Events' },
    { href: 'faq.html',          label: 'FAQ' },
    { href: 'contact.html',      label: 'Contact' },
  ];

  const links = pages.map(p => {
    const isActive = p.href === activePage;
    return `<a href="${p.href}" class="nav__link${isActive ? ' active' : ''}">${p.label}</a>`;
  }).join('');

  const drawerLinks = pages.map(p => {
    const isActive = p.href === activePage;
    return `<a href="${p.href}" class="nav__link${isActive ? ' active' : ''}">${p.label}</a>`;
  }).join('');

  const navHTML = `
    <nav class="nav nav--transparent" id="main-nav" aria-label="Main navigation">
      <div class="container">
        <div class="nav__inner">
          <a href="index.html" class="nav__logo" aria-label="ORBC Home">
            <img
              src="assets/images/orbc-logo.png"
              alt="Ongata Rongai Boxing Club"
              class="nav__logo-img"
              width="44" height="44"
            />
            <div class="nav__logo-text">
              <span class="nav__logo-name">ORBC</span>
              <span class="nav__logo-sub">Boxing Club</span>
            </div>
          </a>

          <div class="nav__menu" role="menubar">
            ${links}
          </div>

          <div style="display:flex;align-items:center;gap:8px;">
            <a href="tel:+254725138063" class="nav__cta hide-mobile">Book a Session</a>
            <button class="nav__hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>

      <div class="nav__drawer" id="nav-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
        ${drawerLinks}
        <a href="tel:+254725138063" class="nav__cta btn btn--primary">Book a Session</a>
      </div>
    </nav>
  `;

  document.getElementById('nav-placeholder').innerHTML = navHTML;
  initNav();
}

function initNav() {
  const nav     = document.getElementById('main-nav');
  const burger  = document.getElementById('hamburger');
  const drawer  = document.getElementById('nav-drawer');

  // Scroll: transparent → solid
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.remove('nav--transparent');
      nav.classList.add('nav--solid');
    } else {
      nav.classList.remove('nav--solid');
      nav.classList.add('nav--transparent');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  burger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close drawer on link click
  drawer.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}
