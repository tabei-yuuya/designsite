import { nav, sns } from './data.mjs';
import { SITE_URL, SITE_NAME } from './site.mjs';

const abs = href => `${SITE_URL}/${href === './' ? '' : href}`;

// テンプレート内で値をエスケープする
export const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const dot = '<span class="dot" aria-hidden="true"></span>';
export const logo = `yuyadesign${dot}`;

// 見出しブロック。link を渡すと PC で右端にリンクを置く
export const secHead = (eyebrow, title, { link } = {}) => {
  const head = `<div class="sec-head">
      <span class="eyebrow">( ${eyebrow} )</span>
      <h2 class="h2">${title}</h2>
    </div>`;
  return link
    ? `<div class="sec-head-row">
    ${head}
    <a class="text-link pc-only" href="${link[1]}">${link[0]}</a>
  </div>`
    : head;
};

const header = (current, overlay) => `
<a class="skip-link" href="#main">本文へスキップ</a>
<header class="site-header${overlay ? ' site-header--overlay' : ''}">
  <a class="logo" href="./">${logo}</a>
  <nav class="gnav" aria-label="メインメニュー">
${nav.map(m => `    <a href="${m.href}"${m.key === current ? ' aria-current="page"' : ''}>${m.en}</a>`).join('\n')}
  </nav>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="メニューを開く" data-menu-open>
    <span class="menu-btn__line"></span><span class="menu-btn__line"></span>
  </button>
</header>
<div class="menu" id="site-menu" role="dialog" aria-modal="true" aria-label="メニュー" hidden>
  <div class="site-header">
    <span class="logo">${logo}</span>
    <button class="menu-btn menu-btn--close" type="button" aria-expanded="true" aria-controls="site-menu" aria-label="メニューを閉じる" data-menu-close>
      <span class="menu-btn__line"></span><span class="menu-btn__line"></span>
    </button>
  </div>
  <nav class="menu__nav" aria-label="メニュー">
${nav.map(m => `    <a class="menu__item" href="${m.href}"${m.key === current ? ' aria-current="page"' : ''}><span class="menu__en">${m.en}</span><span class="menu__ja">${m.ja}</span></a>`).join('\n')}
  </nav>
  <div class="menu__foot">
    <a class="btn btn--en" href="contact.html">CONTACT<span aria-hidden="true">→</span></a>
    <div class="menu__sns">${sns.map(s => `<a href="${s.href}" target="_blank" rel="noopener">${s.short} ↗</a>`).join('')}</div>
  </div>
</div>`;

export const pageHero = ({ en, ja, crumbs, lead }) => `
  <section class="page-hero">
    ${breadcrumb(crumbs)}
    <div class="page-hero__body">
      <div class="page-hero__en" aria-hidden="true">${en}</div>
      <div class="page-hero__row">
        <h1 class="page-hero__ja">${ja}</h1>
        <p class="page-hero__lead">${lead}</p>
      </div>
    </div>
  </section>`;

// crumbs: [['HOME','./'], ['SERVICES','services.html'], ['ブランディング']]
export const breadcrumb = crumbs => `<nav class="crumb" aria-label="パンくずリスト"><ol>${crumbs.map(([label, href], i) =>
  `<li>${href ? `<a href="${href}">${label}</a>` : `<span${i === crumbs.length - 1 ? ' aria-current="page"' : ''}>${label}</span>`}</li>`).join('')}</ol></nav>${SITE_URL ? `
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, ...(href ? { item: abs(href) } : {}) }))
    })}</script>` : ''}`;

const footer = ({ cta = true } = {}) => `
${cta ? `<section class="cta" aria-labelledby="cta-title">
  <div class="cta__main">
    <span class="eyebrow">( Contact )</span>
    <h2 class="cta__title" id="cta-title">お問い合わせは<br class="sp-only">こちら</h2>
    <p class="cta__lead">デザインのご依頼、お見積もり、ちょっとしたご相談まで、お気軽にお問い合わせください。</p>
  </div>
  <div class="cta__action">
    <div class="status">${dot}デザイン依頼 受付中</div>
    <a class="btn btn--en btn--lg" href="contact.html">CONTACT<span aria-hidden="true">→</span></a>
  </div>
</section>` : ''}
<footer class="site-footer">
  <div class="site-footer__top">
    <div class="site-footer__brand">
      <a class="logo" href="./">${logo}</a>
      <p class="site-footer__copy">デザインで、<br>伝わるを変える。</p>
    </div>
    <div class="site-footer__cols">
      <nav class="site-footer__nav site-footer__nav--menu" aria-label="フッターメニュー">
        <span class="site-footer__label">( Menu )</span>
${nav.map(m => `        <a href="${m.href}">${m.en}</a>`).join('\n')}
      </nav>
      <nav class="site-footer__nav" aria-label="SNS">
        <span class="site-footer__label">( Follow )</span>
${sns.map(s => `        <a href="${s.href}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('\n')}
        <span class="site-footer__label site-footer__label--company pc-only">( Company )</span>
        <span class="site-footer__org">運営：yuyadesign</span>
      </nav>
    </div>
  </div>
  <div class="site-footer__bottom">
    <div class="site-footer__legal"><a href="privacy.html">プライバシーポリシー</a><a href="#">特定商取引法に基づく表示</a></div>
    <small>© yuyadesign</small>
  </div>
</footer>`;

export const layout = ({ file, title, description, current, body, cta = true, scripts = [], overlayHeader = false, type = 'website', noindex = false, base }) => {
  const fullTitle = title ? `${title}｜${SITE_NAME}` : `${SITE_NAME}｜デザインで、伝わるを変える。`;
  const url = file === 'index.html' ? abs('./') : abs(file);
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${base ? `<base href="${base}">\n` : ''}<title>${fullTitle}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}${SITE_URL && !noindex ? `<link rel="canonical" href="${url}">\n` : ''}<meta name="theme-color" content="#0F1012">
<link rel="icon" href="favicon.png" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:locale" content="ja_JP">
${SITE_URL ? `<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs('assets/img/ogp.png')}">
` : ''}<meta name="twitter:card" content="summary_large_image">
${SITE_URL && file === 'index.html' ? `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Organization', name: SITE_NAME, url: abs('./'), logo: abs('assets/img/icon-192.png')
})}</script>
` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@700&amp;family=Geist:wght@300;400&amp;family=Noto+Sans+JP:wght@400;700&amp;family=Shippori+Mincho:wght@400&amp;display=swap">
<link rel="stylesheet" href="assets/css/style.css">
<script src="assets/js/main.js" defer></script>
${scripts.map(s => `<script src="${s}" defer></script>`).join('\n')}
</head>
<body>
${header(current, overlayHeader)}
<main id="main">
${body}
</main>
${footer({ cta })}
</body>
</html>
`;
};
