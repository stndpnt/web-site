/* StandPoint — shared mobile navigation.
   Builds the hamburger button and the dropdown panel from the header's own nav
   links, so every page (home, portfolio, group stands, FAQ, privacy, generated
   project pages) gets one identical menu with no page-local markup. Desktop is
   untouched: styling in assets/css/site-header.css hides both above 1024px. */
(function () {
  var nav = document.querySelector('.header .nav');
  if (!nav || document.getElementById('mobile-nav')) return;

  var links = Array.prototype.filter.call(nav.children, function (el) {
    return el.tagName === 'A';
  });
  if (!links.length) return;

  var panel = document.createElement('nav');
  panel.id = 'mobile-nav';
  panel.setAttribute('aria-label', 'Mobile navigation');

  links.forEach(function (a) {
    var clone = a.cloneNode(true);           // keeps href, text and aria-current
    clone.classList.remove('hide-sm');
    if (clone.classList.contains('cta-btn')) {
      clone.classList.remove('cta-btn');
      clone.classList.add('mnav-cta');
    }
    panel.appendChild(clone);
  });

  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'mobile-nav');
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.innerHTML = '<span class="nav-toggle-bars" aria-hidden="true"><i></i><i></i><i></i></span>';

  nav.appendChild(toggle);
  (document.querySelector('.header') || nav).appendChild(panel);

  function setOpen(open) {
    panel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!panel.classList.contains('is-open'));
  });

  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (!panel.classList.contains('is-open')) return;
    if (!panel.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) setOpen(false);
  });
})();
