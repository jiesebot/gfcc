(() => {
  'use strict';
  const config = window.CAMPAIGN || {};
  const name = String(config.candidateName || 'Devan Giese').trim();
  const committee = String(config.registeredCommitteeName || 'Friends of Devan Giese').trim();
  const page = document.body.dataset.currentPage;

  document.querySelectorAll('[data-candidate-name]').forEach((el) => {el.textContent = name;});
  document.querySelectorAll('[data-year]').forEach((el) => {el.textContent = String(new Date().getFullYear());});
  const disclaimer = document.querySelector('#campaign-disclaimer');
  if (disclaimer) disclaimer.textContent = `Paid for by ${committee}`;

  const nav = document.getElementById('site-navigation');
  const toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    nav.querySelectorAll('a[data-page]').forEach((link) => {
      if (link.dataset.page === page) link.setAttribute('aria-current', 'page');
    });
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      nav.classList.remove('nav-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('nav-open', open);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {if (event.key === 'Escape') closeMenu();});
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  const photo = String(config.candidatePhoto || '').trim();
  if (photo && (/^https:\/\//i.test(photo) || /^assets\/[\w.-]+\.(png|jpg|jpeg|webp|avif)$/i.test(photo))) {
    ['home-portrait','about-portrait'].forEach((id) => {
      const img = document.getElementById(id);
      if (!img) return;
      img.src = photo;
      img.alt = `Portrait of ${name}`;
      img.hidden = false;
      const placeholder = img.parentElement.querySelector('.portrait-placeholder');
      if (placeholder) placeholder.hidden = true;
      img.addEventListener('error', () => {
        img.hidden = true;
        if (placeholder) placeholder.hidden = false;
      });
    });
  }

  const bio = String(config.biography || '').trim();
  const bioContainer = document.querySelector('#candidate-bio');
  if (bio && bioContainer) {
    bio.split(/\n\s*\n/).forEach((paragraph) => {
      if (!paragraph.trim()) return;
      const p = document.createElement('p');
      p.textContent = paragraph.trim();
      bioContainer.appendChild(p);
    });
    bioContainer.hidden = false;
    const placeholder = document.querySelector('#bio-placeholder');
    if (placeholder) placeholder.hidden = true;
  }

  if (config.endorsementConfirmed === true) {
    const note = document.querySelector('#endorsement-unverified');
    if (note) note.hidden = true;
    const quote = String(config.endorsementQuote || '').trim();
    const quoteEl = document.querySelector('#endorsement-quote');
    if (quote && quoteEl) {
      quoteEl.textContent = `“${quote.replace(/^[“\"]|[”\"]$/g,'')}”`;
      quoteEl.hidden = false;
      const attr = document.querySelector('#endorsement-quote-attribution');
      if (attr) {attr.textContent = 'Amaad Rivera-Wagner · Wisconsin State Representative';attr.hidden = false;}
    }
  }

  const email = String(config.contactEmail || '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.querySelectorAll('[data-campaign-email]').forEach((a) => {
      a.href = `mailto:${email}?subject=${encodeURIComponent('Green Bay District 9 campaign inquiry')}`;
      const text = a.querySelector('[data-email-text]');
      if (text) text.textContent = email;
      a.hidden = false;
    });
    document.querySelectorAll('[data-email-pending]').forEach((el) => {el.hidden = true;});
  }

  const urlFields = [
    ['volunteerUrl','[data-volunteer-link]','[data-volunteer-pending]'],
    ['socialUrl','[data-social-link]','[data-social-pending]'],
    ['donationUrl','[data-donation-link]',null]
  ];
  urlFields.forEach(([key, selector, pending]) => {
    const url = String(config[key] || '').trim();
    if (!/^https:\/\//i.test(url)) return;
    document.querySelectorAll(selector).forEach((a) => {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.hidden = false;
    });
    if (pending) document.querySelectorAll(pending).forEach((el) => {el.hidden = true;});
    if (key === 'donationUrl') {
      const row = document.querySelector('[data-donation-wrap]');
      if (row) row.hidden = false;
    }
  });
})();


// Local weather & clock: Green Bay, Wisconsin (timezone-safe across daylight saving).
// Open-Meteo is used only for current weather, not for the clock itself.
(() => {
  'use strict';
  const clock = document.getElementById('gb-local-time');
  const weather = document.getElementById('gb-weather-text');
  const weatherIcon = document.getElementById('gb-weather-icon');
  if (!clock || !weather) return;
  const timeZone = 'America/Chicago';
  const renderClock = () => {
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = new Intl.DateTimeFormat('en-US', {
      timeZone, weekday:'short', month:'short', day:'numeric',
      hour:'numeric',minute:'2-digit',timeZoneName:'short'
    }).format(now);
  };
  const describe = (code) => {
    if (code === 0) return ['☀','Clear'];
    if ([1,2].includes(code)) return ['⛅','Partly cloudy'];
    if (code === 3) return ['☁','Cloudy'];
    if ([45,48].includes(code)) return ['≋','Foggy'];
    if ([51,53,55,56,57].includes(code)) return ['☂','Drizzle'];
    if ([61,63,65,66,67,80,81,82].includes(code)) return ['☂','Rain'];
    if ([71,73,75,77,85,86].includes(code)) return ['❄','Snow'];
    if ([95,96,99].includes(code)) return ['☁','Thunderstorms'];
    return ['◌','Conditions'];
  };
  let fetching = false;
  let lastFetch = 0;
  async function updateWeather(force = false) {
    if (fetching || (!force && Date.now() - lastFetch < 15 * 60 * 1000)) return;
    fetching = true;
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=44.5133&longitude=-88.0133&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FChicago';
    try {
      const controller = new AbortController();
      const abort = setTimeout(() => controller.abort(), 8000);
      let response;
      try { response = await fetch(url, {signal: controller.signal}); }
      finally {clearTimeout(abort);}
      if (!response.ok) throw new Error('Weather service unavailable');
      const data = await response.json();
      const temp = data?.current?.temperature_2m;
      const weatherCode = data?.current?.weather_code;
      if (!Number.isFinite(temp) || !Number.isInteger(weatherCode)) throw new Error('Weather data missing');
      const [symbol, summary] = describe(weatherCode);
      weather.textContent = `${Math.round(temp)}°F · ${summary}`;
      if (weatherIcon) weatherIcon.textContent = symbol;
      lastFetch = Date.now();
    } catch (_) {
      weather.textContent = 'Weather unavailable';
      if (weatherIcon) weatherIcon.textContent = '◌';
      lastFetch = Date.now();
    } finally {fetching = false;}
  }
  renderClock();
  updateWeather();
  setInterval(renderClock, 30 * 1000);
  setInterval(updateWeather, 15 * 60 * 1000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {renderClock(); updateWeather();}
  });
})();


