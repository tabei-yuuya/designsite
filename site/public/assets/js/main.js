// 全ページ共通: ハンバーガーメニュー、SERVICES のセクションタブ、リンクのコピー
(() => {
  const menu = document.getElementById('site-menu');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = menu && menu.querySelector('[data-menu-close]');
  if (!menu || !openBtn || !closeBtn) return;

  // JS が動くときだけ表示制御を opacity に切り替える
  menu.hidden = false;
  menu.setAttribute('aria-hidden', 'true');
  menu.inert = true;

  const focusables = () => [...menu.querySelectorAll('a[href], button:not([disabled])')];

  const open = () => {
    menu.classList.add('is-open');
    menu.removeAttribute('aria-hidden');
    menu.inert = false;
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
    closeBtn.focus();
  };
  const close = ({ restoreFocus = true } = {}) => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.inert = true;
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
    if (restoreFocus) openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', () => close());
  menu.querySelectorAll('a[href]').forEach(a => a.addEventListener('click', () => close({ restoreFocus: false })));

  document.addEventListener('keydown', e => {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    // フォーカスをメニュー内に閉じ込める
    const items = focusables();
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();

(() => {
  // SERVICES: 表示中のセクションに合わせてタブの下線を移す
  const nav = document.querySelector('[data-section-tabs]');
  if (!nav || !('IntersectionObserver' in window)) return;
  const tabs = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = tabs.map(t => document.querySelector(t.getAttribute('href'))).filter(Boolean);
  const setActive = id => tabs.forEach(t => {
    const on = t.getAttribute('href') === `#${id}`;
    t.classList.toggle('is-active', on);
    if (on) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));
})();

(() => {
  // BLOG記事: リンクをコピー
  document.querySelectorAll('[data-copy-link]').forEach(btn => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        btn.textContent = 'コピーしました';
      } catch {
        btn.textContent = 'コピーできませんでした';
      }
      setTimeout(() => { btn.textContent = label; }, 2000);
    });
  });
})();
