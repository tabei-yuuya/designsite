import * as d from './data.mjs';
import { layout, pageHero, breadcrumb, secHead, dot, esc } from './layout.mjs';

const svcCard = (s, { big = true } = {}) => `
      <a class="svc-card" href="${s.href}">
        <div class="ph" aria-hidden="true">service image</div>
        <span class="svc-card__label">${dot}${s.no} — ${s.en}</span>
        <h3 class="svc-card__title${big ? '' : ' svc-card__title--sm'}">${s.ja}</h3>
        <p class="svc-card__body">${s.body}</p>
${big ? '        <span class="svc-card__more text-link">詳しく見る →</span>\n' : ''}      </a>`;

export const postRow = p => `
        <a class="post-row" href="${p.href}">
          <div class="ph" aria-hidden="true"></div>
          <div class="post-row__text">
            <div class="meta"><span>${p.cat}</span><time class="en" datetime="${p.date.replace(/\./g, '-')}">${p.date}</time></div>
            <span class="post-row__title">${p.title}</span>
          </div>
        </a>`;

export const postFeatured = p => `
      <a class="post-featured" href="${p.href}">
        <div class="ph" aria-hidden="true">eyecatch</div>
        <div class="meta"><span>${p.cat}</span><time class="en" datetime="${p.date.replace(/\./g, '-')}">${p.date}</time></div>
        <h2 class="post-featured__title">${p.title}</h2>
      </a>`;

/* ---------- 4a ABOUT ---------- */
const about = () => layout({
  title: 'ABOUT 私たちについて',
  description: 'yuyadesignは、ブランドやサービスの本質を整理し、届けたい人に届く形へと翻訳するデザイン会社です。',
  current: 'about',
  body: `${pageHero({
    en: 'About', ja: '私たちについて', crumbs: [['HOME', 'index.html'], ['ABOUT']],
    lead: '見た目を整えるだけではなく、届けたい人に届く形をつくる。私たちは、ビジネスの課題に向き合うデザインパートナーです。'
  })}
  <div class="about-photo"><div class="ph ph--stripe" aria-hidden="true">about photo</div></div>
  <section class="section" aria-labelledby="mission-title">
    <span class="eyebrow">( Mission ) — 01 // 03</span>
    <h2 class="mission-title" id="mission-title">伝わるを、<br>変える。</h2>
    <div class="prose">
      <p>良いものをつくっているのに、伝わらない。多くの企業が抱えるこの課題は、見た目の問題ではなく「誰に・何を・どう届けるか」という設計の問題だと、私たちは考えています。</p>
      <p>yuyadesignは、ブランドやサービスの本質を整理し、届けたい人に届く形へと翻訳するデザイン会社です。戦略の整理からWebサイト、グラフィック、公開後の改善まで一貫して伴走します。</p>
      <p>目指すのは、つくって終わりではなく成果につながるデザイン。ビジネスの課題に向き合うパートナーとして、伝わるを変えていきます。</p>
    </div>
  </section>
  <section class="section section--light section--gap-40 on-light">
    <div class="sec-head">
      <span class="eyebrow">( Values ) — 02 // 03</span>
      <h2 class="h2">大切にしていること</h2>
    </div>
${d.strengths.map(st => `    <div class="value">
      <div class="value__top"><span class="value__key">${st.key}</span><span class="eyebrow">${st.no}</span></div>
      <h3 class="value__title">${st.ja}</h3>
      <p class="value__body">${st.body}</p>
    </div>`).join('\n')}
  </section>
  <section class="section">
    <div class="sec-head">
      <span class="eyebrow">( Company ) — 03 // 03</span>
      <h2 class="h2">会社概要</h2>
    </div>
    <dl class="company rule-list">
${d.company.map(c => `      <div><dt>${c.k}</dt><dd>${c.v}</dd></div>`).join('\n')}
    </dl>
  </section>`
});

/* ---------- 4b SERVICES ---------- */
const services = () => layout({
  title: 'SERVICES サービス',
  description: '企業様・個人のお客様それぞれの課題に合わせて、戦略から制作、公開後の改善までご提供します。',
  current: 'services',
  body: `${pageHero({
    en: 'Services', ja: 'サービス', crumbs: [['HOME', 'index.html'], ['SERVICES']],
    lead: '企業様・個人のお客様それぞれの課題に合わせて、戦略から制作、公開後の改善までご提供します。'
  })}
  <nav class="tabs" aria-label="サービスの種類" data-section-tabs>
    <a class="tab is-active" href="#companies" aria-current="true">企業様向け</a>
    <a class="tab" href="#individuals">個人のお客様向け</a>
  </nav>
  <section class="section section--alt section--gap-48" id="companies">
    ${secHead('For Companies', '企業様向けサービス')}
${d.services.map(s => svcCard(s)).join('\n')}
  </section>
  <section class="section section--gap-48 section--pb-64" id="individuals">
    ${secHead('For Individuals', '個人のお客様向けサービス')}
${d.personal.map(s => svcCard(s, { big: false })).join('\n')}
  </section>
  <section class="section section--light on-light">
    ${secHead('Flow', '制作の流れ')}
    <ol class="rule-list plain-list">
${d.steps.map(st => `      <li class="step"><span class="step__no">${st.no}</span><div class="stack-4"><span class="t-15b">${st.title}</span><span class="t-13">${st.body}</span></div></li>`).join('\n')}
    </ol>
  </section>`
});

