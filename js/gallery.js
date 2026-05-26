import { renderNav } from './nav.js';
import { renderFooter } from './footer.js';
import { initScrollReveal } from './utils.js';

const GALLERY_ITEMS = [
  { type:'image', src:'assets/images/gallery-1.jpg',  alt:'Training session at ORBC',            category:'training' },
  { type:'image', src:'assets/images/gallery-2.jpg',  alt:'Sparring at ORBC',                    category:'training' },
  { type:'image', src:'assets/images/gallery-3.jpg',  alt:'Youth program drills',                category:'training' },
  { type:'image', src:'assets/images/gallery-4.jpg',  alt:'Competition day',                     category:'competition' },
  { type:'image', src:'assets/images/gallery-5.jpg',  alt:'Coach Michael with fighters',         category:'community' },
  { type:'image', src:'assets/images/gallery-6.jpg',  alt:'Medal ceremony',                      category:'competition' },
  { type:'image', src:'assets/images/gallery-7.jpg',  alt:'Pad work session',                    category:'training' },
  { type:'image', src:'assets/images/gallery-8.jpg',  alt:'ORBC community event',                category:'community' },
  { type:'image', src:'assets/images/achievements-group.jpg', alt:'Fighters with certificates', category:'competition' },
  { type:'image', src:'assets/images/gallery-9.jpg',  alt:'Women\'s boxing class',               category:'training' },
  { type:'image', src:'assets/images/gallery-10.jpg', alt:'Youth fighters before competition',   category:'competition' },
  { type:'image', src:'assets/images/gallery-11.jpg', alt:'Team photo',                          category:'community' },
  { type:'video', src:'assets/videos/hero-placeholder.mp4', poster:'assets/images/gallery-video-thumb.jpg', alt:'Training highlights', category:'video' },
  { type:'image', src:'assets/images/gallery-12.jpg', alt:'Bag work',                            category:'training' },
  { type:'image', src:'assets/images/gallery-13.jpg', alt:'Competition weigh-in',                category:'competition' },
  { type:'image', src:'assets/images/gallery-14.jpg', alt:'Open day at ORBC',                    category:'community' },
];

let currentFilter = 'all';
let visibleItems  = [];
let lightboxIndex = 0;

function renderGrid() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  visibleItems = currentFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === currentFilter);

  grid.innerHTML = visibleItems.map((item, i) => {
    if (item.type === 'video') {
      return `
        <div class="gallery-item" data-index="${i}" role="button" tabindex="0" aria-label="${item.alt}">
          <video muted loop playsinline poster="${item.poster || 'assets/images/hero-placeholder.jpg'}" data-autoplay>
            <source src="${item.src}" type="video/mp4" />
          </video>
          <span class="gallery-item__video-badge">Video</span>
          <div class="gallery-item__overlay">
            <svg class="gallery-item__icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>`;
    }
    return `
      <div class="gallery-item" data-index="${i}" role="button" tabindex="0" aria-label="${item.alt}">
        <img
          data-src="${item.src}"
          src="assets/images/hero-placeholder.jpg"
          alt="${item.alt}"
          loading="lazy"
        />
        <div class="gallery-item__overlay">
          <svg class="gallery-item__icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
      </div>`;
  }).join('');

  // Lazy load images
  grid.querySelectorAll('img[data-src]').forEach(img => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          img.src = img.dataset.src;
          img.addEventListener('load', () => img.classList.add('loaded'), {once:true});
          obs.unobserve(img);
        }
      });
    }, { rootMargin:'200px' });
    obs.observe(img);
  });

  // Autoplay videos in view
  grid.querySelectorAll('video[data-autoplay]').forEach(v => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) v.play().catch(()=>{}); else v.pause(); });
    }, { threshold:0.3 });
    obs.observe(v);
  });

  // Click handlers
  grid.querySelectorAll('.gallery-item').forEach(el => {
    const open = () => openLightbox(parseInt(el.dataset.index));
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); open(); }});
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  const lb = document.getElementById('lightbox');
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  showLightboxItem();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.hidden = true;
  document.body.style.overflow = '';
  const media = document.getElementById('lb-media');
  media.querySelectorAll('video').forEach(v => v.pause());
  media.innerHTML = '';
}

function showLightboxItem() {
  const item    = visibleItems[lightboxIndex];
  const media   = document.getElementById('lb-media');
  const caption = document.getElementById('lb-caption');
  media.innerHTML = '';

  if (item.type === 'video') {
    media.innerHTML = `<video autoplay muted loop playsinline poster="${item.poster||''}"><source src="${item.src}" type="video/mp4"/></video>`;
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    media.appendChild(img);
  }

  caption.textContent = item.alt;
  document.getElementById('lb-prev').style.visibility = lightboxIndex > 0 ? 'visible' : 'hidden';
  document.getElementById('lb-next').style.visibility = lightboxIndex < visibleItems.length-1 ? 'visible' : 'hidden';
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav('gallery.html');
  renderFooter();
  renderGrid();
  initScrollReveal();

  // Filters
  document.querySelectorAll('.gallery-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      currentFilter = btn.dataset.filter;
      renderGrid();
    });
  });

  // Lightbox controls
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', () => { if (lightboxIndex > 0) { lightboxIndex--; showLightboxItem(); }});
  document.getElementById('lb-next').addEventListener('click', () => { if (lightboxIndex < visibleItems.length-1) { lightboxIndex++; showLightboxItem(); }});

  document.getElementById('lightbox').addEventListener('click', e => { if (e.target === e.currentTarget) closeLightbox(); });

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (lb.hidden) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  { if (lightboxIndex > 0) { lightboxIndex--; showLightboxItem(); }}
    if (e.key === 'ArrowRight') { if (lightboxIndex < visibleItems.length-1) { lightboxIndex++; showLightboxItem(); }}
  });
});
