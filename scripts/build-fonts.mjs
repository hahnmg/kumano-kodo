#!/usr/bin/env node
// Writes the theme's web fonts into the extension: woff2 files, a stylesheet per family and its licence.
// Run it when a family or an axis changes; TYPO3 then serves them itself and never contacts Google.

import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = join(root, 'typo3/packages/theme_kumano_kodo/Resources/Public/Fonts');

// Full axis ranges, so every weight the settings offer is in the file; Space Mono comes in two cuts only.
const families = {
  Fraunces: { axes: 'opsz,wght@9..144,100..900', licence: 'fraunces' },
  Inter: { axes: 'wght@100..900', licence: 'inter' },
  'Instrument Sans': { axes: 'wght@400..700', licence: 'instrumentsans' },
  Sora: { axes: 'wght@100..800', licence: 'sora' },
  'Space Grotesk': { axes: 'wght@300..700', licence: 'spacegrotesk' },
  'Space Mono': { axes: 'wght@400;700', licence: 'spacemono' },
  'Noto Sans JP': { axes: 'wght@100..900', licence: 'notosansjp' },
};

// Google answers with woff2 only to a browser it recognises.
const browser = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
};
const get = async (url, as) => {
  const response = await fetch(url, { headers: browser });
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  return as === 'bytes' ? Buffer.from(await response.arrayBuffer()) : response.text();
};

const slug = (family) => family.toLowerCase().replaceAll(' ', '-');

await rm(target, { recursive: true, force: true });
for (const [family, { axes, licence }] of Object.entries(families)) {
  const dir = join(target, slug(family));
  await mkdir(dir, { recursive: true });
  let css = await get(`https://fonts.googleapis.com/css2?family=${family.replaceAll(' ', '+')}:${axes}&display=swap`);
  const urls = [...new Set(css.match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g))];
  let bytes = 0;
  for (const [i, url] of urls.entries()) {
    const name = `${slug(family)}-${String(i).padStart(3, '0')}.woff2`;
    const file = await get(url, 'bytes');
    bytes += file.length;
    await writeFile(join(dir, name), file);
    css = css.replaceAll(url, name);
  }
  await writeFile(join(dir, 'font.css'), css);
  await writeFile(join(dir, 'OFL.txt'), await get(`https://raw.githubusercontent.com/google/fonts/main/ofl/${licence}/OFL.txt`));
  console.log(`${family}: ${urls.length} files, ${Math.round(bytes / 1024)} KB`);
}
