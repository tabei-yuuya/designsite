// BLOG一覧: カテゴリ切り替え（先頭の記事だけ大きく、残りは最大6件）
(() => {
  const dataEl = document.getElementById('blog-data');
  const featuredEl = document.querySelector('[data-featured]');
  const restEl = document.querySelector('[data-rest]');
  const emptyEl = document.querySelector('[data-empty]');
  const tabs = [...document.querySelectorAll('[role="tab"][data-cat]')];
  if (!dataEl || !featuredEl || !restEl || !emptyEl || !tabs.length) return;

  const posts = JSON.parse(dataEl.textContent);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const meta = p => `<div class="meta"><span>${esc(p.cat)}</span><time class="en" datetime="${p.date.replace(/\./g, '-')}">${esc(p.date)}</time></div>`;

  // src/pages.mjs の postFeatured / postCard と同じマークアップ
  const featured = p => `
      <a class="post-featured" href="${esc(p.href)}">
        <div class="ph" aria-hidden="true">eyecatch</div>
        <div class="post-featured__text">
          ${meta(p).replace('class="meta"', 'class="meta sp-only"')}
          <span class="post-featured__label pc-only">FEATURED — ${esc(p.date)}</span>
          <span class="post-featured__cat pc-only">${esc(p.cat)}</span>
          <h2 class="post-featured__title">${esc(p.title)}</h2>
          ${p.excerpt ? `<p class="post-featured__excerpt pc-only">${esc(p.excerpt)}</p>` : ''}
          <span class="text-link pc-only">記事を読む →</span>
        </div>
      </a>`;
  const card = p => `
        <a class="post-card" href="${esc(p.href)}">
          <div class="ph" aria-hidden="true"><span class="pc-only">eyecatch</span></div>
          <div class="post-card__text">
            ${meta(p)}
            <h3 class="post-card__title">${esc(p.title)}</h3>
          </div>
        </a>`;

  const render = cat => {
    const list = cat === 'すべて' ? posts : posts.filter(p => p.cat === cat);
    featuredEl.innerHTML = list[0] ? featured(list[0]) : '';
    restEl.innerHTML = list.slice(1, 7).map(card).join('');
    emptyEl.hidden = list.length > 0;
  };

  const select = tab => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    render(tab.dataset.cat);
  };

  tabs.forEach((tab, i) => {
    tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', e => {
      const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      const next = tabs[(i + dir + tabs.length) % tabs.length];
      next.focus();
      select(next);
    });
  });
})();
