// Global settings. Edit here once and the whole site updates.

export const site = {
  name: 'Medejoni',
  tagline: 'טיולים בקולומביה עם יונתן מילמן',
  owner: 'יונתן מילמן',
  // TODO: Jonathan's WhatsApp number in international format, digits only (e.g. 573001234567).
  whatsapp: '',
  instagram: 'https://www.instagram.com/',
  tiktok: 'https://www.tiktok.com/',
  email: '',
  currency: 'COP',
  cancelHours: 12,
};

/** Builds a wa.me link with a prefilled Hebrew message. */
export function waLink(text = 'היי יונתן, אשמח לפרטים על טיול בקולומביה') {
  const base = site.whatsapp ? `https://wa.me/${site.whatsapp}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function formatCOP(n: number) {
  return n.toLocaleString('en-US') + ' COP';
}

export const img = (name: string) => `/images/${name}.jpg`;
