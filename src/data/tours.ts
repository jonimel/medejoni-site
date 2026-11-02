// The tour catalog. Source: Jonathan's "אפיון טיולים מדיין" doc (Nov 2026). Prices are per person, in COP.
// To add a tour, copy one object, change the slug, and it gets its own page at /tours/<slug>/.

export type TourKind = 'group' | 'private' | 'evening';

export interface PriceTier {
  /** Smallest group size this price applies to. */
  min: number;
  price: number;
  label: string;
}

export interface AddOn {
  id: string;
  name: string;
  /** Price per person in COP. Leave undefined when the price is agreed on WhatsApp. */
  price?: number;
}

export interface Tour {
  slug: string;
  title: string;
  kind: TourKind;
  destination: string; // slug in destinations.ts
  place: string;
  short: string;
  intro: string;
  includes: string[];
  excludes: string[];
  tiers: PriceTier[];
  minPeople: number;
  addOns: AddOn[];
  addOnsNote?: string;
  pickup: string;
  bookAheadHours: number;
  duration: string;
  tags: string[];
  images: string[];
  faq: { q: string; a: string }[];
  featured?: boolean;
}

export const kindLabel: Record<TourKind, string> = {
  group: 'קבוצתי',
  private: 'פרטי',
  evening: 'ערב',
};

const pickupHotel = 'איסוף מהמלון';
const commonFaq = [
  { q: 'עד מתי אפשר לבטל?', a: 'אפשר לבטל עד 12 שעות לפני תחילת הטיול.' },
  { q: 'המחיר הוא לאדם?', a: 'כן. כל המחירים באתר הם לאדם, בפסו קולומביאני (COP).' },
];

