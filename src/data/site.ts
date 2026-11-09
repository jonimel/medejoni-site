// Global settings. Edit here once and the whole site updates.

export const site = {
  name: 'Medejoni',
  tagline: 'חוויה אותנטית בקולומביה',
  owner: 'יונתן מילמן',
  // TODO: Jonathan's WhatsApp number in international format, digits only (e.g. 573001234567).
  whatsapp: '573135090957',
  instagram: 'https://www.instagram.com/medejoni_col/',
  tiktok: 'https://www.tiktok.com/@medejoni',
  // Google Business Profile (Maps listing) and its "write a review" link.
  googleBusiness: 'https://g.page/r/Cb8UUo1JtLKTEBM',
  googleReview: 'https://g.page/r/Cb8UUo1JtLKTEBM/review',
  email: 'yonimelmel@gmail.com',
  currency: 'COP',
  cancelHours: 12,
  // About how many COP make 1 ILS, to show Israeli visitors "≈ ₪..." next to peso prices (Hebrew booking page).
  // Slightly below the market rate (≈1,036 on 2026-11-09) to cover bank conversion fees. Update when the rate moves a lot.
  ilsRate: 1000,
  // Legal details of Jonathan's Colombian company (footer, /terms/, /privacy/). Required by Bold (payments).
  company: {
    name: 'JM Servicios Digitales S.A.S.',
    nit: '902065881',
    address: 'Laureles, Medellín, Antioquia, Colombia',
  },
  // Google Analytics 4 "Measurement ID" (looks like G-XXXXXXXXXX). Empty = no analytics.
  gaId: 'G-2PCH4ZRZKL',
  // Google Search Console HTML-tag verification code (only if not verifying through DNS).
  // Tour promotion popup (small card, once per visitor per week). To promote another tour, change `tour` to its slug
  // from tours.ts (e.g. 'israeloco-medellin-barrio-tour'). enabled: false turns it off.
  promo: {
    enabled: true,
    tour: 'colombian-for-a-day',
    label: '★ הטיול הכי מומלץ שלנו',
    text: 'מצנח רחיפה, כפר הררי, דגים את ארוחת הצהריים בעצמכם ושקיעה מעל מדג׳ין.',
    image: 'paragliding-medellin-tandem-flight',
    button: 'לפרטים והזמנה',
    delaySeconds: 15, // or once the visitor scrolled half the page, whichever comes first
    hideDays: 7, // after it was shown, don't show it again to the same visitor for this many days
  },
  gscVerification: 'nDcN8UFi78rtWutRJ-orbP2TN-MdSRLeYE2bxJkod-o',
  // Bing Webmaster Tools verification (msvalidate.01).
  bingVerification: '3434C4D36C55B1987DFD2F8FA9D5D57A',
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
