import { renderNav } from './nav.js';
import { renderFooter } from './footer.js';

let allItems     = [];
let lightboxIndex = 0;

async function loadGallery() {
  const res  = await fetch('data/gallery.json');
  const data = await res.json();
  return data.items;
}

function renderGrid() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  grid.innerHTML = allItems.map((item, i) => {
    if (item.type === 'video') {
      return `
        <div class="gallery-item" data-index="${i}" role="button" tabindex="0" aria-label="Training video">
          <video
            muted loop playsinline
            poster="${item.poster || ''}"
            data-autoplay
          >
            <source src="${item.src}" type="video/mp4" />
          </video>
          <span class="gallery-item__video-badge">Video</span>
          <div class="gallery-item__overlay">
            <svg class="gallery-item__icon" width="32" height="32" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        </div>`;
    }
    return `
      <div class="gallery-item" data-index="${i}" role="button" tabindex="0" aria-label="${item.alt || ''}">
        <img
          data-src="${item.src}"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23161616'/%3E%3C/svg%3E"
          alt="${item.alt || ''}"
          loading="lazy"
        />
        <div class="gallery-item__overlay">
          <svg class="gallery-item__icon" width="32" height="32" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </div>
      </div>`;
  }).join('');

  // Lazy load images
  grid.querySelectorAll('img[data-src]').forEach(img => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          img.src = img.dataset.src;
          img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    obs.observe(img);
  });

  // Autoplay videos when in view, pause when out — no controls, looping
  grid.querySelectorAll('video[data-autoplay]').forEach(v => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
    }, { threshold: 0.25 });
    obs.observe(v);
  });

  // Open lightbox on click
  grid.querySelectorAll('.gallery-item').forEach(el => {
    const open = () => openLightbox(parseInt(el.dataset.index));
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  document.getElementById('lightbox').hidden = false;
  document.body.style.overflow = 'hidden';
  showLightboxItem();
}

function closeLightbox() {
  document.getElementById('lightbox').hidden = true;
  document.body.style.overflow = '';
  const media = document.getElementById('lb-media');
  media.querySelectorAll('video').forEach(v => v.pause());
  media.innerHTML = '';
}

function showLightboxItem() {
  const item    = allItems[lightboxIndex];
  const media   = document.getElementById('lb-media');
  const caption = document.getElementById('lb-caption');
  media.innerHTML = '';

  if (item.type === 'video') {
    // Video in lightbox: autoplay, muted, looping, no controls
    media.innerHTML = `
      <video autoplay muted loop playsinline poster="${item.poster || ''}">
        <source src="${item.src}" type="video/mp4" />
      </video>`;
    caption.textContent = 'ORBC Training';
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt || '';
    media.appendChild(img);
    caption.textContent = item.alt || '';
  }

  document.getElementById('lb-prev').style.visibility =
    lightboxIndex > 0 ? 'visible' : 'hidden';
  document.getElementById('lb-next').style.visibility =
    lightboxIndex < allItems.length - 1 ? 'visible' : 'hidden';
}

document.addEventListener('DOMContentLoaded', async () => {
  renderNav('gallery.html');
  renderFooter();

  allItems = await loadGallery();
  renderGrid();

  // Lightbox controls
  document.getElementById('lb-close').addEventListener('click', closeLightbox);

  document.getElementById('lb-prev').addEventListener('click', () => {
    if (lightboxIndex > 0) { lightboxIndex--; showLightboxItem(); }
  });

  document.getElementById('lb-next').addEventListener('click', () => {
    if (lightboxIndex < allItems.length - 1) { lightboxIndex++; showLightboxItem(); }
  });

  // Click outside media closes lightbox
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxIndex > 0) {
      lightboxIndex--; showLightboxItem();
    }
    if (e.key === 'ArrowRight' && lightboxIndex < allItems.length - 1) {
      lightboxIndex++; showLightboxItem();
    }
  });
});