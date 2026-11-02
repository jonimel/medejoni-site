export interface Destination {
  slug: string;
  name: string;
  latin: string;
  image: string;
  hero: string;
  intro: string;
  /** Destinations without tours yet show as "בקרוב" and get no page. */
  comingSoon?: boolean;
  color?: string;
  bestTime?: string;
  highlights?: { title: string; text: string }[];
}

export const destinations: Destination[] = [
  {
    slug: 'medellin',
    name: "מדג'ין",
    latin: 'Medellín',
    image: 'valley',
    hero: 'meddusk',
    intro: "עיר האביב הנצחי: שכונות צבעוניות, תצפיות מטורפות, כדורגל וחיי לילה. מכאן יוצאים לרוב הטיולים.",
    bestTime: 'מזג האוויר נעים כל השנה, בערך 22–28 מעלות. דצמבר–מרץ ויולי–אוגוסט יבשים יותר.',
    highlights: [
      { title: 'קומונה 13', text: '[תיאור קצר]' },
      { title: 'תצפיות על העמק', text: '[תיאור קצר]' },
      { title: 'אל פובלדו ולאורס', text: '[תיאור קצר]' },
      { title: 'כדורגל', text: '[תיאור קצר]' },
    ],
  },
  {
    slug: 'guatape',
    name: 'גואטפה',
    latin: 'Guatapé',
    image: 'umbrellas',
    hero: 'peniol',
    intro: 'סלע אל פניול, האגם הענק והכפר הצבעוני. כשעתיים נסיעה ממדג׳ין, ואחד הטיולים הכי מבוקשים בקולומביה.',
    bestTime: 'כל השנה. מומלץ לצאת מוקדם בבוקר כדי להקדים את העומס בסלע.',
    highlights: [
      { title: 'סלע אל פניול', text: '[תיאור קצר]' },
      { title: 'הכפר הצבעוני', text: '[תיאור קצר]' },
      { title: 'שייט באגם', text: '[תיאור קצר]' },
    ],
  },
  {
    slug: 'jardin',
    name: 'חרדין',
    latin: 'Jardín',
    image: 'horses',
    hero: 'jardin',
    intro: 'כפר קולוניאלי קסום בדרום אנטיוקיה, מוקף הרים, מפלים ומטעי קפה.',
    bestTime: 'כל השנה. בעונת הגשמים (אפריל–מאי, אוקטובר–נובמבר) כדאי להצטייד במעיל.',
  },
  {
    slug: 'antioquia',
    name: 'כפרי אנטיוקיה',
    latin: 'Antioquia',
    image: 'hills',
    hero: 'paraglide',
    intro: 'טבע, נופים, חוות ואטרקציות אדרנלין, במרחק נסיעה קצרה מהעיר.',
  },
  { slug: 'cartagena', name: 'קרטחנה', latin: 'Cartagena', image: '', hero: '', intro: '', comingSoon: true, color: '#B5651D' },
  { slug: 'santa-marta', name: 'סנטה מרתה', latin: 'Santa Marta', image: '', hero: '', intro: '', comingSoon: true, color: '#2F7A78' },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