/* ---------- 4c サービス詳細 ---------- */
const serviceBranding = () => layout({
  title: 'ブランディング｜SERVICES',
  description: '理念や強みを言語化し、ロゴ・トーン・ガイドラインまで一貫したブランドの形をつくります。',
  current: 'services',
  body: `${pageHero({
    en: 'Branding', ja: 'ブランディング', crumbs: [['HOME', 'index.html'], ['SERVICES', 'services.html'], ['ブランディング']],
    lead: '理念や強みを言語化し、ロゴ・トーン・ガイドラインまで一貫したブランドの形をつくります。'
  })}
  <div class="main-visual"><div class="ph ph--stripe ph--4x3" aria-hidden="true">main visual</div></div>
  <section class="section section--gap-24 overview">
    <span class="eyebrow">( Overview )</span>
    <h2 class="overview-title">“らしさ”を、<br>伝わる形に。</h2>
    <p class="body-15">ブランドは、ロゴや色だけで成り立つものではありません。企業の考え方や強み、お客様との約束が、あらゆる接点で一貫して伝わってはじめて形になります。</p>
    <p class="body-15">ヒアリングとワークショップで本質を整理し、言葉とビジュアルの両面からブランドを設計。社内外で使い続けられるガイドラインまでご用意します。</p>
  </section>
  <section class="section section--light on-light">
    ${secHead('Issues', 'こんな課題に')}
    <ul class="rule-list plain-list">
${d.issues.map(is => `      <li class="issue"><span class="issue__no">${is.no}</span><span>${is.text}</span></li>`).join('\n')}
    </ul>
  </section>
  <section class="section section--pb-64">
    ${secHead('Scope', '提供内容')}
    <ul class="rule-list plain-list">
${d.scope.map(sc => `      <li class="scope-item stack-4"><span class="t-15b">${sc.title}</span><span class="t-13 muted">${sc.body}</span></li>`).join('\n')}
    </ul>
  </section>
  <section class="section section--price">
    ${secHead('Price', '料金の目安')}
    <div>
${d.prices.map(pr => `      <div class="price">
        <div class="price__top"><span class="t-15b">${pr.plan}</span><span class="price__num">${pr.price}<span class="price__unit">万円〜</span></span></div>
        <span class="t-13 muted">${pr.note}</span>
      </div>`).join('\n')}
      <p class="price__note">※ 金額は税別の目安です。内容に応じて個別にお見積もりします。</p>
    </div>
  </section>
  <section class="section section--alt">
    ${secHead('Other Services', 'そのほかのサービス')}
    <div class="rule-list">
${d.services.slice(1).map(s => `      <a class="other-svc" href="${s.href}"><div class="other-svc__text"><span class="other-svc__label">${s.no} — ${s.en}</span><span class="other-svc__title">${s.ja}</span></div><span class="arrow" aria-hidden="true">→</span></a>`).join('\n')}
    </div>
  </section>`
});

/* ---------- 4d BLOG一覧 ---------- */
const blog = () => {
  const [first, ...rest] = d.posts;
  return layout({
    title: 'BLOG ブログ',
    description: '制作の裏側や、伝わるデザインの考え方、プロジェクトの事例を発信しています。',
    current: 'blog',
    scripts: ['assets/js/blog.js'],
    body: `${pageHero({
      en: 'Blog', ja: 'ブログ', crumbs: [['HOME', 'index.html'], ['BLOG']],
      lead: '制作の裏側や、伝わるデザインの考え方、プロジェクトの事例を発信しています。'
    })}
  <div class="tabs" role="tablist" aria-label="カテゴリ">
${d.blogCats.map((c, i) => `    <button class="tab" type="button" role="tab" aria-selected="${i === 0}" aria-controls="blog-list" data-cat="${c}">${c}</button>`).join('\n')}
  </div>
  <section class="blog-list" id="blog-list" role="tabpanel" aria-label="記事一覧">
    <div data-featured>${postFeatured(first)}
    </div>
    <div data-rest>${rest.slice(0, 6).map(postRow).join('')}
    </div>
    <p class="blog-empty" data-empty hidden>このカテゴリの記事はまだありません。</p>
    <nav class="pager" aria-label="ページ送り">
      <a href="blog.html" aria-current="page">1</a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a class="pager__next" href="#" aria-label="次のページ">→</a>
    </nav>
  </section>
  <script type="application/json" id="blog-data">${JSON.stringify(d.posts).replace(/</g, '\\u003c')}</script>`
  });
};

