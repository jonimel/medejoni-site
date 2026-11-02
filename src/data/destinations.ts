export interface Destination {
  slug: string;
  name: string;
  latin: string;
  image: string;
  hero: string;
  intro: string;
  /** Destinations without tours yet show as "בקרוב" and get no page. */
  comingSoon?: boolean;
  /** For destinations without a page yet: where the card links, and its caption. */
  link?: string;
  linkLabel?: string;
  color?: string;
  bestTime?: string;
  highlights?: { title: string; text: string }[];
  gallery?: string[];
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
      { title: 'קומונה 13', text: 'גרפיטי, היפ־הופ והמדרגות הנעות. יש לנו סיור מודרך.' },
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
  { slug: 'salento', name: 'סלנטו', latin: 'Salento', image: 'salento2', hero: 'salento', intro: '', comingSoon: true, link: '/services/#transfers', linkLabel: "מעבר ממדג'ין" },
  {
    slug: 'cartagena',
    name: 'קרטחנה',
    latin: 'Cartagena',
    image: 'ctg-street',
    hero: 'ctg1',
    intro: 'העיר העתיקה המוקפת חומה, רחובות קולוניאליים צבעוניים, מבצרים, חופים ואיים בקריביים.',
    bestTime: 'חם ולח כל השנה, בערך 28–32 מעלות. דצמבר–אפריל הם החודשים היבשים והפופולריים ביותר.',
    highlights: [
      { title: 'העיר העתיקה', text: '[תיאור קצר]' },
      { title: 'מבצר סן פליפה', text: '[תיאור קצר]' },
      { title: 'חטסמני', text: '[תיאור קצר]' },
      { title: 'איי הרוסריו', text: '[תיאור קצר]' },
    ],
    gallery: ['ctg-palenquera', 'ctg-flag', 'ctg-fort', 'ctg-street', 'ctg1'],
  },
  {
    slug: 'santa-marta',
    name: 'סנטה מרתה',
    latin: 'Santa Marta',
    image: 'tayrona',
    hero: 'tayrona',
    intro: 'הקריביים הפראיים: פארק טאירונה, חופים בתוך הג׳ונגל, מפרצים ושייט בסירות מהירות.',
    bestTime: 'חם כל השנה. דצמבר–אפריל יבשים יותר. שימו לב: פארק טאירונה נסגר לכמה שבועות בשנה לשיקום.',
    highlights: [
      { title: 'פארק טאירונה', text: '[תיאור קצר]' },
      { title: 'קאבו סן חואן', text: '[תיאור קצר]' },
      { title: 'טגנגה', text: '[תיאור קצר]' },
      { title: 'שייט בסירה', text: '[תיאור קצר]' },
    ],
    gallery: ['tayrona2', 'lancha', 'taganga', 'tayrona'],
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
