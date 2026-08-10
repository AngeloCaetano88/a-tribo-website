(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 780;

  /* ---------- i18n: PT-PT (default) / EN ---------- */
  const translations = {
    pt: {
      'meta.title': 'A Tribo — Digressão 2026',
      'skip.link': 'Saltar para o conteúdo',
      'nav.shows': 'Concertos',
      'nav.music': 'Música',
      'nav.about': 'Sobre',
      'nav.shop': 'Loja',
      'nav.contact': 'Contacto',
      'nav.band': 'Formação',
      'nav.gallery': 'Galeria',
      'hero.subtitle': 'ROCK QUE UNE A MANADA',
      'hero.cta.shows': 'Ver Concertos',
      'hero.cta.listen': 'Ouvir Agora',
      'shows.eyebrow': 'Digressão 2026',
      'shows.title': 'Próximos Concertos',
      'show.photoLabel': 'Foto do Concerto',
      'show0.date': '08 AGO 2026',
      'show1.date': '14 SET 2026',
      'show2.date': '28 SET 2026',
      'show3.date': '05 OUT 2026',
      'show.freeEntry': 'Entrada Gratuita',
      'show.detailsButton': 'Ver Localização',
      'feature.eyebrow': 'Novo Single',
      'feature.text': 'A Tribo é uma banda de tributo formada em 2018, que reinterpreta êxitos icónicos com peso, groove e um toque original. Ouve agora o novo single e acompanha a digressão 2026 pelos Açores.',
      'feature.cta.spotify': 'Ouvir no Spotify',
      'feature.cta.single': 'Novo Single',
      'about.eyebrow': 'Sobre a banda',
      'about.title': 'A manada cresce a cada concerto',
      'about.text': 'O rock que conheces, com a força que não esperavas. De Amália Rodrigues a Michael Jackson, de tributo a espetáculo — com arranjos modernos e um toque original, a Tribo recria temas icónicos sem perder a essência que os torna inesquecíveis.',
      'stat1.label': 'Concertos realizados',
      'stat2.label': 'Anos de estrada',
      'stat3.label': 'Mil ouvintes/mês',
      'band.eyebrow': 'Formação',
      'band.title': 'Os Músicos',
      'member1.role': 'Voz',
      'member2.role': 'Guitarra',
      'member3.role': 'Teclas',
      'member4.role': 'Baixo',
      'member5.role': 'Bateria',
      'media.eyebrow': 'Galeria',
      'media.title': 'Fotos e Vídeos',
      'media.videoLabel': 'Vídeo ao vivo',
      'media.photoLabel': 'Foto',
      'media.filter.all': 'Todos',
      'media.filter.show0': '08 Ago — Semana do Mar',
      'media.filter.show1': '14 Set — Marina da Horta',
      'media.filter.show2': '28 Set — Parque Urbano',
      'media.filter.show3': '05 Out — Angústias',
      'media.empty': 'Ainda não há fotos ou vídeos nesta categoria.',
      'media.hint': 'Mais fotos e vídeos dos próximos concertos serão adicionados em breve.',
      'cta.title': 'Entra para a manada',
      'cta.text': 'T-shirts, vinis e recordações da digressão 2026 — direto da loja oficial. Os concertos são sempre de entrada gratuita.',
      'cta.button': 'Ver Loja',
      'contact.eyebrow': 'Booking',
      'contact.title': 'Fala connosco',
      'contact.text': 'Para marcar shows, parcerias e imprensa, contacta a produção da banda.',
      'contact.phoneLabel': 'Telefone',
      'contact.emailLabel': 'Email',
      'footer.rights': '© 2026 A Tribo. Todos os direitos reservados.',
      'cookie.text': 'Usamos apenas armazenamento essencial do navegador para guardar a tua preferência de idioma. Não usamos cookies de publicidade nem de rastreio.',
      'cookie.accept': 'Aceitar',
      'cookie.reject': 'Rejeitar'
    },
    en: {
      'meta.title': 'A Tribo — 2026 Tour',
      'skip.link': 'Skip to content',
      'nav.shows': 'Shows',
      'nav.music': 'Music',
      'nav.about': 'About',
      'nav.shop': 'Shop',
      'nav.contact': 'Contact',
      'nav.band': 'Band',
      'nav.gallery': 'Gallery',
      'hero.subtitle': 'ROCK THAT UNITES THE PACK',
      'hero.cta.shows': 'See Shows',
      'hero.cta.listen': 'Listen Now',
      'shows.eyebrow': '2026 Tour',
      'shows.title': 'Upcoming Shows',
      'show.photoLabel': 'Show Photo',
      'show0.date': 'AUG 8, 2026',
      'show1.date': 'SEP 14, 2026',
      'show2.date': 'SEP 28, 2026',
      'show3.date': 'OCT 05, 2026',
      'show.freeEntry': 'Free Entry',
      'show.detailsButton': 'Get Directions',
      'feature.eyebrow': 'New Single',
      'feature.text': 'A Tribo is a tribute band formed in 2018, reinterpreting iconic hits with weight, groove and an original touch. Listen to the new single now and follow the 2026 tour across the Azores.',
      'feature.cta.spotify': 'Listen on Spotify',
      'feature.cta.single': 'New Single',
      'about.eyebrow': 'About the band',
      'about.title': 'The pack grows with every show',
      'about.text': 'The rock you know, with the force you didn’t expect. From Amália Rodrigues to Michael Jackson, from tribute to spectacle — with modern arrangements and an original touch, A Tribo reimagines iconic songs without losing the essence that makes them unforgettable.',
      'stat1.label': 'Shows played',
      'stat2.label': 'Years on the road',
      'stat3.label': 'K listeners/month',
      'band.eyebrow': 'Lineup',
      'band.title': 'The Musicians',
      'member1.role': 'Vocals',
      'member2.role': 'Guitar',
      'member3.role': 'Keyboards',
      'member4.role': 'Bass',
      'member5.role': 'Drums',
      'media.eyebrow': 'Gallery',
      'media.title': 'Photos and Videos',
      'media.videoLabel': 'Live video',
      'media.photoLabel': 'Photo',
      'media.filter.all': 'All',
      'media.filter.show0': 'Aug 8 — Semana do Mar',
      'media.filter.show1': 'Sep 14 — Marina da Horta',
      'media.filter.show2': 'Sep 28 — Parque Urbano',
      'media.filter.show3': 'Oct 5 — Angústias',
      'media.empty': 'No photos or videos in this category yet.',
      'media.hint': 'More photos and videos from upcoming shows will be added soon.',
      'cta.title': 'Join the pack',
      'cta.text': 'T-shirts, vinyls and keepsakes from the 2026 tour — straight from the official store. Shows are always free to attend.',
      'cta.button': 'Visit Shop',
      'contact.eyebrow': 'Booking',
      'contact.title': 'Get in touch',
      'contact.text': 'To book shows, partnerships or press, contact the band’s management.',
      'contact.phoneLabel': 'Phone',
      'contact.emailLabel': 'Email',
      'footer.rights': '© 2026 A Tribo. All rights reserved.',
      'cookie.text': 'We only use essential browser storage to remember your language preference. We don’t use advertising or tracking cookies.',
      'cookie.accept': 'Accept',
      'cookie.reject': 'Reject'
    }
  };

  const LANG_KEY = 'atribo-lang';
  const CONSENT_KEY = 'atribo-cookie-consent';
  const langButtons = document.querySelectorAll('.lang-btn');

  const hasConsent = () => {
    try { return localStorage.getItem(CONSENT_KEY) === 'accepted'; } catch (e) { return false; }
  };

  const applyLang = (lang) => {
    const dict = translations[lang] || translations.pt;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-PT';
    langButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));
    if (hasConsent()) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    }
  };

  const savedLang = (() => {
    try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; }
  })();
  applyLang(savedLang === 'en' ? 'en' : 'pt');

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  /* ---------- Cookie consent banner ---------- */
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    const existingConsent = (() => {
      try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
    })();

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
        localStorage.setItem(LANG_KEY, document.documentElement.lang === 'en' ? 'en' : 'pt');
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
  }

  /* ---------- Global mouse light ---------- */
  if (!reduceMotion && !isTouch) {
    const light = document.getElementById('mouseLight');
    let rafId = null;
    let tx = 0, ty = 0;

    const apply = () => {
      document.documentElement.style.setProperty('--mx', tx + 'px');
      document.documentElement.style.setProperty('--my', ty + 'px');
      rafId = null;
    };

    window.addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY;
      light.classList.add('active');
      if (!rafId) rafId = requestAnimationFrame(apply);
    }, { passive: true });

    window.addEventListener('pointerleave', () => light.classList.remove('active'));
  }

  /* ---------- Spotlight cards ---------- */
  if (!reduceMotion && !isTouch) {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--sx', x + '%');
        card.style.setProperty('--sy', y + '%');
      }, { passive: true });
    });
  }

  /* ---------- 3D tilt (member + contact cards) ---------- */
  if (!reduceMotion && !isTouch) {
    const tiltEls = document.querySelectorAll('.member-card, .contact-card');
    tiltEls.forEach(el => {
      el.addEventListener('pointerenter', () => {
        el.style.transition = 'transform .12s ease-out, box-shadow .45s var(--ease-out)';
      }, { passive: true });

      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateY = px * 14;
        const rotateX = -py * 14;
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      }, { passive: true });

      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .6s var(--ease-out), box-shadow .45s var(--ease-out)';
        el.style.transform = '';
      }, { passive: true });
    });
  }

  /* ---------- Gallery filter (by show/date) ---------- */
  const mediaFilterBtns = document.querySelectorAll('.media-filter-btn');
  const mediaTiles = document.querySelectorAll('.media-tile');
  const mediaEmpty = document.querySelector('.media-empty');

  const applyMediaFilter = (filter) => {
    let visibleCount = 0;
    mediaTiles.forEach(tile => {
      const matches = filter === 'all' || tile.dataset.show === filter;
      if (matches) {
        visibleCount++;
        tile.classList.remove('is-hidden');
        requestAnimationFrame(() => tile.classList.remove('is-filtered-out'));
      } else {
        tile.classList.add('is-filtered-out');
        setTimeout(() => {
          if (tile.classList.contains('is-filtered-out')) tile.classList.add('is-hidden');
        }, 350);
      }
    });
    if (mediaEmpty) mediaEmpty.hidden = visibleCount > 0;
  };

  mediaFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mediaFilterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      applyMediaFilter(btn.dataset.filter);
    });
  });

  /* ---------- Lightbox ---------- */
  const photoTiles = Array.from(document.querySelectorAll('.media-tile-photo'));
  if (photoTiles.length) {
    const zoomIconSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L20 20M10.5 8v5M8 10.5h5"/></svg>';
    photoTiles.forEach(tile => {
      const hint = document.createElement('span');
      hint.className = 'media-zoom-hint';
      hint.setAttribute('aria-hidden', 'true');
      hint.innerHTML = zoomIconSVG;
      tile.appendChild(hint);
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentIndex = 0;

    const visibleTiles = () => photoTiles.filter(t => !t.classList.contains('is-hidden'));

    const openLightbox = (tile) => {
      const list = visibleTiles();
      currentIndex = list.indexOf(tile);
      showAt(currentIndex);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => lightbox.classList.add('is-open'));
    };

    const showAt = (index) => {
      const list = visibleTiles();
      if (!list.length) return;
      currentIndex = (index + list.length) % list.length;
      const img = list[currentIndex].querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightboxCaption.textContent = img.alt || '';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => { lightbox.hidden = true; }, 350);
    };

    photoTiles.forEach(tile => {
      tile.addEventListener('click', () => openLightbox(tile));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => showAt(currentIndex - 1));
    lightboxNext.addEventListener('click', () => showAt(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showAt(currentIndex - 1);
      if (e.key === 'ArrowRight') showAt(currentIndex + 1);
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- Count-up stats ---------- */
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (counters.length) {
    const animateCount = (el) => {
      const target = parseInt(el.dataset.count, 10);
      if (reduceMotion) { el.textContent = target; return; }
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(el => countIo.observe(el));
  }

  /* ---------- Nav shrink on scroll ---------- */
  const nav = document.getElementById('siteNav');
  if (nav) {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      nav.style.transform = y > 40 ? 'translateY(0) scale(.98)' : 'translateY(0) scale(1)';
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Subtle parallax on orbs ---------- */
  if (!reduceMotion && !isTouch) {
    const orbs = document.querySelectorAll('.orb');
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        orbs.forEach((orb, i) => {
          const speed = 0.04 + (i % 3) * 0.02;
          orb.style.translate = `0 ${y * speed}px`;
        });
        ticking = false;
      });
    }, { passive: true });
  }
})();
