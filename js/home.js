/* ============================================================
   ORBC — HOME PAGE JS
   ============================================================ */
import { renderNav }    from './nav.js';
import { renderFooter } from './footer.js';
import { initScrollReveal, initLazyImages, initCounters } from './utils.js';

const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23161616'/%3E%3C/svg%3E";

/* ── Dual hero video: A plays to end, then B, then loops back to A ── */
function initHeroVideos() {
  const videoA = document.getElementById('hero-video-a');
  const videoB = document.getElementById('hero-video-b');
  if (!videoA || !videoB) return;

  videoA.play().catch(() => {});

  videoA.addEventListener('ended', () => {
    videoA.classList.remove('active');
    videoB.classList.add('active');
    videoB.currentTime = 0;
    videoB.play().catch(() => {});
  });

  videoB.addEventListener('ended', () => {
    videoB.classList.remove('active');
    videoA.classList.add('active');
    videoA.currentTime = 0;
    videoA.play().catch(() => {});
  });
}

/* ── Gallery teaser ── */
const GALLERY_ITEMS = [
  { type: 'image', src: 'assets/images/gallery-1.jpg',  alt: 'Training at ORBC' },
  { type: 'video', src: 'assets/videos/hero-training.mp4', poster: 'assets/images/gallery-video-thumb.jpg' },
  { type: 'image', src: 'assets/images/gallery-2.jpg',  alt: 'Pad work session' },
  { type: 'image', src: 'assets/images/gallery-3.jpg',  alt: 'ORBC youth program' },
  { type: 'image', src: 'assets/images/gallery-4.jpg',  alt: 'Competition day' },
  { type: 'image', src: 'assets/images/gallery-5.jpg',  alt: 'ORBC team' },
  { type: 'image', src: 'assets/images/gallery-6.jpg',  alt: 'Sparring session' },
];

function renderGalleryTeaser() {
  const grid = document.getElementById('gallery-teaser');
  if (!grid) return;

  grid.innerHTML = GALLERY_ITEMS.map((item, i) => {
    if (item.type === 'video') {
      return `
        <div class="gallery-thumb reveal reveal-d${Math.min(i + 1, 5)}">
          <video data-autoplay muted loop playsinline
            poster="${item.poster || PLACEHOLDER_IMG}"
            aria-label="Training video">
            <source src="${item.src}" type="video/mp4" />
          </video>
        </div>`;
    }
    return `
      <div class="gallery-thumb reveal reveal-d${Math.min(i + 1, 5)}">
        <img
          data-src="${item.src}"
          src="${PLACEHOLDER_IMG}"
          alt="${item.alt}"
          width="400" height="280"
          loading="lazy"
        />
      </div>`;
  }).join('');
}

function initGalleryVideos() {
  const videos = document.querySelectorAll('.gallery-thumb video[data-autoplay]');
  if (!videos.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.play().catch(() => {});
      else e.target.pause();
    });
  }, { threshold: 0.3 });
  videos.forEach(v => obs.observe(v));
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav('index.html');
  renderFooter();
  renderGalleryTeaser();
  initHeroVideos();
  initScrollReveal();
  initLazyImages();
  initCounters();
  initGalleryVideos();
});