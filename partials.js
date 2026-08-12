/* ============================================================
   Shared partials loader + nav/footer-dependent behaviour
   Runs on every page, before script.js
   ============================================================ */
(() => {
  const SHARED_I18N = {
    pt: {
      'nav.shows': 'Concertos',
      'nav.music': 'Música',
      'nav.band': 'Formação',
      'nav.gallery': 'Galeria',
      'nav.news': 'Notícias',
      'nav.shop': 'Loja',
      'nav.contact': 'Contacto',
      'skip.link': 'Saltar para o conteúdo',
      'footer.rights': '© 2026 A Tribo. Todos os direitos reservados.',
      'cookie.text': 'Usamos apenas armazenamento essencial do navegador para guardar a tua preferência de idioma. Não usamos cookies de publicidade nem de rastreio.',
      'cookie.accept': 'Aceitar',
      'cookie.reject': 'Rejeitar'
    },
    en: {
      'nav.shows': 'Shows',
      'nav.music': 'Music',
      'nav.band': 'Band',
      'nav.gallery': 'Gallery',
      'nav.news': 'News',
      'nav.shop': 'Shop',
      'nav.contact': 'Contact',
      'skip.link': 'Skip to content',
      'footer.rights': '© 2026 A Tribo. All rights reserved.',
      'cookie.text': 'We only use essential browser storage to remember your language preference. We don’t use advertising or tracking cookies.',
      'cookie.accept': 'Accept',
      'cookie.reject': 'Reject'
    }
  };

  const LANG_KEY = 'atribo-lang';
  const CONSENT_KEY = 'atribo-cookie-consent';

  const hasConsent = () => {
    try { return localStorage.getItem(CONSENT_KEY) === 'accepted'; } catch (e) { return false; }
  };

  const getDict = (lang) => {
    const page = window.PAGE_I18N || { pt: {}, en: {} };
    return {
      ...(SHARED_I18N[lang] || SHARED_I18N.pt),
      ...((page[lang]) || {})
    };
  };

  const applyLang = (lang) => {
    const dict = getDict(lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const [attr, key] = el.getAttribute('data-i18n-attr').split(':');
      if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-PT';
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    if (hasConsent()) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    }
    window.__atriboLang = lang;
    document.dispatchEvent(new CustomEvent('lang:changed', { detail: { lang } }));
  };
  window.applyLang = applyLang;

  const initLang = () => {
    let saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
    applyLang(saved === 'en' ? 'en' : 'pt');
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
  };

  const initActiveNav = () => {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll(`.nav-links a[data-page="${page}"], .mobile-menu-links a[data-page="${page}"]`)
      .forEach(a => a.classList.add('is-active-page'));
  };

  const initCookieBanner = () => {
    const cookieBanner = document.getElementById('cookieBanner');
    if (!cookieBanner) return;
    let existingConsent = null;
    try { existingConsent = localStorage.getItem(CONSENT_KEY); } catch (e) {}

    if (!existingConsent) {
      cookieBanner.hidden = false;
      requestAnimationFrame(() => {
        setTimeout(() => cookieBanner.classList.add('is-visible'), 400);
      });
    }

    const hideBanner = () => {
      cookieBanner.classList.remove('is-visible');
      setTimeout(() => { cookieBanner.hidden = true; }, 650);
    };

    cookieBanner.querySelector('.cookie-accept').addEventListener('click', () => {
      try {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        localStorage.setItem(LANG_KEY, window.__atriboLang === 'en' ? 'en' : 'pt');
      } catch (e) {}
      hideBanner();
    });

    cookieBanner.querySelector('.cookie-reject').addEventListener('click', () => {
      try {
        localStorage.setItem(CONSENT_KEY, 'rejected');
        localStorage.removeItem(LANG_KEY);
      } catch (e) {}
      hideBanner();
    });
  };

  const initMobileMenu = () => {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!navToggle || !mobileMenu) return;

    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    const openMenu = () => {
      navToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 640) closeMenu();
    });
  };

  const initNavScroll = () => {
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    const onScroll = () => {
      nav.style.transform = window.scrollY > 40 ? 'translateY(0) scale(.98)' : 'translateY(0) scale(1)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  const afterPartials = () => {
    initLang();
    initActiveNav();
    initCookieBanner();
    initMobileMenu();
    initNavScroll();
    document.dispatchEvent(new CustomEvent('partials:ready'));
  };

  const loadPartial = (url, placeholderId) => {
    const el = document.getElementById(placeholderId);
    if (!el) return Promise.resolve();
    return fetch(url)
      .then(res => res.text())
      .then(html => { el.innerHTML = html; })
      .catch(() => {});
  };

  document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
      loadPartial('partials/nav.html', 'navPlaceholder'),
      loadPartial('partials/footer.html', 'footerPlaceholder')
    ]).then(afterPartials);
  });
})();