// Public campaign events (no API key or backend; Google-hosted embeds update live).
(() => {
  'use strict';
  const id = String(window.CAMPAIGN?.publicCalendarId || '').trim();
  // Google Calendar IDs are email-like. Reject placeholders or malformed values.
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+$/.test(id)) return;
  function embedUrl(mode) {
    const url = new URL('https://calendar.google.com/calendar/embed');
    url.searchParams.set('src', id);
    url.searchParams.set('ctz', 'America/Chicago');
    url.searchParams.set('mode', mode);
    url.searchParams.set('showTitle', '0');
    url.searchParams.set('showPrint', '0');
    url.searchParams.set('showCalendars', '0');
    url.searchParams.set('showTz', '0');
    url.searchParams.set('bgcolor', '#FFFFFF');
    return url.toString();
  }
  const preview = document.getElementById('campaign-calendar-preview');
  if (preview) {
    preview.src = embedUrl('AGENDA');
    preview.hidden = false;
    document.getElementById('calendar-preview-empty')?.setAttribute('hidden', '');
  }
  const full = document.getElementById('campaign-calendar-full');
  if (full) {
    full.src = embedUrl('MONTH');
    full.hidden = false;
    document.getElementById('calendar-full-empty')?.setAttribute('hidden', '');
    const open = document.getElementById('campaign-calendar-open');
    if (open) {
      // Shareable view: links straight to the public embedded calendar.
      open.href = embedUrl('MONTH');
      open.hidden = false;
    }
  }
})();