export const tours: Tour[] = [
  {
    slug: 'guatape-group',
    title: 'גואטפה – טיול קבוצתי',
    kind: 'group',
    destination: 'guatape',
    place: 'גואטפה, אנטיוקיה',
    short: 'טיול יום מלא: שייט באגם, סיור בכפר הצבעוני, ארוחת בוקר וצהריים.',
    intro:
      'טיול יום מלא לאחד המקומות היפים והמפורסמים ביותר בקולומביה. שייט באגם של גואטפה, סיור בכפר הצבעוני ונוף של סלע אל פניול.',
    includes: ['הסעה', 'מדריך', 'ארוחת בוקר', 'ארוחת צהריים', 'שייט באגם גואטפה', 'סיור בכפר הצבעוני'],
    excludes: ['כניסה לסלע אל פניול'],
    tiers: [{ min: 1, price: 149000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: 'יציאה מפארק אל פובלדו',
    bookAheadHours: 36,
    duration: 'יום מלא',
    tags: ['יום מלא', 'כולל ארוחות', 'כולל שייט'],
    images: ['peniol', 'umbrellas', 'lake'],
    faq: [
      { q: 'מאיפה יוצאים?', a: 'הטיול הקבוצתי יוצא מפארק אל פובלדו במדג׳ין.' },
      { q: 'הכניסה לסלע אל פניול כלולה?', a: 'לא. הכניסה לסלע משולמת במקום ואינה כלולה במחיר.' },
      { q: 'כמה זמן מראש צריך להזמין?', a: 'לפחות 36 שעות מראש. הטיול מופעל על ידי חברה מקומית, ואנחנו דואגים לרישום ולשריון המקומות.' },
      ...commonFaq,
    ],
    featured: true,
  },
  {
    slug: 'guatape-private',
    title: 'גואטפה – טיול פרטי',
    kind: 'private',
    destination: 'guatape',
    place: 'גואטפה, אנטיוקיה',
    short: 'נהג ומדריך צמוד, ואפשר להוסיף אופנועי ים, ווייקבורד וסקי מים.',
    intro:
      'גואטפה בקצב שלכם: הסעה פרטית, נהג ומדריך צמוד לאורך כל היום, ואטרקציות על האגם בתיאום מראש.',
    includes: ['הסעה פרטית', 'נהג', 'מדריך צמוד', 'ארוחת בוקר', 'כיבוד קל'],
    excludes: ['אטרקציות על האגם (בתוספת תשלום)'],
    tiers: [
      { min: 4, price: 250000, label: '4 משתתפים' },
      { min: 5, price: 200000, label: '5 משתתפים ומעלה' },
    ],
    minPeople: 4,
    addOns: [
      { id: 'jetski', name: 'אופנועי ים' },
      { id: 'wakeboard', name: 'ווייקבורד' },
      { id: 'waterski', name: 'סקי מים' },
    ],
    addOnsNote: 'מחירי האטרקציות נקבעים בתיאום מראש.',
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'יום מלא',
    tags: [pickupHotel, 'מדריך צמוד', 'ארוחת בוקר'],
    images: ['jetski', 'lake', 'umbrellas', 'peniol'],
    faq: [
      { q: 'אפשר להוסיף אטרקציות?', a: 'כן. אופנועי ים, ווייקבורד, סקי מים ועוד, בתיאום מראש ובתוספת תשלום.' },
      { q: 'כמה זמן מראש צריך להזמין?', a: 'מומלץ לפחות 48 שעות מראש.' },
      ...commonFaq,
    ],
    featured: true,
  },
  {
    slug: 'pablo-escobar-tour',
    title: 'סיור פאבלו אסקובר',
    kind: 'private',
    destination: 'medellin',
    place: "מדג'ין",
    short: 'הקבר, שכונת פבלו אסקובר, המקום שבו נהרג ופארק אינפלקסיון.',
    intro:
      "סיור בעקבות ההיסטוריה של פבלו אסקובר והשפעתו על מדג'ין: הקבר, השכונה שנקראת על שמו, המקום שבו נהרג ופארק אינפלקסיון.",
    includes: [pickupHotel, 'נהג', 'מדריך צמוד'],
    excludes: [],
    tiers: [
      { min: 4, price: 170000, label: '4 משתתפים' },
      { min: 5, price: 150000, label: '5 משתתפים ומעלה' },
    ],
    minPeople: 4,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'חצי יום',
    tags: [pickupHotel, 'מדריך צמוד'],
    images: ['escobar', 'valley', 'medday'],
    faq: [...commonFaq],
    featured: true,
  },
  {
    slug: 'colombian-for-a-day',
    title: 'קולומביאני ליום אחד',
    kind: 'private',
    destination: 'antioquia',
    place: 'אנטיוקיה',
    short: 'טבע, נופים וחוויות מקומיות, עם מצנח רחיפה, פיינטבול ועוד לבחירה.',
    intro: 'טיול יום פרטי שמשלב טבע, נופים וחוויות מקומיות באזור אנטיוקיה.',
    includes: ['נהג', 'הסעה', 'ארוחת בוקר'],
    excludes: ['ארוחת צהריים', 'אטרקציות'],
    tiers: [
      { min: 4, price: 200000, label: '4 משתתפים' },
      { min: 5, price: 175000, label: '5 משתתפים' },
      { min: 6, price: 150000, label: '6 משתתפים ומעלה' },
    ],
    minPeople: 4,
    addOns: [
      { id: 'paragliding', name: 'מצנח רחיפה' },
      { id: 'paintball', name: 'פיינטבול' },
    ],
    addOnsNote: 'יש עוד אטרקציות לבחירה. מחירים בתיאום מראש.',
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'יום מלא',
    tags: ['ארוחת בוקר', 'אטרקציות לבחירה'],
    images: ['paraglide', 'hills', 'cow', 'fishing'],
    faq: [...commonFaq],
  },
  {
    slug: 'atletico-nacional-match',
    title: 'משחק של אתלטיקו נסיונל',
    kind: 'evening',
    destination: 'medellin',
    place: "מדג'ין",
    short: 'כרטיס, הסעה, מדריך ובירה ראשונה, באחת מאווירות הכדורגל הטובות בדרום אמריקה.',
    intro: 'לחוות את אחת מאווירות הכדורגל הטובות ביותר בדרום אמריקה, באצטדיון של אתלטיקו נסיונל.',
    includes: ['כרטיס למשחק', 'הסעה', 'מדריך', 'בירה ראשונה'],
    excludes: [],
    tiers: [{ min: 1, price: 200000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'ערב',
    tags: ['כולל כרטיס', 'כולל הסעה'],
    images: ['stadium', 'fireworks'],
    faq: [{ q: 'מתי יש משחקים?', a: 'לפי לוח המשחקים של הליגה. כתבו ליונתן ונבדוק תאריכים פנויים.' }, ...commonFaq],
    featured: true,
  },
  {
    slug: 'medellin-viewpoints-tour',
    title: "סיור מצפים במדג'ין",
    kind: 'evening',
    destination: 'medellin',
    place: "מדג'ין",
    short: 'כמה נקודות תצפית מרהיבות על העיר ועל ההרים שמסביב.',
    intro: "סיור בין כמה נקודות תצפית מרהיבות על מדג'ין ועל ההרים שמסביב לה.",
    includes: ['הסעה', 'מדריך', 'כניסה למצפים'],
    excludes: [],
    tiers: [{ min: 4, price: 120000, label: 'לאדם' }],
    minPeople: 4,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'ערב',
    tags: ['כולל כניסה', 'מינימום 4'],
    images: ['star', 'mednight', 'meddusk'],
    faq: [{ q: 'יש מינימום משתתפים?', a: 'כן, מינימום ארבעה משתתפים.' }, ...commonFaq],
  },
  {
    slug: 'jardin-day-trip',
    title: 'יום קסום בחרדין',
    kind: 'private',
    destination: 'jardin',
    place: 'חרדין, אנטיוקיה',
    short: 'ג׳יפים, מערה או רכיבה על סוסים, באחד הכפרים היפים באנטיוקיה.',
    intro: 'יום באחד הכפרים היפים באנטיוקיה, עם אטרקציה לבחירה: טיול ג׳יפים, סיור במערה או רכיבה על סוסים.',
    includes: ['הסעה', 'מדריך צמוד'],
    excludes: ['אטרקציות (135,000 COP כל אחת)'],
    tiers: [
      { min: 4, price: 300000, label: '4–5 משתתפים' },
      { min: 6, price: 275000, label: '6 משתתפים ומעלה' },
    ],
    minPeople: 4,
    addOns: [
      { id: 'jeep', name: 'טיול ג׳יפים', price: 135000 },
      { id: 'cave', name: 'סיור במערה', price: 135000 },
      { id: 'horses', name: 'רכיבה על סוסים', price: 135000 },
    ],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'יום מלא',
    tags: ['מדריך צמוד', 'אטרקציות לבחירה'],
    images: ['jardin', 'horses', 'cave', 'watermelon'],
    faq: [...commonFaq],
    featured: true,
  },
  {
    slug: 'chiva-rumbera',
    title: 'צ׳יבה רומברה',
    kind: 'evening',
    destination: 'medellin',
    place: "מדג'ין",
    short: 'מסיבת אוטובוס קולומביאנית עם מוזיקה ועצירות בנקודות מרכזיות.',
    intro: 'מסיבת אוטובוס קולומביאנית: מוזיקה, עצירות בנקודות מרכזיות ואווירה מקומית.',
    includes: ['כרטיס לצ׳יבה', 'מדריך', 'משקה ראשון'],
    excludes: [],
    tiers: [{ min: 1, price: 100000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'ערב',
    tags: ['משקה ראשון', 'מדריך'],
    images: ['chiva', 'chivain'],
    faq: [...commonFaq],
  },
];

export const fromPrice = (t: Tour) => Math.min(...t.tiers.map((x) => x.price));
export const hasTiers = (t: Tour) => t.tiers.length > 1;
export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
