// 下層ページの HTML を public/ に書き出す（依存なし）: node build.mjs
import { writeFile } from 'node:fs/promises';
import { pages } from './src/pages.mjs';

for (const [file, render] of Object.entries(pages)) {
  await writeFile(new URL(`./public/${file}`, import.meta.url), render());
  console.log(`wrote public/${file}`);
}
