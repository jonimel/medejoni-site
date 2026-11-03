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
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');
const port = Number(process.env.PORT) || 3000;
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
  interest: 'מתעניין ב', dates: 'מתי בקולומביה', arrival_date: 'תאריך הגעה', days: 'כמה ימים', message: 'הודעה', source: 'מקור',
};
const formTitles = {
  booking: 'הזמנת טיול', lead: 'השארת פרטים', 'airport-transfer': 'הסעה משדה התעופה',
  transfers: 'מעבר בין ערים', flights: 'סגירת טיסה', 'trip-planning': 'תכנון טיול',
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

async function sendLead(fields) {
  const form = fields['form-name'] || 'lead';
  const rows = Object.entries(fields)
    .filter(([k, v]) => k !== 'company' && k !== 'form-name' && String(v).trim() !== '')
    .map(([k, v]) => `<tr><td style="padding:6px 10px;font-weight:bold">${esc(labels[k] || k)}</td><td style="padding:6px 10px">${esc(v)}</td></tr>`)
    .join('');
  const subject = `ליד חדש: ${formTitles[form] || form}${fields.name ? ` – ${fields.name}` : ''}`;
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

async function serveFile(res, path, status = 200) {
  const data = await readFile(path);
  const ext = extname(path);
  res.writeHead(status, {
    'Content-Type': types[ext] || 'application/octet-stream',
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=604800',
  });
  res.end(data);
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://x');
    // One address for Google: send www.medejoni.com to medejoni.com.
    if ((req.headers.host || '').startsWith('www.')) {
      res.writeHead(301, { Location: `https://${req.headers.host.slice(4)}${req.url}` }).end();
      return;
    }
    if (req.method === 'POST') {
      const fields = Object.fromEntries(new URLSearchParams(await readBody(req)));
      if (fields.company) { res.writeHead(200).end('ok'); return; } // honeypot: a bot filled the hidden field
      // Every lead is written to the Railway logs too, so none is lost even if the email fails.
      console.log('Lead received:', JSON.stringify(fields));
      try {
        await sendLead(fields);
        res.writeHead(200).end('ok');
      } catch (e) {
        console.error('Lead email failed:', e.message, JSON.stringify(fields));
        res.writeHead(500).end('error');
      }
      return;
    }
    let path = normalize(join(root, decodeURIComponent(url.pathname)));
    if (!path.startsWith(root)) { res.writeHead(403).end(); return; }
    const s = await stat(path).catch(() => null);
    if (s?.isDirectory()) {
      if (!url.pathname.endsWith('/')) { res.writeHead(301, { Location: url.pathname + '/' + url.search }).end(); return; }
      path = join(path, 'index.html');
    } else if (!s && !extname(path)) {
      path += '.html';
    }
    if (await stat(path).catch(() => null)) return await serveFile(res, path);
    const notFound = join(root, '404.html');
    if (await stat(notFound).catch(() => null)) return await serveFile(res, notFound, 404);
    res.writeHead(404).end('Not found');
  } catch (e) {
    console.error(e);
    if (!res.headersSent) res.writeHead(500).end('error');
  }
}).listen(port, () => console.log(`Medejoni running on port ${port}`));
