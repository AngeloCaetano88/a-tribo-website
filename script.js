(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 780;

  /* ---------- Global mouse light ---------- */
  if (!reduceMotion && !isTouch) {
    const light = document.getElementById('mouseLight');
    if (light) {
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
