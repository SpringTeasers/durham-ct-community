/* Durham, Connecticut — Community Website
   Vanilla JS only. Single purpose: the mobile navigation disclosure.
   Progressive enhancement — with JS off, the nav list stays visible
   (the [hidden] attribute is only applied by this script). */

(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (!toggle || !nav) {
    return;
  }

  /* Start collapsed on small screens only, and only once JS has run. */
  function setExpanded(expanded) {
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    if (expanded) {
      nav.removeAttribute('hidden');
    } else {
      nav.setAttribute('hidden', '');
    }
  }

  function isDesktop() {
    return window.matchMedia('(min-width: 768px)').matches;
  }

  /* Initial state: collapsed on mobile, shown on desktop (CSS overrides
     [hidden] at >=768px, but keep the attribute in sync with the media query). */
  if (!isDesktop()) {
    setExpanded(false);
  } else {
    setExpanded(true);
  }

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!expanded);
  });

  /* Esc closes the menu and returns focus to the toggle. */
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape' && event.key !== 'Esc') {
      return;
    }
    if (toggle.getAttribute('aria-expanded') !== 'true') {
      return;
    }
    setExpanded(false);
    toggle.focus();
  });

  /* Close after following a link (mobile only). */
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a') && !isDesktop()) {
      setExpanded(false);
    }
  });

  /* Keep the toggle's state in sync when the viewport crosses 768px
     (e.g. rotating a phone, or resizing a desktop window). The CSS
     already shows the nav at >=768px; this keeps aria-expanded honest. */
  window.addEventListener('resize', function () {
    if (isDesktop()) {
      nav.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
}());
