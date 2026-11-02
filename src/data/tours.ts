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
    images: ['peniol', 'umbrellas', 'lake', 'umbrellas2'],
    faq: [
      { q: 'מאיפה יוצאים?', a: 'הטיול הקבוצתי יוצא מפארק אל פובלדו במדג׳ין.' },
      { q: 'הכניסה לסלע אל פניול כלולה?', a: 'לא. הכניסה לסלע משולמת במקום ואינה כלולה במחיר.' },
      { q: 'כמה זמן מראש צריך להזמין?', a: 'לפחות 36 שעות מראש. אני דואג לרישום ולשריון המקומות.' },
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
    short: 'נהג ומדריך צמוד, ואפשר להוסיף ווייקבורד, אופנועי ים, טיסת מסוק ועוד.',
    intro:
      'גואטפה בקצב שלכם: הסעה פרטית, נהג ומדריך צמוד לאורך כל היום, ואטרקציות על האגם בתיאום מראש.',
    includes: ['הסעה פרטית', 'נהג', 'מדריך צמוד', 'ארוחת בוקר', 'כיבוד קל'],
    excludes: ['אטרקציות על האגם (בתוספת תשלום)'],
    tiers: [
      { min: 4, price: 259000, label: '4 משתתפים' },
      { min: 5, price: 209000, label: '5 משתתפים ומעלה' },
    ],
    minPeople: 4,
    addOns: [
      { id: 'jetski', name: 'אופנועי ים' },
      { id: 'wakeboard', name: 'ווייקבורד' },
      { id: 'waterski', name: 'סקי מים' },
      { id: 'helicopter', name: 'טיסת מסוק מעל הסלע' },
      { id: 'horses', name: 'רכיבה על סוסים' },
      { id: 'paintball', name: 'פיינטבול' },
    ],
    addOnsNote: 'מחירי האטרקציות נקבעים בתיאום מראש.',
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'יום מלא',
    tags: [pickupHotel, 'מדריך צמוד', 'ארוחת בוקר'],
    images: ['wakeboard', 'jetski', 'wakeboard2', 'heliview', 'helicopter', 'horseride', 'lake'],
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
      { min: 4, price: 179000, label: '4 משתתפים' },
      { min: 5, price: 159000, label: '5 משתתפים ומעלה' },
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
    // PLACEHOLDER: details below are dummy until Jonathan sends the real ones.
    slug: 'comuna-13-tour',
    title: 'סיור בקומונה 13',
    kind: 'private',
    destination: 'medellin',
    place: "מדג'ין",
    short: 'גרפיטי, היפ־הופ, מדרגות נעות והסיפור של השכונה שהפכה לסמל של מדג׳ין.',
    intro:
      "סיור בקומונה 13, השכונה המפורסמת ביותר במדג'ין: אמנות רחוב, מופעי היפ־הופ, המדרגות הנעות, והסיפור המרגש של השינוי שהשכונה עברה. [פרטים מדויקים יתעדכנו בקרוב]",
    includes: [pickupHotel, 'מדריך', '[פרטים נוספים בקרוב]'],
    excludes: ['[בקרוב]'],
    tiers: [{ min: 1, price: 109000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'חצי יום',
    tags: [pickupHotel, 'אמנות רחוב', 'חצי יום'],
    images: ['comuna13b', 'comuna13'],
    faq: [{ q: 'כמה זמן נמשך הסיור?', a: '[בקרוב]' }, ...commonFaq],
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
      { min: 4, price: 209000, label: '4 משתתפים' },
      { min: 5, price: 179000, label: '5 משתתפים' },
      { min: 6, price: 159000, label: '6 משתתפים ומעלה' },
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
    images: ['paraglide', 'paintball', 'hills', 'cow', 'fishing'],
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
    tiers: [{ min: 1, price: 199000, label: 'לאדם' }],
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
    tiers: [{ min: 4, price: 119000, label: 'לאדם' }],
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
    excludes: ['אטרקציות (139,000 COP כל אחת)'],
    tiers: [
      { min: 4, price: 309000, label: '4–5 משתתפים' },
      { min: 6, price: 279000, label: '6 משתתפים ומעלה' },
    ],
    minPeople: 4,
    addOns: [
      { id: 'jeep', name: 'טיול ג׳יפים', price: 139000 },
      { id: 'cave', name: 'סיור במערה', price: 139000 },
      { id: 'horses', name: 'רכיבה על סוסים', price: 139000 },
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
    tiers: [{ min: 1, price: 99000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'ערב',
    tags: ['משקה ראשון', 'מדריך'],
    images: ['chiva', 'chivain'],
    faq: [...commonFaq],
  },
  // Santa Marta boat tours to Tayrona park. Source: partner catalog (Nov 2026), prices +10% per Jonathan.
  {
    slug: 'tayrona-cabo-san-juan',
    title: 'טאירונה – קאבו סן חואן',
    kind: 'group',
    destination: 'santa-marta',
    place: 'פארק טאירונה, סנטה מרתה',
    short: 'שייט בסירה מהירה לחוף המפורסם ביותר בטאירונה, שבילים בג׳ונגל ותצפיות.',
    intro:
      'יום בחוף הכי מפורסם בפארק טאירונה. נפגשים במפרץ של סנטה מרתה, הסירה יוצאת ב־9:30 ומגיעה אחרי כשעה ישירות לקאבו סן חואן. משם אפשר ללכת בשבילים לחופים נוספים, ליהנות מהטבע ומתצפיות מדהימות. חוזרים ב־15:30 למפרץ סנטה מרתה.',
    includes: ['שייט בסירה הלוך וחזור', 'ביטוח נסיעות', 'ביטוח פארק טאירונה'],
    excludes: ['ארוחות ושתייה'],
    tiers: [{ min: 1, price: 239000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: 'נקודת מפגש: מפרץ סנטה מרתה',
    bookAheadHours: 24,
    duration: 'יום מלא',
    tags: ['שייט בסירה', 'יציאה ב־9:30', 'שבילים ותצפיות'],
    images: ['sm-cabo1', 'sm-cabo2', 'sm-cabo3', 'sm-cabo4'],
    faq: [
      { q: 'אפשר לנסוע רק בכיוון אחד?', a: 'כן. הלוך בלבד: 159,000 COP לאדם. חזור בלבד: 119,000 COP לאדם.' },
      { q: 'מאיפה יוצאים?', a: 'ממפרץ סנטה מרתה. הסירה יוצאת ב־9:30 וחוזרת ב־15:30.' },
      { q: 'אפשר להזמין סירה פרטית?', a: 'כן. יש סירות פרטיות ל־16 עד 38 איש, ואתם בוחרים את החופים. המחיר בתיאום מולנו.' },
      ...commonFaq,
    ],
    featured: true,
  },
  {
    slug: 'super-tayrona',
    title: 'סופר טאירונה – באיה סינטו ופלאיה קריסטל',
    kind: 'group',
    destination: 'santa-marta',
    place: 'פארק טאירונה, סנטה מרתה',
    short: 'שני חופים אקזוטיים ביום אחד: באיה סינטו ופלאיה קריסטל, כולל מסכת שנורקל.',
    intro:
      'שני החופים הכי אקזוטיים בטאירונה ביום אחד. הסירה יוצאת ב־9:30 ממפרץ סנטה מרתה לבאיה סינטו, וב־12:30 ממשיכים לפלאיה קריסטל עם המים הצלולים. חוזרים לסנטה מרתה ב־15:30.',
    includes: ['שייט בסירה הלוך וחזור', 'מסכת שנורקל', 'ביטוח נסיעות', 'ביטוח פארק טאירונה'],
    excludes: ['ארוחות ושתייה'],
    tiers: [{ min: 1, price: 199000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: 'נקודת מפגש: מפרץ סנטה מרתה',
    bookAheadHours: 24,
    duration: 'יום מלא',
    tags: ['2 חופים', 'כולל שנורקל', 'יציאה ב־9:30'],
    images: ['sm-super1', 'sm-super2', 'sm-cristal2', 'sm-cinto2'],
    faq: [
      { q: 'מאיפה יוצאים?', a: 'ממפרץ סנטה מרתה. הסירה יוצאת ב־9:30 וחוזרת ב־15:30.' },
      { q: 'אפשר להזמין סירה פרטית?', a: 'כן. יש סירות פרטיות ל־16 עד 38 איש, ואתם בוחרים את החופים. המחיר בתיאום מולנו.' },
      ...commonFaq,
    ],
    featured: true,
  },
  {
    slug: 'tayrona-bahia-cinto',
    title: 'טאירונה – באיה סינטו',
    kind: 'group',
    destination: 'santa-marta',
    place: 'פארק טאירונה, סנטה מרתה',
    short: 'אחד החופים הכי בתוליים בטאירונה: שקט, צמחייה ומים צלולים.',
    intro:
      'באיה סינטו היא אחד החופים הכי בתוליים בפארק טאירונה, עם שקט, צמחייה עשירה וחוף יפהפה. נפגשים במפרץ סנטה מרתה, הסירה יוצאת ב־9:30, ואחרי כ־40 דקות של נופים מגיעים ישירות לחוף. חוזרים ב־16:00.',
    includes: ['שייט בסירה הלוך וחזור', 'ביטוח נסיעות'],
    excludes: ['ארוחות ושתייה'],
    tiers: [{ min: 1, price: 189000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: 'נקודת מפגש: מפרץ סנטה מרתה',
    bookAheadHours: 24,
    duration: 'יום מלא',
    tags: ['שייט בסירה', 'יציאה ב־9:30', 'חוף שקט'],
    images: ['sm-cinto1', 'sm-cinto2', 'sm-cinto3'],
    faq: [
      { q: 'אפשר לנסוע רק בכיוון אחד?', a: 'כן. כיוון אחד (הלוך או חזור): 119,000 COP לאדם.' },
      { q: 'אפשר להזמין סירה פרטית?', a: 'כן. יש סירות פרטיות ל־16 עד 38 איש, ואתם בוחרים את החופים. המחיר בתיאום מולנו.' },
      ...commonFaq,
    ],
  },
  {
    slug: 'tayrona-playa-cristal',
    title: 'טאירונה – פלאיה קריסטל',
    kind: 'group',
    destination: 'santa-marta',
    place: 'פארק טאירונה, סנטה מרתה',
    short: 'החוף הכי צלול בטאירונה: חול זהוב, מים שקופים ושנורקל בין האלמוגים.',
    intro:
      'הפינה הכי צלולה בפארק טאירונה. חול זהוב, מים שקופים, ושנורקל בין האלמוגים ומגוון ענק של חיים ימיים. נפגשים במפרץ סנטה מרתה, הסירה יוצאת ב־9:30 ומגיעה אחרי כ־30 דקות. חוזרים ב־15:30 לטגנגה או למרינה של סנטה מרתה.',
    includes: ['שייט בסירה הלוך וחזור', 'ביטוח נסיעות', 'ביטוח פארק טאירונה'],
    excludes: ['ארוחות ושתייה'],
    tiers: [{ min: 1, price: 159000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: 'נקודת מפגש: מפרץ סנטה מרתה',
    bookAheadHours: 24,
    duration: 'יום מלא',
    tags: ['שייט בסירה', 'שנורקל', 'יציאה ב־9:30'],
    images: ['sm-cristal1', 'sm-cristal2', 'sm-cristal3'],
    faq: [
      { q: 'אפשר לנסוע רק בכיוון אחד?', a: 'כן. כיוון אחד (הלוך או חזור): 119,000 COP לאדם.' },
      { q: 'לאן חוזרים?', a: 'לטגנגה או למרינה של סנטה מרתה, ב־15:30.' },
      { q: 'אפשר להזמין סירה פרטית?', a: 'כן. יש סירות פרטיות ל־16 עד 38 איש, ואתם בוחרים את החופים. המחיר בתיאום מולנו.' },
      ...commonFaq,
    ],
  },
  {
    slug: 'tayrona-bahia-concha',
    title: 'טאירונה – באיה קונצ׳ה',
    kind: 'group',
    destination: 'santa-marta',
    place: 'פארק טאירונה, סנטה מרתה',
    short: 'החוף הכי קרוב בטאירונה: ים טורקיז, חול זהוב ושביל לתצפית.',
    intro:
      'החוף הכי קרוב בפארק טאירונה, גן עדן טרופי עם ים בצבע טורקיז וחול זהוב, ושבילים שמובילים לתצפית יפהפייה. נפגשים במפרץ סנטה מרתה, הסירה יוצאת ב־9:30 ומגיעה אחרי כ־20 דקות. חוזרים ב־16:00.',
    includes: ['שייט בסירה הלוך וחזור', 'ביטוח נסיעות', 'ביטוח פארק טאירונה'],
    excludes: ['ארוחות ושתייה'],
    tiers: [{ min: 1, price: 139000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: 'נקודת מפגש: מפרץ סנטה מרתה',
    bookAheadHours: 24,
    duration: 'יום מלא',
    tags: ['20 דקות שייט', 'יציאה ב־9:30', 'תצפית'],
    images: ['sm-concha1', 'sm-concha2', 'sm-concha4'],
    faq: [
      { q: 'אפשר להזמין סירה פרטית?', a: 'כן. יש סירות פרטיות ל־16 עד 38 איש, ואתם בוחרים את החופים. המחיר בתיאום מולנו.' },
      ...commonFaq,
    ],
  },
];

export const fromPrice = (t: Tour) => Math.min(...t.tiers.map((x) => x.price));
export const hasTiers = (t: Tour) => t.tiers.length > 1;
export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
