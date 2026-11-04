// Server for hosting on Railway (or any Node host).
// - Serves the built site from ./dist
// - Receives the site's forms (POST /) and emails each lead through Resend.
//
// Environment variables (set them in Railway → service → Variables):
//   RESEND_API_KEY  required for emails. From resend.com → API Keys.
//   LEAD_EMAIL      where leads go. Default: yonimelmel@gmail.com
//   MAIL_FROM       sender. Default: "Medejoni <onboarding@resend.dev>"
//                   (works only when sending to the email you signed up to Resend with;
//                   after verifying a domain, use e.g. "Medejoni <leads@medejoni.com>")
//   PORT            set by Railway automatically.
//   SUPABASE_URL          optional, for partner referral tracking (supabase/referrals.sql).
//   SUPABASE_SERVICE_KEY  optional, the "service_role" secret key. Server only, never sent to browsers.
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { brotliCompressSync, gzipSync, constants as zlib } from 'node:zlib';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');
const port = Number(process.env.PORT) || 3000;
// Photos were renamed to keyword names for Google Images (old name -> new name).
// Old addresses (already in Google or in shared links) get a permanent redirect to the new file.
const oldImageNames = JSON.parse(readFileSync(new URL('./src/lib/old-image-names.json', import.meta.url), 'utf8'));
const leadEmail = process.env.LEAD_EMAIL || 'yonimelmel@gmail.com';
const mailFrom = process.env.MAIL_FROM || 'Medejoni <onboarding@resend.dev>';

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
};

// Hebrew labels for the form fields, so the email is easy to read.
const labels = {
  'form-name': 'טופס', name: 'שם', phone: 'טלפון', people: 'כמה אנשים', date: 'תאריך', tour_title: 'טיול',
  addons: 'תוספות', total: 'סה״כ', landing_date: 'תאריך נחיתה', landing_airport: 'שדה נחיתה', destination: 'יעד',
  from: 'מאיפה', to: 'לאן', tour: 'קוד טיול', email: 'אימייל', hotel: 'איסוף מ', notes: 'הערות',
  interest: 'מתעניין ב', dates: 'מתי בקולומביה', arrival_date: 'תאריך הגעה', days: 'כמה ימים', message: 'הודעה', source: 'מקור', partner: 'הגיע דרך שותף', heard_from: 'איך הגיע אלינו',
};
const formTitles = {
  booking: 'הזמנת טיול', lead: 'השארת פרטים', 'airport-transfer': 'הסעה משדה התעופה',
  transfers: 'מעבר בין ערים', flights: 'סגירת טיסה', 'trip-planning': 'תכנון טיול',
};

// ---- Partner referrals (e.g. https://medejoni.com/?utm_source=agal) ----
// A page opened with ?utm_source=<code> (or ?ref=<code>) is saved as one row in Supabase (referral_visits).
// - The database function log_referral_visit only accepts codes listed as active in referral_partners,
//   so a new partner is just a new row there, with no code change.
// - Each browser gets an anonymous random id (cookie mj_vid, 1 year) to count unique and returning visitors.
//   No IP address or personal details are saved.
// - Refreshing the page, or opening another page, does not count again: a cookie that lasts until the browser
//   is closed (mj_ref) remembers that this visit was already counted for that partner.
// - Tracking can never break the site: it runs in the background with a short timeout, and errors are only logged.
const REF_CODE = /^[a-z0-9_-]{1,40}$/;
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|curl|wget|python|headless|lighthouse/i;

function readCookies(req) {
  return Object.fromEntries(String(req.headers.cookie || '').split(';').map((c) => c.trim().split('=')).filter(([k]) => k));
}

/** Calls a database function in Supabase in the background. Never throws, never blocks the visitor. */
function supabaseRpc(fn, body) {
  fetch(`${process.env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      apikey: process.env.SUPABASE_SERVICE_KEY,
      // Older "service_role" keys (they start with eyJ) also go in Authorization; new "sb_secret_" keys only in apikey.
      ...(process.env.SUPABASE_SERVICE_KEY.startsWith('eyJ') ? { Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}` } : {}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(5000),
  })
    .then(async (r) => {
      if (r.ok) console.log(`Supabase ${fn} saved:`, body.p_code || body.p_partner_code || '-', body.p_landing_page || body.p_page || '');
      else console.error(`Supabase ${fn} failed:`, r.status, await r.text());
    })
    .catch((e) => console.error(`Supabase ${fn} failed:`, e.message));
}
const supabaseOn = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
const validVisitor = (id) => (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id || '') ? id : null);

// Simple limit so one browser/bot can't flood the WhatsApp-click table: 20 clicks per 10 minutes per IP.
const clickLog = new Map();
function tooManyClicks(req) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  const now = Date.now();
  const recent = (clickLog.get(ip) || []).filter((t) => now - t < 600_000);
  recent.push(now);
  clickLog.set(ip, recent);
  if (clickLog.size > 5000) clickLog.clear();
  return recent.length > 20;
}

