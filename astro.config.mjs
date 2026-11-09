// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { imageSize } from './src/lib/image-size.mjs';
import { guides, isDraft } from './src/data/guides.ts';
import { tours } from './src/data/tours.ts';

// Pages Google should not index (also kept out of the sitemap).
const hidden = ['/booking/', '/payment/', '/404/', ...guides.filter(isDraft).map((g) => `/guides/${g.slug}/`)];

/** After the build: mark new-tab links for screen readers, and give every <img src="/images/..."> its real width/height (less layout jumping = better Core Web Vitals)
 *  and a srcset with the small copy, so phones download smaller photos. */
function imageDimensions() {
  return {
    name: 'image-dimensions',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const root = fileURLToPath(dir);
        const pub = fileURLToPath(new URL('./public', import.meta.url));
        const cache = new Map();
        const sizeOf = (src) => {
          if (!cache.has(src)) cache.set(src, imageSize(join(pub, src)));
          return cache.get(src);
        };
        const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
        for (const file of walk(root).filter((f) => f.endsWith('.html'))) {
          const html = readFileSync(file, 'utf8');
          const out = html.replace(/<img\b[^>]*>/g, (tag) => {
            if (/\swidth=/.test(tag)) return tag;
            const src = tag.match(/\ssrc="(\/images\/[^"]+)"/)?.[1];
            if (!src) return tag;
            const size = sizeOf(src);
            let attrs = size ? ` width="${size.width}" height="${size.height}"` : '';
            // Big photos also offer the 800px copy, so phones (and small boxes) download about half.
            const small = src.match(/^\/images\/([^/]+\.webp)$/) && src.replace('/images/', '/images/sm/');
            const smallSize = small && sizeOf(small);
            if (smallSize && size && smallSize.width < size.width && !/\ssrcset=/.test(tag)) {
              attrs += ` srcset="${small} ${smallSize.width}w, ${src} ${size.width}w"`;
              if (!/\ssizes=/.test(tag)) attrs += ' sizes="100vw"';
            }
            return tag.replace(/^<img\b/, `<img${attrs}`);
          });
          // Links that open a new tab say so to screen readers (WCAG 3.2.5 / IS 5568).
          const NEW_TAB = ' (נפתח בחלון חדש)';
          const out2 = out.replace(/<a\b([^>]*\btarget="_blank"[^>]*)>([\s\S]*?)<\/a>/g, (m, attrs, inner) => {
            if (m.includes(NEW_TAB.trim())) return m;
            if (/\saria-label="/.test(attrs)) return m.replace(/(\saria-label="[^"]*)"/, `$1${NEW_TAB}"`);
            return `<a${attrs}>${inner}<span class="sr-only">${NEW_TAB}</span></a>`;
          });
          if (out2 !== html) writeFileSync(file, out2);
        }
      },
    },
  };
}

/** After the build: save the price list for server.mjs (.server/prices.json, not public), so the server
 *  works out the Bold deposit itself instead of trusting the amount the browser sends. */
function serverPrices() {
  return {
    name: 'server-prices',
    hooks: {
      'astro:build:done': () => {
        const dir = fileURLToPath(new URL('./.server/', import.meta.url));
        mkdirSync(dir, { recursive: true });
        const list = tours.map((t) => ({ slug: t.slug, title: t.title, tiers: t.tiers, min: t.minPeople, addOns: t.addOns }));
        writeFileSync(join(dir, 'prices.json'), JSON.stringify(list));
      },
    },
  };
}

export default defineConfig({
  site: 'https://medejoni.com',
  integrations: [sitemap({ filter: (page) => !hidden.some((p) => page.endsWith(p)) }), imageDimensions(), serverPrices()],
});
