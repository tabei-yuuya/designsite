import * as d from './data.mjs';
import { layout, pageHero, breadcrumb, secHead, dot, esc } from './layout.mjs';

const datetime = date => date.replace(/\./g, '-');

// 企業様向けサービス。スマホは縦積み、PC は「番号｜本文｜画像」の横並び
const svcRow = s => `
    <a class="svc-row" href="${s.href}">
      <div class="ph svc-row__img" aria-hidden="true">service image</div>
      <span class="svc-row__no">${dot}${s.no}<span class="sp-only">&nbsp;— ${s.en}</span></span>
      <div class="svc-row__text">
        <span class="svc-row__en pc-only">${s.en}</span>
        <h3 class="svc-row__title">${s.ja}</h3>
        <p class="svc-row__body">${s.body}</p>
        <span class="svc-row__more text-link">詳しく見る →</span>
      </div>
    </a>`;

// 個人のお客様向けサービス。PC は 2 列で、各カードが「画像｜本文」
const svcCard = s => `
      <a class="svc-card" href="${s.href}">
        <div class="ph" aria-hidden="true">service image</div>
        <div class="svc-card__text">
          <span class="label">${dot}${s.no} — ${s.en}</span>
          <h3 class="svc-card__title">${s.ja}</h3>
          <p class="svc-card__body">${s.body}</p>
          <span class="svc-card__more text-link pc-only">詳しく見る →</span>
        </div>
      </a>`;

// 記事カード。スマホは小さい画像＋文字の行、PC は 3 列のカード
// ※ assets/js/blog.js にも同じマークアップがある
export const postCard = p => `
        <a class="post-card" href="${p.href}">
          <div class="ph" aria-hidden="true"><span class="pc-only">eyecatch</span></div>
          <div class="post-card__text">
            <div class="meta"><span>${p.cat}</span><time class="en" datetime="${datetime(p.date)}">${p.date}</time></div>
            <h3 class="post-card__title">${p.title}</h3>
          </div>
        </a>`;

export const postFeatured = p => `
      <a class="post-featured" href="${p.href}">
        <div class="ph" aria-hidden="true">eyecatch</div>
        <div class="post-featured__text">
          <div class="meta sp-only"><span>${p.cat}</span><time class="en" datetime="${datetime(p.date)}">${p.date}</time></div>
          <span class="post-featured__label pc-only">FEATURED — ${p.date}</span>
          <span class="post-featured__cat pc-only">${p.cat}</span>
          <h2 class="post-featured__title">${p.title}</h2>
          ${p.excerpt ? `<p class="post-featured__excerpt pc-only">${p.excerpt}</p>` : ''}
          <span class="text-link pc-only">記事を読む →</span>
        </div>
      </a>`;

/* ---------- ABOUT ---------- */
const about = file => layout({
  file,
  title: 'ABOUT 私たちについて',
  description: 'yuyadesignは、ブランドやサービスの本質を整理し、届けたい人に届く形へと翻訳するデザイン会社です。',
  current: 'about',
  body: `${pageHero({
    en: 'About', ja: '私たちについて', crumbs: [['HOME', './'], ['ABOUT']],
    lead: '見た目を整えるだけではなく、届けたい人に届く形をつくる。私たちは、ビジネスの課題に向き合うデザインパートナーです。'
  })}
  <div class="about-photo"><div class="ph ph--stripe" aria-hidden="true">about photo</div></div>
  <section class="section split section--pc-128" aria-labelledby="mission-title">
    <div class="split__head sec-head sec-head--32">
      <span class="eyebrow">( Mission ) — 01 // 03</span>
      <h2 class="mission-title" id="mission-title">伝わるを、<br>変える。</h2>
    </div>
    <div class="split__body prose">
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
    <div class="values">
${d.strengths.map(st => `      <div class="value">
        <div class="value__top"><span class="value__key">${st.key}</span><span class="eyebrow">${st.no}</span></div>
        <h3 class="value__title">${st.ja}</h3>
        <p class="value__body">${st.body}</p>
      </div>`).join('\n')}
    </div>
  </section>
  <section class="section split section--pc-128">
    <div class="split__head sec-head">
      <span class="eyebrow">( Company ) — 03 // 03</span>
      <h2 class="h2">会社概要</h2>
    </div>
    <dl class="split__body company rule-list">
${d.company.map(c => `      <div><dt>${c.k}</dt><dd>${c.v}</dd></div>`).join('\n')}
    </dl>
  </section>`
});

