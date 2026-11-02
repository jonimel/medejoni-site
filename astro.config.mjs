// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { imageSize } from './src/lib/image-size.mjs';
import { guides, isDraft } from './src/data/guides.ts';

// Pages Google should not index (also kept out of the sitemap).
const hidden = ['/booking/', '/404/', ...guides.filter(isDraft).map((g) => `/guides/${g.slug}/`)];

/** After the build, give every <img src="/images/..."> its real width/height (less layout jumping = better Core Web Vitals). */
function imageDimensions() {
  return {
    name: 'image-dimensions',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const root = fileURLToPath(dir);
        const pub = fileURLToPath(new URL('./public', import.meta.url));
        const cache = new Map();
        const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
        for (const file of walk(root).filter((f) => f.endsWith('.html'))) {
          const html = readFileSync(file, 'utf8');
          const out = html.replace(/<img\b[^>]*>/g, (tag) => {
            if (/\swidth=/.test(tag)) return tag;
            const src = tag.match(/\ssrc="(\/images\/[^"]+)"/)?.[1];
            if (!src) return tag;
            if (!cache.has(src)) cache.set(src, imageSize(join(pub, src)));
            const size = cache.get(src);
            return size ? tag.replace(/^<img\b/, `<img width="${size.width}" height="${size.height}"`) : tag;
          });
          if (out !== html) writeFileSync(file, out);
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://medejoni.com',
  integrations: [sitemap({ filter: (page) => !hidden.some((p) => page.endsWith(p)) }), imageDimensions()],
});
