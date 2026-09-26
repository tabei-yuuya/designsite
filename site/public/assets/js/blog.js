// BLOG一覧: カテゴリ切り替え（先頭の記事だけ大きく、残りは最大6件を行で表示）
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

  const featured = p => `
      <a class="post-featured" href="${esc(p.href)}">
        <div class="ph" aria-hidden="true">eyecatch</div>
        ${meta(p)}
        <h2 class="post-featured__title">${esc(p.title)}</h2>
      </a>`;
  const row = p => `
        <a class="post-row" href="${esc(p.href)}">
          <div class="ph" aria-hidden="true"></div>
          <div class="post-row__text">
            ${meta(p)}
            <span class="post-row__title">${esc(p.title)}</span>
          </div>
        </a>`;

  const render = cat => {
    const list = cat === 'すべて' ? posts : posts.filter(p => p.cat === cat);
    featuredEl.innerHTML = list[0] ? featured(list[0]) : '';
    restEl.innerHTML = list.slice(1, 7).map(row).join('');
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