/* ---------- SERVICES ---------- */
const services = file => layout({
  file,
  title: 'SERVICES サービス',
  description: '企業様・個人のお客様それぞれの課題に合わせて、戦略から制作、公開後の改善までご提供します。',
  current: 'services',
  body: `${pageHero({
    en: 'Services', ja: 'サービス', crumbs: [['HOME', './'], ['SERVICES']],
    lead: '企業様・個人のお客様それぞれの課題に合わせて、戦略から制作、公開後の改善までご提供します。'
  })}
  <nav class="tabs" aria-label="サービスの種類" data-section-tabs>
    <a class="tab is-active" href="#companies" aria-current="true">企業様向け</a>
    <a class="tab" href="#individuals">個人のお客様向け</a>
  </nav>
  <section class="section section--alt section--gap-48" id="companies">
    ${secHead('For Companies', '企業様向けサービス')}
    <div class="svc-rows">${d.services.map(svcRow).join('')}
    </div>
  </section>
  <section class="section section--gap-48 section--pb-64" id="individuals">
    ${secHead('For Individuals', '個人のお客様向けサービス')}
    <div class="svc-cards">${d.personal.map(svcCard).join('')}
    </div>
  </section>
  <section class="section section--light on-light">
    ${secHead('Flow', '制作の流れ')}
    <ol class="steps rule-list plain-list">
${d.steps.map(st => `      <li class="step"><span class="step__no">${st.no}</span><div class="step__text"><h3 class="step__title">${st.title}</h3><p class="step__body">${st.body}</p></div></li>`).join('\n')}
    </ol>
  </section>`
});

/* ---------- サービス詳細 ---------- */
const serviceBranding = file => layout({
  file,
  title: 'ブランディング｜SERVICES',
  description: '理念や強みを言語化し、ロゴ・トーン・ガイドラインまで一貫したブランドの形をつくります。',
  current: 'services',
  body: `${pageHero({
    en: 'Branding', ja: 'ブランディング', crumbs: [['HOME', './'], ['SERVICES', 'services.html'], ['ブランディング']],
    lead: '理念や強みを言語化し、ロゴ・トーン・ガイドラインまで一貫したブランドの形をつくります。'
  })}
  <div class="main-visual"><div class="ph ph--stripe ph--wide" aria-hidden="true">main visual</div></div>
  <section class="section split section--gap-24 section--pc-128">
    <div class="split__head sec-head sec-head--24">
      <span class="eyebrow">( Overview )</span>
      <h2 class="overview-title">“らしさ”を、<br>伝わる形に。</h2>
    </div>
    <div class="split__body prose overview-body">
      <p>ブランドは、ロゴや色だけで成り立つものではありません。企業の考え方や強み、お客様との約束が、あらゆる接点で一貫して伝わってはじめて形になります。</p>
      <p>ヒアリングとワークショップで本質を整理し、言葉とビジュアルの両面からブランドを設計。社内外で使い続けられるガイドラインまでご用意します。</p>
    </div>
  </section>
  <section class="section split section--light on-light">
    <div class="split__head">${secHead('Issues', 'こんな課題に')}</div>
    <ul class="split__body rule-list plain-list">
${d.issues.map(is => `      <li class="issue"><span class="issue__no">${is.no}</span><span>${is.text}</span></li>`).join('\n')}
    </ul>
  </section>
  <section class="section split section--pb-64 section--pc-128">
    <div class="split__head">${secHead('Scope', '提供内容')}</div>
    <ul class="split__body scope rule-list plain-list">
${d.scope.map(sc => `      <li class="scope-item"><span class="scope-item__title">${sc.title}</span><span class="scope-item__body">${sc.body}</span></li>`).join('\n')}
    </ul>
  </section>
  <section class="section split section--price">
    <div class="split__head">${secHead('Price', '料金の目安')}</div>
    <div class="split__body">
${d.prices.map(pr => `      <div class="price">
        <span class="price__plan">${pr.plan}</span>
        <span class="price__num">${pr.price}<span class="price__unit">万円〜</span></span>
        <span class="price__detail">${pr.note}</span>
      </div>`).join('\n')}
      <p class="price__note">※ 金額は税別の目安です。内容に応じて個別にお見積もりします。</p>
    </div>
  </section>
  <section class="section section--alt">
    ${secHead('Other Services', 'そのほかのサービス', { link: ['サービス一覧 →', 'services.html'] })}
    <div class="other-svcs rule-list">
${d.services.slice(1).map(s => `      <a class="other-svc" href="${s.href}">
        <div class="ph pc-only" aria-hidden="true">service image</div>
        <div class="other-svc__text"><span class="label">${dot.replace('dot', 'dot pc-only')}${s.no} — ${s.en}</span><h3 class="other-svc__title">${s.ja}</h3></div>
        <span class="arrow sp-only" aria-hidden="true">→</span>
      </a>`).join('\n')}
    </div>
  </section>`
});

