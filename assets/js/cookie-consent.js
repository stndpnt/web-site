/* ============================================================================
   STANDPOINT — COOKIE CONSENT + GOOGLE ANALYTICS 4 (Consent Mode v2)
   ----------------------------------------------------------------------------
   ONE shared file for every public page. Load it once per page:
       <link rel="stylesheet" href="assets/css/cookie-consent.css">
       <script src="assets/js/cookie-consent.js" defer></script>
   (adjust the relative prefix per folder — the script resolves its own paths.)

   The GA4 Measurement ID is configured HERE and nowhere else:
============================================================================ */
(function () {
  "use strict";

  var GA_MEASUREMENT_ID = "G-8QLM019JMB";   /* <-- the only place to change it */

  var STORE_KEY = "sp-cookie-consent";       /* localStorage key, value: {v,analytics,ts} */
  var STORE_VERSION = 1;

  /* Resolve site-root-relative paths from this script's own URL, so the same
     file works at /, /faq/ and /portfolio/<slug>/ without per-page config. */
  var self = document.currentScript ||
    (function () {
      var s = document.querySelectorAll('script[src*="cookie-consent.js"]');
      return s[s.length - 1] || null;
    })();
  var BASE = self ? self.src.replace(/assets\/js\/cookie-consent\.js.*$/, "") : "";
  var PRIVACY_URL = BASE + "privacy-policy.html";

  /* ---------------------------------------------------------------- storage */
  function readConsent() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (!v || v.v !== STORE_VERSION || typeof v.analytics !== "boolean") return null;
      return v;
    } catch (e) { return null; }
  }
  function writeConsent(analytics) {
    try {
      window.localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ v: STORE_VERSION, analytics: !!analytics, ts: Date.now() })
      );
    } catch (e) { /* private mode — consent then lasts for this page view only */ }
  }

  /* ------------------------------------------------- consent mode v2 (local) */
  /* Only the local dataLayer + denied defaults are set up before consent.
     No Google script is requested at this point. */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied"
  });

  /* ------------------------------------------------------------- GA4 loading */
  var gaLoaded = false;

  function loadGA() {
    if (gaLoaded || window.__spGaLoaded) return;      /* never initialise twice */
    gaLoaded = window.__spGaLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }

  function grantAnalytics() {
    window["ga-disable-" + GA_MEASUREMENT_ID] = false;
    gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    loadGA();
  }

  function denyAnalytics() {
    window["ga-disable-" + GA_MEASUREMENT_ID] = true;  /* stops an already-loaded GA */
    gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    /* Clear analytics cookies set during a previous accepted session. */
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (/^_ga/.test(name) || name === "_gid") {
        var host = location.hostname;
        document.cookie = name + "=; Max-Age=0; path=/";
        document.cookie = name + "=; Max-Age=0; path=/; domain=" + host;
        document.cookie = name + "=; Max-Age=0; path=/; domain=." + host;
      }
    });
  }

  /* ------------------------------------------------------------------ banner */
  var bar = null;

  function buildBanner() {
    if (bar) return bar;
    bar = document.createElement("div");
    bar.className = "cc-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Cookie notice");
    bar.innerHTML =
      '<div class="cc-inner">' +
        '<p class="cc-text">We use cookies to understand how visitors use our website and improve it. ' +
          '<a href="' + PRIVACY_URL + '">Privacy Policy</a>' +
        "</p>" +
        '<div class="cc-actions">' +
          '<button type="button" class="cc-btn cc-reject" data-cc="deny">Necessary only</button>' +
          '<button type="button" class="cc-btn cc-accept" data-cc="accept">Accept</button>' +
        "</div>" +
      "</div>";
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-cc]") : null;
      if (!btn) return;
      var accept = btn.getAttribute("data-cc") === "accept";
      writeConsent(accept);
      if (accept) grantAnalytics(); else denyAnalytics();
      hideBanner();
    });
    document.body.appendChild(bar);
    return bar;
  }

  function showBanner() {
    var el = buildBanner();
    requestAnimationFrame(function () { el.classList.add("is-open"); });
  }
  function hideBanner() {
    if (bar) bar.classList.remove("is-open");
  }

  /* ------------------------------------------------------------------ wiring */
  function init() {
    var stored = readConsent();
    if (stored && stored.analytics) grantAnalytics();      /* returning: accepted */
    else if (stored) denyAnalytics();                      /* returning: necessary only */
    else showBanner();                                     /* first visit */

    /* Footer "Cookie settings" link — reopens the banner on any page. */
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("[data-cookie-settings]") : null;
      if (!t) return;
      e.preventDefault();
      showBanner();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* Small public API (useful for testing in the console). */
  window.SPCookieConsent = {
    measurementId: GA_MEASUREMENT_ID,
    get: readConsent,
    open: showBanner,
    accept: function () { writeConsent(true); grantAnalytics(); hideBanner(); },
    reject: function () { writeConsent(false); denyAnalytics(); hideBanner(); },
    isGaLoaded: function () { return !!window.__spGaLoaded; }
  };
})();
