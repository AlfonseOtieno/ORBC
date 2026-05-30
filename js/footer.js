/* ============================================================
   ORBC — FOOTER COMPONENT
   ============================================================ */

export function renderFooter() {
  const footerHTML = `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">

          <!-- Brand -->
          <div class="footer__brand">
            <a href="index.html" class="footer__logo" aria-label="ORBC Home">
              <img
                src="assets/images/orbc-logo.png"
                alt="ORBC Logo"
                class="footer__logo-img"
                width="48" height="48"
                loading="lazy"
              />
              <div class="footer__logo-text">
                Ongata Rongai
                <span>Boxing Club</span>
              </div>
            </a>
            <p class="footer__tagline">
              Forged in Ongata Rongai. Building fighters, discipline, and community since 2014.
            </p>
            <div class="footer__socials">
              <a href="https://www.facebook.com/share/18bmDiWdgE/" class="footer__social" aria-label="Facebook" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/team_orbc?igsh=MTc2bzA0OXZmaTg2" class="footer__social" aria-label="Instagram" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://youtube.com/@ongatarongaiboxingclub?si=_c_OKpO0VefAF0Nr" class="footer__social" aria-label="YouTube" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--black)"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick links -->
          <div>
            <p class="footer__col-title">Navigation</p>
            <ul class="footer__links">
              <li><a href="index.html"        class="footer__link">Home</a></li>
              <li><a href="about.html"        class="footer__link">About Us</a></li>
              <li><a href="programs.html"     class="footer__link">Programs</a></li>
              <li><a href="schedule.html"     class="footer__link">Schedule</a></li>
              <li><a href="achievements.html" class="footer__link">Achievements</a></li>
            </ul>
          </div>

          <!-- More links -->
          <div>
            <p class="footer__col-title">More</p>
            <ul class="footer__links">
              <li><a href="gallery.html"  class="footer__link">Gallery</a></li>
              <li><a href="events.html"   class="footer__link">Events</a></li>
              <li><a href="faq.html"      class="footer__link">FAQ</a></li>
              <li><a href="contact.html"  class="footer__link">Contact</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <p class="footer__col-title">Contact</p>

            <div class="footer__contact-item">
              <svg class="footer__contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <div class="footer__contact-text">
                <a href="tel:+254725138063">+254 725 138 063</a>
              </div>
            </div>

            <div class="footer__contact-item">
              <svg class="footer__contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <div class="footer__contact-text">
                <a href="mailto:orbc125@gmail.com">orbc125@gmail.com</a>
              </div>
            </div>

            <div class="footer__contact-item">
              <svg class="footer__contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div class="footer__contact-text">
                Saint Mary's Catholic Church<br>Social Hall, Magadi Road<br>Ongata Rongai
              </div>
            </div>

            <div class="footer__contact-item">
              <svg class="footer__contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <div class="footer__contact-text">
                Mon–Fri: 6PM – 8PM<br>Saturday: 11AM – 1PM
              </div>
            </div>

          </div>

        </div>

        <!-- Bottom bar -->
        <div class="footer__bottom">
          <p class="footer__copy">
            &copy; <span id="footer-year"></span> Ongata Rongai Boxing Club.
          </p>
          <div class="footer__bottom-links">
            <a href="https://www.facebook.com/share/18bmDiWdgE/" class="footer__bottom-link" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.instagram.com/team_orbc?igsh=MTc2bzA0OXZmaTg2" class="footer__bottom-link" target="_blank" rel="noopener">Instagram</a>
            <a href="https://youtube.com/@ongatarongaiboxingclub?si=_c_OKpO0VefAF0Nr" class="footer__bottom-link" target="_blank" rel="noopener">YouTube</a>
          </div>
        </div>

      </div>
    </footer>
  `;

  document.getElementById('footer-placeholder').innerHTML = footerHTML;
  document.getElementById('footer-year').textContent = new Date().getFullYear();
}