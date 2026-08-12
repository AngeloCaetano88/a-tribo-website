(() => {
  const posts = window.NEWS_POSTS || [];
  const lang = () => (window.__atriboLang === 'en' ? 'en' : 'pt');

  const renderList = () => {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    const l = lang();
    grid.innerHTML = posts.map((post, i) => `
      <a href="noticia.html?post=${post.slug}" class="news-card spotlight-card border-glow-static reveal in-view" data-reveal="up" data-delay="${(i % 3) + 1}">
        <div class="news-cover"><img src="${post.cover}" alt="" loading="lazy"></div>
        <div class="news-body">
          <p class="news-date">${post.dateLabel[l]}</p>
          <h3 class="news-title">${post.title[l]}</h3>
          <p class="news-excerpt">${post.excerpt[l]}</p>
        </div>
      </a>
    `).join('');
    if (window.applyCardMotion) window.applyCardMotion(grid);
  };

  const renderPost = () => {
    const root = document.getElementById('postRoot');
    if (!root) return;
    const params = new URLSearchParams(location.search);
    const slug = params.get('post');
    const post = posts.find(p => p.slug === slug) || posts[0];
    if (!post) return;
    const l = lang();
    document.title = post.title[l] + ' — A Tribo';
    root.innerHTML = `
      <a href="noticias.html" class="post-back">← ${l === 'en' ? 'Back to news' : 'Voltar às notícias'}</a>
      <p class="post-date">${post.dateLabel[l]}</p>
      <h1 class="post-title">${post.title[l]}</h1>
      <div class="post-cover"><img src="${post.cover}" alt=""></div>
      <div class="post-body">${post.body[l].map(p => `<p>${p}</p>`).join('')}</div>
    `;
  };

  document.addEventListener('partials:ready', () => { renderList(); renderPost(); });
  document.addEventListener('lang:changed', () => { renderList(); renderPost(); });
})();
