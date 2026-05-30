import { renderNav } from './nav.js';
import { renderFooter } from './footer.js';
import { initScrollReveal, initLazyImages } from './utils.js';

const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

function validateForm() {
  let valid = true;

  const fields = [
    { id: 'name',    errorId: 'name-error',    msg: 'Please enter your name.' },
    { id: 'phone',   errorId: 'phone-error',   msg: 'Please enter your phone number.' },
    { id: 'message', errorId: 'message-error', msg: 'Please enter a message.' },
  ];

  fields.forEach(f => {
    const input = document.getElementById(f.id);
    const error = document.getElementById(f.errorId);
    if (!input.value.trim()) {
      input.classList.add('error');
      error.textContent = f.msg;
      error.classList.add('visible');
      valid = false;
    } else {
      input.classList.remove('error');
      error.classList.remove('visible');
    }
  });

  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  if (emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailInput.classList.add('error');
    emailError.textContent = 'Please enter a valid email address.';
    emailError.classList.add('visible');
    valid = false;
  } else {
    emailInput.classList.remove('error');
    emailError.classList.remove('visible');
  }

  return valid;
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav('contact.html');
  renderFooter();
  initScrollReveal();
  initLazyImages();

  const form    = document.getElementById('contact-form');
  const submit  = document.getElementById('form-submit');
  const success = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Disable button and show sending state
    submit.disabled = true;
    submit.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           style="animation:spin 1s linear infinite">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
      Sending...`;

    try {
      const formData = {
        name:    document.getElementById('name').value,
        phone:   document.getElementById('phone').value,
        email:   document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        _replyto: document.getElementById('email').value,
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Only show success AFTER confirmed send
        form.querySelectorAll('.form-input').forEach(i => i.value = '');
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        submit.disabled = false;
        submit.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          Send Message`;
      } else {
        throw new Error('Send failed');
      }
    } catch {
      submit.disabled = false;
      submit.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Send Message`;
      alert('Something went wrong. Please call us directly on +254 725 138 063.');
    }
  });

  // Clear errors on input
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const err = document.getElementById(`${input.id}-error`);
      if (err) err.classList.remove('visible');
    });
  });
});