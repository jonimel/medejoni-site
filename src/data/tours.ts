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
  /** Only one add-on can be picked. */
  singleAddOn?: boolean;
  /** The day, step by step (optional). */
  schedule?: { title: string; text?: string }[];
  pickup: string;
  bookAheadHours: number;
  duration: string;
  tags: string[];
  images: string[];
  /** Short vertical video shown under "על הטיול": public/videos/<name>.mp4, poster = photo name. */
  video?: { name: string; poster: string; title: string };
  faq: { q: string; a: string }[];
  featured?: boolean;
  /** Shown under the "טיולים לזוגות" filter on the home page. */
  couples?: boolean;
  /** "מומלץ" badge on the card and page; recommended tours are listed first. */
  recommended?: boolean;
  /** 3–4 short points under the title ("בקצרה"). */
  highlights?: string[];
  /** Start / end time, shown in the quick facts. */
  start?: string;
  end?: string;
  /** Guide language. Leave out when there is no guide (e.g. boat tours). */
  guide?: string;
  /** Who it suits, e.g. "מתאים לכל הגילאים". */
  ages?: string;
  /** "מה להביא" list. */
  bring?: string[];
  /** "טוב לדעת" list. */
  goodToKnow?: string[];
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

const english = 'מדריך מקומי דובר אנגלית';
const tayronaBring = ['בגד ים ומגבת', 'קרם הגנה וכובע', 'מים ואוכל ליום (או מזומן לקנות בחוף)', 'מזומן'];

