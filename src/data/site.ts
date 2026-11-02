// Global settings. Edit here once and the whole site updates.

export const site = {
  name: 'Medejoni',
  tagline: 'חוויה אותנטית בקולומביה',
  owner: 'יונתן מילמן',
  // TODO: Jonathan's WhatsApp number in international format, digits only (e.g. 573001234567).
  whatsapp: '972504560505',
  instagram: 'https://www.instagram.com/',
  tiktok: 'https://www.tiktok.com/',
  email: 'yonimelmel@gmail.com',
  currency: 'COP',
  cancelHours: 12,
  // Google Analytics 4 "Measurement ID" (looks like G-XXXXXXXXXX). Empty = no analytics.
  gaId: '',
  // Google Search Console HTML-tag verification code (only if not verifying through DNS).
  gscVerification: '',
};

/** Builds a wa.me link with a prefilled Hebrew message. */
export function waLink(text = 'היי יונתן, אשמח לפרטים על טיול בקולומביה') {
  const base = site.whatsapp ? `https://wa.me/${site.whatsapp}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function formatCOP(n: number) {
  return n.toLocaleString('en-US') + ' COP';
}

/** Pages use WebP (smaller, same quality). The .jpg originals stay for social previews. */
export const img = (name: string) => `/images/${name}.webp`;
/** Smaller (max 800px) WebP for cards and thumbnails, so lists load fast. */
export const thumb = (name: string) => `/images/sm/${name}.webp`;
