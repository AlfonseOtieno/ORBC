import { renderNav } from './nav.js';
import { renderFooter } from './footer.js';
import { initScrollReveal } from './utils.js';

let eventsData = [];
let currentDate = new Date();
let selectedDate = null;

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

async function loadEvents() {
  const res = await fetch('data/events.json');
  const d = await res.json();
  return d.events;
}

function getEventsForDate(date) {
  const iso = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  return eventsData.filter(e => e.date === iso);
}

function renderCalendar() {
  const label = document.getElementById('cal-month-label');
  const grid  = document.getElementById('cal-days');
  if (!label || !grid) return;

  label.textContent = `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month+1, 0);
  const today = new Date();

  // Monday-first offset
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  let html = '';

  // Prev month days
  for (let i = 0; i < startOffset; i++) {
    const d = new Date(year, month, -startOffset + i + 1);
    html += `<div class="cal-day cal-day--empty cal-day--other-month"><span>${d.getDate()}</span></div>`;
  }

  // This month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const events = getEventsForDate(date);
    const isToday = date.toDateString() === today.toDateString();
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

    const dots = events.map(e => {
      const type = e.upcoming ? 'upcoming' : e.type;
      return `<span class="cal-dot cal-dot--${type}"></span>`;
    }).join('');

    const classes = [
      'cal-day',
      isToday    ? 'cal-day--today'     : '',
      isSelected ? 'cal-day--selected'  : '',
      events.length ? 'cal-day--has-event' : '',
    ].filter(Boolean).join(' ');

    html += `<div class="${classes}" data-date="${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}">
      <span>${day}</span>
      ${events.length ? `<div class="cal-day__dots">${dots}</div>` : ''}
    </div>`;
  }

  grid.innerHTML = html;

  grid.querySelectorAll('.cal-day[data-date]').forEach(el => {
    el.addEventListener('click', () => {
      const [y,m,d] = el.dataset.date.split('-').map(Number);
      selectedDate = new Date(y, m-1, d);
      showEventDetail(getEventsForDate(selectedDate));
      renderCalendar();
    });
  });
}

function getStageBadgeClass(stage) {
  if (stage.includes('Champion'))     return 'stage-badge--champion';
  if (stage.includes('Finalist'))     return 'stage-badge--finalist';
  if (stage.includes('Semi'))         return 'stage-badge--semi';
  if (stage.includes('Quarter'))      return 'stage-badge--quarter';
  return 'stage-badge--first';
}

function formatMethodLine(f) {
  const parts = [];
  const method = (f.method || '').toLowerCase();
  if (method === 'tko' || method === 'ko') {
    parts.push(f.method.toUpperCase());
    if (f.round) parts.push(`Round ${f.round}`);
  } else if (method === 'walkover') {
    parts.push('Walkover');
  } else {
    // decision, split decision, majority decision, etc.
    parts.push(f.method.replace(/\b\w/g, c => c.toUpperCase()));
    if (f.score) parts.push(f.score);
  }
  return parts.join(' · ');
}

function renderFightCard(f, i) {
  const segmentBadge = f.segment
    ? `<span class="fight-card__segment">${f.segment}</span>`
    : '';
  const opponentClub = f.opponentClub ? ` <span class="fight-card__club">(${f.opponentClub})</span>` : '';
  const numberLabel = f.number ? `<span class="fight-card__number">#${f.number}</span>` : '';

  return `
    <div class="fight-card fight-card--${f.result}${f.exhibition ? ' fight-card--exhibition' : ''} reveal reveal-d${Math.min(i%5+1,5)}">
      <div class="fight-card__top">
        ${numberLabel}
        ${segmentBadge}
        <span class="fight-card__category">${f.category}</span>
      </div>
      <div class="fight-card__matchup">
        <span class="fight-card__fighter">${f.fighter}</span>
        <span class="fight-card__vs">vs</span>
        <span class="fight-card__opponent">${f.opponent}${opponentClub}</span>
      </div>
      <div class="fight-card__bottom">
        <span class="fight-card__result-badge fight-card__result-badge--${f.result}">${f.result === 'win' ? 'Win' : 'Loss'}</span>
        <span class="fight-card__method">${formatMethodLine(f)}</span>
      </div>
      ${f.note ? `<p class="fight-card__note">${f.note}</p>` : ''}
    </div>`;
}