const allTours: Tour[] = [
  {
    slug: 'guatape-group',
    title: 'גואטפה – טיול קבוצתי',
    kind: 'group',
    destination: 'guatape',
    place: 'גואטפה, אנטיוקיה',
    short: 'טיול יום מלא: שייט באגם, סלע אל פניול, סיור בכפר הצבעוני, ארוחת בוקר וצהריים.',
    intro:
      'יום שלם באחד המקומות היפים בקולומביה. נוסעים ממדג׳ין בין הנופים הירוקים של אנטיוקיה, משייטים באגם של גואטפה בין האיים והווילות, עולים לסלע אל פניול לתצפית עוצרת נשימה על כל האזור, ומסיימים בסיבוב בכפר הצבעוני. באמצע יש ארוחת צהריים קולומביאנית מסורתית.',
    includes: [
      'הסעה הלוך וחזור ממדג׳ין ברכב ממוזג',
      'ארוחת בוקר מקומית',
      'ארוחת צהריים מקומית',
      'שייט בסירה באגם (כשעה)',
      'עצירה של כשעה וחצי בסלע אל פניול',
      'סיור בכפר גואטפה',
      'מדריך מקצועי באנגלית ובספרדית לאורך כל היום',
    ],
    excludes: ['כניסה לסלע אל פניול (35,000 פסו, למי שרוצה לעלות)'],
    schedule: [
      { title: 'יציאה ב־7:00 מפארק אל פובלדו', text: 'כדאי להגיע לפחות 10 דקות לפני.' },
      { title: 'ארוחת בוקר מקומית בדרך' },
      { title: 'שייט באגם גואטפה', text: 'כשעה על הסירה, עם נוף לאיים ולווילות שסביב האגם.' },
      { title: 'סלע אל פניול (La Piedra del Peñol)', text: 'כשעה וחצי לעלות ולרדת מהסלע המפורסם. הכניסה 35,000 פסו, למי שרוצה לעלות.' },
      { title: 'ארוחת צהריים קולומביאנית מסורתית' },
      { title: 'סיור בכפר הצבעוני', text: 'רחוב המטריות (Calle de las Sombrillas), רחוב הזיכרון (Calle del Recuerdo) וכיכר הזוקאלוס (Plaza de los Zócalos).' },
      { title: 'חזרה למדג׳ין בסביבות 18:00' },
    ],
    tiers: [{ min: 1, price: 149000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: 'יציאה מפארק אל פובלדו',
    bookAheadHours: 36,
    duration: 'יום מלא',
    tags: ['יום מלא', 'כולל ארוחות', 'כולל שייט'],
    highlights: ['שייט באגם גואטפה', 'תצפית מסלע אל פניול', 'הכפר הצבעוני', 'ארוחת בוקר וצהריים'],
    start: '7:00',
    end: 'בסביבות 18:00',
    guide: 'מדריך באנגלית ובספרדית',
    ages: 'מתאים לכל הגילאים',
    bring: ['נעליים נוחות (כ־700 מדרגות לראש הסלע)', 'קרם הגנה וכובע', 'ז׳קט קל לשייט', 'מזומן לכניסה לסלע (35,000)'],
    goodToKnow: ['העלייה לסלע לא חובה. מי שלא עולה מחכה למטה עם נוף לאגם.'],
    images: ['guatape-colombia-el-penol', 'guatape-day-trip-umbrella-street', 'day-trips-from-medellin-guatape-lake', 'guatape-colorful-streets'],
    faq: [
      { q: 'מאיפה יוצאים?', a: 'הטיול הקבוצתי יוצא מפארק אל פובלדו במדג׳ין.' },
      { q: 'הכניסה לסלע אל פניול כלולה?', a: 'לא. מי שרוצה לעלות לסלע משלם במקום 35,000 פסו.' },
      { q: 'מתי חוזרים?', a: 'יוצאים ב־7:00 בבוקר וחוזרים למדג׳ין בסביבות 18:00.' },
      { q: 'כמה זמן מראש צריך להזמין?', a: 'לפחות 36 שעות מראש. אני דואג לרישום ולשריון המקומות.' },
      ...commonFaq,
    ],
    featured: true,
  },
  {
    slug: 'guatape-private',
    couples: true,
    title: 'גואטפה – טיול פרטי',
    kind: 'private',
    destination: 'guatape',
    place: 'גואטפה, אנטיוקיה',
    short: 'נהג ומדריך צמוד, ואפשר להוסיף ווייקבורד, אופנועי ים, טיסת מסוק ועוד.',
    intro:
      'טיול פרטי לגואטפה בקצב שלכם: רכב פרטי, נהג ומדריך מקומי רק לכם. מהלך היום דומה לטיול הקבוצתי, ואפשר לשנות אותו לפי מה שבא לכם, ולהוסיף אטרקציות על האגם.',
    includes: ['הסעה פרטית מהמלון וחזרה', 'נהג', 'מדריך מקומי דובר אנגלית', 'ארוחת בוקר', 'כיבוד קל'],
    excludes: ['כניסה לסלע אל פניול (35,000)', 'אטרקציות על האגם (בתוספת תשלום)'],
    schedule: [
      { title: 'איסוף מהמלון בבוקר' },
      { title: 'ארוחת בוקר מקומית בדרך' },
      { title: 'סלע אל פניול', text: 'עולים לתצפית על האגם והאיים, למי שרוצה.' },
      { title: 'אטרקציות על האגם', text: 'אופנועי ים, ווייקבורד, סקי מים ועוד, לבחירתכם.' },
      { title: 'הכפר הצבעוני של גואטפה', text: 'רחוב המטריות והכיכר המרכזית.' },
      { title: 'חזרה למדג׳ין בערב' },
    ],
    highlights: ['רכב ומדריך רק לכם', 'מסלול גמיש', 'אטרקציות על האגם לבחירה'],
    guide: english,
    ages: 'מתאים לכל הגילאים',
    bring: ['נעליים נוחות', 'בגד ים, אם אתם מוסיפים אטרקציה על המים', 'קרם הגנה וכובע', 'מזומן'],
    tiers: [
      { min: 3, price: 299000, label: '3 משתתפים' },
      { min: 4, price: 229000, label: '4 משתתפים' },
      { min: 5, price: 179000, label: '5 עד 6 משתתפים' },
      { min: 7, price: 169000, label: '7 עד 8 משתתפים' },
    ],
    minPeople: 3,
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
    images: ['guatape-wakeboard-el-penol', 'guatape-jet-ski', 'guatape-lake-wakeboarding', 'guatape-helicopter-view-el-penol', 'guatape-helicopter-tour', 'guatape-horse-riding', 'day-trips-from-medellin-guatape-lake'],
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
    short: 'הקבר, שכונת פבלו אסקובר, הבית שבו נהרג ופארק אינפלקסיון.',
    intro:
      "סיור פבלו אסקובר פרטי במדג'ין, עם מדריך מקומי שמכיר את הסיפור מקרוב. איסוף מהמלון בשעה שנוחה לכם.",
    includes: [pickupHotel, 'נהג', 'מדריך מקומי דובר אנגלית'],
    excludes: [],
    schedule: [
      { title: 'הקבר של פבלו אסקובר', text: 'בבית הקברות מונטסקרו (Jardines Montesacro).' },
      { title: 'שכונת פבלו אסקובר', text: 'השכונה שהוא בנה למשפחות עניות.' },
      { title: 'הבית שבו נהרג', text: 'בשכונת לוס אוליבוס, 1993.' },
      { title: 'פארק אינפלקסיון (Parque Inflexión)', text: 'נבנה במקום הבניין המפואר שלו, לזכר קורבנות הטרור.' },
    ],
    highlights: ['הקבר', 'שכונת פבלו אסקובר', 'הבית שבו נהרג', 'פארק אינפלקסיון'],
    start: 'בשעה שנוחה לכם',
    guide: english,
    tiers: [
      { min: 3, price: 149000, label: '3 משתתפים' },
      { min: 4, price: 129000, label: '4 משתתפים' },
      { min: 5, price: 109000, label: '5 עד 6 משתתפים' },
      { min: 7, price: 99000, label: '7 עד 8 משתתפים' },
    ],
    minPeople: 3,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 36,
    duration: 'חצי יום',
    tags: [pickupHotel, 'מדריך צמוד'],
    images: ['pablo-escobar-tour-medellin', 'barrio-pablo-escobar-mural', 'pablo-escobar-museum-medellin', 'pablo-escobar-magazine-cover'],
    faq: [
      { q: 'האם סיור פבלו אסקובר בטוח?', a: 'כן. כל המקומות בסיור פתוחים לציבור.' },
      { q: 'אפשר לשלב עם קומונה 13?', a: 'כן. יש סיור משולב של פבלו אסקובר וקומונה 13 ביום אחד.' },
      ...commonFaq,
    ],
    featured: true,
  },
  {
    slug: 'comuna-13-tour',
    title: 'סיור בקומונה 13',
    kind: 'private',
    destination: 'medellin',
    place: "מדג'ין",
    short: 'גרפיטי, היפ־הופ, מדרגות נעות והסיפור של השכונה שהפכה לסמל של מדג׳ין.',
    intro:
      "סיור בקומונה 13, השכונה המפורסמת ביותר במדג'ין: אמנות רחוב, מופעי היפ־הופ, המדרגות הנעות, והסיפור המרגש של השינוי שהשכונה עברה.",
    includes: [pickupHotel, 'טעימות אוכל מקומי', 'מדריך מקומי דובר אנגלית'],
    excludes: [],
    highlights: ['גרפיטי ואמנות רחוב', 'מופעי היפ־הופ', 'המדרגות הנעות', 'טעימות אוכל מקומי'],
    guide: english,
    ages: 'מתאים לכל הגילאים',
    bring: ['נעליים נוחות (יש עליות ומדרגות)', 'קרם הגנה וכובע', 'מזומן לטיפים ולמזכרות'],
    tiers: [
      { min: 3, price: 119000, label: '3 משתתפים' },
      { min: 4, price: 99000, label: '4 עד 6 משתתפים' },
      { min: 7, price: 59000, label: '7 עד 8 משתתפים' },
    ],
    minPeople: 3,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: '4 עד 6 שעות',
    tags: [pickupHotel, 'טעימות אוכל', '4 עד 6 שעות'],
    images: ['comuna-13-tour-que-chimba-medellin', 'comuna-13-medellin-view', 'comuna-13-street-art', 'comuna-13-medellin', 'comuna-13-crafts-market'],
    faq: [{ q: 'כמה זמן נמשך הסיור?', a: 'בין 4 ל־6 שעות, כולל איסוף מהמלון וחזרה.' }, ...commonFaq],
    featured: true,
  },
  {
    slug: 'pablo-escobar-comuna-13',
    title: 'פבלו אסקובר + קומונה 13',
    kind: 'private',
    destination: 'medellin',
    place: "מדג'ין",
    short: 'שני הסיפורים הגדולים של מדג׳ין ביום אחד: בעקבות פבלו אסקובר, ואז הגרפיטי וההיפ־הופ של קומונה 13.',
    intro:
      "יום שמחבר את שני הצדדים של מדג'ין. בחלק הראשון יוצאים בעקבות פבלו אסקובר: הקבר, השכונה שנקראת על שמו, המקום שבו נהרג ופארק אינפלקסיון. אחר כך עוברים לקומונה 13, עם אמנות הרחוב, מופעי ההיפ־הופ, המדרגות הנעות והסיפור של השכונה שהפכה לסמל של השינוי בעיר.",
    includes: [pickupHotel, 'נהג', 'מדריך מקומי דובר אנגלית'],
    excludes: [],
    schedule: [
      { title: 'איסוף מהמלון' },
      { title: 'בעקבות פבלו אסקובר', text: 'הקבר, שכונת פבלו אסקובר, הבית שבו נהרג ופארק אינפלקסיון.' },
      { title: 'קומונה 13', text: 'גרפיטי, היפ־הופ והמדרגות הנעות.' },
      { title: 'חזרה למלון' },
    ],
    highlights: ['סיור פבלו אסקובר', 'קומונה 13', 'שני סיורים ביום אחד'],
    guide: english,
    bring: ['נעליים נוחות', 'קרם הגנה וכובע', 'מזומן'],
    tiers: [
      { min: 3, price: 199000, label: '3 משתתפים' },
      { min: 4, price: 179000, label: '4 משתתפים' },
      { min: 5, price: 149000, label: '5 עד 6 משתתפים' },
      { min: 7, price: 119000, label: '7 עד 8 משתתפים' },
    ],
    minPeople: 3,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 36,
    duration: 'יום מלא',
    tags: [pickupHotel, 'מדריך צמוד', 'שני סיורים ביום אחד'],
    images: ['comuna-13-medellin-christ-statue', 'pablo-escobar-tour-medellin', 'comuna-13-tour-que-chimba-medellin', 'pablo-escobar-museum-medellin', 'comuna-13-street-art', 'comuna-13-medellin-view'],
    faq: [...commonFaq],
  },
  {
    slug: 'colombian-for-a-day',
    title: 'קולומביאני ליום אחד',
    kind: 'private',
    destination: 'antioquia',
    place: 'אנטיוקיה',
    short: 'מצנח רחיפה או פיינטבול, הכפר סן פדרו, דגים את ארוחת הצהריים בעצמכם ושקיעה מעל מדג׳ין.',
    intro: "יום כפרי מחוץ למדג'ין: אדרנלין בבוקר, כפר הררי בצהריים ושקיעה מעל העיר בערב.",
    includes: ['הסעה פרטית הלוך וחזור', 'נהג', 'מדריך מקומי דובר אנגלית', 'ארוחת בוקר'],
    excludes: ['ארוחת צהריים', 'האטרקציה: מצנח רחיפה (230,000) או פיינטבול (79,000)'],
    schedule: [
      { title: 'איסוף מהמלון ב־8:00' },
      { title: 'מצנח רחיפה או פיינטבול', text: 'בוחרים אטרקציה אחת.' },
      { title: 'סן פדרו דה לוס מילגרוס', text: 'טבע, אווירה מקומית וסיבוב קצר בכפר.' },
      { title: 'ארוחת צהריים בבריכת דגים', text: 'דגים בעצמכם, והדג מגיע ישר לצלחת.' },
      { title: 'שקיעה במצפה מעל מדג׳ין' },
      { title: 'חזרה למלון בסביבות 20:00' },
    ],
    recommended: true,
    highlights: ['מצנח רחיפה או פיינטבול', 'הכפר סן פדרו', 'דגים את הארוחה בעצמכם', 'מצפה שקיעה'],
    start: '8:00',
    end: 'בסביבות 20:00',
    guide: english,
    bring: ['נעליים סגורות', 'ז׳קט קל (בסן פדרו קריר)', 'קרם הגנה', 'מזומן'],
    tiers: [
      { min: 3, price: 239000, label: '3 משתתפים' },
      { min: 4, price: 179000, label: '4 משתתפים' },
      { min: 5, price: 139000, label: '5 עד 6 משתתפים' },
      { min: 7, price: 139000, label: '7 עד 8 משתתפים' },
    ],
    minPeople: 3,
    addOns: [
      { id: 'paragliding', name: 'מצנח רחיפה', price: 230000 },
      { id: 'paintball', name: 'פיינטבול', price: 79000 },
    ],
    addOnsNote: 'בוחרים אטרקציה אחת. המחיר לאדם.',
    singleAddOn: true,
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'יום מלא',
    tags: ['מצנח או פיינטבול', 'דייג וארוחה', 'שקיעה'],
    images: ['paragliding-medellin', 'paragliding-medellin-tandem-flight', 'san-pedro-trout-fishing-lunch', 'paintball-antioquia', 'san-pedro-de-los-milagros-cows', 'antioquia-countryside-colombia', 'private-tour-medellin-fishing'],
    video: { name: 'paragliding-medellin-video', poster: 'paragliding-medellin-tandem-flight', title: 'מצנח רחיפה מעל מדיין – וידאו מהטיול קולומביאני ליום אחד' },
    faq: [
      { q: 'אפשר לעשות גם מצנח וגם פיינטבול?', a: 'לא. בוחרים אטרקציה אחת.' },
      { q: 'מי מלווה אותנו?', a: 'מדריך מקומי דובר אנגלית. אני דואג לכל הפרטים וזמין לכם בוואטסאפ לאורך כל היום.' },
      ...commonFaq,
    ],
  },
  {
    slug: 'atletico-nacional-match',
    title: 'משחק של אתלטיקו נסיונל',
    kind: 'evening',
    destination: 'medellin',
    place: "מדג'ין",
    short: 'כרטיס, הסעה, מדריך ובירה ראשונה, באחת מאווירות הכדורגל הטובות בדרום אמריקה.',
    intro: 'לחוות את אחת מאווירות הכדורגל הטובות ביותר בדרום אמריקה, באצטדיון של אתלטיקו נסיונל.',
    includes: ['כרטיס למשחק', 'הסעה הלוך וחזור', 'מדריך מקומי דובר אנגלית', 'בירה ראשונה'],
    excludes: [],
    highlights: ['האצטדיון אטנסיו חירארדוט', 'אווירת יציע של אוהדים', 'הסעה ובירה ראשונה'],
    start: 'לפי שעת המשחק',
    guide: english,
    bring: ['דרכון', 'חולצה ירוקה או לבנה', 'מזומן קטן'],
    goodToKnow: ['לא מגיעים עם חולצה של הקבוצה היריבה.'],
    tiers: [{ min: 1, price: 199000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'ערב',
    tags: ['כולל כרטיס', 'כולל הסעה'],
    images: ['atletico-nacional-stadium-flags', 'atletico-nacional-match-medellin', 'atletico-nacional-fans-medellin'],
    video: { name: 'atletico-nacional-stadium-video', poster: 'atletico-nacional-stadium-flags', title: 'האווירה ביציע במשחק של אתלטיקו נסיונל במדיין – וידאו' },
    faq: [{ q: 'מתי יש משחקים?', a: 'לפי לוח המשחקים של הליגה. כתבו ליונתן ונבדוק תאריכים פנויים.' }, ...commonFaq],
    featured: true,
  },
  {
    slug: 'medellin-viewpoints-tour',
    couples: true,
    title: "סיור מצפים במדג'ין",
    kind: 'evening',
    destination: 'medellin',
    place: "מדג'ין",
    short: 'שני המצפים המרכזיים של מדג׳ין, מהשקיעה ועד שהעיר נדלקת.',
    intro: "ערב מעל מדג'ין: מבקרים בשני המצפים המרכזיים של העיר, רואים את השקיעה ואת האורות נדלקים בכל העמק.",
    includes: ['הסעה הלוך וחזור', 'מדריך מקומי דובר אנגלית', 'כניסה למצפים'],
    excludes: [],
    schedule: [
      { title: 'איסוף מהמלון ב־17:00' },
      { title: 'המצפה הראשון', text: 'שקיעה מעל העיר.' },
      { title: 'המצפה השני', text: 'אורות העיר בלילה.' },
      { title: 'חזרה למלון בסביבות 22:00' },
    ],
    recommended: true,
    highlights: ['שני מצפים מרכזיים', 'שקיעה', 'אורות העיר בלילה'],
    start: '17:00',
    end: 'בסביבות 22:00',
    guide: english,
    ages: 'מתאים לכל הגילאים',
    bring: ['ז׳קט קל (בערב קריר למעלה)', 'מצלמה או טלפון טעון'],
    tiers: [
      { min: 3, price: 149000, label: '3 משתתפים' },
      { min: 4, price: 119000, label: '4 עד 6 משתתפים' },
      { min: 7, price: 99000, label: '7 עד 8 משתתפים' },
    ],
    minPeople: 3,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'ערב',
    tags: ['17:00 עד 22:00', 'כולל כניסה', 'שקיעה'],
    images: ['medellin-attractions-viewpoint-night', 'medellin-nightlife-city-lights', 'medellin-tours-viewpoint-evening'],
    faq: [{ q: 'יש מינימום משתתפים?', a: 'כן, מינימום שלושה משתתפים.' }, ...commonFaq],
  },
  {
    slug: 'jardin-day-trip',
    couples: true,
    title: 'יום קסום בחרדין',
    kind: 'private',
    destination: 'jardin',
    place: 'חרדין, אנטיוקיה',
    short: 'ג׳יפים, מערה ומפל, ורכיבה על סוסים בשקיעה, באחת העיירות היפות באנטיוקיה.',
    intro:
      'יום באחת העיירות היפות והאותנטיות ליד מדג׳ין. חרדין נמצאת כשעתיים נסיעה מהעיר, מוקפת הרים ירוקים, נחלים ונופים עוצרי נשימה. נוסעים ברכב פרטי, יוצאים לטיול ג׳יפים בטבע עד למערה עם מפל, ואפשר להיכנס למים ולהתרענן. אחר כך יש זמן חופשי בעיירה וארוחת צהריים, ולקראת השקיעה רוכבים על סוסים בין ההרים עם עצירות בנקודות תצפית.',
    includes: [
      'איסוף מהמלון או מהדירה וחזרה ברכב פרטי',
      'נהג דובר אנגלית',
      'טיול ג׳יפים וירידה למערה',
      'רכיבה על סוסים בשקיעה',
    ],
    excludes: ['ארוחת צהריים'],
    tiers: [
      { min: 3, price: 509000, label: '3 משתתפים' },
      { min: 4, price: 399000, label: '4 משתתפים' },
      { min: 5, price: 299000, label: '5 עד 6 משתתפים' },
      { min: 7, price: 229000, label: '7 עד 8 משתתפים' },
    ],
    minPeople: 3,
    addOns: [],
    schedule: [
      { title: 'איסוף מהמלון או מהדירה ב־7:00', text: 'נוסעים לחרדין בין הנופים הירוקים של אנטיוקיה.' },
      { title: 'מגיעים לחרדין בסביבות 9:30' },
      { title: 'טיול ג׳יפים וירידה למערה, מ־10:00 עד 13:30', text: 'טיול בטבע עד למערה עם מפל, נחלים ונופים. אפשר להיכנס למים ולהתרענן.' },
      { title: 'זמן חופשי וארוחת צהריים, מ־13:30 עד 15:00', text: 'מנוחה בעיירה, אוכל מקומי והאווירה השלווה של חרדין.' },
      { title: 'רכיבה על סוסים בשקיעה, מ־15:30 עד 17:30', text: 'רכיבה בין ההרים עם עצירות בכמה נקודות תצפית.' },
      { title: 'יוצאים חזרה למדג׳ין ב־18:30', text: 'מגיעים בסביבות 21:00.' },
    ],
    pickup: 'איסוף מהמלון או מהדירה',
    bookAheadHours: 48,
    duration: 'יום מלא',
    tags: ['רכב פרטי', 'ג׳יפים ומערה', 'סוסים בשקיעה'],
    highlights: ['טיול ג׳יפים', 'מערה עם מפל', 'העיירה חרדין', 'רכיבה על סוסים בשקיעה'],
    start: '7:00',
    end: 'בסביבות 21:00',
    guide: 'נהג דובר אנגלית',
    bring: ['בגד ים ומגבת (נכנסים למים במערה)', 'נעליים שמותר להן להירטב', 'ז׳קט קל', 'מזומן לארוחת הצהריים'],
    images: ['jardin-town-mountain-view', 'jardin-colombia-horse-trail', 'jardin-cueva-del-esplendor', 'jardin-waterfall-horses', 'cueva-del-esplendor-waterfall', 'jardin-mountains', 'jardin-horse-ride-road', 'jardin-jungle-stream'],
    faq: [
      { q: 'מתי יוצאים ומתי חוזרים?', a: 'איסוף ב־7:00 בבוקר, וחוזרים למדג׳ין בסביבות 21:00.' },
      { q: 'האטרקציות כלולות במחיר?', a: 'כן. טיול הג׳יפים, המערה והרכיבה על סוסים כלולים. ארוחת הצהריים משולמת בנפרד.' },
      { q: 'אנחנו יותר משמונה, אפשר?', a: 'כן. דברו איתי ונתאם מחיר לקבוצה.' },
      ...commonFaq,
    ],
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
    includes: ['כרטיס לצ׳יבה', 'מדריך מקומי דובר אנגלית', 'משקה ראשון'],
    excludes: [],
    highlights: ['אוטובוס מסיבות צבעוני', 'מוזיקה לטינית', 'עצירות בעיר'],
    start: '18:00',
    end: 'לפי המסלול',
    guide: english,
    bring: ['מזומן לשתייה', 'בגדים נוחים לרקוד'],
    tiers: [{ min: 1, price: 99000, label: 'לאדם' }],
    minPeople: 1,
    addOns: [],
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'ערב',
    tags: ['משקה ראשון', 'מדריך'],
    images: ['chiva-rumbera-medellin', 'chiva-rumbera-party-bus'],
    faq: [{ q: 'מתי יוצאים ומתי חוזרים?', a: 'יוצאים ב־18:00. שעת החזרה תלויה במסלול של אותו ערב.' }, ...commonFaq],
  },
  {
    slug: 'caldas-river-farm-day-trip',
    couples: true,
    title: 'פסאו אל ריו: יום כפרי בקלדס',
    kind: 'private',
    destination: 'antioquia',
    place: 'קלדס, אנטיוקיה',
    short: 'יום רגוע מחוץ לעיר: חווה מלאה בחיות, רכיבה על סוסים, ארוחה כפרית ושחייה בנהר צלול.',
    intro:
      "רוצים לראות איך המקומיים של מדג'ין מבלים בסוף השבוע? יוצאים לקלדס, בדרום עמק אבורה, ל\"פסאו אל ריו\": יום בטבע ליד הנהר, בלי לחץ ובלי שעון. חווה עם חיות, רכיבה על סוסים בין הגבעות, ארוחה כפרית, ואת שאר היום מעבירים במים הצלולים של הנהר.",
    includes: ['איסוף מהמלון וחזרה ברכב פרטי', 'נהג', 'מדריך מקומי דובר אנגלית', 'כניסה לחווה'],
    excludes: ['ארוחת צהריים', 'רכיבה על סוסים (המחיר לפי משך הרכיבה)'],
    schedule: [
      { title: 'איסוף מהמלון ב־7:00', text: 'נוסעים לקלדס, בדרום עמק אבורה.' },
      { title: 'חוות לה קלריטה (La Clarita Granja)', text: 'חווה מלאה בחיות, כיף לכל הגילאים.' },
      { title: 'רכיבה על סוסים', text: 'בין הגבעות הירוקות.' },
      { title: 'ארוחת צהריים כפרית' },
      { title: 'צ׳יל בנהר', text: 'את שאר היום מעבירים במים הצלולים, ואפשר להתרחץ.' },
      { title: 'חזרה למדג׳ין לקראת השקיעה' },
    ],
    highlights: ['חווה עם חיות', 'רכיבה על סוסים', 'ארוחה כפרית', 'רחצה בנהר'],
    start: '7:00',
    end: 'לקראת השקיעה',
    guide: english,
    ages: 'מתאים לכל הגילאים',
    bring: ['בגד ים ומגבת', 'נעליים שמותר להן להירטב', 'קרם הגנה', 'מזומן לארוחה ולרכיבה'],
    tiers: [
      { min: 4, price: 189000, label: '4 משתתפים' },
      { min: 5, price: 179000, label: '5 עד 6 משתתפים' },
      { min: 7, price: 149000, label: '7 עד 8 משתתפים' },
    ],
    minPeople: 4,
    addOns: [{ id: 'horses', name: 'רכיבה על סוסים' }],
    addOnsNote: 'מחיר הרכיבה לפי משך הזמן, בתיאום מראש.',
    pickup: pickupHotel,
    bookAheadHours: 48,
    duration: 'יום מלא',
    tags: ['חווה עם חיות', 'רכיבה על סוסים', 'רחצה בנהר'],
    images: ['caldas-river-day-trip-medellin', 'farm-day-trip-medellin-caldas', 'horse-riding-caldas-antioquia', 'farm-animals-medellin-family-trip', 'caldas-antioquia-river-swim', 'caldas-river-waterfall-nature', 'river-near-medellin-nature-trip'],
    faq: [
      { q: 'מתאים לילדים?', a: 'כן. החווה, הסוסים והנהר מתאימים לכל הגילאים.' },
      { q: 'הרכיבה על סוסים כלולה?', a: 'לא. המחיר נקבע לפי משך הרכיבה, ואפשר לסגור אותו מראש.' },
      ...commonFaq,
    ],
    featured: true,
  },
  // Santa Marta boat tours to Tayrona park. Source: partner catalog (Nov 2026), prices +10% per Jonathan.
  {
    slug: 'tayrona-cabo-san-juan',
    couples: true,
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
    start: '9:30',
    end: '15:30',
    bring: tayronaBring,
    bookAheadHours: 24,
    duration: 'יום מלא',
    tags: ['שייט בסירה', 'יציאה ב־9:30', 'שבילים ותצפיות'],
    images: ['cabo-san-juan-tayrona', 'cabo-san-juan-aerial', 'tayrona-national-park-coast', 'cabo-san-juan-beach'],
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
    start: '9:30',
    end: '15:30',
    bring: tayronaBring,
    bookAheadHours: 24,
    duration: 'יום מלא',
    tags: ['2 חופים', 'כולל שנורקל', 'יציאה ב־9:30'],
    images: ['super-tayrona-beach', 'tayrona-beach-sand', 'playa-cristal-boat', 'bahia-cinto-beach'],
    faq: [
      { q: 'מאיפה יוצאים?', a: 'ממפרץ סנטה מרתה. הסירה יוצאת ב־9:30 וחוזרת ב־15:30.' },
      { q: 'אפשר להזמין סירה פרטית?', a: 'כן. יש סירות פרטיות ל־16 עד 38 איש, ואתם בוחרים את החופים. המחיר בתיאום מולנו.' },
      ...commonFaq,
    ],
    featured: true,
  },
  {
    slug: 'tayrona-bahia-cinto',
    couples: true,
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
    start: '9:30',
    end: '16:00',
    bring: tayronaBring,
    bookAheadHours: 24,
    duration: 'יום מלא',
    tags: ['שייט בסירה', 'יציאה ב־9:30', 'חוף שקט'],
    images: ['bahia-cinto-tayrona', 'bahia-cinto-beach', 'santa-marta-boat-tour'],
    faq: [
      { q: 'אפשר לנסוע רק בכיוון אחד?', a: 'כן. כיוון אחד (הלוך או חזור): 119,000 COP לאדם.' },
      { q: 'אפשר להזמין סירה פרטית?', a: 'כן. יש סירות פרטיות ל־16 עד 38 איש, ואתם בוחרים את החופים. המחיר בתיאום מולנו.' },
      ...commonFaq,
    ],
  },
  {
    slug: 'tayrona-playa-cristal',
    couples: true,
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
    start: '9:30',
    end: '15:30',
    bring: tayronaBring,
    bookAheadHours: 24,
    duration: 'יום מלא',
    tags: ['שייט בסירה', 'שנורקל', 'יציאה ב־9:30'],
    images: ['playa-cristal-tayrona', 'playa-cristal-boat', 'tayrona-speedboat-santa-marta'],
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
    start: '9:30',
    end: '16:00',
    bring: tayronaBring,
    bookAheadHours: 24,
    duration: 'יום מלא',
    tags: ['20 דקות שייט', 'יציאה ב־9:30', 'תצפית'],
    images: ['bahia-concha-santa-marta', 'bahia-concha-beach-boats', 'santa-marta-boat-to-tayrona'],
    faq: [
      { q: 'אפשר להזמין סירה פרטית?', a: 'כן. יש סירות פרטיות ל־16 עד 38 איש, ואתם בוחרים את החופים. המחיר בתיאום מולנו.' },
      ...commonFaq,
    ],
  },
];

// Recommended tours first, then the rest in catalog order.
export const tours: Tour[] = [...allTours].sort((a, b) => Number(!!b.recommended) - Number(!!a.recommended));

export const fromPrice = (t: Tour) => Math.min(...t.tiers.map((x) => x.price));
export const hasTiers = (t: Tour) => t.tiers.length > 1;
export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
