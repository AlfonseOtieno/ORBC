# ORBC — Ongata Rongai Boxing Club Website

## File Structure
```
orbc/
├── index.html          # Home
├── about.html
├── programs.html
├── schedule.html
├── achievements.html
├── gallery.html
├── events.html
├── faq.html
├── contact.html
├── css/
│   ├── global.css      # Variables, typography, shared components
│   ├── nav.css
│   ├── footer.css
│   ├── home.css
│   ├── about.css
│   ├── programs.css
│   ├── schedule.css
│   ├── achievements.css
│   ├── gallery.css
│   ├── events.css
│   ├── faq.css
│   └── contact.css
├── js/
│   ├── nav.js          # Shared nav component
│   ├── footer.js       # Shared footer component
│   ├── utils.js        # Scroll reveal, lazy load, counters
│   ├── home.js
│   ├── about.js
│   ├── programs.js
│   ├── schedule.js
│   ├── achievements.js
│   ├── gallery.js
│   ├── events.js
│   ├── faq.js
│   └── contact.js
├── data/
│   ├── events.json     # All competition events + results
│   ├── achievements.json
│   └── faq.json
└── assets/
    ├── images/         # Add your photos here
    └── videos/         # Add your videos here
```

## Placeholder Files — Add These First
Place these files before opening in browser:

**assets/images/**
- `hero-placeholder.jpg` — Hero background image
- `orbc-logo.png` — Club logo (transparent PNG)
- `achievements-group.jpg` — The group photo with certificates (uploaded)
- `about-hero.jpg`, `about-training.jpg`, `about-mission.jpg`
- `coach-michael.jpg` — Photo of Coach Michael
- `programs-hero.jpg`, `program-youth.jpg`, `program-adult.jpg`
- `program-womens.jpg`, `program-competition.jpg`
- `schedule-hero.jpg`, `gallery-hero.jpg`
- `events-hero.jpg`, `faq-hero.jpg`, `contact-hero.jpg`
- `gallery-1.jpg` through `gallery-14.jpg`
- `gallery-video-thumb.jpg` — Thumbnail for video in gallery

**assets/videos/**
- `hero-placeholder.mp4` — Hero background video

## Deployment to GitHub Pages
1. Push this folder to a GitHub repo
2. Go to Settings → Pages → Deploy from branch → main → / (root)
3. Your site will be live at `https://yourusername.github.io/reponame`

## Updating Content
- **Events & results:** edit `data/events.json`
- **Achievements:** edit `data/achievements.json`
- **FAQ:** edit `data/faq.json`
- **Gallery images:** update the `GALLERY_ITEMS` array in `js/gallery.js`

## Contact Form
The contact form currently simulates sending. To make it live, sign up at
https://formspree.io, get your endpoint, and replace the fetch simulation
in `js/contact.js` with:
```js
await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
});
```

## Commit Message for This Version
feat: initial ORBC website build — all 9 pages, full design system, events calendar, achievements tracker, gallery with lightbox