function showEventDetail(events) {
  const empty  = document.getElementById('panel-empty');
  const detail = document.getElementById('panel-detail');
  const panel  = document.getElementById('events-panel');

  if (!events.length) {
    empty.hidden  = false;
    detail.hidden = true;
    panel.style.alignItems = 'center';
    return;
  }

  empty.hidden  = true;
  detail.hidden = false;
  panel.style.alignItems = 'flex-start';

  const evt = events[0];
  const dateObj = new Date(evt.date + 'T00:00:00');
  const type = evt.upcoming ? 'upcoming' : evt.type;
  const typeLabel = evt.upcoming ? 'Upcoming' : evt.type.charAt(0).toUpperCase() + evt.type.slice(1);

  let resultsHTML = '';
  if (evt.results) {
    const r = evt.results;
    const recordHTML = r.record
      ? `<div class="results-medals">
           <span class="results-medal results-medal--gold">${r.record.wins} Wins</span>
           <span class="results-medal results-medal--bronze">${r.record.losses} Losses</span>
         </div>`
      : `<div class="results-medals">
           <span class="results-medal results-medal--gold">&#9733; ${r.gold} Gold</span>
           <span class="results-medal results-medal--silver">&#9733; ${r.silver} Silver</span>
           <span class="results-medal results-medal--bronze">&#9733; ${r.bronze} Bronze</span>
         </div>`;

    const bodyHTML = r.fights
      ? `<div class="fight-card-list">${r.fights.map((f, i) => renderFightCard(f, i)).join('')}</div>`
      : `<table class="fighters-table">
          <thead><tr><th>Fighter</th><th>Category</th><th>Result</th><th>Stage</th></tr></thead>
          <tbody>
            ${r.fighters.map(f => `
              <tr>
                <td>${f.name}</td>
                <td>${f.weight}</td>
                <td>${f.result}</td>
                <td><span class="stage-badge ${getStageBadgeClass(f.stage)}">${f.stage}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>`;

    resultsHTML = `
      <p class="event-detail__summary">${r.summary}</p>
      ${recordHTML}
      ${bodyHTML}`;
  }

  detail.innerHTML = `
    <span class="event-detail__type event-detail__type--${type}">${typeLabel}</span>
    <h3 class="event-detail__title">${evt.title}</h3>
    <p class="event-detail__date">${dateObj.toLocaleDateString('en-GB', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
    <p class="event-detail__location">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      ${evt.location}
    </p>
    <p class="event-detail__desc">${evt.description}</p>
    ${resultsHTML}
  `;

  // Newly-injected cards carry the `reveal` class but were never seen by the
  // observer set up on page load — re-run it so they actually animate in.
  initScrollReveal();
}

function renderEventsList() {
  const el = document.getElementById('events-list');
  if (!el) return;
  const sorted = [...eventsData].sort((a,b) => new Date(b.date) - new Date(a.date));
  el.innerHTML = sorted.map((evt, i) => {
    const d = new Date(evt.date + 'T00:00:00');
    const type = evt.upcoming ? 'upcoming' : evt.type;
    const medals = evt.results && evt.results.record ? `
      <div class="event-row__medals">
        <span class="results-medal results-medal--gold">${evt.results.record.wins}W</span>
        <span class="results-medal results-medal--bronze">${evt.results.record.losses}L</span>
      </div>` : evt.results ? `
      <div class="event-row__medals">
        <span class="results-medal results-medal--gold">&#9733; ${evt.results.gold}</span>
        <span class="results-medal results-medal--silver">&#9733; ${evt.results.silver}</span>
        <span class="results-medal results-medal--bronze">&#9733; ${evt.results.bronze}</span>
      </div>` : evt.upcoming ? `<span style="font-family:var(--font-heading);font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--red);">Upcoming</span>` : '';

    return `
      <div class="event-row event-row--${type} reveal reveal-d${Math.min(i+1,5)}" data-date="${evt.date}">
        <div class="event-row__date">
          <span class="event-row__date-day">${d.getDate()}</span>
          <span class="event-row__date-month">${SHORT_MONTHS[d.getMonth()]} ${d.getFullYear()}</span>
        </div>
        <div class="event-row__info">
          <h3 class="event-row__title">${evt.title}</h3>
          <p class="event-row__location">${evt.location}</p>
        </div>
        ${medals}
      </div>`;
  }).join('');

  document.querySelectorAll('.event-row[data-date]').forEach(row => {
    row.addEventListener('click', () => {
      const [y,m,d] = row.dataset.date.split('-').map(Number);
      selectedDate = new Date(y, m-1, d);
      currentDate  = new Date(y, m-1, 1);
      renderCalendar();
      const events = getEventsForDate(selectedDate);
      showEventDetail(events);
      document.getElementById('calendar').scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  renderNav('events.html');
  renderFooter();
  eventsData = await loadEvents();
  renderCalendar();
  renderEventsList();
  initScrollReveal();

  document.getElementById('cal-prev').addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1);
    renderCalendar();
  });
  document.getElementById('cal-next').addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1);
    renderCalendar();
  });
});