/** POST /api/wa-click from the browser when someone taps a WhatsApp button. */
async function trackWhatsAppClick(req) {
  const body = await readBody(req).catch(() => '');
  if (!supabaseOn()) { console.log('WhatsApp click not saved: SUPABASE_URL / SUPABASE_SERVICE_KEY not set'); return; }
  if (BOT.test(String(req.headers['user-agent'] || '')) || tooManyClicks(req)) return;
  let data = {};
  try { data = JSON.parse(body); } catch { return; }
  const partner = String(data.partner || '').toLowerCase();
  supabaseRpc('log_whatsapp_click', {
    p_visitor_id: validVisitor(readCookies(req).mj_vid),
    p_page: String(data.page || '').slice(0, 300),
    p_partner_code: REF_CODE.test(partner) ? partner : null,
    p_device: deviceOf(String(req.headers['user-agent'] || '')),
  });
}

const deviceOf = (ua) => (/iPad|Tablet/i.test(ua) ? 'tablet' : /Mobi|Android|iPhone/i.test(ua) ? 'mobile' : 'desktop');

/** POST /api/visit, sent by the page itself (Base.astro) when it is opened with ?utm_source=<code>.
 *  Sent from the page, not counted when the server serves the HTML, because phones often load a typed link
 *  in advance (prerender/prefetch) and then show that copy without asking the server again.
 *  Returns Set-Cookie headers, or [] if this is not a new partner visit. */
async function trackReferral(req) {
  const text = await readBody(req).catch(() => '');
  let data = {};
  try { data = JSON.parse(text); } catch { return []; }
  const raw = String(data.code || '').trim().toLowerCase();
  if (!REF_CODE.test(raw)) return [];
  if (!supabaseOn()) { console.log('Referral visit not saved: SUPABASE_URL / SUPABASE_SERVICE_KEY not set'); return []; }
  const ua = String(req.headers['user-agent'] || '');
  if (!ua || BOT.test(ua) || tooManyClicks(req)) { console.log('Referral visit skipped (bot or too many):', ua.slice(0, 120)); return []; }
  const cookies = readCookies(req);
  if (cookies.mj_ref === raw) { console.log('Referral visit already counted in this browser session:', raw); return []; }
  const visitorId = validVisitor(cookies.mj_vid) || randomUUID();
  const body = {
    p_code: raw,
    p_visitor_id: visitorId,
    p_landing_page: String(data.page || '/').slice(0, 300),
    p_referrer: String(data.referrer || '').slice(0, 500) || null,
    p_device: deviceOf(ua),
  };
  supabaseRpc('log_referral_visit', body);
  const flags = 'Path=/; SameSite=Lax; Secure; HttpOnly';
  return [`mj_vid=${visitorId}; Max-Age=31536000; ${flags}`, `mj_ref=${raw}; ${flags}`];
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

async function sendLead(fields, suspect = false) {
  const form = fields['form-name'] || 'lead';
  const rows = Object.entries(fields)
    .filter(([k, v]) => k !== 'company' && k !== 'hp_field' && k !== 'form-name' && String(v).trim() !== '')
    .map(([k, v]) => `<tr><td style="padding:6px 10px;font-weight:bold">${esc(labels[k] || k)}</td><td style="padding:6px 10px">${esc(v)}</td></tr>`)
    .join('');
  const subject = `${suspect ? '[חשד לספאם] ' : ''}ליד חדש: ${formTitles[form] || form}${fields.name ? ` – ${fields.name}` : ''}`;
  const html = `<div dir="rtl" style="font-family:Arial,sans-serif"><h2>${esc(subject)}</h2><table border="1" style="border-collapse:collapse">${rows}</table></div>`;
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set');
  const email = { from: mailFrom, to: [leadEmail], subject, html };
  // Replying to the email goes straight to the customer, when they gave an email.
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email || '')) email.reply_to = fields.email;
  // Try twice: a short network hiccup or rate limit should not lose a booking.
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(email),
      });
      const text = await res.text();
      if (res.ok) { console.log('Lead email sent:', form, text); return; }
      lastError = new Error(`Resend ${res.status}: ${text}`);
      if (res.status < 500 && res.status !== 429) break; // a setup problem; retrying won't help
    } catch (e) {
      lastError = e;
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw lastError;
}

async function readBody(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 100_000) throw new Error('too large');
  }
  return body;
}

// Text files (pages, styles, scripts) are sent compressed: about 4-5 times smaller.
const compressible = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg']);
// Files are read and compressed once, then kept in memory (the site is small).
const fileCache = new Map();

async function loadFile(path, mtimeMs) {
  const hit = fileCache.get(path);
  if (hit && hit.mtimeMs === mtimeMs) return hit;
  const raw = await readFile(path);
  const entry = { mtimeMs, raw, etag: `"${raw.length.toString(36)}-${Math.round(mtimeMs).toString(36)}"` };
  if (compressible.has(extname(path)) && raw.length > 1024) {
    entry.br = brotliCompressSync(raw, { params: { [zlib.BROTLI_PARAM_QUALITY]: 11 } });
    entry.gzip = gzipSync(raw, { level: 9 });
  }
  fileCache.set(path, entry);
  return entry;
}

