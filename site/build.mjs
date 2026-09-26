// public/ に HTML・robots.txt・sitemap.xml を書き出す（依存なし）: node build.mjs
import { writeFile, rm } from 'node:fs/promises';
import { pages } from './src/pages.mjs';
import { SITE_URL } from './src/site.mjs';

const out = f => new URL(`./public/${f}`, import.meta.url);

for (const [file, render] of Object.entries(pages)) {
  await writeFile(out(file), render(file));
  console.log(`wrote public/${file}`);
}

const indexable = Object.keys(pages).filter(f => f !== '404.html');
if (SITE_URL) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = indexable.map(f => `  <url><loc>${SITE_URL}/${f === 'index.html' ? '' : f}</loc><lastmod>${today}</lastmod></url>`);
  await writeFile(out('sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  console.log('wrote public/sitemap.xml');
} else {
  await rm(out('sitemap.xml'), { force: true });
  console.warn('! src/site.mjs の SITE_URL が空のため、sitemap.xml・canonical・OGP画像は出力していません');
}
await writeFile(out('robots.txt'), `User-agent: *\nAllow: /\n${SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml\n` : ''}`);
console.log('wrote public/robots.txt');
