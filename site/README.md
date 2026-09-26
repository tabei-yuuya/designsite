# yuyadesign 下層ページ（スマホ）

`project/スマホ 下層ページ.dc.html`（390px）を静的サイトとして実装したもの。依存パッケージなし。

- `src/data.mjs` … テキストデータ（本文はデザイン段階の仮テキスト）
- `src/layout.mjs` … 共通のヘッダー・メニュー・ページ見出し・フッター
- `src/pages.mjs` … 7ページのテンプレート
- `public/` … 公開ファイル。`*.html` は生成物、`assets/` は手書き

```sh
npm run build   # src/ から public/*.html を生成
npm run serve   # http://localhost:8080/about.html
```

| ページ | ファイル |
| --- | --- |
| ABOUT | about.html |
| SERVICES | services.html |
| サービス詳細（ブランディング） | service-branding.html |
| BLOG一覧 | blog.html |
| BLOG記事詳細 | blog-post.html |
| CONTACT | contact.html |
| プライバシーポリシー | privacy.html |

未対応・仮のもの:
- TOP（`index.html`）は未実装。HOME へのリンクは切れている
- お問い合わせフォームは送信を模擬しているだけ（`assets/js/contact.js` の TODO）
- 画像はプレースホルダー、会社概要は「〇〇」、SNS・ページ送り2/3・特商法表示のリンクは `#`
- PC 版のレイアウト（640px 以上）は未対応
