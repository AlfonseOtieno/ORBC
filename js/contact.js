import { renderNav } from './nav.js';
import { renderFooter } from './footer.js';
import { initScrollReveal, initLazyImages } from './utils.js';

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

    submit.disabled = true;
    submit.textContent = 'Sending...';

    // Simulate send (replace with your actual form endpoint e.g. Formspree)
    await new Promise(r => setTimeout(r, 1200));

    form.querySelectorAll('.form-input').forEach(i => i.value = '');
    success.hidden = false;
    submit.disabled = false;
    submit.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Live validation clear on input
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const err = document.getElementById(`${input.id}-error`);
      if (err) err.classList.remove('visible');
    });
  });
});
