# yuyadesign コーポレートサイト

Claude Design のTOP・下層ページを静的サイトとして実装したもの。依存パッケージなし。

- TOP: `project/TOP 3案.dc.html` の 1b（PC）、`project/スマホ TOP.dc.html`（スマホ）
- 下層: `project/下層ページ.dc.html`（PC）、`project/スマホ 下層ページ.dc.html`（スマホ）

同じ HTML を画面幅で切り替える（1023px まではスマホ、1024px 以上で PC レイアウト）。

- `src/site.mjs` … 公開URL（`SITE_URL`）。設定すると canonical・OGP画像・構造化データ・sitemap.xml を出力する
- `src/data.mjs` … テキストデータ（本文はデザイン段階の仮テキスト）
- `src/layout.mjs` … 共通のヘッダー・メニュー・ページ見出し・フッター
- `src/pages.mjs` … 8ページ＋404ページのテンプレート
- `public/` … 公開ファイル。`*.html` は生成物、`assets/` は手書き

```sh
npm run build   # src/ から public/*.html・robots.txt・sitemap.xml を生成
npm run serve   # http://localhost:8080/
```

公開先: https://yuyadesign.netlify.app （Netlify。リポジトリ直下の `netlify.toml` でビルド設定）

| ページ | ファイル |
| --- | --- |
| TOP | index.html |
| ABOUT | about.html |
| SERVICES | services.html |
| サービス詳細（ブランディング） | service-branding.html |
| BLOG一覧 | blog.html |
| BLOG記事詳細 | blog-post.html |
| CONTACT | contact.html |
| プライバシーポリシー | privacy.html |
| 404 | 404.html（サイトのルートに置く前提） |

未対応・仮のもの:
- アクセス解析タグは未設置
- お問い合わせフォームは送信を模擬しているだけ（`assets/js/contact.js` の TODO）
- favicon・OGP画像（`assets/img/ogp.png`）は仮で作成したもの
- 画像はプレースホルダー、会社概要は「〇〇」、SNS・ページ送り2/3・特商法表示のリンクは `#`
- タブレット幅（640〜1023px）はスマホのレイアウトを横に伸ばして表示している
