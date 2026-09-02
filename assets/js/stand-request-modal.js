/* Reusable "Request a Stand Proposal" modal.
   Trigger any element with [data-open-stand-form] to open it.

   ===== SUBMISSION CONFIG =====
   Insert the real Formspree endpoint below (e.g. "https://formspree.io/f/xxxxxxxx").
   Until this is set, the form will show a friendly error instead of faking success. */
(function () {
  var FORMSPREE_ENDPOINT = ''; // <-- put your Formspree form endpoint URL here

  var CSS = `
  .srm-overlay{position:fixed;inset:0;background:rgba(11,11,12,.55);z-index:9998;opacity:0;pointer-events:none;transition:opacity .22s ease;display:flex;align-items:flex-start;justify-content:center;padding:5vh 20px;overflow-y:auto}
  .srm-overlay.open{opacity:1;pointer-events:auto}
  .srm-modal{width:100%;max-width:920px;background:#fff;color:#17140f;border-radius:4px;box-shadow:0 30px 80px rgba(0,0,0,.35);transform:translateY(14px) scale(.98);opacity:0;transition:transform .25s cubic-bezier(.2,.8,.3,1),opacity .22s ease;font-family:var(--sans,'Inter',sans-serif);margin:auto 0}
  .srm-overlay.open .srm-modal{transform:translateY(0) scale(1);opacity:1}
  .srm-head{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding:32px 36px 20px;border-bottom:1px solid rgba(0,0,0,.08)}
  .srm-head h2{font-family:var(--serif,'Manrope',sans-serif);font-weight:700;font-size:20px;letter-spacing:.04em;text-transform:uppercase;margin:0 0 8px;color:#17140f}
  .srm-head p{margin:0;font-size:14px;line-height:1.5;color:#6b6558;max-width:56ch}
  .srm-close{appearance:none;border:0;background:transparent;width:32px;height:32px;flex:none;cursor:pointer;color:#6b6558;font-size:20px;line-height:1;border-radius:50%;transition:background .15s,color .15s}
  .srm-close:hover{background:rgba(0,0,0,.06);color:#17140f}
  .srm-body{padding:28px 36px 32px;max-height:74vh;overflow-y:auto}
  .srm-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 20px}
  .srm-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
  .srm-field.full{grid-column:1/-1}
  .srm-field label{font-family:var(--mono,monospace);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#918c7f}
  .srm-field label em{font-style:normal;color:#F29311}
  .srm-field input[type=text],.srm-field input[type=email],.srm-field input[type=tel],.srm-field input[type=date],.srm-field select,.srm-field textarea{
    appearance:none;border:1px solid rgba(0,0,0,.14);border-radius:2px;background:#fff;padding:11px 12px;font:inherit;font-size:14px;color:#17140f;outline:none;transition:border-color .15s}
  .srm-field input:focus,.srm-field select:focus,.srm-field textarea:focus{border-color:#F29311}
  .srm-field textarea{resize:vertical;min-height:88px}
  .srm-field.error input,.srm-field.error select,.srm-field.error textarea{border-color:#c0392b}
  .srm-error-msg{font-size:11.5px;color:#c0392b;display:none}
  .srm-field.error .srm-error-msg{display:block}
  .srm-daterow{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .srm-radios{display:flex;flex-wrap:wrap;gap:10px 20px}
  .srm-radio{display:flex;align-items:center;gap:8px;font-size:14px;color:#17140f;cursor:pointer}
  .srm-radio input{accent-color:#F29311;width:15px;height:15px}
  .srm-upload{border:1px dashed rgba(0,0,0,.18);border-radius:2px;padding:16px;font-size:13px;color:#6b6558;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
  .srm-upload label{font-family:inherit;text-transform:none;letter-spacing:0;font-size:13px;color:#17140f;cursor:pointer;text-decoration:underline;text-underline-offset:2px}
  .srm-upload input{display:none}
  .srm-upload-list{font-size:12px;color:#918c7f;width:100%}
  .srm-submit-row{margin-top:8px}
  .srm-submit{appearance:none;border:0;cursor:pointer;background:#F29311;color:#0b0b0c;font-family:var(--mono,monospace);font-weight:600;font-size:13px;letter-spacing:.06em;text-transform:uppercase;padding:15px 28px;border-radius:2px;transition:background .2s;width:100%}
  .srm-submit:hover{background:#f5b033}
  .srm-submit:disabled{opacity:.6;cursor:default}
  .srm-note{margin:10px 0 0;font-size:12px;color:#918c7f;text-align:center}
  .srm-hp{position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden}
  .srm-submit-error{display:none;font-size:12.5px;color:#c0392b;text-align:center;margin:10px 0 0}
  .srm-submit-error.show{display:block}
  .srm-success{padding:56px 36px;text-align:center}
  .srm-success h3{font-family:var(--serif,'Manrope',sans-serif);font-size:22px;margin:0 0 10px;color:#17140f}
  .srm-success p{color:#6b6558;font-size:14px;margin:0}
  @media (max-width:720px){
    .srm-grid,.srm-daterow{grid-template-columns:1fr}
    .srm-head,.srm-body{padding-left:22px;padding-right:22px}
    .srm-overlay{padding:0}
    .srm-modal{max-width:100%;min-height:100%;border-radius:0;margin:0}
  }
  `;

  function injectStyle() {
    var s = document.createElement('style');
    s.id = 'srm-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function buildModal() {
    var overlay = document.createElement('div');
    overlay.className = 'srm-overlay';
    overlay.id = 'srm-overlay';
    overlay.innerHTML =
      '<div class="srm-modal" role="dialog" aria-modal="true" aria-labelledby="srm-title">' +
        '<div class="srm-head">' +
          '<div><h2 id="srm-title">Request a Stand Proposal</h2>' +
          '<p>Tell us a few details about your project. Our team will review your request and contact you within one business day.</p></div>' +
          '<button type="button" class="srm-close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="srm-body">' +
          '<form id="srm-form" novalidate>' +
            '<div class="srm-grid">' +
              field('First Name', 'text', 'srm-first', true, 'Your first name') +
              field('Last Name', 'text', 'srm-last', false, 'Your last name') +
              field('Company', 'text', 'srm-company', true, 'Company name') +
              field('Work Email', 'email', 'srm-email', true, 'name@company.com') +
              field('Phone / WhatsApp', 'tel', 'srm-phone', false, '+...') +
              field('Exhibition', 'text', 'srm-exhibition', true, 'Exhibition name') +
              field('City / Venue', 'text', 'srm-venue', false, 'City or venue') +
              dateRangeField() +
              field('Stand Size (m²)', 'text', 'srm-size', false, 'Approx. stand size') +
              selectField('Budget', 'srm-budget', ['Not defined yet','€25,000–40,000','€40,000–70,000','€70,000–100,000','€100,000+']) +
            '</div>' +
            '<div class="srm-field full">' +
              '<label>Project Type</label>' +
              '<div class="srm-radios">' +
                radio('srm-type', 'custom', 'Custom exhibition stand', true) +
                radio('srm-type', 'group', 'Group stand / pavilion', false) +
                radio('srm-type', 'unsure', 'Not sure', false) +
              '</div>' +
            '</div>' +
            '<div class="srm-field full">' +
              '<label>Tell us briefly what you need</label>' +
              '<textarea id="srm-notes" placeholder="Tell us about your stand, key requirements or ideas"></textarea>' +
            '</div>' +
            '<div class="srm-field full">' +
              '<label>Upload brief / floor plan / references</label>' +
              '<div class="srm-upload">' +
                '<label for="srm-files">Choose files (PDF, JPG, PNG)</label>' +
                '<input type="file" id="srm-files" multiple accept=".pdf,.jpg,.jpeg,.png" />' +
                '<div class="srm-upload-list" id="srm-file-list"></div>' +
              '</div>' +
            '</div>' +
            '<div class="srm-hp" aria-hidden="true">' +
              '<label for="srm-hp-field">Leave this field empty</label>' +
              '<input type="text" id="srm-hp-field" name="_gotcha" tabindex="-1" autocomplete="off" />' +
            '</div>' +
            '<div class="srm-submit-row">' +
              '<button type="submit" class="srm-submit">Send Request</button>' +
              '<p class="srm-note">We usually reply within one business day.</p>' +
              '<p class="srm-submit-error" id="srm-submit-error">Something went wrong. Please try again or email us at <a href="mailto:our.team@standpoint-expo.com">our.team@standpoint-expo.com</a>.</p>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  function field(label, type, id, required, placeholder) {
    return '<div class="srm-field" data-field="' + id + '">' +
      '<label for="' + id + '">' + label + (required ? ' <em>*</em>' : '') + '</label>' +
      '<input type="' + type + '" id="' + id + '" placeholder="' + placeholder + '"' + (required ? ' required' : '') + ' />' +
      '<span class="srm-error-msg">This field is required.</span>' +
    '</div>';
  }

  function selectField(label, id, options) {
    var opts = options.map(function (o) { return '<option>' + o + '</option>'; }).join('');
    return '<div class="srm-field" data-field="' + id + '">' +
      '<label for="' + id + '">' + label + '</label>' +
      '<select id="' + id + '">' + opts + '</select>' +
    '</div>';
  }

  function dateRangeField() {
    return '<div class="srm-field" data-field="srm-dates">' +
      '<label>Exhibition Dates</label>' +
      '<div class="srm-daterow">' +
        '<input type="date" id="srm-date-start" aria-label="Start date" />' +
        '<input type="date" id="srm-date-end" aria-label="End date" />' +
      '</div>' +
    '</div>';
  }

  function radio(name, value, label, checked) {
    return '<label class="srm-radio"><input type="radio" name="' + name + '" value="' + value + '"' + (checked ? ' checked' : '') + '/>' + label + '</label>';
  }

  var overlay, lastFocused;

  function openModal() {
    if (!overlay) overlay = buildModal();
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  function showError(id, show) {
    var el = document.querySelector('[data-field="' + id + '"]');
    if (el) el.classList.toggle('error', show);
  }

  function validate() {
    var ok = true;
    var required = ['srm-first', 'srm-company', 'srm-exhibition'];
    required.forEach(function (id) {
      var v = document.getElementById(id).value.trim();
      var invalid = !v;
      showError(id, invalid);
      if (invalid) ok = false;
    });
    var email = document.getElementById('srm-email').value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    showError('srm-email', !emailOk);
    if (!emailOk) ok = false;
    return ok;
  }

  // Submits via Formspree (https://formspree.io). Set FORMSPREE_ENDPOINT above before going live.
  function submitStandRequest(formData) {
    if (!FORMSPREE_ENDPOINT) {
      return Promise.reject(new Error('Formspree endpoint not configured'));
    }
    return fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error('Submission failed');
      return res.json().catch(function () { return {}; });
    });
  }

  function buildFormData() {
    var fd = new FormData();
    var first = document.getElementById('srm-first').value.trim();
    var last = document.getElementById('srm-last').value.trim();
    var company = document.getElementById('srm-company').value.trim();
    var email = document.getElementById('srm-email').value.trim();
    var exhibition = document.getElementById('srm-exhibition').value.trim();
    fd.append('First Name', first);
    fd.append('Last Name', last);
    fd.append('Company', company);
    fd.append('Work Email', email);
    fd.append('Phone / WhatsApp', document.getElementById('srm-phone').value.trim());
    fd.append('Exhibition', exhibition);
    fd.append('City / Venue', document.getElementById('srm-venue').value.trim());
    fd.append('Exhibition Start Date', document.getElementById('srm-date-start').value);
    fd.append('Exhibition End Date', document.getElementById('srm-date-end').value);
    fd.append('Stand Size (m²)', document.getElementById('srm-size').value.trim());
    fd.append('Budget', document.getElementById('srm-budget').value);
    fd.append('Project Type', (document.querySelector('input[name="srm-type"]:checked') || {}).value || '');
    fd.append('Project Description', document.getElementById('srm-notes').value.trim());
    fd.append('_gotcha', document.getElementById('srm-hp-field').value);
    fd.append('_subject', 'New website request — ' + (company || 'Unknown company') + ' — ' + (exhibition || 'Unknown exhibition'));
    fd.append('_replyto', email);
    var files = document.getElementById('srm-files').files;
    for (var i = 0; i < files.length; i++) fd.append('attachments[]', files[i], files[i].name);
    return fd;
  }

  var submitting = false;

  function onSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    var hp = document.getElementById('srm-hp-field');
    if (hp && hp.value) return; // honeypot triggered — silently drop
    submitting = true;
    var btn = overlay.querySelector('.srm-submit');
    var errEl = document.getElementById('srm-submit-error');
    errEl.classList.remove('show');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    submitStandRequest(buildFormData()).then(function () {
      submitting = false;
      var body = overlay.querySelector('.srm-body');
      body.innerHTML = '<div class="srm-success"><h3>Thank you. We\u2019ve received your request.</h3><p>Our team will contact you shortly.</p></div>';
    }).catch(function () {
      submitting = false;
      btn.disabled = false;
      btn.textContent = 'Send Request';
      errEl.classList.add('show');
    });
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-open-stand-form]');
    if (trigger) {
      e.preventDefault();
      openModal();
      return;
    }
    if (e.target.closest('.srm-close')) { closeModal(); return; }
    if (e.target.id === 'srm-overlay') { closeModal(); }
  });

  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'srm-form') onSubmit(e);
  });

  document.addEventListener('change', function (e) {
    if (e.target && e.target.id === 'srm-files') {
      var list = document.getElementById('srm-file-list');
      var names = Array.prototype.map.call(e.target.files, function (f) { return f.name; });
      list.textContent = names.length ? names.join(', ') : '';
    }
  });

  injectStyle();
})();