/* ---------- 4e BLOG記事詳細 ---------- */
const blogPost = () => {
  const toc = [
    ['01', '見た目の前に、目的を決める'],
    ['02', '届けたい相手をひとりに絞る'],
    ['03', '伝わったかどうかを確かめる']
  ];
  const h = ([no, t]) => `<h2 id="sec-${no}"><span class="no">${no}</span>${t}</h2>`;
  const title = '「整える」と「伝わる」のあいだにあるもの。デザインを始める前に考えていること';
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`;
  return layout({
    title,
    description: 'デザインの相談を受けたとき、私たちが最初に手を動かすのは画面の上ではありません。',
    current: 'blog',
    body: `
  <section class="post-head">
    ${breadcrumb([['HOME', 'index.html'], ['BLOG', 'blog.html'], ['デザイン']])}
    <div class="meta"><span>デザイン</span><time class="en" datetime="2026-09-12">2026.09.12</time></div>
    <h1 class="post-title">${title}</h1>
  </section>
  <div class="post-eyecatch"><div class="ph ph--stripe" aria-hidden="true">eyecatch</div></div>
  <article class="article">
    <p class="article__lead">デザインの相談を受けたとき、私たちが最初に手を動かすのは画面の上ではありません。まずは、誰に何を届けたいのかを言葉にするところから始めます。</p>
    <nav class="toc" aria-labelledby="toc-label">
      <span class="eyebrow" id="toc-label">( Contents )</span>
      <ol>
${toc.map(([no, t]) => `        <li><a href="#sec-${no}"><span>${no}　${t}</span><span aria-hidden="true">↓</span></a></li>`).join('\n')}
      </ol>
    </nav>
    ${h(toc[0])}
    <p>「かっこよくしたい」「今っぽくしたい」というご要望の奥には、たいてい別の目的があります。問い合わせを増やしたい、採用で選ばれたい、価格ではなく価値で比べてほしい。その目的が決まってはじめて、デザインの良し悪しを判断する基準ができます。</p>
    <p>目的が曖昧なまま進めると、完成したものが「きれいだけど成果が出ない」状態になりがちです。だからこそ最初の打ち合わせでは、見た目の話よりも事業の話を多くお聞きしています。</p>
    ${h(toc[1])}
    <p>「すべての人に届けたい」と考えるほど、メッセージはぼやけていきます。私たちは、いちばん届けたい相手をひとり思い浮かべ、その人が何に悩み、どんな言葉なら動くのかを一緒に考えます。</p>
    <figure>
      <div class="ph" role="img" aria-label="ターゲット像を付箋で書き出したホワイトボード">article image</div>
      <figcaption>ヒアリングでは、ターゲット像を付箋で書き出しながら整理します。</figcaption>
    </figure>
    ${h(toc[2])}
    <p>公開はゴールではなくスタートです。問い合わせの数や内容、ページの読まれ方を見ながら、伝わっているかを確かめ、必要があれば言葉やデザインを見直します。</p>
    <p>デザインで伝わるを変えるために。私たちはこれからも、見た目の手前にある問いから始めていきます。</p>
    <div class="article__foot">
      <ul class="tags meta" aria-label="タグ"><li># デザイン</li><li># ブランディング</li></ul>
      <a class="btn btn--en" href="${esc(shareUrl)}" target="_blank" rel="noopener">Share on X<span aria-hidden="true">↗</span></a>
    </div>
  </article>
  <nav class="post-nav" aria-label="前後の記事">
    <a href="${d.posts[1].href}" rel="prev"><span class="post-nav__label">← PREV</span><span class="post-nav__title">${d.posts[1].title}</span></a>
    <a class="post-nav__next" href="${d.posts[2].href}" rel="next"><span class="post-nav__label">NEXT →</span><span class="post-nav__title">${d.posts[2].title}</span></a>
  </nav>
  <section class="section section--gap-24">
    ${secHead('Related', '関連記事')}
    <div>${d.posts.slice(1, 4).map(postRow).join('')}
    </div>
  </section>`
  });
};

/* ---------- 4f CONTACT ---------- */
const field = ({ id, label, type = 'text', placeholder, required, autocomplete, textarea }) => {
  const attrs = `id="f-${id}" name="${id}" class="input" placeholder="${placeholder}"${autocomplete ? ` autocomplete="${autocomplete}"` : ''}${required ? ` required aria-describedby="err-${id}"` : ''}`;
  return `
      <div class="field">
        <label class="field__label" for="f-${id}">${label}</label>
        ${textarea ? `<textarea ${attrs} rows="3"></textarea>` : `<input type="${type}" ${attrs}>`}${required ? `
        <span class="field__error" id="err-${id}"></span>` : ''}
      </div>`;
};

const contact = () => layout({
  title: 'CONTACT お問い合わせ',
  description: 'デザインのご依頼、お見積もり、ちょっとしたご相談まで、お気軽にお問い合わせください。',
  current: 'contact',
  cta: false,
  scripts: ['assets/js/contact.js'],
  body: `${pageHero({
    en: 'Contact', ja: 'お問い合わせ', crumbs: [['HOME', 'index.html'], ['CONTACT']],
    lead: 'デザインのご依頼、お見積もり、ちょっとしたご相談まで、お気軽にお問い合わせください。'
  })}
  <section class="contact-intro">
    <div class="status">${dot}デザイン依頼 受付中</div>
    <p>いただいたお問い合わせには、2営業日以内に担当者よりご返信します。</p>
  </section>
  <section class="contact-body" aria-label="お問い合わせフォーム">
    <div class="form-done" role="status" tabindex="-1" data-done hidden>
      <span class="status">${dot}SENT</span>
      <p class="form-done__title">送信が完了しました。</p>
      <p class="form-done__body">確認メールをお送りしました。2営業日以内にご返信いたします。</p>
      <button class="btn" type="button" data-reset>フォームに戻る</button>
    </div>
    <form class="form" action="#" method="post" novalidate data-contact-form>
      <div class="field field--group" role="group" aria-labelledby="type-label">
        <span class="field__label" id="type-label">ご依頼の種類</span>
        <input type="hidden" name="type" value="${d.contactTypes[0]}">
        <div class="choices">
${d.contactTypes.map((t, i) => `          <button class="choice" type="button" aria-pressed="${i === 0}" data-type="${t}">${t}</button>`).join('\n')}
        </div>
      </div>${field({ id: 'name', label: 'お名前（必須）', placeholder: '例）山田 太郎', required: true, autocomplete: 'name' })}${field({ id: 'company', label: '会社名', placeholder: '例）株式会社サンプル', autocomplete: 'organization' })}${field({ id: 'email', label: 'メールアドレス（必須）', type: 'email', placeholder: '例）info@example.com', required: true, autocomplete: 'email' })}${field({ id: 'message', label: 'お問い合わせ内容（必須）', placeholder: '例）サイトのリニューアルを検討しています。', required: true, textarea: true })}
      <div class="agree">
        <label class="checkbox">
          <input type="checkbox" name="agree" id="f-agree" required aria-describedby="err-agree">
          <span><a class="inline-link" href="privacy.html">プライバシーポリシー</a>に同意する（必須）</span>
        </label>
        <span class="field__error" id="err-agree"></span>
      </div>
      <button class="btn" type="submit"><span data-submit-label>送信する</span><span aria-hidden="true">→</span></button>
    </form>
  </section>
  <section class="section section--light on-light">
    ${secHead('FAQ', 'よくあるご質問')}
    <div class="rule-list" data-faq>
${d.faqs.map((q, i) => {
    const no = String(i + 1).padStart(2, '0');
    const open = i === 0;
    return `      <div>
        <h3 class="faq__h"><button class="faq__q" type="button" aria-expanded="${open}" aria-controls="faq-a-${no}" id="faq-q-${no}"><span class="faq__no">Q.${no}</span><span>${q.q}</span><span class="faq__icon" aria-hidden="true">${open ? '−' : '+'}</span></button></h3>
        <p class="faq__a" id="faq-a-${no}" role="region" aria-labelledby="faq-q-${no}"${open ? '' : ' hidden'}>${q.a}</p>
      </div>`;
  }).join('\n')}
    </div>
  </section>`
});

/* ---------- 4g プライバシーポリシー ---------- */
const privacy = () => layout({
  title: 'プライバシーポリシー',
  description: 'yuyadesignの個人情報の取り扱いについて。',
  current: 'privacy',
  body: `${pageHero({
    en: 'Privacy', ja: 'プライバシーポリシー', crumbs: [['HOME', 'index.html'], ['PRIVACY POLICY']],
    lead: 'yuyadesign（以下「当社」）は、お客様の個人情報を以下の方針に基づき適切に取り扱います。'
  })}
  <section class="policy">
${d.policy.map(pl => `    <div class="policy__item">
      <h2 class="policy__title"><span class="policy__no">${pl.no}</span>${pl.title}</h2>
      <p class="policy__body">${pl.body}</p>
    </div>`).join('\n')}
  </section>`
});

export const pages = {
  'about.html': about,
  'services.html': services,
  'service-branding.html': serviceBranding,
  'blog.html': blog,
  'blog-post.html': blogPost,
  'contact.html': contact,
  'privacy.html': privacy
};