function cacheControl(urlPath, ext) {
  if (ext === '.html') return 'no-cache'; // always check for a new version (cheap thanks to ETag)
  if (urlPath.startsWith('/_astro/')) return 'public, max-age=31536000, immutable'; // file names change on every edit
  if (urlPath.startsWith('/images/')) return 'public, max-age=2592000'; // 30 days
  return 'public, max-age=86400';
}

async function serveFile(req, res, path, status = 200, extraHeaders = {}) {
  const { mtimeMs } = await stat(path);
  const file = await loadFile(path, mtimeMs);
  const ext = extname(path);
  const headers = {
    'Content-Type': types[ext] || 'application/octet-stream',
    'Cache-Control': cacheControl(new URL(req.url, 'http://x').pathname, ext),
    ETag: file.etag,
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders,
  };
  if (file.gzip) headers.Vary = 'Accept-Encoding';
  if (status === 200 && req.headers['if-none-match'] === file.etag) {
    res.writeHead(304, headers).end();
    return;
  }
  const accept = String(req.headers['accept-encoding'] || '');
  let body = file.raw;
  if (file.br && /\bbr\b/.test(accept)) { body = file.br; headers['Content-Encoding'] = 'br'; }
  else if (file.gzip && /\bgzip\b/.test(accept)) { body = file.gzip; headers['Content-Encoding'] = 'gzip'; }
  headers['Content-Length'] = body.length;
  res.writeHead(status, headers);
  res.end(req.method === 'HEAD' ? undefined : body);
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://x');
    // One address for Google: send www.medejoni.com to medejoni.com.
    if ((req.headers.host || '').startsWith('www.')) {
      res.writeHead(301, { Location: `https://${req.headers.host.slice(4)}${req.url}` }).end();
      return;
    }
    const oldImg = req.method !== 'POST' && url.pathname.match(/^\/images\/(sm\/)?([a-z0-9-]+)\.(webp|jpg)$/);
    if (oldImg && oldImageNames[oldImg[2]]) {
      res.writeHead(301, { Location: `/images/${oldImg[1] || ''}${oldImageNames[oldImg[2]]}.${oldImg[3]}`, 'Cache-Control': 'public, max-age=2592000' }).end();
      return;
    }
    if (req.method === 'POST' && url.pathname === '/api/visit') {
      const setCookie = await trackReferral(req);
      res.writeHead(204, setCookie.length ? { 'Set-Cookie': setCookie } : {}).end();
      return;
    }
    if (req.method === 'POST' && url.pathname === '/api/wa-click') {
      await trackWhatsAppClick(req);
      res.writeHead(204).end();
      return;
    }
    if (req.method === 'POST') {
      const fields = Object.fromEntries(new URLSearchParams(await readBody(req)));
      // Honeypot: a hidden field people never see. If it is filled, it is probably a bot,
      // but browser autofill can fill it too, so the lead is still emailed, marked as suspected spam.
      const suspect = Boolean(fields.hp_field || fields.company);
      // Every lead is written to the Railway logs too, so none is lost even if the email fails.
      console.log('Lead received:', JSON.stringify(fields));
      try {
        await sendLead(fields, suspect);
        res.writeHead(200).end('ok');
      } catch (e) {
        console.error('Lead email failed:', e.message, JSON.stringify(fields));
        res.writeHead(500).end('error');
      }
      return;
    }
    let decoded;
    try { decoded = decodeURIComponent(url.pathname); } catch { res.writeHead(400).end('Bad request'); return; }
    let path = normalize(join(root, decoded));
    if (!path.startsWith(root)) { res.writeHead(403).end(); return; }
    const s = await stat(path).catch(() => null);
    if (s?.isDirectory()) {
      if (!url.pathname.endsWith('/')) { res.writeHead(301, { Location: url.pathname + '/' + url.search }).end(); return; }
      path = join(path, 'index.html');
    } else if (!s && !extname(path)) {
      path += '.html';
    }
    if (await stat(path).catch(() => null)) return await serveFile(req, res, path);
    const notFound = join(root, '404.html');
    if (await stat(notFound).catch(() => null)) return await serveFile(req, res, notFound, 404);
    res.writeHead(404).end('Not found');
  } catch (e) {
    console.error(e);
    if (!res.headersSent) res.writeHead(500).end('error');
  }
}).listen(port, () => {
  console.log(`Medejoni running on port ${port}`);
  console.log(supabaseOn()
    ? `Partner tracking: ON (Supabase ${new URL(process.env.SUPABASE_URL).host}, key type ${process.env.SUPABASE_SERVICE_KEY.slice(0, 10)}...)`
    : 'Partner tracking: OFF (SUPABASE_URL / SUPABASE_SERVICE_KEY not set)');
});
