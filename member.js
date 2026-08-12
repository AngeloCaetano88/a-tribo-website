(() => {
  const members = window.MEMBERS || [];
  const lang = () => (window.__atriboLang === 'en' ? 'en' : 'pt');

  const initials = (name) => name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

  const render = () => {
    const root = document.getElementById('memberRoot');
    if (!root) return;
    const params = new URLSearchParams(location.search);
    const slug = params.get('membro');
    const member = members.find(m => m.slug === slug) || members[0];
    if (!member) return;
    const l = lang();
    document.title = member.name + ' — A Tribo';

    const photoHTML = member.photo
      ? `<img src="${member.photo}" alt="${member.name}, ${member.role[l]} da A Tribo">`
      : `<span>${initials(member.name)}</span>`;

    root.innerHTML = `
      <a href="formacao.html" class="post-back">← ${l === 'en' ? 'Back to the band' : 'Voltar à Formação'}</a>
      <div class="member-profile-grid">
        <div class="member-profile-photo${member.photo ? '' : ' member-profile-photo-placeholder'}">${photoHTML}</div>
        <div class="member-profile-info">
          <p class="member-profile-role">${member.role[l]}</p>
          <h1 class="member-profile-name">${member.name}</h1>
          <div class="member-profile-bio">${member.bio[l].map(p => `<p>${p}</p>`).join('')}</div>
          ${member.credit ? `<p class="member-credit">${member.credit}</p>` : ''}
        </div>
      </div>
    `;
  };

  document.addEventListener('partials:ready', render);
  document.addEventListener('lang:changed', render);
})();