/* ---------- BLOG一覧 ---------- */
const blog = file => {
  const [first, ...rest] = d.posts;
  return layout({
    file,
    title: 'BLOG ブログ',
    description: '制作の裏側や、伝わるデザインの考え方、プロジェクトの事例を発信しています。',
    current: 'blog',
    scripts: ['assets/js/blog.js'],
    body: `${pageHero({
      en: 'Blog', ja: 'ブログ', crumbs: [['HOME', './'], ['BLOG']],
      lead: '制作の裏側や、伝わるデザインの考え方、プロジェクトの事例を発信しています。'
    })}
  <div class="tabs" role="tablist" aria-label="カテゴリ">
${d.blogCats.map((c, i) => `    <button class="tab" type="button" role="tab" aria-selected="${i === 0}" aria-controls="blog-list" data-cat="${c}">${c}</button>`).join('\n')}
  </div>
  <section class="blog-list" id="blog-list" role="tabpanel" aria-label="記事一覧">
    <div data-featured>${postFeatured(first)}
    </div>
    <div class="post-cards" data-rest>${rest.slice(0, 6).map(postCard).join('')}
    </div>
    <p class="blog-empty" data-empty hidden>このカテゴリの記事はまだありません。</p>
    <nav class="pager" aria-label="ページ送り">
      <span class="pager__prev pc-only" aria-hidden="true">← PREV</span>
      <div class="pager__nums">
        <a href="blog.html" aria-current="page">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
      </div>
      <a class="pager__next" href="#" aria-label="次のページ"><span class="pc-only">NEXT&nbsp;</span>→</a>
    </nav>
  </section>
  <script type="application/json" id="blog-data">${JSON.stringify(d.posts).replace(/</g, '\\u003c')}</script>`
  });
};

