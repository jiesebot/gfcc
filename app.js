(() => {
  'use strict';
  const config = window.CAMPAIGN || {};
  const name = (config.candidateName || 'YOUR NAME').trim();
  const committee = (config.registeredCommitteeName || '[EXACT REGISTERED COMMITTEE NAME]').trim();

  document.querySelectorAll('[data-candidate-name]').forEach((el) => { el.textContent = name; });
  document.title = `${name} | Green Bay City Council District 9`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.content = `Meet ${name}, candidate for Green Bay Common Council District 9. Explore campaign priorities and get in touch.`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = `${name} | Green Bay District 9`;

  const disclaimer = document.getElementById('disclaimer');
  disclaimer.textContent = `Paid for by ${committee}`;
  document.getElementById('copyright-year').textContent = new Date().getFullYear();

  const story = (config.personalStory || '').trim();
  if (story) {
    const el = document.getElementById('personal-story');
    story.split(/\n\s*\n/).forEach((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph.trim();
      if (p.textContent) el.appendChild(p);
    });
    el.hidden = false;
    document.getElementById('story-reminder').hidden = true;
  }

  const email = (config.contactEmail || '').trim();
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const link = document.getElementById('email-link');
    link.href = `mailto:${email}?subject=${encodeURIComponent('Hello from District 9')}`;
    link.querySelector('[data-email-address]').textContent = email;
    link.hidden = false;
    document.getElementById('contact-pending').hidden = true;
  }

  [
    ['volunteerUrl', 'volunteer-link'],
    ['donateUrl', 'donate-link'],
    ['socialUrl', 'social-link']
  ].forEach(([field, id]) => {
    const url = (config[field] || '').trim();
    if (url && /^https:\/\//i.test(url)) {
      const el = document.getElementById(id);
      el.href = url;
      el.hidden = false;
    }
  });

  if (config.endorsementConfirmed === true) {
    const note = document.querySelector('.endorsement-note');
    if (note) note.remove();
  }

  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const closeMenu = () => {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('nav-open');
  };
  menu.addEventListener('click', () => {
    const opening = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(opening));
    menu.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('nav-open', opening);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });
})();
