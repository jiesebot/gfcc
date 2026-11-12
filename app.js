(() => {
  'use strict';
  const config = window.CAMPAIGN || {};
  const name = String(config.candidateName || 'Devan Giese').trim();
  const committee = String(config.registeredCommitteeName || '[INSERT EXACT REGISTERED COMMITTEE NAME]').trim();
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