/* ---------- BLOG記事詳細 ---------- */
const blogPost = file => {
  const toc = [
    ['01', '見た目の前に、目的を決める'],
    ['02', '届けたい相手をひとりに絞る'],
    ['03', '伝わったかどうかを確かめる']
  ];
  const h = ([no, t]) => `<h2 id="sec-${no}"><span class="no">${no}</span>${t}</h2>`;
  const title = '「整える」と「伝わる」のあいだにあるもの。デザインを始める前に考えていること';
  const shareUrl = esc(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`);
  return layout({
    file,
    title,
    type: 'article',
    description: 'デザインの相談を受けたとき、私たちが最初に手を動かすのは画面の上ではありません。',
    current: 'blog',
    body: `
  <section class="post-head">
    ${breadcrumb([['HOME', './'], ['BLOG', 'blog.html'], ['デザイン']])}
    <div class="post-head__inner">
      <div class="meta"><span>デザイン</span><time class="en" datetime="2026-09-12">2026.09.12</time></div>
      <h1 class="post-title">${title}</h1>
      <div class="share pc-only">
        <a class="btn btn--en btn--auto" href="${shareUrl}" target="_blank" rel="noopener">Share on X ↗</a>
        <button class="btn btn--auto" type="button" data-copy-link>リンクをコピー</button>
      </div>
    </div>
  </section>
  <div class="post-eyecatch"><div class="ph ph--stripe ph--wide" aria-hidden="true">eyecatch</div></div>
  <article class="article">
    <p class="article__lead">デザインの相談を受けたとき、私たちが最初に手を動かすのは画面の上ではありません。まずは、誰に何を届けたいのかを言葉にするところから始めます。</p>
    <nav class="toc" aria-labelledby="toc-label">
      <span class="eyebrow" id="toc-label">( Contents )</span>
      <ol>
${toc.map(([no, t]) => `        <li><a href="#sec-${no}"><span>${no}　${t}</span><span class="sp-only" aria-hidden="true">↓</span></a></li>`).join('\n')}
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
      <a class="btn btn--en article__share" href="${shareUrl}" target="_blank" rel="noopener">Share on X<span aria-hidden="true">&nbsp;↗</span></a>
    </div>
  </article>
  <nav class="post-nav" aria-label="前後の記事">
    <a href="${d.posts[1].href}" rel="prev"><span class="post-nav__label">← PREV</span><span class="post-nav__title">${d.posts[1].title}</span></a>
    <a class="post-nav__next" href="${d.posts[2].href}" rel="next"><span class="post-nav__label">NEXT →</span><span class="post-nav__title">${d.posts[2].title}</span></a>
  </nav>
  <section class="section section--gap-24 section--pc-128">
    ${secHead('Related', '関連記事', { link: ['ブログ一覧 →', 'blog.html'] })}
    <div class="post-cards">${d.posts.slice(1, 4).map(postCard).join('')}
    </div>
  </section>`
  });
};

/* ---------- CONTACT ---------- */
const field = ({ id, label, type = 'text', placeholder, required, autocomplete, textarea }) => {
  const attrs = `id="f-${id}" name="${id}" class="input" placeholder="${placeholder}"${autocomplete ? ` autocomplete="${autocomplete}"` : ''}${required ? ` required aria-describedby="err-${id}"` : ''}`;
  return `
        <div class="field">
          <label class="field__label" for="f-${id}">${label}</label>
          ${textarea ? `<textarea ${attrs} rows="3"></textarea>` : `<input type="${type}" ${attrs}>`}${required ? `
          <span class="field__error" id="err-${id}"></span>` : ''}
        </div>`;
};

const contact = file => layout({
  file,
  title: 'CONTACT お問い合わせ',
  description: 'デザインのご依頼、お見積もり、ちょっとしたご相談まで、お気軽にお問い合わせください。',
  current: 'contact',
  cta: false,
  scripts: ['assets/js/contact.js'],
  body: `${pageHero({
    en: 'Contact', ja: 'お問い合わせ', crumbs: [['HOME', './'], ['CONTACT']],
    lead: 'デザインのご依頼、お見積もり、ちょっとしたご相談まで、お気軽にお問い合わせください。'
  })}
  <div class="contact">
    <section class="contact-intro" aria-label="ご案内">
      <div class="status">${dot}デザイン依頼 受付中</div>
      <p>いただいたお問い合わせには、2営業日以内に担当者よりご返信します。</p>
      <div class="contact-flow pc-only">
        <span class="eyebrow">( Flow )</span>
        <ol class="rule-list plain-list">
${d.contactFlow.map(f => `          <li><span class="contact-flow__no">${f.no}</span><div class="stack-4"><span class="contact-flow__title">${f.title}</span><span class="t-13 muted">${f.body}</span></div></li>`).join('\n')}
        </ol>
      </div>
    </section>
    <section class="contact-body" aria-label="お問い合わせフォーム">
      <div class="form-done" role="status" tabindex="-1" data-done hidden>
        <span class="status">${dot}SENT</span>
        <p class="form-done__title">送信が完了しました。</p>
        <p class="form-done__body"><span class="pc-only">ご入力いただいたメールアドレス宛に</span>確認メールをお送りしました。2営業日以内にご返信いたします。</p>
        <button class="btn" type="button" data-reset>フォームに戻る</button>
      </div>
      <form class="form" action="#" method="post" novalidate data-contact-form>
        <div class="field field--group" role="group" aria-labelledby="type-label">
          <span class="field__label" id="type-label">ご依頼の種類</span>
          <input type="hidden" name="type" value="${d.contactTypes[0]}">
          <div class="choices">
${d.contactTypes.map((t, i) => `            <button class="choice" type="button" aria-pressed="${i === 0}" data-type="${t}">${t}</button>`).join('\n')}
          </div>
        </div>${field({ id: 'name', label: 'お名前（必須）', placeholder: '例）山田 太郎', required: true, autocomplete: 'name' })}${field({ id: 'company', label: '会社名', placeholder: '例）株式会社サンプル', autocomplete: 'organization' })}${field({ id: 'email', label: 'メールアドレス（必須）', type: 'email', placeholder: '例）info@example.com', required: true, autocomplete: 'email' })}${field({ id: 'message', label: 'お問い合わせ内容（必須）', placeholder: '例）サイトのリニューアルを検討しています。', required: true, textarea: true })}
        <div class="agree">
          <label class="checkbox">
            <input type="checkbox" name="agree" id="f-agree" required aria-describedby="err-agree">
            <span><a class="inline-link" href="privacy.html">プライバシーポリシー</a>に同意する（必須）</span>
          </label>
          <span class="field__error" id="err-agree"></span>
        </div>
        <button class="btn form__submit" type="submit"><span data-submit-label>送信する</span><span aria-hidden="true">→</span></button>
      </form>
    </section>
  </div>
  <section class="section split split--4 section--light on-light">
    <div class="split__head">${secHead('FAQ', 'よくあるご質問')}</div>
    <div class="split__body rule-list" data-faq>
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

/* ---------- プライバシーポリシー ---------- */
const privacy = file => layout({
  file,
  title: 'プライバシーポリシー',
  description: 'yuyadesignの個人情報の取り扱いについて。',
  current: 'privacy',
  body: `${pageHero({
    en: 'Privacy', ja: 'プライバシーポリシー', crumbs: [['HOME', './'], ['PRIVACY POLICY']],
    lead: 'yuyadesign（以下「当社」）は、お客様の個人情報を以下の方針に基づき適切に取り扱います。'
  })}
  <div class="policy">
    <nav class="policy__toc pc-only" aria-labelledby="policy-toc-label">
      <span class="eyebrow" id="policy-toc-label">( Contents )</span>
${d.policy.map(pl => `      <a href="#policy-${pl.no}"><span class="en">${pl.no}</span><span>${pl.title}</span></a>`).join('\n')}
    </nav>
    <div class="policy__list">
${d.policy.map(pl => `      <section class="policy__item" id="policy-${pl.no}">
        <h2 class="policy__title"><span class="policy__no">${pl.no}</span>${pl.title}</h2>
        <p class="policy__body">${pl.body}</p>
      </section>`).join('\n')}
    </div>
  </div>`
});

/* ---------- TOP ---------- */
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';

const top = file => layout({
  file,
  title: '',
  description: '見た目を整えるだけではなく、届けたい人に届く形をつくる。yuyadesignは、ビジネスの課題に向き合うデザインパートナーです。',
  current: 'home',
  overlayHeader: true,
  body: `
  <section class="hero">
    <div class="hero__bg ph--stripe" aria-hidden="true"><span class="hero__ph">hero photo</span></div>
    <div class="hero__content">
      <div class="status">${dot}デザイン依頼 受付中</div>
      <h1 class="hero__title">デザインで、<br>伝わるを<br class="sp-only">変える。</h1>
      <p class="hero__lead">見た目を整えるだけではなく、届けたい人に届く形をつくる。私たちは、ビジネスの課題に向き合うデザインパートナーです。</p>
      <div class="hero__actions">
        <a class="btn btn--glass" href="services.html">サービスを見る<span aria-hidden="true">&nbsp;→</span></a>
        <a class="btn btn--glass" href="contact.html">お問い合わせ<span aria-hidden="true">&nbsp;→</span></a>
      </div>
      <span class="hero__scroll-sp sp-only" aria-hidden="true">Scroll ↓</span>
    </div>
    <div class="hero__scroll pc-only" aria-hidden="true"><span>Scroll</span><span class="hero__circle"></span></div>
  </section>
  <section class="section split section--light section--pc-128 on-light">
    <div class="split__head">${secHead('About', '私たちについて')}</div>
    <div class="split__body top-about">
      <div class="prose">
        <p>良いものをつくっているのに、伝わらない。多くの企業が抱えるこの課題は、見た目の問題ではなく「誰に・何を・どう届けるか」という設計の問題だと、私たちは考えています。</p>
        <p>yuyadesignは、ブランドやサービスの本質を整理し、届けたい人に届く形へと翻訳するデザイン会社です。戦略の整理からWebサイト、グラフィック、公開後の改善まで一貫して伴走します。</p>
        <p>目指すのは、つくって終わりではなく成果につながるデザイン。ビジネスの課題に向き合うパートナーとして、伝わるを変えていきます。</p>
      </div>
      <a class="text-link" href="about.html">私たちについて →</a>
    </div>
  </section>
  <section class="section section--alt section--gap-48">
    ${secHead('For Companies', '企業様向けサービス', { link: ['サービス一覧 →', 'services.html'] })}
    <div class="top-svcs">
${d.services.map(s => `      <a class="top-svc" href="${s.href}">
        <div class="ph" aria-hidden="true">service image</div>
        <span class="label top-svc__label">${dot}${s.no} — ${s.en}</span>
        <div class="top-svc__row"><h3 class="top-svc__title">${s.ja}</h3>${arrow.replace('arrow', 'arrow sp-only')}</div>
        <p class="top-svc__body">${s.body}</p>
        ${arrow.replace('arrow', 'arrow top-svc__arrow pc-only')}
      </a>`).join('\n')}
    </div>
  </section>
  <section class="section">
    <div class="top-personal-head">
      ${secHead('For Individuals', '個人のお客様向けサービス')}
      <p class="top-personal-lead">フリーランスや個人事業主の方にも、企業案件と同じ品質でお応えします。</p>
    </div>
    <div class="svc-cards top-personal">
${d.personal.map(s => `      <a class="svc-card" href="${s.href}">
        <div class="ph" aria-hidden="true">service image</div>
        <div class="svc-card__text">
          <span class="label">${dot}${s.no} — ${s.en}</span>
          <div class="top-svc__row"><h3 class="svc-card__title">${s.ja}</h3>${arrow.replace('arrow', 'arrow sp-only')}</div>
          <p class="svc-card__body">${s.body}</p>
          ${arrow.replace('arrow', 'arrow top-svc__arrow pc-only')}
        </div>
      </a>`).join('\n')}
    </div>
  </section>
  <section class="section section--light on-light">
    <div class="sec-head-row">
      <div class="sec-head">
        <span class="eyebrow">( Blog )</span>
        <h2 class="h2 h2--en">Media</h2>
      </div>
      <a class="text-link pc-only" href="blog.html">ブログ一覧 →</a>
    </div>
    <div class="media rule-list">
${d.media.map(m => `      <a class="media__item" href="${m.href}"${m.external ? ' target="_blank" rel="noopener"' : ''}>
        <div class="ph media__img" aria-hidden="true">media image</div>
        <div class="media__text">
          <span class="media__label">${m.no} — ${m.tag}</span>
          <div class="top-svc__row"><h3 class="media__title">${m.name}</h3>${arrow.replace('arrow', 'arrow sp-only')}</div>
          <p class="media__body">${m.body}</p>
          ${arrow.replace('arrow', 'arrow top-svc__arrow pc-only')}
        </div>
      </a>`).join('\n')}
    </div>
    <a class="text-link sp-only" href="blog.html">ブログ一覧 →</a>
  </section>`
});

/* ---------- 404 ---------- */
// どの階層で表示されても読み込めるよう、<base href="/"> でサイトのルート基準にする
const notFound = file => layout({
  file,
  title: 'ページが見つかりません',
  description: 'お探しのページは見つかりませんでした。',
  noindex: true,
  base: '/',
  body: `${pageHero({
    en: '404', ja: 'ページが見つかりません', crumbs: [['HOME', './'], ['404']],
    lead: 'お探しのページは、移動または削除された可能性があります。URLをご確認のうえ、トップページからお探しください。'
  })}
  <div class="section">
    <a class="btn btn--en not-found__btn" href="./">BACK TO TOP<span aria-hidden="true">→</span></a>
  </div>`
});

export const pages = {
  'index.html': top,
  '404.html': notFound,
  'about.html': about,
  'services.html': services,
  'service-branding.html': serviceBranding,
  'blog.html': blog,
  'blog-post.html': blogPost,
  'contact.html': contact,
  'privacy.html': privacy
};
