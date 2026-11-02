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
      { title: 'תצפיות על העמק', text: 'העיר יושבת בעמק בין הרים, ומהתצפיות בגבעות רואים אותה נדלקת בערב.' },
      { title: 'אל פובלדו ולאורס', text: 'השכונות של בתי הקפה, המסעדות והברים. מכאן יוצאים לרוב הבילויים בערב.' },
      { title: 'כדורגל', text: 'משחק של אתלטיקו נסיונל באצטדיון אטנסיו חירארדו, עם שירים ותופים לאורך כל המשחק.' },
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
      { title: 'סלע אל פניול', text: 'סלע ענק שמתנשא מעל האגם. עולים כ־700 מדרגות לתצפית על כל האזור.' },
      { title: 'הכפר הצבעוני', text: 'בתים בצבעים עזים עם תבליטים צבעוניים על החזיתות, כיכר מרכזית ומזח על האגם.' },
      { title: 'שייט באגם', text: 'שטים בין איים ירוקים, וילות ושרידי העיירה הישנה שהוצפה כשנבנה הסכר.' },
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
      { title: 'העיר העתיקה', text: 'רובע קולוניאלי מוקף חומה, עם בתים צבעוניים, מרפסות פרחים וכיכרות. אתר מורשת עולמית של אונסק״ו.' },
      { title: 'מבצר סן פליפה', text: 'המבצר הספרדי הגדול על הגבעה מעל העיר, שנבנה כדי להגן עליה מפני פיראטים.' },
      { title: 'חטסמני', text: 'שכונה תוססת ליד העיר העתיקה, עם ציורי קיר, ברים ומוזיקה ברחוב בערבים.' },
      { title: 'איי הרוסריו', text: 'איים קטנים מול החוף עם מים צלולים ואלמוגים. יוצאים אליהם בסירה ליום.' },
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
      { title: 'פארק טאירונה', text: 'פארק לאומי שבו הג׳ונגל יורד עד הים, עם מפרצים וחופים שמגיעים אליהם בסירה או ברגל.' },
      { title: 'קאבו סן חואן', text: 'החוף המפורסם בפארק, עם הבקתה על הסלע בין שני מפרצים.' },
      { title: 'טגנגה', text: 'כפר דייגים קטן ליד סנטה מרתה, נקודת יציאה פופולרית לסירות ולצלילה.' },
      { title: 'שייט בסירה', text: 'הדרך המהירה לחופי טאירונה: מגיעים ישר לחוף, בלי שעות הליכה בג׳ונגל.' },
    ],
    gallery: ['tayrona2', 'lancha', 'taganga', 'tayrona'],
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
